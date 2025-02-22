export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  phone: string;
  email: string;
  password: string;
  disabled?: boolean;
  bio?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
  token?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserSignup {
  firstName: string;
  lastName: string;
  profilePicture: string;
  phone: string;
  email: string;
  password: string;
  bio: string;
  location: string;
}
