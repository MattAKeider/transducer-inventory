import styles from './Button.module.css';

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
}

const Button = ({children, ...props}: Props) => {
  const classes = `${styles.button} ${props.className}`;
  return <button {...props} className={classes}>{children}</button>;
};

export default Button;