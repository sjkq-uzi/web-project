const setSize = (container, camera, renderer) => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
};

class Resizer {
  constructor(container, camera, renderer) {
    setSize(container, camera, renderer);
    // 监听窗口大小变化
    window.addEventListener("resize", () => {
      setSize(container, camera, renderer);
      this.onResize();
    });
  }
  onResize() {}
}

export { Resizer };
