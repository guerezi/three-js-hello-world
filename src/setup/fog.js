import * as THREE from 'three';

const ambientFog = new THREE.FogExp2();

function setupFog(scene) {
    ambientFog.density = 0.00025;
    ambientFog.color.setHSL(0.51, 0.4, 0.01);
    ambientFog.name = 'ambientFog';

    scene.fog = ambientFog;
}

export { setupFog };

