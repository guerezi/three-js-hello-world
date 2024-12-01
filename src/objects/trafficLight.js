import * as THREE from 'three';

class TrafficLight {
    constructor(scene, position, direction) {
        this.direction = direction

        // Pole
        this.pole = new THREE.Mesh(
            new THREE.CylinderGeometry(0.3, 0.3, 10),
            new THREE.MeshStandardMaterial({
                color: 0x666666,
                metalness: 1,
                roughness: 0,
            })
        );
        this.pole.position.set(position.x, position.y + 5, position.z);
        this.pole.castShadow = true;
        scene.add(this.pole);

        // staff
        this.staff = new THREE.Mesh(
            new THREE.CylinderGeometry(0.3, 0.3, 10),
            new THREE.MeshStandardMaterial({
                color: 0x666666,
                metalness: 1,
                roughness: 0,
            })
        );
        this.staff.position.set(position.x, position.y + 10, position.z);
        this.staff.castShadow = true;
        scene.add(this.staff);

        // Red Light
        this.redLight = new THREE.Mesh(
            new THREE.CylinderGeometry(0.6, 0.6, 2),
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
            new THREE.CylinderGeometry(0.6, 0.6, 2),
            new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        );
        this.greenLight.position.set(position.x, position.y + 10, position.z);
        scene.add(this.greenLight);

        this.greenLightPoint = new THREE.PointLight(0x00ff00, 1, 20, 1);
        this.greenLightPoint.position.set(position.x, position.y + 6, position.z);
        this.greenLightPoint.castShadow = true;
        scene.add(this.greenLightPoint);


        if (direction === 'up') {
            this.staff.rotation.x = -Math.PI / 2;
            this.staff.position.z -= 4.7;

            this.redLightPoint.position.z -= 3.75;
            this.redLight.rotation.x = -Math.PI / 2;
            this.redLight.position.z -= 3.75;

            this.greenLightPoint.position.z -= 3.75;
            this.greenLight.rotation.x = -Math.PI / 2;
            this.greenLight.position.z -= 5.75;
        } else if (direction === 'down') {
            this.staff.rotation.x = Math.PI / 2;
            this.staff.position.z += 4.7;

            this.redLightPoint.position.z += 3.75;
            this.redLight.rotation.x = Math.PI / 2;
            this.redLight.position.z += 3.75;

            this.greenLightPoint.position.z += 3.75;
            this.greenLight.rotation.x = Math.PI / 2;
            this.greenLight.position.z += 5.75;
        } else if (direction === 'left') {
            this.staff.rotation.z = Math.PI / 2;
            this.staff.position.x -= 4.7;

            this.redLightPoint.position.x -= 3.75;
            this.redLight.rotation.z = Math.PI / 2;
            this.redLight.position.x -= 3.75;

            this.greenLightPoint.position.x -= 3.75;
            this.greenLight.rotation.z = Math.PI / 2;
            this.greenLight.position.x -= 5.75;
        } else if (direction === 'right') {
            this.staff.rotation.z = Math.PI / 2;
            this.staff.position.x += 4.7;

            this.redLightPoint.position.x += 3.75;
            this.redLight.rotation.z = Math.PI / 2;
            this.redLight.position.x += 3.75;

            this.greenLightPoint.position.x += 3.75;
            this.greenLight.rotation.z = Math.PI / 2;
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
    trafficLights.push(new TrafficLight(scene, { x: -12, y: 1, z: 12 }, 'up')); // West
    trafficLights.push(new TrafficLight(scene, { x: 12, y: 1, z: -12 }, 'down')); // East
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

