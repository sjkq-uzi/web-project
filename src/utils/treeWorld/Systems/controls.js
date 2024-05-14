import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);
  //使用阻尼
  controls.enableDamping = true;
  controls.tick = () => controls.update();
  return controls;
}

export { createControls };
