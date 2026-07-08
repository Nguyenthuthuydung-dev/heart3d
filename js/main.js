import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.179/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.179/examples/jsm/controls/OrbitControls.js";

const loading = document.getElementById("loading");
const intro = document.getElementById("intro");
const startButton = document.getElementById("startButton");

loading.style.display = "none";
intro.classList.remove("hidden");

startButton.addEventListener("click", () => {

    intro.style.display = "none";

    const scene = new THREE.Scene();

    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        3000
    );

    camera.position.z = 150;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("bg"),
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    const controls = new OrbitControls(camera, renderer.domElement);

    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;

    const light = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(light);

    function animate() {

        requestAnimationFrame(animate);

        controls.update();

        renderer.render(scene, camera);

    }

    animate();

});
