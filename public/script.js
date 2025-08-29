const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  input.value = '';
  const thinkingMsgElement = appendMessage('bot', 'Gemini is thinking...');

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    if (thinkingMsgElement && chatBox.contains(thinkingMsgElement)) {
      chatBox.removeChild(thinkingMsgElement);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ reply: `HTTP error! status: ${response.status}` }));
      throw new Error(errorData.reply || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    await typeMessage('bot', data.reply);
  } catch (error) {
    console.error('Error sending message to backend:', error);
    if (thinkingMsgElement && chatBox.contains(thinkingMsgElement)) {
      chatBox.removeChild(thinkingMsgElement);
    }
    appendMessage('bot', `Error: ${error.message || 'Could not connect to the server.'}`);
  }
});

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg;
}

async function typeMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  chatBox.appendChild(msg);

  const delay = 3; // Delay between each character (milliseconds)
  let currentText = '';
  
  for (let i = 0; i < text.length; i++) {
    currentText += text[i];
    msg.textContent = currentText;
    chatBox.scrollTop = chatBox.scrollHeight;
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  
  return msg;
}