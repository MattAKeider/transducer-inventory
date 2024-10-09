import { Circles } from 'react-loader-spinner';

import styles from './LoadingSpinner.module.css';

interface Props {
  loading: boolean;
}

const LoadingSpinner = ({ loading }: Props) => {
  return (
    <div className={styles.spinner}>
      <Circles visible={loading} color="#ff4500" />
    </div>
  );
};

export default LoadingSpinner;
