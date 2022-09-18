import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"

console.log(THREE);

const canvas = document.getElementById("canvas");

// scene
const color = new THREE.Color(0x82869a);
const scene = new THREE.Scene();

// size
const sizes = {
  width: innerWidth,
  height: innerHeight,
};

  // camera

  const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width/sizes.height,
  0.1,
  3000,
  );

  camera.position.set(0,500,1000);
  scene.add(camera);
  // renderer

  const renderer = new THREE.WebGLRenderer({canvas:canvas,antialias:true});
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio);

  // envimageの設定
  const urls = [
    "./envimage/right.png",
    "./envimage/left.png",
    "./envimage/up.png",
    "./envimage/down.png",
    "./envimage/front.png",
    "./envimage/back.png",
  ];

  // カメラワークをコントロール
  const controls = new OrbitControls(camera,canvas);
  controls.enableDamping=true;

  const loader = new THREE.CubeTextureLoader();
  scene.background=loader.load(urls);

  // cube cameraを作成
  const cubeRenderTarget=new THREE.WebGLCubeRenderTarget(700);

  const cubeCamera = new THREE.CubeCamera(1,1000,cubeRenderTarget);
  scene.add(cubeCamera);

  // 球体のオブジェクト
  const material = new THREE.MeshBasicMaterial({
    envMap:cubeRenderTarget.texture,
    reflectivity:1,
  });
  const geometry = new THREE.SphereGeometry(350,50,50);
  const sphere = new THREE.Mesh(geometry,material);
  sphere.position.set(0,100,0);
  scene.add(sphere);


  // アニメーション制御
  function animate() {
    controls.update();
    // cube cameraを更新し続けなければならない
    cubeCamera.update( renderer, scene );
    renderer.render(scene,camera);
    // 再起関数の設定
    window.requestAnimationFrame(animate);
  }

  animate();