import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
export const useDataStore = defineStore("data", () => {
  const Title = ref("");
  const UserSearchData = ref(null);

  const GetUserSearchData = async (account) => {
    try {
      let res = await axios.get(`/coffee/user/${account}`, {
        headers: { "Cache-Control": "no-cache" },
        withCredentials: true,
      });

      UserSearchData.value = res.data;
      return true;
    } catch (err) {
      return false;
    }
  };
  return { Title, UserSearchData, GetUserSearchData };
});
