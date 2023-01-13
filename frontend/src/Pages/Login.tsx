import React from 'react';

interface LoginState {
  username: string;
  password: string;
  rememberMe: boolean;
}

class LoginPage extends React.Component<{}, LoginState> {
  state: LoginState = {
    username: '',
    password: '',
    rememberMe: false,
  };

  handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  };

  handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ rememberMe: event.target.checked });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (this.state.username === 'desafiosharenergy' && this.state.password === 'sh@r3n3rgy') {
      // Autenticação bem-sucedida
      if (this.state.rememberMe) {
        // Armazena username e password no localStorage
        localStorage.setItem('username', this.state.username);
        localStorage.setItem('password', this.state.password);
      } else {
        // Remove username e password do localStorage
        localStorage.removeItem('username');
        localStorage.removeItem('password');
      }
    } else {
      // Autenticação falhou
      alert('Nome de usuário ou senha incorretos');
    }
  };

  componentDidMount() {
    // Verifica se o username e password estão armazenados no localStorage
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    if (username && password) {
      // Preenche o formulário com o username e password armazenados
      this.setState({
        username: username,
        password: password,
        rememberMe: true,
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Nome de usuário:
          <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
        </label>
        <br />
        <label>
          Senha:
          <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
        </label>
        <br />
        <label>
          Lembre-me:
          <input type="checkbox" checked={this.state.rememberMe} onChange={this.handleRememberMeChange} />
        </label>
        <br />
        <input type="submit" value="Entrar" />
      </form>
    );
  }
}

export default LoginPage