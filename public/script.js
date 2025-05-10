// Configuração do Canvas
const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');

// Raspadinha
canvas.addEventListener('mousedown', iniciarRaspadinha);
canvas.addEventListener('touchstart', iniciarRaspadinha);

function iniciarRaspadinha(e) {
  // Lógica para raspar (exemplo simplificado)
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(e.clientX, e.clientY, 20, 0, Math.PI * 2);
  ctx.fill();
}