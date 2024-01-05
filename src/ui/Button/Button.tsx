import { ReactNode } from 'react';

import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  addedClass?: string;
}

const Button = ({children, addedClass = '', ...props}: ButtonProps) => {
  const classes = `${styles.button} ${addedClass}`;
  return <button {...props} className={classes}>{children}</button>
};

export default Button;