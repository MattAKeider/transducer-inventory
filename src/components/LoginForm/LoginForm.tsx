import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext, UserContextType } from '../../context/user-context';
import Button from '../../ui/Button/Button';
import Card from '../../ui/Card/Card';
import styles from './LoginForm.module.css';

interface User {
  username: string;
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();

  const { isNewUser, switchForm } = useContext<UserContextType>(UserContext);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleChangeConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirm(event.target.value);
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userData: User = {
      username,
      email,
      password
    };

    console.log(userData);

    navigate('/');
  };

  return (
    <Card>
      <div className={styles.form_container}>
        <h2 className={styles.title}>{isNewUser ? 'Create User' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          {isNewUser && <div className={styles.field}> 
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required value={username} onChange={handleChangeUsername}/>
          </div>}
          <div className={styles.field}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required value={email} onChange={handleChangeEmail}/>
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required value={password} onChange={handleChangePassword}/>
          </div>
          {isNewUser && <div className={styles.field}>
            <label htmlFor="confirm">Confirm Password:</label>
            <input type="password" id="confirm" name="confirm" required value={confirm} onChange={handleChangeConfirm}/>
          </div>}
          {isNewUser && <p className={styles.switch_text}>Already a user? <span onClick={switchForm}>Login</span></p>}
          {!isNewUser && <p className={styles.switch_text}>Not a user? <span onClick={switchForm}>Signup</span></p>}
          <div className={styles.form_actions}>
            <Button type="button" onClick={handleCancel}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default LoginForm;