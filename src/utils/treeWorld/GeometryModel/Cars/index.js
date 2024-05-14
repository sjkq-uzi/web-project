import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { setupModel } from "./setupModel.js";
const model = require("@/assets/models/car.glb");

async function loadBirds() {
  //初始化加载器，加载glb文件
  const loader = new GLTFLoader();
  const [carData] = await Promise.all([loader.loadAsync(model)]);
  console.log("car == ", carData);
  const car = setupModel(carData);
  car.position.set(0, 0, 2.5);

  return { car };
}
export { loadBirds };
