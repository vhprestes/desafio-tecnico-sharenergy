import { IUser } from "../interfaces/IUser";

class User {
  protected name : string;
  protected email : string;
  protected password : string;
  // protected id : string;

  constructor(user : IUser) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    // this.id = user.id;
  }

  public getName() : string {
    return this.name;
  }
  public getEmail() : string {
    return this.email;
  }
  public getPassword() : string {
    return this.password;
  }
  public setName(name : string) : void {
    this.name = name;
  }
  public setEmail(email : string) : void {
    this.email = email;
  }
  public setPassword(password : string) : void {
    this.password = password;
  }
}

export default User;