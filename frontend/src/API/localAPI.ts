import axios from "axios";

export const fetchLocalAPI = async (
  path: string,
  options: RequestInit = {}
) => {
  const url = new URL(path, 'http://localhost:3000/users');
  try {
  const response = await fetch(url.toString(), options)
    .then((res) => res.json())
    // .then((users) => {
    //   return users;
    // });
    return response;
  } catch (error) {
    console.log(error);
    return { error: 'An error occurred while fetching.' };
  }
  
};


export const fetchUsers = async () => {
  const response = await axios.get("http://localhost:3000/users");
  return response;
};