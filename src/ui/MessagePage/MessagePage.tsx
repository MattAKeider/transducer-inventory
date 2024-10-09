import styles from './MessagePage.module.css';

interface Props {
  message: string;
  isError?: boolean;
}

const MessagePage = ({ message, isError }: Props) => {
  return (
    <section className={styles.container}>
      <div className={styles.text}>
        {isError && <h2 className={styles.problem}>Something went wrong...</h2>}
        <p className={!isError ? styles.message : undefined}>{message}</p>
      </div>
    </section>
  );
};

export default MessagePage;
