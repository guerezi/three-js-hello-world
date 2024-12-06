import * as THREE from 'three';
import { scene } from '../setup/scene.js';
import { crossing } from './road.js';
import { trafficLights } from './trafficLight.js';

import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const vehicles = [];

const carLoader = new OBJLoader();
const carMTLLoader = new MTLLoader();

function loadMaterials(url) {
    return new Promise((resolve, reject) => {
        carMTLLoader.load(
            url,
            (materials) => {
                materials.preload();
                resolve(materials);
            },
            undefined,
            (error) => reject(error)
        );
    });
}

function loadObject(url, materials) {
    return new Promise((resolve, reject) => {
        if (materials) carLoader.setMaterials(materials);

        carLoader.load(
            url,
            (object) => resolve(object),
            undefined,
            (error) => reject(error)
        );
    });
}

let debouncer = false;
let timer;
async function createVehicle(direction) {
    if (debouncer) return;
    clearTimeout(timer)
    timer = setTimeout(() => {
        debouncer = false;
    }, 1000)

    debouncer = true;

    if (vehicles.length > 10) return;

    const materials = await loadMaterials('/Car-Model/Car.mtl');

    materials.materials.Body.color.r = Math.random()
    materials.materials.Body.color.g = Math.random()
    materials.materials.Body.color.b = Math.random()

    const object = await loadObject('/Car-Model/Car.obj', materials);

    const vehicleMesh = object.clone();

    let position;
    if (direction === 'right') {
        position = new THREE.Vector3(-40, 0.4, 5);
    } else if (direction === 'left') {
        position = new THREE.Vector3(40, 0.4, -5);
    } else if (direction === 'up') {
        position = new THREE.Vector3(-5, 0.4, -40);
    } else {
        position = new THREE.Vector3(5, 0.4, 40);
    }

    switch (direction) {
        case 'right':
            vehicleMesh.rotation.y = Math.PI / 2;
            break;
        case 'left':
            vehicleMesh.rotation.y = -Math.PI / 2;
            break;
        case 'down':
            vehicleMesh.rotation.y = Math.PI;
            break;
        default:
            break;
    }

    vehicleMesh.scale.set(2.5, 2.5, 2.5);
    vehicleMesh.position.copy(position);
    vehicleMesh.castShadow = true;
    vehicleMesh.receiveShadow = true;

    vehicles.push({ mesh: vehicleMesh, direction, speed: 10, id: vehicles.length, speedFactor: 1 + Math.random() });

    scene.add(vehicleMesh);
}

function removeVehicle() {
    if (vehicles.length > 0) {
        const vehicle = vehicles.pop();
        scene.remove(vehicle.mesh);
    }
}

function moveVehicles(delta) {
    vehicles.forEach(vehicle => {
        const speed = vehicle.speed * vehicle.speedFactor * delta;

        vehicle.speed = 20;

        const distanceToCrossing = vehicle.mesh.position.distanceTo(crossing.position);
        const trafficLight = trafficLights.find(light => light.direction === vehicle.direction);
        const isApproachingCrossing = distanceToCrossing < 25 && !isInCrossingZone(vehicle) && isCrossingAhead(vehicle);

        if (isApproachingCrossing && trafficLight.redLight.visible) {
            vehicle.speed = 0;
        }

        const time = Date.now() * 0.005;
        const shakeAmplitude = 0.001;
        vehicle.mesh.position.z += Math.sin(time) * shakeAmplitude;


        switch (vehicle.direction) {
            case 'right':
                vehicle.mesh.position.x += speed;
                console.log(vehicle.mesh)
                if (vehicle.mesh.position.x > 40) vehicle.mesh.position.x = -40;
                break;
            case 'left':
                vehicle.mesh.position.x -= speed;
                if (vehicle.mesh.position.x < -40) vehicle.mesh.position.x = 40;
                break;
            case 'up':
                vehicle.mesh.position.z += speed;
                if (vehicle.mesh.position.z > 40) vehicle.mesh.position.z = -40;
                break;
            case 'down':
                vehicle.mesh.position.z -= speed;
                if (vehicle.mesh.position.z < -40) vehicle.mesh.position.z = 40;
                break;
        }

        vehicles.forEach(otherVehicle => {
            if (otherVehicle !== vehicle && otherVehicle.direction === vehicle.direction) {
                const distance = vehicle.mesh.position.distanceTo(otherVehicle.mesh.position);
                const isAhead = isVehicleAhead(vehicle, otherVehicle);

                if (isAhead) {
                    if (distance < (30 / vehicle.speedFactor)) {
                        vehicle.speed = 0;
                    } else if (distance < 30) {
                        vehicle.speed = 8;
                    }
                }

                if (isInCrossingZone(vehicle) && !isAhead) {
                    vehicle.speed = 8;
                }
            }
        });

    });
}

function isInCrossingZone(vehicle) {
    const pos = vehicle.mesh.position;
    const crossingBounds = {
        xMin: crossing.position.x - 10,
        xMax: crossing.position.x + 10,
        zMin: crossing.position.z - 10,
        zMax: crossing.position.z + 10,
    };

    return (
        pos.x > crossingBounds.xMin &&
        pos.x < crossingBounds.xMax &&
        pos.z > crossingBounds.zMin &&
        pos.z < crossingBounds.zMax
    );
}

function isVehicleAhead(vehicle, other) {
    switch (vehicle.direction) {
        case 'right':
            return other.mesh.position.x > vehicle.mesh.position.x;
        case 'left':
            return other.mesh.position.x < vehicle.mesh.position.x;
        case 'up':
            return other.mesh.position.z > vehicle.mesh.position.z;
        case 'down':
            return other.mesh.position.z < vehicle.mesh.position.z;
        default:
            return false;
    }
}

function isCrossingAhead(vehicle) {
    switch (vehicle.direction) {
        case 'right':
            return crossing.position.x > vehicle.mesh.position.x;
        case 'left':
            return crossing.position.x < vehicle.mesh.position.x;
        case 'up':
            return crossing.position.z > vehicle.mesh.position.z;
        case 'down':
            return crossing.position.z < vehicle.mesh.position.z;
        default:
            return false;
    }
}

export { createVehicle, moveVehicles, removeVehicle };

