import { ReactNode, ButtonHTMLAttributes } from 'react';

import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({children, ...props}: ButtonProps) => {
  const classes = `${styles.button} ${props.className}`;
  return <button {...props} className={classes}>{children}</button>
};

export default Button;