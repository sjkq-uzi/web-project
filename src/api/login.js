import instance from "@/http";
//注册接口
export const register = (data) => {
  const { account, password } = data;
  return instance({
    url: "/api/register",
    method: "POST",
    data: {
      account,
      password,
    },
  });
};
//登录接口
export const login = (data) => {
  const { account, password } = data;
  return instance({
    url: "/api/login",
    method: "POST",
    data: {
      account,
      password,
    },
  });
};
//忘记密码验证账号邮箱
export const verifyAccount = (data) => {
  const { account, email } = data;
  return instance({
    url: "/users/verifyAccountAndEmail",
    method: "POST",
    data: {
      account,
      email,
    },
  });
};
//忘记密码重置密码
export const resetPassword = (id, newPassword) => {
  return instance({
    url: "/users/changePasswordLogin",
    method: "POST",
    data: {
      id,
      newPassword,
    },
  });
};
