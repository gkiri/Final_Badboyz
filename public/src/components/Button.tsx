import React, { FC, ReactElement } from "react";
import "../styles/box.css";
export default function StyledButton({ children }: { children: ReactElement }) {
  return (
    <div className="box">
      <div id="buttonWrapper" className="img-card">
       {children}
      </div>
    </div>
  );
}
