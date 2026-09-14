// ==========================================
// ULTIMATE HEART3D
// 3D TEXT HEART
// ==========================================

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";


// ==========================================
// TẠO HÌNH TRÁI TIM
// ==========================================

function heartPoint(t) {

    const x =
        16 * Math.pow(Math.sin(t), 3);

    const y =
        13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);

    return {
        x: x * 0.13,
        y: y * 0.13
    };
}


// ==========================================
// TẠO VỊ TRÍ NGẪU NHIÊN BÊN TRONG TIM
// ==========================================

function randomHeartPosition() {

    let x;
    let y;

    while (true) {

        const t =
            Math.random() * Math.PI * 2;

        const point =
            heartPoint(t);

        const scale =
            Math.sqrt(Math.random());

        x = point.x * scale;
        y = point.y * scale;

        // vùng dưới tim
        if (y < -0.8) {
            y += Math.random() * 0.4;
        }

        break;
    }

    const depth =
        (Math.random() - 0.5) * 1.8;

    return new THREE.Vector3(
        x,
        y,
        depth
    );
}


// ==========================================
// TẠO TEXT SPRITE
// ==========================================

function createTextSprite(text) {

    const canvas =
        document.createElement("canvas");

    canvas.width = 256;
    canvas.height = 64;

    const ctx =
        canvas.getContext("2d");

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.font =
        "bold 25px Arial";

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.shadowColor =
        "rgba(255, 80, 150, 0.9)";

    ctx.shadowBlur = 12;

    ctx.fillStyle =
        "#ffffff";

    ctx.fillText(
        text,
        canvas.width / 2,
        canvas.height / 2
    );

    const texture =
        new THREE.CanvasTexture(canvas);

    texture.needsUpdate = true;

    const material =
        new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
            depthWrite: false,
            blending:
                THREE.AdditiveBlending
        });

    const sprite =
        new THREE.Sprite(material);

    sprite.scale.set(
        1.45,
        0.36,
        1
    );

    return sprite;
}


// ==========================================
// CREATE HEART
// ==========================================

export function createHeart(scene) {

    const heartGroup =
        new THREE.Group();

    const particles = [];

    const count = 520;

    for (let i = 0; i < count; i++) {

        const sprite =
            createTextSprite(
                "Cao Bảo Lâm"
            );

        // vị trí ban đầu: bay từ xa
        const startPosition =
            new THREE.Vector3(
                THREE.MathUtils.randFloatSpread(35),
                THREE.MathUtils.randFloatSpread(25),
                THREE.MathUtils.randFloatSpread(25)
            );

        // vị trí cuối tạo thành trái tim
        const targetPosition =
            randomHeartPosition();

        sprite.position.copy(
            startPosition
        );

        sprite.material.opacity = 0;

        heartGroup.add(sprite);

        particles.push({
            sprite,
            start: startPosition,
            target: targetPosition,

            delay:
                Math.random() * 2.5,

            speed:
                0.8 + Math.random() * 0.8,

            phase:
                Math.random() * Math.PI * 2
        });
    }

    scene.add(heartGroup);

    return {
        group: heartGroup,
        particles
    };
}


// ==========================================
// UPDATE HEART
// ==========================================

export function updateHeart(
    heart,
    elapsed
) {

    if (!heart) return;

    for (const particle of heart.particles) {

        const localTime =
            elapsed -
            particle.delay;

        if (localTime < 0) {

            particle.sprite.material.opacity =
                0;

            continue;
        }

        const duration = 2.2;

        const progress =
            Math.min(
                localTime /
                duration,
                1
            );

        // ease out
        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );

        particle.sprite.position.lerpVectors(
            particle.start,
            particle.target,
            eased
        );

        // xuất hiện dần
        particle.sprite.material.opacity =
            Math.min(
                progress * 2,
                0.95
            );

        // hiệu ứng rung nhẹ
        if (progress >= 1) {

            const pulse =
                Math.sin(
                    elapsed * 2.2 +
                    particle.phase
                ) * 0.025;

            particle.sprite.position.y +=
                pulse;

            const scale =
                1 +
                Math.sin(
                    elapsed * 2 +
                    particle.phase
                ) * 0.04;

            particle.sprite.scale.set(
                1.45 * scale,
                0.36 * scale,
                1
            );
        }
    }

    // trái tim xoay rất nhẹ
    heart.group.rotation.y =
        Math.sin(elapsed * 0.35) * 0.12;

    heart.group.rotation.x =
        Math.sin(elapsed * 0.25) * 0.04;
          }
