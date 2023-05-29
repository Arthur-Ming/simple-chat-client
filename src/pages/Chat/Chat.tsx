import { useEffect, useState } from 'react';
import MessageInput from './MessageInput';
import Messages from './Messages';
import { IMessage } from '../../types';

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
      const eventSource = new EventSource(`http://localhost:8000/massages`);
      eventSource.onopen = function (e) {
        console.log('Событие: open');
      };
      eventSource.onmessage = function (event) {
        const message = JSON.parse(event.data);
        setMessages((prev) => [message, ...prev]);
      };
      eventSource.onerror = function (e) {
        console.log('Событие: error');
        if (this.readyState == EventSource.CONNECTING) {
          console.log(`Переподключение (readyState=${this.readyState})...`);
        } else {
          console.log('Произошла ошибка.');
        }
      };
    };

    subscribe();
  }, []);

  return (
    <div className="flex flex-col w-[600px] gap-4 m-auto">
      <Messages messages={messages} />
      <MessageInput onSubmit={postMessage} />
    </div>
  );
};

export default Chat;
