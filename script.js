// script.js — pequeña lógica de chat bot para la landing

// devuelve respuesta según la consulta del usuario
function getBotReply(message) {
  const texto = message.toLowerCase();
  if (texto.includes('sabor') || texto.includes('sabores')) {
    return '🍓 Nuestros sabores:\n• Mermelada de Frutilla - $2.500\n• Escabeche de Verduras - $3.200\n• Salsa Criolla Picante - $1.800\n• Miel Pura de Campo - $4.500\n• Dulce de Arándanos - $3.000\n• Pesto Casero - $2.800\n\n¿Cuál te interesa?';
  }
  if (texto.includes('zona') && texto.includes('entrega')) {
    return 'Realizamos envíos a todo el país. En Ciudad de Mendoza y alrededores entregamos en mano, y para el resto usamos correo o mensajería.';
  }
  if (texto.includes('forma') && texto.includes('pago')) {
    return 'Podés pagar con transferencia bancaria, efectivo al recibir o mediante Mercado Pago.';
  }
  if (texto.includes('precio')) {
    return '💰 Lista de precios:\n• Mermelada de Frutilla - $2.500\n• Escabeche de Verduras - $3.200\n• Salsa Criolla Picante - $1.800\n• Miel Pura de Campo - $4.500\n• Dulce de Arándanos - $3.000\n• Pesto Casero - $2.800';
  }
  if (texto.includes('hola') || texto.includes('buenas')) {
    return '¡Hola! Soy el asistente de Del Fogón. ¿En qué te puedo ayudar?';
  }
  return 'Perdón, no entendí tu consulta. ¿Podés reformularla o elegir una de las sugerencias?';
}

// funciones para manejar la interfaz del chat
document.addEventListener('DOMContentLoaded', function() {
  const chatToggle = document.getElementById('chat-toggle');
  const chatWidget = document.getElementById('chat-widget');
  const chatBody = document.getElementById('chat-body');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  let chatOpened = false;

  function appendMessage(sender, text) {
    const msg = document.createElement('div');
    msg.className = 'chat-message ' + sender;
    msg.textContent = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function showSuggestions() {
    const suggestions = ['Sabores disponibles', 'Precios', 'Zona de entrega', 'Formas de pago'];
    const container = document.createElement('div');
    container.className = 'chat-suggestions';
    suggestions.forEach(txt => {
      const btn = document.createElement('button');
      btn.className = 'suggestion-btn';
      btn.textContent = txt;
      btn.addEventListener('click', () => sendUserMessage(txt));
      container.appendChild(btn);
    });
    chatBody.appendChild(container);
  }

  function sendUserMessage(text) {
    if (!text) return;
    appendMessage('user', text);
    const reply = getBotReply(text);
    setTimeout(() => appendMessage('bot', reply), 400);
  }

  sendBtn.addEventListener('click', () => {
    const text = userInput.value.trim();
    if (text) {
      sendUserMessage(text);
      userInput.value = '';
    }
  });

  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendBtn.click();
    }
  });

  chatToggle.addEventListener('click', () => {
    chatWidget.classList.toggle('open');
    if (!chatOpened && chatWidget.classList.contains('open')) {
      appendMessage('bot', '¡Hola! Soy el asistente de Del Fogón. ¿En qué te puedo ayudar?');
      showSuggestions();
      chatOpened = true;
    }
  });
});
