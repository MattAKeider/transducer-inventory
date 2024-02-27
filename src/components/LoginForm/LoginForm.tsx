import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoadingSpinner from '../../ui/LoadingSpinner/LoadingSpinner';
import { UserContext } from '../../context/user-context';
import { passwordsAreEqual } from '../../utils/validation';
import Button from '../../ui/Button/Button';
import Card from '../../ui/Card/Card';
import useHttp from '../../hooks/useHttp';
import styles from './LoginForm.module.css';

interface User {
  username?: string;
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();

  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { isLoading, isError, sendRequest } = useHttp();
  const { login } = useContext(UserContext);

  const [fields, setFields] = useState({
    username: '',
    email: '',
    password: '',
    confirm: '',
  });

  const handleChangeFields = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    setFields((prevState) => {
      const field = event.target.name;
      return {
        ...prevState,
        [field]: event.target.value,
      };
    });
  };

  const handleSwitchForm = () => {
    setFields({
      username: '',
      email: '',
      password: '',
      confirm: '',
    });

    setErrorMessage(null);
    setIsNewUser((prevState) => !prevState);
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isNewUser) {
      const userData: User = {
        username: fields.username,
        email: fields.email,
        password: fields.password,
      };

      try {
        if (!passwordsAreEqual(fields.password, fields.confirm)) {
          throw new Error('Passwords must match!');
        }

        const responseData = await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          JSON.stringify(userData),
          {
            'Content-Type': 'application/json',
          }
        );

        login(responseData.token);
        navigate('/');
      } catch (error) {
        setErrorMessage(error.message);
        console.log(error);
      }
    } else if (!isNewUser) {
      const userData: User = {
        email: fields.email,
        password: fields.password,
      };

      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/login',
          'POST',
          JSON.stringify(userData),
          {
            'Content-Type': 'application/json',
          }
        );

        login(responseData.token);
        navigate('/');
      } catch (error) {
        setErrorMessage(error.message);
        console.log(error);
      }
    }
  };

  return (
    <>
      <LoadingSpinner loading={isLoading} />
      <Card>
        <div className={styles.form_container}>
          <h2 className={styles.title}>
            {isNewUser ? 'Create User' : 'Login'}
          </h2>
          <form onSubmit={handleSubmit}>
            {isNewUser && (
              <div className={styles.field}>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  value={fields.username}
                  onChange={handleChangeFields}
                />
              </div>
            )}
            <div className={styles.field}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={fields.email}
                onChange={handleChangeFields}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="password">Password:</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                required
                pattern="(?=.*?[#?!@$%^&*-])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                value={fields.password}
                onChange={handleChangeFields}
                onDoubleClick={handleShowPassword}
                title="Double-click to show!"
              />
            </div>
            {isNewUser && (
              <div className={styles.field}>
                <label htmlFor="confirm">Confirm Password:</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirm"
                  name="confirm"
                  required
                  value={fields.confirm}
                  onChange={handleChangeFields}
                  onDoubleClick={handleShowPassword}
                  title="Double-click to show!"
                />
              </div>
            )}
            {isNewUser && (
              <p className={styles.switch_text}>
                Already a user? <span onClick={handleSwitchForm}>Login</span>
              </p>
            )}
            {!isNewUser && (
              <p className={styles.switch_text}>
                Not a user? <span onClick={handleSwitchForm}>Signup</span>
              </p>
            )}
            <div className={styles.form_actions}>
              <Button type="button" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
          {!isLoading && isError && (
            <p className={styles.error}>{errorMessage}</p>
          )}
        </div>
      </Card>
    </>
  );
};

export default LoginForm;
