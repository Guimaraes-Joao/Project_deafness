const { SpeechClient } = require('@google-cloud/speech');
const fs = require('fs');
const path = require('path');

// Crie uma instância do cliente da API do Google Cloud Speech
const client = new SpeechClient({
  keyFilename: path.join(__dirname, 'credentials.json'),  // Caminho para o arquivo de credenciais
});

// Função para transcrever o áudio usando Google Cloud Speech-to-Text
async function transcreverAudio(audioContent) {
  try {
    const audio = {
      content: audioContent,  // O conteúdo do áudio recebido em base64
    };

    const config = {
      encoding: 'LINEAR16', // Formato de codificação de áudio
      sampleRateHertz: 16000, // Taxa de amostragem do áudio (ajuste conforme necessário)
      languageCode: 'pt-BR',  // Idioma do áudio
    };

    const request = {
      audio: audio,
      config: config,
    };

    // Envia o pedido para transcrição
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');

    return transcription;
  } catch (error) {
    console.error('Erro ao transcrever áudio:', error);
    throw new Error('Erro ao transcrever áudio');
  }
}


async function transcreverAudio(audioContent) {
    // Simulação de uma transcrição
    // Em um cenário real, você faria uma chamada a uma API de transcrição aqui
    console.log('Recebido áudio em base64:', audioContent);
    return 'Texto transcrito de exemplo';
  }
  
  module.exports = { transcreverAudio };
  

module.exports = { transcreverAudio };
