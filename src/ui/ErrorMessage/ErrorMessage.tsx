import styles from './ErrorMessage.module.css';

type ErrorMessageProps = {
  errorMessage: string;
};

const ErrorMessage = ({errorMessage}: ErrorMessageProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.message}>{errorMessage}</p>
    </div>
  );
};

export default ErrorMessage;