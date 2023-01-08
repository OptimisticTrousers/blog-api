import mongoose from "mongoose";

export type UserInterface = mongoose.Document & {
  id: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface MyRequest {
  user: UserInterface;
  logout: any;
  login: any;
}
