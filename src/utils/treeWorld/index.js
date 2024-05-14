import { createCamera } from "./Components/camera.js";
// import { createCube } from "./Components/cube.js";
import { createScene } from "./Components/scene.js";
import { createLights } from "./Components/lights.js";
import { createRenderer } from "./Systems/renderer.js";
import { Resizer } from "./Systems/Resizer.js";
import { Loop } from "./Systems/Loop.js";
import { createControls } from "./Systems/controls.js";
// import { Train } from "./GeometryModel/Train";
import { loadBirds } from "./GeometryModel/Birds";
// import { loadThree } from "./GeometryModel";
import { cloudParticles } from "./GeometryModel/Cloud/index.js";
//定义循环动画
let loop;
let controls;
class World {
  #camera = createCamera();
  #scene = createScene();
  #renderer = createRenderer();

  constructor(container) {
    //创建立方体
    // const cube = createCube();
    const { light, ambientLight } = createLights();
    //创建控件
    controls = createControls(this.#camera, this.#renderer.domElement);
    const resizer = new Resizer(container, this.#camera, this.#renderer);
    //创建火车模型
    // const train = new Train();
    // const tr = train.clone();
    // tr.position.x = -3;
    // tr.position.y = -3;
    //添加灯光
    this.#scene.add(light, ambientLight, cloudParticles);
    loop = new Loop(this.#camera, this.#scene, this.#renderer);
    container.append(this.#renderer.domElement);

    //自动旋转
    // controls.autoRotate = true;
    // controls.autoRotateSpeed = 6;
    //按需渲染
    controls.addEventListener("change", () => {
      this.render();
    });
    //需要执行动作的对象放入数组
    // loop.updatables.push(cube);
    // loop.updatables.push(this.#camera);
    loop.updatables.push(controls, cloudParticles);
    //增加渲染钩子实现响应式（自动调整大小）
    resizer.onResize = () => {
      this.render();
    };
  }
  render() {
    this.#renderer.render(this.#scene, this.#camera);
  }
  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
  clean() {
    // this.#scene.clear();
    clearScene(this.#scene);
  }
  //加载模型，glb文件
  async init() {
    const { parrot, flamingo, stork } = await loadBirds();
    controls.target.copy(stork.position);
    this.#scene.add(parrot, flamingo, stork);
    loop.updatables.push(parrot, flamingo, stork);
  }
}
function clearScene(scene) {
  // 遍历场景中的所有对象，并移除它们
  for (let i = scene.children.length - 1; i >= 0; i--) {
    const object = scene.children[i];
    if (object.isMesh || object.isLight || object.isParticle) {
      scene.remove(object);
      // 如果对象有几何体和材质，也要进行清理
      if (object.geometry) {
        object.geometry.dispose();
      }
      if (object.material) {
        // 材质可能是数组
        if (Array.isArray(object.material)) {
          for (const material of object.material) {
            material.dispose();
          }
        } else {
          object.material.dispose();
        }
      }
    }
  }
}
class GeometryFactory {
  #camera = createCamera();
  #scene = createScene();
  #renderer = createRenderer();
  #loop = {};
  constructor(container) {
    const resizer = new Resizer(container, this.#camera, this.#renderer);
    const { ambientLight } = createLights();
    //添加灯光
    this.#scene.add(ambientLight);
    //创建控件
    controls = createControls(this.#camera, this.#renderer.domElement);
    //创建循环动画
    loop = new Loop(this.#camera, this.#scene, this.#renderer);
    //挂载到dom节点
    container.append(this.#renderer.domElement);
    //按需渲染
    controls.addEventListener("change", () => {
      this.render();
    });
    //增加循环动画对象

    loop.updatables.push(controls);
    //增加渲染钩子实现响应式（自动调整大小）
    resizer.onResize = () => {
      this.render();
    };
  }
  //渲染一祯
  render() {
    this.#renderer.render(this.#scene, this.#camera);
  }
  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
  //加载模型，glb文件
  async init() {
    const { parrot, flamingo, stork } = await loadBirds();
    controls.target.copy(stork.position);
    console.log("parrot", parrot);
    this.#scene.add(parrot, flamingo, stork);
    loop.updatables.push(parrot, flamingo, stork);
  }
}
export { World, GeometryFactory };
