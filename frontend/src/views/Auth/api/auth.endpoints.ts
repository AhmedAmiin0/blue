import { IUser } from "@/interfaces/IUser";

export const loginRequest = (data:Pick<IUser,'email'|'password'>) => ({
  method: "post",
  url: "/auth/login",
  data,
});
export const registerRequest = (data:Pick<IUser,'name'|'email'|'password'> & {password_confirmation:string} ) => ({
  method: "post",
  url: "/auth/register",
  data,
});

