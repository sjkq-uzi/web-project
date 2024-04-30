import instance from "@/http";
//修改密码
export const changePassword = (oldPassword, newPassword, id) => {
  return instance({
    url: "/users/changePassword",
    method: "POST",
    data: {
      id,
      oldPassword,
      newPassword,
    },
  });
};
//获取用户信息
export const getUserInfo = (id) => {
  return instance({
    url: "/users/getUserInfo",
    method: "POST",
    data: {
      id,
    },
  });
};
//修改性别
export const changeGender = (id, gender) => {
  return instance({
    url: "/users/changeGender",
    method: "POST",
    data: {
      id,
      gender,
    },
  });
};
//修改邮箱
export const changeEmail = (id, email) => {
  return instance({
    url: "/users/changeEmail",
    method: "POST",
    data: {
      id,
      email,
    },
  });
};
//修改姓名;
export const changeName = (id, name) => {
  return instance({
    url: "/users/changeName",
    method: "POST",
    data: {
      id,
      name,
    },
  });
};
//头像和账号绑定
export const bindAccount = (account, onlyId, url) => {
  return instance({
    url: "/users/bindAccount",
    method: "POST",
    data: {
      onlyId,
      account,
      url,
    },
  });
};
