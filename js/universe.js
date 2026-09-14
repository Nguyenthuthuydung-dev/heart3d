// ==========================================
// ULTIMATE HEART3D
// Universe / Particle System
// ==========================================

import {
    random,
    randomItem,
    getParticleCount,
    CONFIG
} from "./utils.js";


export class Universe {

    constructor(THREE, scene) {

        this.THREE = THREE;
        this.scene = scene;

        this.count = getParticleCount();

        this.particles = [];
        this.targets = [];

        this.group = new THREE.Group();

        this.scene.add(this.group);

        this.createParticles();
        this.createStars();

        this.currentText = "";
        this.textCanvas = null;

        this.time = 0;
    }


    // ==========================================
    // PARTICLES
    // ==========================================

    createParticles() {

        const THREE = this.THREE;

        const geometry = new THREE.BufferGeometry();

        const positions = new Float32Array(this.count * 3);
        const colors = new Float32Array(this.count * 3);

        this.basePositions = new Float32Array(this.count * 3);

        this.targets = new Float32Array(this.count * 3);

        for (let i = 0; i < this.count; i++) {

            const i3 = i * 3;

            const radius = random(7, 25);

            const angle = Math.random() * Math.PI * 2;

            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const z = random(-20, 20);

            positions[i3] = x;
            positions[i3 + 1] = y;
            positions[i3 + 2] = z;

            this.basePositions[i3] = x;
            this.basePositions[i3 + 1] = y;
            this.basePositions[i3 + 2] = z;

            this.targets[i3] = x;
            this.targets[i3 + 1] = y;
            this.targets[i3 + 2] = z;

            const color = new THREE.Color(
                randomItem(CONFIG.colors)
            );

            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }


        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
        );

        geometry.setAttribute(
            "color",
            new THREE.BufferAttribute(colors, 3)
        );


        const material = new THREE.PointsMaterial({

            size: 0.16,

            vertexColors: true,

            transparent: true,

            opacity: 0.9,

            blending: THREE.AdditiveBlending,

            depthWrite: false
        });


        this.points = new THREE.Points(
            geometry,
            material
        );

