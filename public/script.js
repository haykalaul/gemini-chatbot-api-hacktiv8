const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  input.value = '';
  // Add a "thinking" message for better UX
  const thinkingMsgElement = appendMessage('bot', 'Gemini is thinking...');

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }), // Send as { "message": "..." }
    });

    // Remove the "thinking" message before displaying the actual response or error
    if (thinkingMsgElement && chatBox.contains(thinkingMsgElement)) {
      chatBox.removeChild(thinkingMsgElement);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ reply: `HTTP error! status: ${response.status}` })); // Try to parse error, fallback
      throw new Error(errorData.reply || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    appendMessage('bot', data.reply); // Expecting { "reply": "..." } from backend
  } catch (error) {
    console.error('Error sending message to backend:', error);
    // Ensure thinking message is removed on error too
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
  return msg; // Return the message element so it can be removed if needed
}