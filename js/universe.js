// ==========================================
// ULTIMATE HEART3D
// Universe / Stars
// ==========================================

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

export function createUniverse(scene) {

    // ------------------------------
    // STAR FIELD
    // ------------------------------

    const starCount = 1800;

    const positions = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {

        const radius = 20 + Math.random() * 55;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(
            THREE.MathUtils.randFloatSpread(2)
        );

        positions[i * 3] =
            radius * Math.sin(phi) * Math.cos(theta);

        positions[i * 3 + 1] =
            radius * Math.cos(phi);

        positions[i * 3 + 2] =
            radius * Math.sin(phi) * Math.sin(theta);

        sizes[i] = Math.random() * 2 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
    );

    geometry.setAttribute(
        "size",
        new THREE.BufferAttribute(sizes, 1)
    );

    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.09,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    const stars = new THREE.Points(
        geometry,
        material
    );

    scene.add(stars);

    // ------------------------------
    // SMALL GLOWING STARS
    // ------------------------------

    const glowGeometry = new THREE.BufferGeometry();
    const glowPositions = new Float32Array(250 * 3);

    for (let i = 0; i < 250; i++) {

        glowPositions[i * 3] =
            THREE.MathUtils.randFloatSpread(80);

        glowPositions[i * 3 + 1] =
            THREE.MathUtils.randFloatSpread(50);

        glowPositions[i * 3 + 2] =
            THREE.MathUtils.randFloatSpread(80);
    }

    glowGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(glowPositions, 3)
    );

    const glowMaterial = new THREE.PointsMaterial({
        color: 0xffd6e7,
        size: 0.16,
        transparent: true,
        opacity: 0.65,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    const glowStars = new THREE.Points(
        glowGeometry,
        glowMaterial
    );

    scene.add(glowStars);

    return {
        stars,
        glowStars
    };
}


// ==========================================
// UPDATE UNIVERSE
// ==========================================

export function updateUniverse(universe, time) {

    if (!universe) return;

    if (universe.stars) {
        universe.stars.rotation.y =
            time * 0.006;

        universe.stars.rotation.x =
            Math.sin(time * 0.0003) * 0.08;
    }

    if (universe.glowStars) {
        universe.glowStars.rotation.y =
            -time * 0.003;

        universe.glowStars.rotation.z =
            time * 0.001;
    }
}
