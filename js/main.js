import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180/build/three.module.js";

import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.180/examples/jsm/controls/OrbitControls.js";

const canvas = document.getElementById("bg");

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
45,
window.innerWidth / window.innerHeight,
0.1,
3000
);

camera.position.set(0,0,180);

const renderer = new THREE.WebGLRenderer({
canvas,
antialias:true,
alpha:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

renderer.setPixelRatio(
Math.min(window.devicePixelRatio,2)
);

const controls = new OrbitControls(
camera,
renderer.domElement
);

controls.enableDamping = true;
controls.enableZoom = false;
controls.enablePan = false;

const ambient = new THREE.AmbientLight(
0xffffff,
1.2
);

scene.add(ambient);

const clock = new THREE.Clock();

function animate(){

requestAnimationFrame(animate);

const delta = clock.getDelta();

controls.update();

renderer.render(
scene,
camera
);

}

animate();

window.addEventListener(
"resize",
()=>{

camera.aspect =
window.innerWidth /
window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

}
);
/* ========= STAR FIELD ========= */

const starGeometry = new THREE.BufferGeometry();

const starCount = 12000;

const starPositions = [];

for(let i = 0; i < starCount; i++){

    starPositions.push(

        (Math.random()-0.5)*3000,
        (Math.random()-0.5)*3000,
        (Math.random()-0.5)*3000

    );

}

starGeometry.setAttribute(

    "position",

    new THREE.Float32BufferAttribute(

        starPositions,

        3

    )

);

const starMaterial = new THREE.PointsMaterial({

    color:0xffffff,

    size:1.2,

    transparent:true,

    opacity:0.9

});

const stars = new THREE.Points(

    starGeometry,

    starMaterial

);

scene.add(stars);
