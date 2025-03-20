import { useState } from 'preact/hooks';

export default function Greeting({ messages }) {

  const randomMessage = () => messages[(Math.floor(Math.random() * messages.length))];

  const [greeting, setGreeting] = useState(messages[0]);

  return (
    <div>
      <h1 class="text-3xl font-bold underline">
        <button onClick={() => setGreeting(randomMessage())}>
          {greeting}
        </button>
        ! Welcome to my Note Dev!
      </h1>
    </div>
  );
}