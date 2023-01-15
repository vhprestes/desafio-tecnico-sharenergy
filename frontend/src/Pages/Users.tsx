import React from "react";
import IClient from "../interfaces/IClient";
import IState from "../interfaces/IState";
import axios from "axios";
import { fetchUsers } from "../API/localAPI";

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
    const form = e.currentTarget;
    const data = new FormData(form);
    const newUser = {
      name: data.get("name") as string,
      email: data.get("email") as string,
      phone: data.get("phone") as string,
      address: data.get("address") as string,
      cpf: data.get("cpf") as string,
    };
    axios.post("http://localhost:3000/users", newUser).then(() => {
      this.updateUsers();
      this.setState({ showForm: false, showFormEdit: false });
    });
  };

  handleEdit = (user: IClient) => {
    axios.get(`http://localhost:3000/users/${user._id}`).then((response) => {
        this.setState({ formData: response.data, showFormEdit: true, showForm: false });
    });
};

  handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const updateUser = {
      name: data.get("name") as string,
      email: data.get("email") as string,
      phone: data.get("phone") as string,
      address: data.get("address") as string,
      cpf: data.get("cpf") as string,
    };
    axios
      .put(`http://localhost:3000/users/${this.state.formData._id}`, updateUser)
      .then(() => {
        this.updateUsers();
        this.setState({ showForm: false, showFormEdit: false, formData: {} as IClient });
      });
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
        <h1>Users</h1>
        <button onClick={() => this.setState({ showForm: true, showFormEdit: false })}>
          Adicionar Novo Usuário
        </button>
        {showForm && (
          <form onSubmit={this.onSubmit}>
            <input type="text" placeholder="Nome" name="name" defaultValue={formData.name}/>
            <input type="email" placeholder="Email" name="email" defaultValue={formData.email}/>
            <input type="text" placeholder="Telefone" name="phone" defaultValue={formData.phone}/>
            <input type="text" placeholder="Endereço" name="address" defaultValue={formData.address}/>
            <input type="text" placeholder="CPF" name="cpf" defaultValue={formData.cpf}/>

            <button type="submit">Adicionar</button>
          </form>
          
        )}
         {showFormEdit && (
          <form onSubmit={this.handleUpdate}>
            <input type="text" placeholder="Nome" name="name" defaultValue={formData.name}/>
            <input type="email" placeholder="Email" name="email" defaultValue={formData.email}/>
            <input type="text" placeholder="Telefone" name="phone" defaultValue={formData.phone}/>
            <input type="text" placeholder="Endereço" name="address" defaultValue={formData.address}/>
            <input type="text" placeholder="CPF" name="cpf" defaultValue={formData.cpf}/>

            <button type="submit">Salvar</button>
          </form>
          
        )}
        <table>
          <thead>
            <tr key="one">
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Endereço</th>
              <th>CPF</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: IClient) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.cpf}</td>
                <td>
                <button onClick={() => this.handleEdit(user)}>Editar</button>
                  <button onClick={() => this.handleDelete(user)}>Delete</button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Users;