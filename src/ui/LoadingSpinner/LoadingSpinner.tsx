import { Circles } from 'react-loader-spinner';

import styles from './LoadingSpinner.module.css';

type LoadingSpinnerProps = {
  loading: boolean;
};

const LoadingSpinner = ({ loading }: LoadingSpinnerProps) => {
  return (
    <div className={styles.spinner}>
      <Circles visible={loading} color="#ff4500" />
    </div>
  );
};

export default LoadingSpinner;
