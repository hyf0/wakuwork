"use client";

import { useState } from "react";

import { Link } from "wakuwork/router/client";

export const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div style={{ border: "3px blue dashed", margin: "1em", padding: "1em" }}>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <h3>This is a client component.</h3>
      <Link href="/">Go to Home</Link>
    </div>
  );
};
