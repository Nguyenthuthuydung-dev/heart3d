// ==========================================
// ULTIMATE HEART3D
// MAIN
// ==========================================

import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

import {
    createUniverse,
    updateUniverse
} from "./universe.js";

import {
    createHeart,
    updateHeart
} from "./heart.js";


// ==========================================
// SCENE
// ==========================================

const scene =
    new THREE.Scene();

scene.background =
    new THREE.Color(0x02020a);


// ==========================================
// CAMERA
// ==========================================

const camera =
    new THREE.PerspectiveCamera(
        60,
        window.innerWidth /
        window.innerHeight,
        0.1,
        200
    );

camera.position.set(
    0,
    0,
    16
);


// ==========================================
// RENDERER
// ==========================================

const renderer =
    new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.outputColorSpace =
    THREE.SRGBColorSpace;

document.body.appendChild(
    renderer.domElement
);


// ==========================================
// UNIVERSE
// ==========================================

const universe =
    createUniverse(scene);


// ==========================================
// HEART
// ==========================================

const heart =
    createHeart(scene);


// ==========================================
// LIGHT
// ==========================================

const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        1
    );

scene.add(
    ambientLight
);


// ==========================================
// CLOCK
// ==========================================

const clock =
    new THREE.Clock();


// ==========================================
// ANIMATION
// ==========================================

function animate() {

    requestAnimationFrame(
        animate
    );

    const elapsed =
        clock.getElapsedTime();

    updateUniverse(
        universe,
        elapsed
    );

    updateHeart(
        heart,
        elapsed
    );

    // camera breathing
    camera.position.z =
        16 +
        Math.sin(
            elapsed * 0.35
        ) * 0.35;

    camera.lookAt(
        0,
        0,
        0
    );

    renderer.render(
        scene,
        camera
    );
}

animate();


// ==========================================
// RESPONSIVE
// ==========================================

window.addEventListener(
    "resize",
    () => {

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
