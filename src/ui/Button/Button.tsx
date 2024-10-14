import styles from './Button.module.css';

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
  type?: 'submit' | 'reset' | 'button';
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button = ({children, type = 'button', onClick, ...props}: Props) => {
  const classes = `${styles.button} ${props.className}`;
  return <button type={type} onClick={onClick} {...props} className={classes}>{children}</button>;
};

export default Button;