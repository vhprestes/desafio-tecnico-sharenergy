import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginState {
  username: string;
  password: string;
  rememberMe: boolean;
}

const LoginPage: React.FC = () => {
  const [loginState, setLoginState] = useState<LoginState>({
    username: '',
    password: '',
    rememberMe: false,
  });
  const navigate = useNavigate();


  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState({ ...loginState, username: event.target.value });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState({ ...loginState, password: event.target.value });
  };

  const handleRememberMeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoginState({ ...loginState, rememberMe: event.target.checked });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      loginState.username === 'desafiosharenergy' &&
      loginState.password === 'sh@r3n3rgy'
    ) {
      // Autenticação bem-sucedida
      if (loginState.rememberMe) {
        // Armazena username e password no localStorage
        localStorage.setItem('username', loginState.username);
        localStorage.setItem('password', loginState.password);
      } else {
        // Remove username e password do localStorage
        localStorage.removeItem('username');
        localStorage.removeItem('password');
      }
      navigate('/random');
    } else {
      // Autenticação falhou
      alert('Nome de usuário ou senha incorretos');
    }
  };

  const mount = () => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    if (username && password) {
      setLoginState({
        username: username,
        password: password,
        rememberMe: true,
      });
    }
  };

  React.useEffect(() => {
    mount();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome de usuário:
        <input
          type="text"
          value={loginState.username}
          onChange={handleUsernameChange}
        />
      </label>
      <br />
      <label>
        Senha:
        <input
          type="password"
          value={loginState.password}
          onChange={handlePasswordChange}
        />
      </label>
      <br />
      <label>
        Lembre-me:
        <input
          type="checkbox"
          checked={loginState.rememberMe}
          onChange={handleRememberMeChange}
        />
      </label>
      <br />
      <input type="submit" value="Entrar" />
    </form>
  );
};

export default LoginPage;
