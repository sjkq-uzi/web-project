import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
const model = require("@/assets/models/Parrot.glb");
async function loadThree(option) {
  //初始化加载器，加载glb文件
  const loader = new GLTFLoader();
  const { x, y, z, name } = option;
  // const module = getMode(name);
  const trueModule = await loader.loadAsync(model);
  const mode = setupModel(trueModule);
  mode.position.set(x, y, z);
}
async function getMode(name) {
  return model;
}

function setupModel(mod) {
  //加载模型
  const model = mod.scene.children[0];
  return model;
}

export { loadThree };
