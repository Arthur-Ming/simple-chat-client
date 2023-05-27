import { useState } from 'react';

type Props = {
  onSubmit: (message: string) => void;
};

const MessageInput = ({ onSubmit }: Props) => {
  const [value, setValue] = useState('');
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value);
        setValue('');
      }}
      className="flex flex-col gap-4"
    >
      <textarea
        className="p-2 text-lg rounded resize-none focus:outline-none focus:border-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="p-1 m-auto text-gray-300 rounded-sm bg-cyan-700 w-28">Send</button>
    </form>
  );
};

export default MessageInput;
