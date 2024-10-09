import styles from './ErrorMessage.module.css';

interface Props {
  errorMessage: string;
};

const ErrorMessage = ({errorMessage}: Props) => {
  return (
    <div className={styles.container}>
      <p className={styles.message}>{errorMessage}</p>
    </div>
  );
};

export default ErrorMessage;