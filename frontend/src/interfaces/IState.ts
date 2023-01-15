import IClient from './IClient';

export default interface IState {
  users: IClient[];
  showForm: boolean;
  formData: IClient;
  showFormEdit: boolean;
}