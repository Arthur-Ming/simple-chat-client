import { IMessage } from '../../../types';

type Props = {
  messages: IMessage[];
};
const Message = ({ message }: { message: IMessage }) => {
  return <p> {message.text}</p>;
};

const Messages = ({ messages }: Props) => {
  return (
    <div className="text-xl text-gray-300">
      {messages.map((message) => {
        return <Message key={message.id} message={message} />;
      })}
    </div>
  );
};

export default Messages;
