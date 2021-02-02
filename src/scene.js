import * as THREE from "three";

class GL {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.objects = [];
    this.init = () => {
      this.camera.position.set(0, 0, 500);
      this.camera.updateProjectionMatrix();
      this.camera.lookAt(this.scene.position);
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setClearColor(0x000000, 1);
      document.body.appendChild(this.renderer.domElement);
    };

    this.lights = (callback) => {
      callback();
    };
    this.add = (item) => {
      this.objects.push(item);
      this.scene.add(item);
    };
    this.update = (callback) => {
      callback();
    };
    this.render = () => {
      this.renderer.render(this.scene, this.camera);
    };
  }
}

export default GL;
