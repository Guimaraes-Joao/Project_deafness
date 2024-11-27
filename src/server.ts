const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { transcreverAudio } = require('./transcricao');
const socketIo = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 5000;

// Configuração do CORS
app.use(cors({ origin: '*' }));  // Permite que qualquer origem acesse o servidor

// Usar body-parser para processar JSON e dados grandes
app.use(bodyParser.json({ limit: '50mb' }));

// Rota para receber o áudio e realizar a transcrição
app.post('/transcricao', async (req: { body: { audio: any; }; }, res: { json: (arg0: { texto: any; }) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) => {
  try {
    const audioContent = req.body.audio; // Audio em base64 enviado pelo frontend
    const textoTranscrito = await transcreverAudio(audioContent);
    res.json({ texto: textoTranscrito });
  } catch (error) {
    console.error('Erro ao transcrever:', error);
    res.status(500).json({ error: 'Erro ao transcrever áudio' });
  }
});

// Inicia o servidor e o Socket.IO para comunicação em tempo real
io.on('connection', (socket: { on: (arg0: string, arg1: (audioData: any) => Promise<void>) => void; emit: (arg0: string, arg1: any) => void; }) => {
  console.log('Usuário conectado via WebSocket');

  socket.on('audio', async (audioData: any) => {
    try {
      const texto = await transcreverAudio(audioData);
      socket.emit('transcription', texto);
    } catch (error) {
      console.error('Erro ao transcrever áudio via WebSocket:', error);
    }
  });
});

// Inicia o servidor Express
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
