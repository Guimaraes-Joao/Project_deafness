import React from 'react';

const AvatarLibras = ({ texto }) => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <h2>Avatar de Tradução para Libras</h2>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px' }}>
        {/* Aqui você pode substituir a imagem por um componente de avatar real */}
        <img src="/avatar-libras.png" alt="Avatar Libras" style={{ width: '200px', height: '200px' }} />
        <p>Texto traduzido: {texto}</p>
      </div>
    </div>
  );
};

export default AvatarLibras;
