let text = "";
const func = async () => {
  const response = await window.versions.ping();
  text = response;
  console.log(response); // 打印 'pong'
};
func();
const information = document.getElementById("info");
information.innerText = `本应用正在使用 Chrome (v${versions.chrome()},${text}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`;
