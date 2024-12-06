import * as THREE from 'three';
import { setUpBuildings } from './objects/building.js';
import { setUpRoad } from './objects/road.js';
import { setUpSunAndMoon, updateSunAndMoon } from './objects/sunAndMoon.js';
import { controlTrafficLights, setupTrafficLights } from './objects/trafficLight.js';
import { moveVehicles } from './objects/vehicle.js';
import { camera } from './setup/camera.js';
import { setupFog } from './setup/fog.js';
import { setupLights } from './setup/lights.js';
import { renderer } from './setup/renderer.js';
import { scene } from './setup/scene.js';
import { setupControls } from './utils/controls.js';
import { setUpGUI } from './utils/gui.js';

setupControls(camera, renderer);
setUpGUI();

setUpRoad(scene);
setUpBuildings(scene);
setupLights(scene);
setUpSunAndMoon(scene)
setupTrafficLights(scene);
setupFog(scene);

let clock = new THREE.Clock();
let isPaused = false;
let animationSpeed = 1;
let elapsedTime = 0;
const lightChangeInterval = 3;

function animate() {
    requestAnimationFrame(animate);

    if (!isPaused) {
        const delta = clock.getDelta() * animationSpeed;
        elapsedTime += delta;

        moveVehicles(delta);
        updateSunAndMoon(delta, scene);

        if (elapsedTime >= lightChangeInterval) {
            controlTrafficLights();
            elapsedTime = 0;
        }
    }

    renderer.render(scene, camera);
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        isPaused = !isPaused;
        if (!isPaused) {
            clock.getDelta();
        }
    } else if (event.code === 'ArrowUp') {
        animationSpeed = Math.min(10, animationSpeed + 0.5);
    } else if (event.code === 'ArrowDown') {
        animationSpeed = Math.max(0.1, animationSpeed - 0.5);
    }
});

animate();
