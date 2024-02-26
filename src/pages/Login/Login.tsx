import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './Login.module.css';

const Login = () => {
  return (
    <section className={styles.container}>
      <LoginForm />
    </section>
  );
};

export default Login;
