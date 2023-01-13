import * as React from 'react';

interface UserProps {
  user: {
    name: {
      title: string;
      first: string;
      last: string;
    };
    email: string;
    username: string;
    age: number;
    picture: {
      medium: string;
    };
  };
}

const User: React.FC<UserProps> = ({ user }) => (
  <div>
    <img
      src={user.picture.medium}
      alt={`${user.name.first} ${user.name.last}`}
    />
    <div>
      <h3>
        {user.name.title} {user.name.first} {user.name.last}
      </h3>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      <p>Idade: {user.age}</p>
    </div>
  </div>
);
export default User;
