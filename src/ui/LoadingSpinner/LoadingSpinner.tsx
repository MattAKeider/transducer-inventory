import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={styles.loading_spinner_overlay}>
      <div className={styles.loading_spinner}></div>
    </div>
  );
};

export default LoadingSpinner;
