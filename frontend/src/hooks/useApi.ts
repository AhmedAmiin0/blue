import { Ref, ref } from "vue";
import apiClient from "@/api/client";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";
import { useNotificationsStore } from "@/store/notifications";

interface ApiResponse<T = any> {
  loading: Ref<boolean>;
  error: Ref<null | any>;
  request: (...args: any[]) => Promise<T>;
  abort: () => void;
}

type ApiFunction = (...args: any[]) => {
  url: string;
  method: string;
  data?: any;
  params?: any;
};

export default function useApi<T = any>(fun: ApiFunction): ApiResponse<T> {
  const loading = ref<boolean>(false);
  const error = ref<null | any>(null);
  const controller = new AbortController();
  const authStore = useAuthStore();
  const notificationStore = useNotificationsStore();
  const router = useRouter();

  const request = async (...data: any[]): Promise<T> => {
    loading.value = true;
    try {
      const response = await apiClient({
        ...fun(...data),
        signal: controller.signal,
      });
      loading.value = false;
      if (
        response?.config?.method &&
        response?.config?.method.toLocaleLowerCase() !== "get"
      ) {
        console.log(response.config.method);
        notificationStore.setSuccessMessage("Success! Action Have Been Done!");
        notificationStore.setErrorMessage("");
      }
      return response.data as T;
    } catch (e: any) {
      loading.value = false;
      error.value = e;
      notificationStore.setErrorMessage(e.response?.data?.message);
      notificationStore.setSuccessMessage("");
      if (e.response?.status === 401) {
        localStorage.removeItem("token");
        authStore.logout();
        router.push("/login");
      }
      throw e;
    }
  };

  const abort = () => {
    controller.abort();
  };

  return { loading, error, request, abort };
}