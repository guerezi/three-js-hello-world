import * as THREE from 'three';
import { scene } from '../setup/scene.js';
import { crossing } from './road.js';
import { trafficLights } from './trafficLight.js';

import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const vehicles = [];

const carLoader = new OBJLoader();
const carMTLLoader = new MTLLoader();

// Function to load materials with a promise
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

// Function to load the object with a promise
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
        position = new THREE.Vector3(-40, 0.4, -5);
    } else if (direction === 'left') {
        position = new THREE.Vector3(40, 0.4, 5);
    } else if (direction === 'up') {
        position = new THREE.Vector3(5, 0.4, -40);
    } else {
        position = new THREE.Vector3(-5, 0.4, 40);
    }

    // rotates the vehicle to face the right direction
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
    vehicleMesh.color = 0x000000;
    vehicleMesh.position.copy(position);
    vehicleMesh.castShadow = true;
    vehicleMesh.receiveShadow = true;  // Opcional: permite que o veículo também receba sombras

    vehicles.push({ mesh: vehicleMesh, direction, speed: 10, id: vehicles.length, speedFactor: 1 + Math.random() });

    scene.add(vehicleMesh);
}

function removeVehicle() {
    if (vehicles.length > 0) {
        const vehicle = vehicles.pop();
        scene.remove(vehicle.mesh);
    }
}

// TODO biblioteca colision box three
function moveVehicles(delta) {
    vehicles.forEach(vehicle => {
        const speed = vehicle.speed * vehicle.speedFactor * delta;

        vehicle.speed = 10;

        const distanceToCrossing = vehicle.mesh.position.distanceTo(crossing.position);
        const trafficLight = trafficLights.find(light => light.direction === vehicle.direction);
        const isApproachingCrossing = distanceToCrossing < 25 && !isInCrossingZone(vehicle) && isCrossingAhead(vehicle);


        if (isApproachingCrossing && trafficLight.redLight.visible) {
            vehicle.speed = 0;
            console.log(isApproachingCrossing)
            console.log((vehicle))
            console.log(isCrossingAhead(vehicle))
            console.log('-----------------')
        }

        // Move the vehicle based on its direction
        switch (vehicle.direction) {
            case 'right':
                vehicle.mesh.position.x += speed;
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
                        vehicle.speed = 0; // Stop the vehicle if too close
                    } else if (distance < 30) {
                        vehicle.speed = 8; // Slow down if moderately close
                    }
                }

                if (isInCrossingZone(vehicle) && !isAhead) {
                    vehicle.speed = 8; // Stop the vehicle if too close to the crossing
                }
            }
        });

    });
}

// Helper function to check if a vehicle is inside the crossing
function isInCrossingZone(vehicle) { //TODO,. FIX HERE
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

// Helper function to check if a vehicle is ahead
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

