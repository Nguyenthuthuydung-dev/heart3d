// ==========================================
// ULTIMATE HEART3D
// Utilities
// ==========================================

export const CONFIG = {
    particleCount: 4200,
    mobileParticleCount: 2600,

    colors: [
        0xff4d9d,
        0xff6ec7,
        0xff9bff,
        0xffd66b,
        0xffffff
    ],

    cameraZ: 42
};


// Random số trong khoảng
export function random(min, max) {
    return Math.random() * (max - min) + min;
}


// Random phần tử trong mảng
export function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}


// Lerp
export function lerp(a, b, t) {
    return a + (b - a) * t;
}


// Clamp
export function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}


// Ease mềm
export function easeInOut(t) {
    return t < 0.5
        ? 2 * t * t
        : 1 - Math.pow(-2 * t + 2, 2) / 2;
}


// Ease mạnh hơn cho particle
export function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
}


// Tạo màu THREE.Color
export function randomColor(THREE) {
    return new THREE.Color(randomItem(CONFIG.colors));
}


// Kiểm tra thiết bị
export function isMobile() {
    return window.innerWidth < 768;
}


// Particle count phù hợp điện thoại
export function getParticleCount() {
    return isMobile()
        ? CONFIG.mobileParticleCount
        : CONFIG.particleCount;
}


// Tạo vị trí ngẫu nhiên trong không gian
export function randomPosition(range = 30) {
    return {
        x: random(-range, range),
        y: random(-range, range),
        z: random(-range, range)
    };
}


// Chuyển màu HEX thành RGB
export function hexToRGB(hex) {
    return {
        r: ((hex >> 16) & 255) / 255,
        g: ((hex >> 8) & 255) / 255,
        b: (hex & 255) / 255
    };
}


// Delay
export function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
