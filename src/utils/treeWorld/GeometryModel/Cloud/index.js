import * as THREE from "three";
const particles = 1000;
const geometry = new THREE.BufferGeometry();
const vertices = [];

for (let i = 0; i < particles; i++) {
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 100 - 50;
  const z = Math.random() * 200 - 100;
  vertices.push(x, y, z);
}

geometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(vertices, 3)
);

const textureLoader = new THREE.TextureLoader();
const imgUrl = require("@/assets/login/topBg.jpg");
const sprite = textureLoader.load(imgUrl);
//设置材料
const material = new THREE.PointsMaterial({
  size: 5,
  map: sprite,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  transparent: true,
});

const cloudParticles = new THREE.Points(geometry, material);
console.log("cloudParticles=", cloudParticles);
//设置动画函数
cloudParticles.tick = () => {
  // 遍历粒子云的每个粒子
  let positions = cloudParticles.geometry.attributes.position.array;
  for (let i = 0; i < positions.length; i += 3) {
    // 更新粒子的位置
    // positions[i] += 0.05; // X轴随机移动
    // positions[i + 1] += 0.05; // Y轴随机移动
    positions[i + 2] += -0.05; // Z轴随机移动
  }
  // 告诉Three.js几何体的位置已经改变
  cloudParticles.geometry.attributes.position.needsUpdate = true;
};
export { cloudParticles };
