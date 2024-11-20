import * as THREE from 'three';
import { scene } from '../setup/scene.js';
import { crossing } from './road.js';
import { trafficLights } from './trafficLight.js';

const vehicles = [];

function createVehicle(direction) {
    const color = Math.random() * 0xffffff;
    // const vehicleGeometry = Math.random() < 0.33 ? createCar() : Math.random() > 0.5 ? createTruck() : createMotorcycle();
    const vehicleGeometry = new THREE.BoxGeometry(4, 2, 2);

    const vehicleMesh = new THREE.Mesh(vehicleGeometry, new THREE.MeshStandardMaterial({
        color: color,
        // metalness: 0.5,
        // roughness: 0,
    }));

    let position;
    if (direction === 'right') {
        position = new THREE.Vector3(-40, 2, -5);
    } else if (direction === 'left') {
        position = new THREE.Vector3(40, 2, 5);
    } else if (direction === 'up') {
        position = new THREE.Vector3(5, 2, -40);
    } else {
        position = new THREE.Vector3(-5, 2, 40);
    }

    // rotates the vehicle to face the right direction
    switch (direction) {
        case 'up':
        case 'down':
            vehicleMesh.rotation.y = Math.PI / 2;
            break;
        default:
            break;
    }

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


function moveVehicles(delta) {
    vehicles.forEach(vehicle => {
        const speed = vehicle.speed * vehicle.speedFactor * delta;

        // Reset speed to default
        vehicle.speed = 10;

        // Distance to the crossing
        const distanceToCrossing = vehicle.mesh.position.distanceTo(crossing.position);

        // Find the traffic light corresponding to the vehicle's direction
        const trafficLight = trafficLights.find(light => light.direction === vehicle.direction);

        // Check if the vehicle is approaching the crossing
        const isApproachingCrossing = distanceToCrossing < 15 && !isInCrossingZone(vehicle) && isCrossingAhead(vehicle);

        if (isApproachingCrossing && trafficLight.redLight.visible) {
            vehicle.speed = 0; // Stop the vehicle if the light is red and it is approaching
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

        // Collision avoidance with the car in front
        vehicles.forEach(otherVehicle => {
            if (otherVehicle !== vehicle && otherVehicle.direction === vehicle.direction) {
                const distance = vehicle.mesh.position.distanceTo(otherVehicle.mesh.position);
                const isAhead = isVehicleAhead(vehicle, otherVehicle);

                if (isAhead) {
                    if (distance < (8 / vehicle.speedFactor)) {
                        vehicle.speed = 0; // Stop the vehicle if too close
                    } else if (distance < 10) {
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
function isInCrossingZone(vehicle) {
    const pos = vehicle.mesh.position;
    const crossingBounds = {
        xMin: crossing.position.x - 12,
        xMax: crossing.position.x + 12,
        zMin: crossing.position.z - 12,
        zMax: crossing.position.z + 12,
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

