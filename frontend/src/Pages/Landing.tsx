import * as React from 'react';
import axios from 'axios';
import {
  Button,
} from '@mui/material';

import User from '../Components/User';
import '../App.css'

interface User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  login: {
    uuid: string;
    username: string;
  };
  dob: {
    age: number;
  };
  picture: {
    large: string;
  };
}

interface AppState {
  users: User[];
  loading: boolean;
  error: boolean;
  searchTerm: string;
  currentPage: number;
  searchCategory: string;
}

const USERS_PER_PAGE = 100;

class RandomUser extends React.Component<{}, AppState> {
  state: AppState = {
    users: [],
    loading: false,
    error: false,
    searchTerm: '',
    currentPage: 1,
    searchCategory: 'name',
  };

  componentDidMount() {
    this.fetchUsers();
  }

  async fetchUsers() {
    this.setState({ loading: true });
    try {
      const response = await axios.get(
        `https://randomuser.me/api/?results=${USERS_PER_PAGE}&page=${
          this.state.currentPage
        }&seed=${'shareenergy'}`
      );
      this.setState({ users: response.data.results });
    } catch (error) {
      console.log(error);
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  }

  filterUsers = (users: User[], searchCategory: string, searchTerm: string) => {
    return users.filter((user) => {
      if (searchCategory === 'name') {
        return (
          user.name.first.includes(searchTerm) ||
          user.name.last.includes(searchTerm)
        );
      } else if (searchCategory === 'age') {
        return String(user.dob.age).includes(searchTerm);
      } else if (searchCategory === 'login') {
        return user.login.username.includes(searchTerm);
      } else {
        // Pesquisa Manual
        return (
          user.name.first.includes(searchTerm) ||
          user.name.last.includes(searchTerm) ||
          String(user.dob.age).includes(searchTerm) ||
          user.login.username.includes(searchTerm)
        );
      }
    });
  };

  async searchUsers() {
    this.setState({ loading: true });
    try {
      const filteredUsers = this.filterUsers(
        this.state.users,
        this.state.searchCategory,
        this.state.searchTerm
      );
      this.setState({ users: filteredUsers });
    } catch (error) {
      console.log(error);
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  }

  isSearchbuttonDisabled = () => {
    return !this.state.searchTerm;
  };

  handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ searchCategory: event.target.value });
  };

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // this.setState({ currentPage: 1 });
    this.searchUsers();
  };

  handleNextPage = () => {
    this.setState(
      (prevState) => ({ currentPage: prevState.currentPage + 1 }),
      () => {
        this.fetchUsers();
      }
    );
  };

  handlePrevPage = () => {
    this.setState(
      (prevState) => ({ currentPage: prevState.currentPage - 1 }),
      () => {
        this.fetchUsers();
      }
    );
  };

  render() {
    const { users, loading, error, searchTerm } = this.state;

    if (error) {
      return <div>Ocorreu um erro ao carregar os usuários</div>;
    }

    if (loading) {
      return <div>Carregando...</div>;
    }

    return (
      <div>
        <Button onClick={this.handlePrevPage}>Página Anterior</Button>
        <Button onClick={this.handleNextPage}>Próxima Página</Button>
        <form onSubmit={this.handleSearchSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={this.handleSearchChange}
          />
          <select onChange={this.handleCategoryChange}>
            <option value="name">Nome</option>
            <option value="age">Idade</option>
            <option value="login">Login</option>
            <option value="email">Email</option>
          </select>
          <Button type="submit" disabled={this.isSearchbuttonDisabled()}>
            Pesquisar
          </Button>
        </form>
        {users.map((user) => (
          <User
            user={{
              ...user,
              username: user.login.username,
              age: user.dob.age,
            }}
            key={user.email}
          />
        ))}
                  <footer className='footer'>
          <a href='/landing'><Button>Clients Page</Button></a>
          <a href='/random'><Button>Random User Page</Button></a>
          <a href='/cats'><Button>Cats Page</Button></a>
        </footer>
      </div>
    );
  }
}

export default RandomUser;
