import { ReactNode, ButtonHTMLAttributes } from 'react';

import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  addedClass?: string;
}

const Button = ({children, addedClass = '', ...props}: ButtonProps) => {
  const classes = `${styles.button} ${addedClass}`;
  return <button {...props} className={classes}>{children}</button>
};

export default Button;