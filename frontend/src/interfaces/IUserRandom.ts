export default interface IUserRandom {
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
