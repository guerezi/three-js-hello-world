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
        this.pole.castShadow = true;
        scene.add(this.pole);

        // staff
        this.staff = new THREE.Mesh(
            new THREE.BoxGeometry(8, 0.5, 0.5),
            new THREE.MeshBasicMaterial({ color: 0x000000 })
        );
        this.staff.position.set(position.x, position.y + 10, position.z);
        this.staff.castShadow = true;
        scene.add(this.staff);

        // Red Light
        this.redLight = new THREE.Mesh(
            new THREE.BoxGeometry(2, 0.6, 0.6),
            new THREE.MeshBasicMaterial({ color: 0xff0000 })
        );
        this.redLight.position.set(position.x, position.y + 10, position.z);
        scene.add(this.redLight);

        this.redLightPoint = new THREE.PointLight(0xff0000, 1, 20, 1);
        this.redLightPoint.position.set(position.x, position.y + 8, position.z);
        this.redLightPoint.castShadow = true;
        scene.add(this.redLightPoint);

        // Green Light
        this.greenLight = new THREE.Mesh(
            new THREE.BoxGeometry(2, 0.6, 0.6),
            new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        );
        this.greenLight.position.set(position.x, position.y + 10, position.z);
        scene.add(this.greenLight);

        this.greenLightPoint = new THREE.PointLight(0x00ff00, 1, 20, 1);
        this.greenLightPoint.position.set(position.x, position.y + 6, position.z);
        this.greenLightPoint.castShadow = true;
        scene.add(this.greenLightPoint);


        if (direction === 'up') {
            this.staff.rotation.y = -Math.PI / 2;
            this.staff.position.z -= 3.75;

            this.redLightPoint.position.z -= 3.75;
            this.redLight.rotation.y = -Math.PI / 2;
            this.redLight.position.z -= 3.75;

            this.greenLightPoint.position.z -= 3.75;
            this.greenLight.rotation.y = -Math.PI / 2;
            this.greenLight.position.z -= 5.75;
        } else if (direction === 'down') {
            this.staff.rotation.y = Math.PI / 2;
            this.staff.position.z += 3.75;

            this.redLightPoint.position.z += 3.75;
            this.redLight.rotation.y = Math.PI / 2;
            this.redLight.position.z += 3.75;

            this.greenLightPoint.position.z += 3.75;
            this.greenLight.rotation.y = Math.PI / 2;
            this.greenLight.position.z += 5.75;
        } else if (direction === 'left') {
            this.staff.rotation.y = Math.PI;
            this.staff.position.x -= 3.75;

            this.redLightPoint.position.x -= 3.75;
            this.redLight.rotation.y = Math.PI;
            this.redLight.position.x -= 3.75;

            this.greenLightPoint.position.x -= 3.75;
            this.greenLight.rotation.y = Math.PI;
            this.greenLight.position.x -= 5.75;
        } else if (direction === 'right') {
            this.staff.rotation.y = 0;
            this.staff.position.x += 3.75;

            this.redLightPoint.position.x += 3.75;
            this.redLight.rotation.y = 0;
            this.redLight.position.x += 3.75;

            this.greenLightPoint.position.x += 3.75;
            this.greenLight.rotation.y = 0;
            this.greenLight.position.x += 5.75;
        }

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
    trafficLights.push(new TrafficLight(scene, { x: 12, y: 1, z: -12 }, 'down')); // East
    trafficLights.push(new TrafficLight(scene, { x: -12, y: 1, z: 12 }, 'up')); // West
    trafficLights.push(new TrafficLight(scene, { x: 12, y: 1, z: 12 }, 'left')); // North
    trafficLights.push(new TrafficLight(scene, { x: -12, y: 1, z: -12 }, 'right')); // South
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

