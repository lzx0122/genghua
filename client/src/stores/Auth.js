import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
const toast = useToast();
export const useAuthStore = defineStore("auth", () => {
  let User = ref(null);
  const fetchUser = async () => {
    try {
      const res = await axios.get("/auth", {
        withCredentials: true,
        headers: { "Cache-Control": "no-cache", "Authorization": `Bearer ${localStorage.getItem('genghua-token') || ""}` },
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

      if (password.length > 8 || adminId.length != 10) {
        toast.error("密碼不可大於8 或 員編錯誤", {
          position: "top-center",
          timeout: 3000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
          rtl: false,
        });
        return false;
      }

      if (password.length < 8) {
        password = password.padEnd(8, "0");
      }

      const res = await axios.post(
        "/auth/login",
        { adminId, password },
        { withCredentials: true }
      );
      User.value = res.data.user;
      localStorage.setItem('genghua-token', res.data.token);

      toast.success(`${User.value?.name} 您好！🫡`, {
        position: "top-center",
        timeout: 3000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
      return true;
    } catch (err) {
      if (err.response?.status === 401) {
        User.value = null;
        toast.error(e.response.data, {
          position: "top-center",
          timeout: 3000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
          rtl: false,
        });
        throw new Error(err.response.data);
      }
    }
  };

  const logout = () => {
    try {
      User.value = null;
      localStorage.removeItem('token');
      toast.success("登出成功 掰掰😩", {
        position: "top-center",
        timeout: 3000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
      return true;
    } catch (err) {
      return false;
    }
  };
  return { User, fetchUser, login, logout };
});
