import * as THREE from 'three';

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const directionalLight = new THREE.DirectionalLight();

function setupLights(scene) {
    ambientLight.position.set(0, 30, 0);
    scene.add(ambientLight);

    directionalLight.position.set(100, 100, 50);
    directionalLight.castShadow = true;  // Habilita sombras projetadas pela luz
    directionalLight.shadow.mapSize.width = 2048;  // Aumenta a resolução do mapa de sombras
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 200;
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.camera.top = 50;
    directionalLight.shadow.camera.bottom = -50;
    directionalLight.target.position.set(0, 0, 0);  // Direciona a luz para o centro da cena
    scene.add(directionalLight);
}

export { ambientLight, directionalLight, setupLights };

