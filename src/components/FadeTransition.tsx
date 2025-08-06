import { CSSTransition, SwitchTransition } from "react-transition-group";
import React from "react";

interface FadeTransitionProps {
  show: boolean;
  children: React.ReactNode;
}

const FadeTransition: React.FC<FadeTransitionProps> = ({ show, children }) => (
  <SwitchTransition mode="out-in">
    <CSSTransition
      key={show ? "show" : "hide"}
      addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
      classNames="fade"
    >
      {children}
    </CSSTransition>
  </SwitchTransition>
);

export default FadeTransition;
