import styles from './MessagePage.module.css';

type MessagePageProps = {
  message: string;
};

const MessagePage = ({ message }: MessagePageProps) => {
  return (
    <section className={styles.container}>
      <div className={styles.text}>
        <h2>{message}</h2>
      </div>
    </section>
  );
};

export default MessagePage;
