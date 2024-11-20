import * as THREE from 'three';

const ambientFog = new THREE.Fog(0x000000, 0.015, 100);

function setupFog(scene) {
    // ambientFog.color.setHSL(0.51, 0.4, 0.01);
    // ambientFog.name = 'ambientFog';

    // scene.add(ambientFog);
}

export { setupFog };

