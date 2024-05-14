import { DirectionalLight, HemisphereLight, AmbientLight } from "three";
function createLights() {
  const light = new DirectionalLight("white", 6);
  const ambientLight = new HemisphereLight(
    "white", // bright sky color
    "darkslategrey", // dim ground color
    4 // intensity
  );
  // const ambientLight = new AmbientLight("white", 8);

  light.position.set(10, 10, 10);
  return { light, ambientLight };
}
export { createLights };
