import { AnimationMixer } from "three";
function setupModel(data) {
  const model = data.scene.children[0];
  //提取剪辑
  const clip = data.animations[0];
  //创建混合器
  const mixer = new AnimationMixer(model);
  const action = mixer.clipAction(clip);
  action.play();
  model.tick = (delta) => mixer.update(delta);
  return model;
}

export { setupModel };
