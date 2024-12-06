import * as THREE from 'three';

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);

function setupLights(scene) {
    ambientLight.position.set(0, 30, 0);
    scene.add(ambientLight);

    directionalLight.position.set(100, 100, 50);
    directionalLight.castShadow = true;

    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 300;
    directionalLight.shadow.camera.left = -100;
    directionalLight.shadow.camera.right = 100;
    directionalLight.shadow.camera.top = 100;
    directionalLight.shadow.camera.bottom = -100;
    directionalLight.shadow.bias = -0.001;

    directionalLight.target.position.set(0, 0, 0);
    scene.add(directionalLight);
}

export { ambientLight, directionalLight, setupLights };

