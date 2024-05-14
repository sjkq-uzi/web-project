import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { setupModel } from "./setupModel.js";
const model = require("@/assets/models/Parrot.glb");
const model1 = require("@/assets/models/Flamingo.glb");
const model2 = require("@/assets/models/Stork.glb");
async function loadBirds() {
  //初始化加载器，加载glb文件
  const loader = new GLTFLoader();
  const [parrotData, flamingoData, storkData] = await Promise.all([
    loader.loadAsync(model),
    loader.loadAsync(model1),
    loader.loadAsync(model2),
  ]);
  const parrot = setupModel(parrotData);
  parrot.position.set(0, 0, 2.5);
  const flamingo = setupModel(flamingoData);
  flamingo.position.set(7.5, 0, 5);
  const stork = setupModel(storkData);
  stork.position.set(0, -2.5, 5);

  return { parrot, flamingo, stork };
}
export { loadBirds };
