"use client";
import React, { useState, useEffect } from "react";

const CursorGradient = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none w-screen h-screen"
      style={{ zIndex: 9999 }}
    >
      {/* Circle Gradient */}
      <div
        className="absolute w-40 h-40 bg-[radial-gradient(circle,rgba(255,165,0,0.5),transparent)] rounded-full blur-2xl transition-transform duration-75"
        style={{
          transform: `translate(${position.x - 80}px, ${position.y - 80}px)`,
        }}
      />
    </div>
  );
};

export default CursorGradient;
