import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, User, Trash2 } from 'lucide-react';
import { chatService, ChatMessage } from '../services/chatService';

const AVATAR_COLORS = [
  'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500',
  'bg-indigo-500', 'bg-yellow-500', 'bg-red-500', 'bg-teal-500'
];

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load username from localStorage
    const savedUsername = localStorage.getItem('unikz_username');
    if (savedUsername) {
      setUsername(savedUsername);
      setIsUsernameSet(true);
    }

    // Load messages
    loadMessages();

    // Set up polling for new messages (simulates real-time for demo)
    const interval = setInterval(loadMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      const msgs = await chatService.getAllMessages();
      setMessages(msgs);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSetUsername = () => {
    if (username.trim()) {
      localStorage.setItem('unikz_username', username.trim());
      setIsUsernameSet(true);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const avatar = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
      await chatService.addMessage({
        username,
        message: newMessage.trim(),
        avatar
      });
      setNewMessage('');
      await loadMessages();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleClearChat = async () => {
    if (window.confirm('Вы уверены, что хотите очистить все сообщения?')) {
      try {
        await chatService.clearAllMessages();
        await loadMessages();
      } catch (error) {
        console.error('Failed to clear messages:', error);
      }
    }
  };

  if (!isUsernameSet) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-academic-100 rounded-full mb-4">
              <MessageCircle size={32} className="text-academic-600" />
            </div>
            <h2 className="text-2xl font-bold text-academic-900 mb-2">Анонимный Чат Студентов</h2>
            <p className="text-slate-600">Общайтесь с другими студентами анонимно</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Выберите никнейм
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSetUsername()}
                placeholder="Например: Студент123"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-academic-500 focus:ring-2 focus:ring-academic-200 outline-none"
                maxLength={20}
              />
            </div>

            <button
              onClick={handleSetUsername}
              disabled={!username.trim()}
              className="w-full bg-academic-600 hover:bg-academic-700 text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Начать общение
            </button>

            <p className="text-xs text-slate-500 text-center">
              Ваш никнейм будет виден другим пользователям
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-academic-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageCircle size={24} />
            <div>
              <h2 className="font-bold text-lg">Чат Студентов UNI.KZ</h2>
              <p className="text-sm opacity-90">Вы: {username}</p>
            </div>
          </div>
          <button
            onClick={handleClearChat}
            className="p-2 hover:bg-academic-700 rounded-lg transition-colors"
            title="Очистить чат"
          >
            <Trash2 size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-slate-50">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <MessageCircle size={48} className="mb-3 opacity-50" />
              <p className="text-sm">Пока нет сообщений. Начните общение!</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isOwnMessage = msg.username === username;
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isOwnMessage ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div className={`${msg.avatar} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    <User size={20} />
                  </div>

                  {/* Message */}
                  <div className={`flex-1 max-w-[70%] ${isOwnMessage ? 'items-end' : ''}`}>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className={`text-sm font-medium ${isOwnMessage ? 'text-academic-600' : 'text-slate-700'}`}>
                        {isOwnMessage ? 'Вы' : msg.username}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(msg.timestamp).toLocaleTimeString('ru-RU', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        isOwnMessage
                          ? 'bg-academic-600 text-white rounded-br-sm'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm'
                      }`}
                    >
                      <p className="text-sm break-words">{msg.message}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-slate-200">
          <div className="flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              placeholder="Напишите сообщение..."
              className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:border-academic-500 focus:ring-2 focus:ring-academic-200 outline-none"
              maxLength={500}
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-academic-600 hover:bg-academic-700 text-white p-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            💡 Совет: Будьте вежливы и уважительны к другим студентам
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-900">
          <strong>ℹ️ Важно:</strong> Этот чат использует IndexedDB для локального хранения сообщений.
          Сообщения видны только на этом устройстве/браузере.
        </p>
      </div>
    </div>
  );
};

export default Chat;
