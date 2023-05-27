import { useEffect, useState } from 'react';
import MessageInput from './MessageInput';
import Messages from './Messages';
import { IMessage } from '../../types';

const getMessages = async () => {
  const res = await fetch('http://localhost:8000/massages');
  const data = await res.json();
  return data;
};

const postMessage = async (message: string) => {
  await fetch('http://localhost:8000/massages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      text: message,
    }),
  });
};

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const subscribe = async () => {
      const data = await getMessages();
      setMessages((s) => [...s, data]);
    };

    subscribe();
  }, [messages]);

  return (
    <div className="flex flex-col w-[600px] gap-4 m-auto">
      <Messages messages={messages} />
      <MessageInput onSubmit={postMessage} />
    </div>
  );
};

export default Chat;
