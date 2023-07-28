import { defineStore } from "pinia";

interface NotificationsState {
  successMessage: string;
  errorMessage: string;
}

export const useNotificationsStore = defineStore({
  id: "notifications",
  state: (): NotificationsState => ({
    successMessage: "",
    errorMessage: "",
  }),
  actions: {
    setSuccessMessage(message: string): void {
      this.successMessage = message;
    },
    setErrorMessage(message: string): void {
      this.errorMessage = message;
    },
  },
});