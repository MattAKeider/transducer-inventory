import styles from './Button.module.css';

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
}

const Button = ({children, ...props}: ButtonProps) => {
  const classes = `${styles.button} ${props.className}`;
  return <button {...props} className={classes}>{children}</button>;
};

export default Button;