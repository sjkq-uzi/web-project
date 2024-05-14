//渲染器
import { WebGLRenderer } from "three";
function createRenderer() {
  //启用抗锯齿
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.physicallyCorrectLights = true;
  return renderer;
}

export { createRenderer };
