import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
export const useAuthStore = defineStore("auth", () => {
  let User = ref(null);
  const fetchUser = async () => {
    try {
      const res = await axios.get("/auth", {
        withCredentials: true,
        headers: { "Cache-Control": "no-cache" },
      });

      User.value = res.data;

      return res;
    } catch (err) {

      if (err.response?.status === 401) {
        User.value = null;
      }

      throw err.response
    }
  };

  const login = async (adminId, password) => {
    try {
      const res = await axios.post(
        "/auth/login",
        { adminId, password },
        { withCredentials: true }
      );
      User.value = res.data;
      return true;
    } catch (err) {
      if (err.response?.status === 401) {
        User.value = null;
        throw new Error(err.response.data);
      }
    }
  };

  const logout = () => {
    try {
      document.cookie = "genghua=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      User.value = null;
      return true;
    } catch (err) {
      return false;
    }
  };
  return { User, fetchUser, login, logout };
});
