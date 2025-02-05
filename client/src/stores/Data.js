import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
export const useDataStore = defineStore("data", () => {
  const Title = ref("");
  const UserSearchData = ref(null);
  const AdminSearchUsersData = ref(null)
  const ToggleMenu = ref(false);

  const GetUserSearchData = async (account) => {
    try {
      let res = await axios.get(`/coffee/user/${account}`, {
        headers: { "Cache-Control": "no-cache" },
        withCredentials: true,
      });

      UserSearchData.value = res.data;
      return true;
    } catch (err) {
      throw err.response.data

    }
  };

  const GetAdminSearchUserDataByDate = async (date) => {
    try {
      let res = await axios.get(`/coffee/admin/users/date/${date}`, {
        headers: { "Cache-Control": "no-cache" },
        withCredentials: true,
      });

      AdminSearchUsersData.value = res.data;
      return true;
    } catch (err) {
      throw err.response.data
    }
  }

  const GetAdminSearchUserDataByAccount = async (account) => {
    try {
      let res = await axios.get(`/coffee/admin/user/account/${account}`, {
        headers: { "Cache-Control": "no-cache" },
        withCredentials: true,
      });

      AdminSearchUsersData.value = [res.data];
      return true;
    } catch (err) {
      throw err.response.data
    }
  }

  return {
    Title,
    UserSearchData,
    GetUserSearchData,
    ToggleMenu,
    AdminSearchUsersData,
    GetAdminSearchUserDataByAccount,
    GetAdminSearchUserDataByDate
  };
});
