import React from 'react';
import io from 'socket.io-client';
import AvatarLibras from './components/AvatarLibras';
import AudioRecorder from './components/AudioRecorder';


// URL do backend (ajuste conforme necessário)
const socket = io('http://localhost:5000');

const App = () => {
  const [textoTranscrito, setTextoTranscrito] = useState('');

  useEffect(() => {
    // Conecta ao servidor WebSocket e espera pelo evento 'transcription'
    socket.on('transcription', (data) => {
      setTextoTranscrito(data);
    });

    // Cleanup da conexão quando o componente for desmontado
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ padding: '50px' }}>
      <h1>Sistema de Transcrição e Tradução para Libras</h1>
      <AvatarLibras texto={textoTranscrito} />
      <TranscricaoTexto texto={textoTranscrito} />
    </div>
  );

// Função chamada ao receber a transcrição do áudio
const handleTranscricao = async (transcript) => {
  try {
    // Envia o texto transcrito para o backend para processar a transcrição
    const response = await fetch('http://localhost:3001/transcricao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ texto: transcript }),
    });

    const data = await response.json();
    if (data.texto) {
      setTextoTranscrito(data.texto);
    }
  } catch (error) {
    console.error('Erro ao enviar o texto transcrito para o backend:', error);
  }
};

return (
  <div className="App">
    <h1>Sistema de Transcrição e Tradução para Libras</h1>
    <AudioRecorder onTranscricao={handleTranscricao} />
    <TranscricaoTexto texto={textoTranscrito} />
  </div>
);


const App = () => {
  const handleAudioCapture = async (audioBase64) => {
    try {
      const response = await fetch('http://localhost:5000/transcricao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ audio: audioBase64 }),
      });

      const data = await response.json();
      console.log('Texto transcrito:', data.texto);
    } catch (error) {
      console.error('Erro ao enviar áudio:', error);
    }
  };

  return (
    <div className="App">
      <h1>Sistema de Transcrição e Tradução para Libras</h1>
      <AudioRecorder onAudioCapture={handleAudioCapture} />
    </div>
  );
};



};


export default App;
