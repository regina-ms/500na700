import React, { PropsWithChildren } from "react";
import styles from "./Button.module.scss";

type Props = {
  variant: "light" | "dark";
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
} & PropsWithChildren;

function Button({
  variant,
  onClick,
  className,
  children,
  type = "button",
}: Props) {
  const darkClass = variant === "dark" ? `${styles.dark}` : "";
  return (
    <button
      type={type}
      className={`${styles.button} ${darkClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
