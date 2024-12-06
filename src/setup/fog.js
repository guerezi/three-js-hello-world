import * as THREE from 'three';

function setupFog(scene) {
    const ambientFog = new THREE.FogExp2(new THREE.Color().setHSL(0.51, 0.4, 0.01), 0.005);
    ambientFog.name = 'ambientFog';
    scene.fog = ambientFog;
}

export { setupFog };
