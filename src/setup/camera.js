import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { renderer } from './renderer';

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(50, 50, 50);
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 20;
controls.maxDistance = 100;

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

document.addEventListener('wheel', (event) => {
    const delta = event.deltaY * 0.1;
    clampZoom(delta);
});

function clampZoom(delta) {
    const minZoom = 20;
    const maxZoom = 100;

    const newZoom = THREE.MathUtils.clamp(camera.position.length() + delta, minZoom, maxZoom);

    camera.position.setLength(newZoom);
}

export { camera };
