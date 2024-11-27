import React, { useState, useRef } from 'react';

const AudioRecorder = ({ onAudioCapture }) => {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.start();
      setRecording(true);

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        audioChunks.current = [];
        const audioUrl = URL.createObjectURL(audioBlob);

        // Converte o áudio em base64 para enviar ao backend
        const reader = new FileReader();
        reader.onloadend = () => {
          onAudioCapture(reader.result.split(',')[1]); // Envia apenas o base64
        };
        reader.readAsDataURL(audioBlob);
      };
    } catch (error) {
      console.error('Erro ao acessar o microfone:', error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <div>
      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? 'Parar Gravação' : 'Iniciar Gravação'}
      </button>
    </div>
  );
};

export default AudioRecorder;
