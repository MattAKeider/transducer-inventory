import { Circles } from 'react-loader-spinner';

import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps extends React.AllHTMLAttributes<HTMLDivElement> {
  loading: boolean;
};

const LoadingSpinner = ({ loading, ...props }: LoadingSpinnerProps) => {
  return (
    <div className={`${styles.loading_spinner_overlay} ${props.className}`} {...props}>
      <Circles visible={loading} color='orangered'/>
    </div>
  );
};

export default LoadingSpinner;
