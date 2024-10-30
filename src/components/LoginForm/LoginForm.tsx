import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoadingSpinner from '../../ui/LoadingSpinner/LoadingSpinner';
import { UserContext } from '../../context/UserContext';
import { passwordsAreEqual } from '../../utils/validation';
import Button from '../../ui/Button/Button';
import Card from '../../ui/Card/Card';
import useHttp from '../../hooks/useHttp';
import ErrorMessage from '../../ui/ErrorMessage/ErrorMessage';
import Input from '../../ui/Input/Input';
import styles from './LoginForm.module.css';

interface User {
  username?: string;
  email: string;
  password: string;
}

const LoginForm = () => {
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { isLoading, error, setError, sendRequest } = useHttp();
  const { login } = useContext(UserContext);

  const navigate = useNavigate();

  const [fields, setFields] = useState({
    username: '',
    email: '',
    password: '',
    confirm: '',
  });

  const handleChangeFields = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
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

    setError(null);
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

      if (!passwordsAreEqual(fields.password, fields.confirm)) {
        setError(new Error('Passwords must match!'));
        return;
      }

      const responseData = await sendRequest(
        `${import.meta.env.VITE_API_URL}/users/signup`,
        'POST',
        JSON.stringify(userData),
        {
          'Content-Type': 'application/json',
        }
      );

      if (responseData) {
        login(responseData.token, null, responseData.username);
        navigate('/');
      }
    } else if (!isNewUser) {
      const userData: User = {
        email: fields.email,
        password: fields.password,
      };

      const responseData = await sendRequest(
        `${import.meta.env.VITE_API_URL}/users/login`,
        'POST',
        JSON.stringify(userData),
        {
          'Content-Type': 'application/json',
        }
      );

      if (responseData) {
        login(responseData.token, null, responseData.username);
        navigate('/');
      }
    }
  };

  return (
    <>
      <LoadingSpinner loading={isLoading} />
      <Card>
        <h2 className={styles.title}>{isNewUser ? 'Create User' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          {isNewUser && (
            <Input 
              className={styles.field} 
              name='username' 
              value={fields.username} 
              onChange={handleChangeFields} 
              label='Username:' 
              required 
            />
          )}
          <Input 
            className={styles.field} 
            type='email'
            name='email' 
            value={fields.email} 
            onChange={handleChangeFields} 
            label='Email:' 
            required 
          />
          <Input 
            className={styles.field} 
            type={showPassword ? 'text' : 'password'}
            name='password' 
            value={fields.password} 
            onChange={handleChangeFields} 
            onDoubleClick={handleShowPassword}
            label='Password:' 
            required 
            pattern='(?=.*?[#?!@$%^&*\-])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}'
            title='Must contain an uppercase letter, number, and special character'
          />
          {isNewUser && (
            <Input 
              className={styles.field} 
              type={showPassword ? 'text' : 'password'}
              name='confirm' 
              value={fields.confirm} 
              onChange={handleChangeFields} 
              onDoubleClick={handleShowPassword}
              label='Confirm Password:' 
              required 
              pattern='(?=.*?[#?!@$%^&*\-])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}'
              title='Must contain an uppercase letter, number, and special character'
            />
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
            <Button onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
        {!isLoading && error && (
          <ErrorMessage errorMessage={error.message} />
        )}
      </Card>
    </>
  );
};

export default LoginForm;
