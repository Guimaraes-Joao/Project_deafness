import React, { useEffect } from 'react';

const TranscricaoTexto = ({ texto }) => {
  // Hook para controlar a interação com o VLibras
  useEffect(() => {
    if (window.VLibras && window.VLibras.widget) {
      const vlibras = window.VLibras.widget;
      vlibras.update(); // Atualiza o conteúdo que o VLibras está observando
    }
  }, [texto]); // Atualiza toda vez que o texto muda

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Texto Transcrito</h2>
      <div 
        style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', minHeight: '100px' }}
        aria-live="polite" // Ajuda o VLibras a identificar mudanças de texto
      >
        <p>{texto}</p>
      </div>
    </div>
  );
};

export default TranscricaoTexto;
