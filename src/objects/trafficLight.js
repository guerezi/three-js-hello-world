import * as THREE from 'three';

class TrafficLight {
    constructor(scene, position, direction) {
        this.direction = direction

        // Pole
        this.pole = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 10, 0.5),
            new THREE.MeshBasicMaterial({ color: 0x000000 })
        );
        this.pole.position.set(position.x, position.y + 5, position.z);
        scene.add(this.pole);

        // Red Light
        this.redLight = new THREE.Mesh(
            new THREE.BoxGeometry(0.6, 2, 0.6),
            new THREE.MeshBasicMaterial({ color: 0xff0000 })
        );
        this.redLight.position.set(position.x, position.y + 8, position.z);
        scene.add(this.redLight);

        this.redLightPoint = new THREE.PointLight(0xff0000, 1, 20, 1);
        this.redLightPoint.position.set(position.x, position.y + 8, position.z);
        scene.add(this.redLightPoint);

        // Green Light
        this.greenLight = new THREE.Mesh(
            new THREE.BoxGeometry(0.6, 2, 0.6),
            new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        );
        this.greenLight.position.set(position.x, position.y + 6, position.z);
        scene.add(this.greenLight);

        this.greenLightPoint = new THREE.PointLight(0x00ff00, 1, 20, 1);
        this.greenLightPoint.position.set(position.x, position.y + 6, position.z);
        scene.add(this.greenLightPoint);


        // Initial state
        this.setRedLight(false);
    }

    setRedLight(state) {
        this.redLight.visible = !state;
        this.redLightPoint.visible = !state;
        this.greenLight.visible = state;
        this.greenLightPoint.visible = state;
    }
}

let trafficLights = [];

function setupTrafficLights(scene) {
    trafficLights.push(new TrafficLight(scene, { x: 7, y: 0, z: -12 }, 'down')); // East
    trafficLights.push(new TrafficLight(scene, { x: -7, y: 0, z: 12 }, 'up')); // West
    trafficLights.push(new TrafficLight(scene, { x: 12, y: 0, z: 7 }, 'left')); // North
    trafficLights.push(new TrafficLight(scene, { x: -12, y: 0, z: -7 }, 'right')); // South
}

let lightIteration = 0;

function controlTrafficLights() {
    const loop = lightIteration % 3;

    trafficLights.find(light => light.direction === 'up').setRedLight(loop === 0);
    trafficLights.find(light => light.direction === 'down').setRedLight(loop === 0);
    trafficLights.find(light => light.direction === 'right').setRedLight(loop === 1);
    trafficLights.find(light => light.direction === 'left').setRedLight(loop === 2);

    lightIteration++;
}

export { controlTrafficLights, setupTrafficLights, trafficLights };

