import styles from './Card.module.css';

interface CardProps extends React.AllHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
