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
