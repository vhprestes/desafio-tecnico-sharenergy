import { render, fireEvent } from '@testing-library/react';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  it('has the correct initial state', () => {
    const { getByLabelText } = render(<LoginPage />);
    expect(getByLabelText('Nome de usuário:').value).toBe('');
    expect(getByLabelText('Senha:').value).toBe('');
    expect(getByLabelText('Lembre-me:').checked).toBe(false);
  });

  it('updates the username field in the state', () => {
    const { getByLabelText } = render(<LoginPage />);
    fireEvent.change(getByLabelText('Nome de usuário:'), {
      target: { value: 'desafiosharenergy' },
    });
    expect(getByLabelText('Nome de usuário:').value).toBe('desafiosharenergy');
  });

  it('updates the password field in the state', () => {
    const { getByLabelText } = render(<LoginPage />);
    fireEvent.change(getByLabelText('Senha:'), {
      target: { value: 'sh@r3n3rgy' },
    });
    expect(getByLabelText('Senha:').value).toBe('sh@r3n3rgy');
  });

  it('updates the rememberMe field in the state', () => {
    const { getByLabelText } = render(<LoginPage />);
    fireEvent.click(getByLabelText('Lembre-me:'));
    expect(getByLabelText('Lembre-me:').checked).toBe(true);
  });

  it('authenticates the user if the correct username and password are provided', () => {
    const { getByLabelText, getByText } = render(<LoginPage />);
    fireEvent.change(getByLabelText('Nome de usuário:'), {
      target: { value: 'desafiosharenergy' },
    });
    fireEvent.change(getByLabelText('Senha:'), {
      target: { value: 'sh@r3n3rgy' },
    });
    fireEvent.click(getByText('Entrar'));
    expect(getByText('Bem-vindo, desafiosharenergy!')).toBeInTheDocument();
  });
});