        this.group.add(this.points);
    }


    // ==========================================
    // BACKGROUND STARS
    // ==========================================

    createStars() {

        const THREE = this.THREE;

        const count = 900;

        const geometry = new THREE.BufferGeometry();

        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {

            const i3 = i * 3;

            positions[i3] = random(-70, 70);

            positions[i3 + 1] = random(-45, 45);

            positions[i3 + 2] = random(-60, 20);
        }

        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positions, 3)
        );


        const material = new THREE.PointsMaterial({

            color: 0xffffff,

            size: 0.08,

            transparent: true,

            opacity: 0.5,

            blending: THREE.AdditiveBlending,

            depthWrite: false
        });


        this.stars = new THREE.Points(
            geometry,
            material
        );

        this.scene.add(this.stars);
    }


    // ==========================================
    // TẠO TARGET TỪ CHỮ
    // ==========================================

    createTextTarget(text) {

        const canvas = document.createElement("canvas");

        canvas.width = 1200;
        canvas.height = 500;

        const ctx = canvas.getContext("2d");

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        ctx.fillStyle = "white";

        ctx.textAlign = "center";

        ctx.textBaseline = "middle";


        let fontSize = 170;

        if (text.length > 15) {
            fontSize = 105;
        }

        if (text.length > 22) {
            fontSize = 78;
        }

        if (text === "1") {
            fontSize = 320;
        }

        if (text === "10:00") {
            fontSize = 190;
        }


        ctx.font =
            `bold ${fontSize}px Arial`;


        ctx.fillText(
            text,
            canvas.width / 2,
            canvas.height / 2
        );


        const imageData = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        );


        const pixels = [];


        // Lấy các điểm trắng
        for (
            let y = 0;
            y < canvas.height;
            y += 5
        ) {

            for (
                let x = 0;
                x < canvas.width;
                x += 5
            ) {

                const index =
                    (y * canvas.width + x) * 4;

                const alpha =
                    imageData.data[index + 3];

                if (alpha > 100) {

                    pixels.push({
                        x,
                        y
                    });
                }
            }
        }


        const target =
            new Float32Array(this.count * 3);


        for (let i = 0; i < this.count; i++) {

            const i3 = i * 3;

            const p =
                pixels[
                    Math.floor(
                        Math.random() *
                        pixels.length
                    )
                ];


            if (p) {

                target[i3] =
                    (p.x - canvas.width / 2)
                    * 0.025;

                target[i3 + 1] =
                    -(p.y - canvas.height / 2)
                    * 0.025;

                target[i3 + 2] =
                    random(-0.7, 0.7);

            } else {

                target[i3] =
                    random(-15, 15);

                target[i3 + 1] =
                    random(-8, 8);

                target[i3 + 2] =
                    random(-2, 2);
            }
        }


        this.textCanvas = canvas;

        return target;
    }


    // ==========================================
    // CHUYỂN SANG CHỮ
    // ==========================================

    morphTo(text, duration = 1800) {

        const target =
            this.createTextTarget(text);


        const positions =
            this.points.geometry
                .attributes.position.array;


        const start =
            new Float32Array(positions);


        const startTime =
            performance.now();


        const animate = (now) => {

            const progress =
                Math.min(
                    1,
                    (now - startTime) /
                    duration
                );


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            for (
                let i = 0;
                i < this.count;
                i++
            ) {

                const i3 = i * 3;


                positions[i3] =
                    start[i3] +
                    (
                        target[i3] -
                        start[i3]
                    ) * eased;


                positions[i3 + 1] =
                    start[i3 + 1] +
                    (
                        target[i3 + 1] -
                        start[i3 + 1]
                    ) * eased;


                positions[i3 + 2] =
                    start[i3 + 2] +
                    (
                        target[i3 + 2] -
                        start[i3 + 2]
                    ) * eased;
            }


            this.points.geometry
                .attributes
                .position
                .needsUpdate = true;


            if (progress < 1) {

                requestAnimationFrame(animate);

            } else {

                this.currentText = text;
            }
        };


        requestAnimationFrame(animate);
    }


    // ==========================================
    // TAN HẠT
    // ==========================================

    explode(power = 1) {

        const positions =
            this.points.geometry
                .attributes.position.array;


        for (
            let i = 0;
            i < this.count;
            i++
        ) {

            const i3 = i * 3;

            const x = positions[i3];

            const y = positions[i3 + 1];

            const z = positions[i3 + 2];


            const length =
                Math.sqrt(
                    x * x +
                    y * y +
                    z * z
                ) || 1;


            positions[i3] +=
                (x / length) *
                random(5, 18) *
                power;


            positions[i3 + 1] +=
                (y / length) *
                random(5, 18) *
                power;


            positions[i3 + 2] +=
                (z / length) *
                random(5, 18) *
                power;
        }


        this.points.geometry
            .attributes
            .position
            .needsUpdate = true;
    }


    // ==========================================
    // UPDATE
    // ==========================================

    update(delta) {

        this.time += delta;


        // Particle rung nhẹ
        const positions =
            this.points.geometry
                .attributes.position.array;


        for (
            let i = 0;
            i < this.count;
            i++
        ) {

            const i3 = i * 3;


            positions[i3] +=
                Math.sin(
                    this.time * 0.7 + i
                ) * 0.00035;


            positions[i3 + 1] +=
                Math.cos(
                    this.time * 0.5 + i
                ) * 0.00035;
        }


        this.points.geometry
            .attributes
            .position
            .needsUpdate = true;


        // Xoay toàn bộ vũ trụ
        this.group.rotation.y +=
            delta * 0.025;


        this.group.rotation.x =
            Math.sin(this.time * 0.15)
            * 0.03;


        // Sao xoay rất nhẹ
        this.stars.rotation.y +=
            delta * 0.008;
    }
          }
