import React from 'react';

function Message({ text, sender }) {
  const isUser = sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs p-3 rounded-lg ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-gray-700 text-white rounded-bl-none'
        }`}
      >
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Message