import React from "react";

export const InputBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <input type="text" />
      {children}
    </div>
  );
};
