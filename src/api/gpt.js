import instance from "@/http";
//chat接口
export const chat = (message) => {
  return instance({
    url: "/gpt/chat",
    method: "POST",
    data: {
      message,
    },
    responseType: "stream",
  });
};
export const draw = (prompt) => {
  return instance({
    url: "/gpt/draw",
    method: "POST",
    data: {
      prompt,
    },
  });
};
