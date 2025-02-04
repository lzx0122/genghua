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
      console.error(err);
      if (err.response?.status === 401) {
        User.value = null;
      }
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

  const logout = async () => {
    try {
      await axios.get("/auth/logout", {
        headers: { "Cache-Control": "no-cache" },
        withCredentials: true,
      });

      User.value = null;
      return true;
    } catch (err) {
      return false;
    }
  };
  return { User, fetchUser, login, logout };
});
