import { useEffect, useState } from 'react';
import MessageInput from './MessageInput';
import Messages from './Messages';
import { IMessage } from '../../types';

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    setSocket(new WebSocket('ws://localhost:5000'));
  }, []);

  useEffect(() => {
    if (socket) {
      socket.addEventListener('open', () => {
        console.log('ws');
      });
      socket.addEventListener('message', (event) => {
        const message = JSON.parse(event.data);
        setMessages((prev) => [message, ...prev]);
      });
    }
  }, [socket]);

  const postMessage = async (message: string) => {
    if (socket) {
      socket.send(JSON.stringify({ event: 'message', text: message }));
    }
  };

  return (
    <div className="flex flex-col w-[600px] gap-4 m-auto">
      <Messages messages={messages} />
      <MessageInput onSubmit={postMessage} />
    </div>
  );
};

export default Chat;
