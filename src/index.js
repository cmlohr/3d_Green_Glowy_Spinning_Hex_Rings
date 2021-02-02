import * as THREE from "three";
import GL from "./scene";
import gsap from "gsap";

const gl = new GL();

let hexColours = [
  0x00ff01,
  0x00b401,
  0x009d01,
  0x008401,
  0x006a01,
  0x005801,
  0x003f01,
  0x002701,
  0x000d01,
  0x000000
];
let time = gsap.timeline({ repeat: -5 });
let hexRings = new THREE.Group();
gl.scene.add(hexRings);

for (var i = 0; i < 10; ++i) {
  let hex = new THREE.TorusBufferGeometry(i * 12, 4, 1200, 6, 6.3);
  let mesh = new THREE.MeshLambertMaterial({ color: hexColours[i] });
  mesh.flatshading = false;
  mesh.stencilWrite = true;
  let ring = new THREE.Mesh(hex, mesh);
  ring.position.z = 0;
  ring.overdraw = true;
  ring.doubleSided = true;
  hexRings.add(ring);
  gl.objects.push(ring);
  ring.position.y = 0;

  time.to(
    ring.rotation,
    6,
    { x: Math.PI, y: 2 * Math.PI, ease: "Expo.easeInOut" },
    0.1 * i
  );
}

gl.init();
gl.lights(() => {
  let light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(20, 0, 30);
  gl.scene.add(light);
  let lightTwo = new THREE.DirectionalLight(0xffffff, 1);
  lightTwo.position.set(25, -35, 25);
  gl.scene.add(lightTwo);
  let lightThree = new THREE.DirectionalLight(0xffffff, 1);
  lightThree.position.set(30, 25, 30);
  gl.scene.add(lightThree);
});

gl.renderer.setAnimationLoop(() => {
  gl.update(() => {});
  gl.render();
});
