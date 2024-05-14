import { PerspectiveCamera } from "three";
function createCamera() {
  let x = 0;
  const camera = new PerspectiveCamera(
    35, // fov  观察范围
    1, //aspect  纵横比（虚拟值）
    0.1, //near  靠近夹片平面
    100 //far  远剪裁平面
  );

  // 照相机的位置
  camera.position.set(10, 4, 14);
  camera.tick = () => {
    x += 0.001;
    camera.position.set(x, 0, 10);
  };

  return camera;
}
export { createCamera };
