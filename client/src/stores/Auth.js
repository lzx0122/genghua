import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
export const useAuthStore = defineStore("auth", () => {
  let User = ref(null);
  const fetchUser = () => {
    try {
      const res = axios.get("/auth");
      User.value = res.data;
    } catch (err) {
      if (err.response?.status === 401) {
        User.value = null;
      }
    }
  };

  const login = (adminId, password) => {
    try {
      const res = axios.post("/auth/login", { adminId, password });
      User.value = res.data;
    } catch (err) {
      if (err.response?.status === 401) {
        User.value = null;
      }
    }
  };
  return { User, fetchUser, login };
});
