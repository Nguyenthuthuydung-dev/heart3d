// ==========================================
// ULTIMATE HEART3D
// MAIN
// ==========================================

import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

import {
    Universe
} from "./universe.js";


// ==========================================
// VARIABLES
// ==========================================

let scene;

let camera;

let renderer;

let universe;

let clock;

let currentStep = -1;

let running = false;


// ==========================================
// DOM
// ==========================================

const loading =
    document.getElementById("loading");

const loadingText =
    document.getElementById("loadingText");

const startButton =
    document.getElementById("startButton");

const sceneText =
    document.getElementById("sceneText");


// ==========================================
// INIT
// ==========================================

function init() {

    scene =
        new THREE.Scene();


    scene.background =
        new THREE.Color(0x000000);


    camera =
        new THREE.PerspectiveCamera(
            55,
            window.innerWidth /
            window.innerHeight,
            0.1,
            200
        );


    camera.position.z = 42;


    renderer =
        new THREE.WebGLRenderer({
            antialias: true,
            alpha: false
        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            1.7
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


    clock =
        new THREE.Clock();


    universe =
        new Universe(
            THREE,
            scene
        );


    window.addEventListener(
        "resize",
        onResize
    );


    animate();


    setTimeout(() => {

        loadingText.textContent =
            "Our little universe is ready ♡";

        startButton.classList.add(
            "show"
        );

    }, 1300);
}


// ==========================================
// START
// ==========================================

startButton.addEventListener(
    "click",
    startExperience
);


function startExperience() {

    if (running) return;

    running = true;


    loading.classList.add(
        "hide"
    );


    sceneText.classList.add(
        "show"
    );


    // Bắt đầu câu chuyện
    setTimeout(() => {

        nextStep();

    }, 1000);
}


// ==========================================
// SEQUENCE
// ==========================================

const sequence = [

    {
        text: "26.10.2025",
        duration: 3300
    },

    {
        text: "10:00",
        duration: 3000
    },

    {
        text: "1",
        duration: 3300
    },

    {
        text: "26.10.2026",
        duration: 3500
    },

    {
        text: "I LOVE YOU",
        duration: 3500
    },

    {
        text: "THÙY DUNG ♡ BẢO LÂM",
        duration: 4500
    }

];


function nextStep() {

    currentStep++;


    if (
        currentStep >=
        sequence.length
    ) {

        finishParticleSequence();

        return;
    }


    const step =
        sequence[currentStep];


    showSmallCaption(
        getCaption(currentStep)
    );


    universe.morphTo(
        step.text,
        1700
    );


    setTimeout(() => {

        nextStep();

    }, step.duration);
}


// ==========================================
// CAPTION
// ==========================================

function getCaption(index) {

    switch (index) {

        case 0:
            return "The moment our story began";

        case 1:
            return "10:00 PM? No... 10:00 — the beginning of us";

        case 2:
            return "ONE";

        case 3:
            return "One year later...";

        case 4:
            return "And somehow, I still choose you";

        case 5:
            return "Our little universe";

        default:
            return "";
    }
}


function showSmallCaption(text) {

    sceneText.textContent =
        text;

    sceneText.classList.remove(
        "pulse"
    );


    void sceneText.offsetWidth;


    sceneText.classList.add(
        "pulse"
    );
}


// ==========================================
// KẾT THÚC PHẦN PARTICLE
// ==========================================

function finishParticleSequence() {

    showSmallCaption(
        "One year down • A lifetime to go"
    );


    setTimeout(() => {

        universe.explode(1.15);

    }, 1800);


    setTimeout(() => {

        showSmallCaption(
            "♡"
        );

    }, 3500);


    // Sau này bước tiếp theo sẽ nối vào đây:
    // Ảnh → Story → Thư tình → Timer → Fireworks
}


// ==========================================
// RESIZE
// ==========================================

function onResize() {

    camera.aspect =
        window.innerWidth /
        window.innerHeight;


    camera.updateProjectionMatrix();


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
}


// ==========================================
// ANIMATION
// ==========================================

function animate() {

    requestAnimationFrame(
        animate
    );


    const delta =
        clock.getDelta();


    if (universe) {

        universe.update(
            delta
        );
    }


    renderer.render(
        scene,
        camera
    );
}


// ==========================================
// START
// ==========================================

init();
