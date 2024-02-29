import styles from './MessagePage.module.css';

type MessagePageProps = {
  message: string;
  isError?: boolean;
};

const MessagePage = ({ message, isError }: MessagePageProps) => {
  return (
    <section className={styles.container}>
      <div className={styles.text}>
        { isError && <h2>Something went wrong...</h2> }
        <p className={!isError && styles.message}>{message}</p>
      </div>
    </section>
  );
};

export default MessagePage;
