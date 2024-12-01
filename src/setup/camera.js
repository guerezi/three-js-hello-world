import * as THREE from 'three';

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const camera = new THREE.OrthographicCamera(-50, 50, 50, -50, 0.1, 1000);
camera.position.set(50, 50, 50);
camera.lookAt(0, 0, 0);

const frustumSize = 100;
let aspect = window.innerWidth / window.innerHeight;
camera.left = -aspect * frustumSize / 2;
camera.right = aspect * frustumSize / 2;
camera.top = frustumSize / 2;
camera.bottom = -frustumSize / 2;
camera.updateProjectionMatrix();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

export { camera };
