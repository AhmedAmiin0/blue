import { IUser } from "@/interfaces/IUser";
import { defineStore } from "pinia";

interface AuthState {
  user: any;
  token: string | null;
}

export const useAuthStore = defineStore({
  id: "auth",
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem("token"),
  }),

  actions: {
    login(data : {token: string, user: IUser}): void {
      this.token = data.token;
      this.user =  data.user;
      localStorage.setItem("token", data.token);
    },
    logout(): void {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
    },
  },
});