import * as THREE from 'three';
import { setUpRoad } from './objects/road.js';
import { setUpSunAndMoon, updateSunAndMoon } from './objects/sunAndMoon.js';
import { controlTrafficLights, setupTrafficLights } from './objects/trafficLight.js';
import { moveVehicles } from './objects/vehicle.js';
import { camera } from './setup/camera.js';
import { setupLights } from './setup/lights.js';
import { renderer } from './setup/renderer.js';
import { scene } from './setup/scene.js';
import { setupControls } from './utils/controls.js';
import { setUpGUI } from './utils/gui.js';

setupControls(camera, renderer);
setUpGUI();

setUpRoad(scene);
setupLights(scene);
setUpSunAndMoon(scene)
setupTrafficLights(scene);

let clock = new THREE.Clock();
let isPaused = false;
let animationSpeed = 1;

function animate() {
    requestAnimationFrame(animate);

    if (!isPaused) {
        const delta = clock.getDelta() * animationSpeed;
        moveVehicles(delta);
        updateSunAndMoon(delta, scene);
    }

    renderer.render(scene, camera);
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        isPaused = !isPaused;  // Alterna o estado de pausa
        // Quando sair da pausa, reinicia o clock para não acumular tempo
        if (!isPaused) {
            clock.getDelta();  // Reseta o delta para evitar saltos após a pausa
        }
    } else if (event.code === 'ArrowUp') {
        animationSpeed = Math.min(10, animationSpeed + 0.1);
    } else if (event.code === 'ArrowDown') {
        animationSpeed = Math.max(0.1, animationSpeed - 0.1);  // Diminui a velocidade da animação
    }
});

animate();

// Controle do semáforo
setInterval(controlTrafficLights, 3000);
