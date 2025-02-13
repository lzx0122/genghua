import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
const toast = useToast();
export const useDataStore = defineStore("data", () => {
  const Title = ref("");
  const UserSearchData = ref(null);
  const AdminSearchUsersData = ref(null);
  const ToggleMenu = ref(false);
  const ItemData = ref(null);

  const GetUserSearchData = async (account) => {
    try {
      if (account.length < 10 || !/^09[0-9]{8}$/.test(account)) {
        toast.error("電話號碼格式錯誤", {
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
        return;
      }
      let res = await axios.get(`/coffee/user/${account}`, {
        headers: { "Cache-Control": "no-cache" },
        withCredentials: true,
      });

      UserSearchData.value = res.data;
      return true;
    } catch (err) {
      toast.error(err.response.data, {
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
    }
  };

  const GetAdminSearchUserDataByDate = async (date) => {
    try {
      let res = await axios.get(`/coffee/admin/users/date/${date}`, {
        headers: {
          "Cache-Control": "no-cache",
          Authorization: `Bearer ${
            localStorage.getItem("genghua-token") || ""
          }`,
        },
        withCredentials: true,
      });

      AdminSearchUsersData.value = res.data;
      return true;
    } catch (err) {
      toast.error(err.response.data, {
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
    }
  };

  const GetAdminSearchUserDataByAccount = async (account) => {
    try {
      if (account.length < 10 || !/^09[0-9]{8}$/.test(account)) {
        toast.error("電話號碼格式錯誤", {
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
      let res = await axios.get(`/coffee/admin/user/account/${account}`, {
        headers: {
          "Cache-Control": "no-cache",
          Authorization: `Bearer ${
            localStorage.getItem("genghua-token") || ""
          }`,
        },
        withCredentials: true,
      });

      AdminSearchUsersData.value = [res.data];
      return true;
    } catch (err) {
      toast.error(err.response.data, {
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
    }
  };

  const AddUser = async (userData) => {
    if (
      userData.name.trim().length <= 0 ||
      !/^09[0-9]{8}$/.test(userData.account) ||
      userData.date.length == 0
    ) {
      toast.error("請檢查 名稱、電話、生日 是否正確", {
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

    try {
      await axios.post(
        "/coffee/admin/user",
        { ...userData },
        {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            Authorization: `Bearer ${
              localStorage.getItem("genghua-token") || ""
            }`,
          },
        }
      );

      toast.success("新增成功", {
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
    } catch (err) {
      if (err.response?.status === 500) {
        toast.error(err.response.data, {
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
      }
    }
  };

  const AddKeep = async (keepData) => {
    try {
      await axios.post(
        "/coffee/admin/keep",
        { ...keepData },
        {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            Authorization: `Bearer ${
              localStorage.getItem("genghua-token") || ""
            }`,
          },
        }
      );

      toast.success("新增成功", {
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
    } catch (err) {
      if (err.response?.status === 500) {
        toast.error(err.response.data, {
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
      }
    }
  };

  const GetItemData = async () => {
    try {
      let res = await axios.get("/coffee/item");

      ItemData.value = res.data;
    } catch (err) {
      if (err.response?.status === 500) {
        toast.error(err.response.data, {
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
      }
    }
  };

  const AddKeepPickup = async (id, amount) => {
    try {
      await axios.post(
        `/coffee/admin/keep/pickup/${id}`,
        { amount: amount },
        {
          headers: {
            "Cache-Control": "no-cache",
            Authorization: `Bearer ${
              localStorage.getItem("genghua-token") || ""
            }`,
          },
          withCredentials: true,
        }
      );

      toast.success("領取成功", {
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
    } catch (err) {
      if (err.response?.status === 500) {
        toast.error(err.response.data, {
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
      }
    }
  };

  const GetKeepById = async (id) => {
    try {
      let res = await axios.get(
        `/coffee/admin/keep/${id}`,
        { amount: amount },
        {
          headers: {
            "Cache-Control": "no-cache",
            Authorization: `Bearer ${
              localStorage.getItem("genghua-token") || ""
            }`,
          },
          withCredentials: true,
        }
      );

      return res.data;
    } catch (err) {
      if (err.response?.status === 500) {
        toast.error(err.response.data, {
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
      }
    }
  };

  return {
    Title,
    UserSearchData,
    GetUserSearchData,
    ToggleMenu,
    AdminSearchUsersData,
    GetAdminSearchUserDataByAccount,
    GetAdminSearchUserDataByDate,
    AddUser,
    GetItemData,
    ItemData,
    AddKeepPickup,
    AddKeep,
    GetKeepById,
  };
});
