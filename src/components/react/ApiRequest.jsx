import React, { useState, useEffect } from 'react';

function TestComponent() {
  const [count, setCount] = useState(0);

  // 使用 useEffect 在組件渲染後執行副作用
  useEffect(() => {
    // 副作用：這裡會在組件第一次渲染後執行
    console.log('Component mounted or count changed:', count);

    // 可選的清理函數：當組件卸載或 count 改變時執行
    return () => {
      console.log('Cleanup for count:', count);
    };
  }, [count]); // 依賴項是 count，只有 count 改變時才會執行

  return (
    <div>
      <h1>*useEffect Demo</h1>
      <h1>Count: {count}</h1>
      <button class="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
       onClick={() => setCount(count + 1)}>Increase Count</button>
    </div>
  );
}

export default TestComponent;
