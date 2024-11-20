import * as THREE from 'three';

function createCar() {
    const car = new THREE.Group();

    // Car body
    const bodyGeometry = new THREE.BoxGeometry(4, 1.5, 2);
    const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 1; // Raise the body
    car.add(body);

    // Car cabin
    const cabinGeometry = new THREE.BoxGeometry(2.5, 1, 1.5);
    const cabinMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
    cabin.position.set(0, 1.5, 0); // Position it on top of the body
    car.add(cabin);

    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 16);
    const wheelMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const wheelPositions = [
        [-1.5, 0.5, 1],
        [1.5, 0.5, 1],
        [-1.5, 0.5, -1],
        [1.5, 0.5, -1],
    ];

    wheelPositions.forEach(pos => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.rotation.z = Math.PI / 2; // Rotate so the wheels are horizontal
        wheel.position.set(...pos);
        car.add(wheel);
    });

    return car;
}

export { createCar };
