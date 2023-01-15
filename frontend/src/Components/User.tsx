import * as React from 'react';
import {
  Card,
  Box,
  CardContent,
  Typography
} from '@mui/material';

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
      large: string;
    };
  };
}

const User: React.FC<UserProps> = ({ user }) => (
  <Card>
    <CardContent>
    <img
    style={{ margin: 40, borderRadius: '50%' }}
     src={`${user.picture.large}`}
      title={`${user.name.first} ${user.name.last}`}
    />
      <Typography variant="h5">
        {user.name.title} {user.name.first} {user.name.last}
      </Typography>
      <Typography variant="subtitle1">Email: {user.email}</Typography>
      <Typography variant="subtitle1">Username: {user.username}</Typography>
      <Typography variant="subtitle1">Idade: {user.age}</Typography>
    </CardContent>
  </Card>
);

export default User;