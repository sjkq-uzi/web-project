import { defineStore } from "pinia";
import { getUserInfo } from "@/api/userInfo";
import { ref } from "vue";
// 第一个参数是应用程序中store的唯一 id
// export const useUserInfo = defineStore(
//   "userInfo",
//   {
//     state: () => {
//       return {
//         imageUrl: "",
//         name: "",
//         gender: "",
//         department: "",
//         email: "",
//         identity: "",
//         account: "",
//       };
//     },
//     actions: {
//       async userInfo(id) {
//         const res = await getUserInfo(id);
//         console.log("res=", res);
//         this.imageUrl = res.data.image_url;
//         this.name = res.data.name;
//         this.gender = res.data.sex;
//         this.department = res.data.department;
//         this.email = res.data.email;
//         this.identity = res.data.identity;
//         this.account = res.data.account;
//       },
//     },
//   },
//   {
//     //配置数据持久化
//     persist: {
//       enabled: true, // 是否开启数据缓存
//       key: "userInfo", // 缓存数据的唯一标识
//       storage: localStorage,
//     },
//   }
// );
export const useUserInfo = defineStore(
  "userInfo",
  () => {
    let imageUrl = ref("");
    let name = ref("");
    let gender = ref("");
    let department = ref("");
    let email = ref("");
    let identity = ref("");
    let account = ref("");

    async function userInfo(id) {
      const res = await getUserInfo(id);
      console.log("res=", res);
      imageUrl.value = res.data.image_url;
      name.value = res.data.name;
      gender.value = res.data.sex;
      department.value = res.data.department;
      email.value = res.data.email;
      identity.value = res.data.identity;
      account.value = res.data.account;
    }
    return {
      imageUrl,
      name,
      gender,
      department,
      email,
      identity,
      account,
      userInfo,
    };
  },
  {
    enabled: true, // 是否开启数据缓存
    key: "userInfo", // 缓存数据的唯一标识
    storage: localStorage,
  }
);
