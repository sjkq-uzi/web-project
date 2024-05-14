//几何体、材质、网格

import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  MathUtils,
  TextureLoader,
} from "three";
function createCube() {
  // 建立几何图形
  const geometry = new BoxGeometry(2, 2, 2);

  // 创建材料
  const material = createMaterial();

  // 创建包含几何图形和材质的网格
  const cube = new Mesh(geometry, material);
  cube.rotation.set(-0.5, -0.1, 0.8);
  const radiansPerSecond = MathUtils.degToRad(30);
  //保证在不同刷新率的情况下，旋转速度一样
  cube.tick = (delta) => {
    cube.rotation.z += radiansPerSecond * delta;
    cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
  };

  return cube;
}
function createMaterial() {
  //创建材料，用图片当纹理
  const textureLoader = new TextureLoader();
  const imgUrl = require("../../assets/textures/bg.png");
  const texture = textureLoader.load(imgUrl);
  const material = new MeshStandardMaterial({
    map: texture,
  });
  return material;
}

export { createCube };
