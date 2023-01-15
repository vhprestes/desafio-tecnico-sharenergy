import React from 'react';
import IClient from '../interfaces/IClient';
import IState from '../interfaces/IState';
import axios from 'axios';
import { fetchUsers } from '../API/localAPI';
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { validateUpdateUser } from '../utils/Uservalidation';

class Users extends React.Component<{}, IState> {
  state = {
    users: [],
    showForm: false,
    formData: {} as IClient,
    showFormEdit: false,
  };

  updateUsers() {
    fetchUsers().then((response) => {
      this.setState({ users: response.data });
    });
  }

  componentDidMount() {
    this.updateUsers();
  }

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
    const form = e.currentTarget;
    const data = new FormData(form);
    const newUser = {
      name: data.get('name') as string,
      email: data.get('email') as string,
      phone: data.get('phone') as string,
      address: data.get('address') as string,
      cpf: data.get('cpf') as string,
    };
    validateUpdateUser(newUser)
    axios.post('http://localhost:3000/users', newUser).then(() => {
      this.updateUsers();
      this.setState({ showForm: false, showFormEdit: false });
    });
    } catch (error) {
      console.log(error);
      alert('Erro ao cadastrar usuário - Verifique os dados inseridos');
    }
  };

  handleEdit = (user: IClient) => {
    axios.get(`http://localhost:3000/users/${user._id}`).then((response) => {
      this.setState({
        formData: response.data,
        showFormEdit: true,
        showForm: false,
      });
    });
  };

  handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
    const form = e.currentTarget;
    const data = new FormData(form);
    const updateUser = {
      name: data.get('name') as string,
      email: data.get('email') as string,
      phone: data.get('phone') as string,
      address: data.get('address') as string,
      cpf: data.get('cpf') as string,
    };
    axios
      .put(`http://localhost:3000/users/${this.state.formData._id}`, updateUser)
      .then(() => {
        this.updateUsers();
        this.setState({
          showForm: false,
          showFormEdit: false,
          formData: {} as IClient,
        });
      }).catch((error) => {
        alert(error.response.data.message);
      });
    } catch (error) {
      console.log(error);
    }
  };

  handleDelete = (user: IClient) => {
    axios.delete(`http://localhost:3000/users/${user._id}`).then((response) => {
      this.updateUsers();
    });
  };

  render() {
    const { users, showForm, formData, showFormEdit } = this.state;

    return (
      <div>
        <h1>Usuários do Sistema</h1>
        <Button
          onClick={() => this.setState({ showForm: true, showFormEdit: false })}
        >
          Adicionar Novo Usuário
        </Button>
        {showForm && (
          <form onSubmit={this.onSubmit}>
            <TextField
              variant="outlined"
              type="text"
              placeholder="Nome"
              name="name"
              defaultValue={formData.name}
            />
            <TextField
              variant="outlined"
              type="email"
              placeholder="Email"
              name="email"
              defaultValue={formData.email}
            />
            <TextField
              variant="outlined"
              type="text"
              placeholder="Telefone"
              name="phone"
              defaultValue={formData.phone}
            />
            <TextField
              variant="outlined"
              type="text"
              placeholder="Endereço"
              name="address"
              defaultValue={formData.address}
            />
            <TextField
              variant="outlined"
              type="text"
              placeholder="CPF"
              name="cpf"
              defaultValue={formData.cpf}
            />

            <Button type="submit" variant="contained" color="primary">
              Adicionar
            </Button>
          </form>
        )}
        {showFormEdit && (
          <form onSubmit={this.handleUpdate}>
            <TextField
              variant="outlined"
              type="text"
              placeholder="Nome"
              name="name"
              defaultValue={formData.name}
            />
            <TextField
              variant="outlined"
              type="email"
              placeholder="Email"
              name="email"
              defaultValue={formData.email}
            />
            <TextField
              variant="outlined"
              type="text"
              placeholder="Telefone"
              name="phone"
              defaultValue={formData.phone}
            />
            <TextField
              variant="outlined"
              type="text"
              placeholder="Endereço"
              name="address"
              defaultValue={formData.address}
            />
            <TextField
              variant="outlined"
              type="text"
              placeholder="CPF"
              name="cpf"
              defaultValue={formData.cpf}
            />

            <Button type="submit" variant="contained" color="primary">
              Salvar
            </Button>
          </form>
        )}
        <Table>
          <TableHead>
            <TableRow key="one">
            <TableCell>Nome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell>Endereço</TableCell>
            <TableCell>CPF</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: IClient) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.cpf}</TableCell>
                <TableCell>
                <Button
            variant="contained"
            color="primary"
            onClick={() => this.handleEdit(user)}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => this.handleDelete(user)}
          >
            Excluir
          </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Users;
