import { Mesh } from "three";

import { createGeometries } from "./geometries.js";
import { createMaterials } from "./materials.js";

function createMeshes() {
  const geometries = createGeometries();
  const materials = createMaterials();
  //创建火车车厢
  const cabin = new Mesh(geometries.cabin, materials.body);
  cabin.position.set(1.5, 1.4, 0);
  //创建烟囱
  const chimney = new Mesh(geometries.chimney, materials.detail);
  chimney.position.set(-2, 1.9, 0);
  //创建火车的鼻子
  const nose = new Mesh(geometries.nose, materials.body);
  nose.position.set(-1, 1, 0);
  nose.rotation.z = Math.PI / 2;
  //创建车轮
  const smallWheelRear = new Mesh(geometries.wheel, materials.detail);
  smallWheelRear.position.y = 0.5;
  smallWheelRear.rotation.x = Math.PI / 2;
  //复制俩个车轮
  const smallWheelCenter = smallWheelRear.clone();
  smallWheelCenter.position.x = -1;
  const smallWheelFront = smallWheelRear.clone();
  smallWheelFront.position.x = -2;
  //建造后轮并且放大
  const bigWheel = smallWheelRear.clone();
  bigWheel.position.set(1.5, 0.9, 0);
  bigWheel.scale.set(2, 1.25, 2);
  return {
    nose,
    cabin,
    chimney,
    smallWheelRear,
    smallWheelCenter,
    smallWheelFront,
    bigWheel,
  };
}

export { createMeshes };
