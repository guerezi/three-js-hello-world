import * as THREE from 'three';

function createTruck() {
    const truck = new THREE.Group();

    // Truck body (rear cargo part)
    const rearGeometry = new THREE.BoxGeometry(6, 2, 2.5);
    const rearMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const rear = new THREE.Mesh(rearGeometry, rearMaterial);
    rear.position.y = 1.5;
    truck.add(rear);

    // Truck cabin
    const cabinGeometry = new THREE.BoxGeometry(2.5, 1.75, 2.5);
    const cabinMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
    cabin.position.set(-2.5, 1.75, 0); // Attach it to the front
    truck.add(cabin);

    // Wheels (more wheels for the truck)
    const wheelGeometry = new THREE.CylinderGeometry(0.75, 0.75, 0.75, 16);
    const wheelMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const wheelPositions = [
        [-2.5, 0.75, 1.25], // Front left
        [-2.5, 0.75, -1.25], // Front right
        [1.5, 0.75, 1.25], // Rear left
        [1.5, 0.75, -1.25], // Rear right
        [3.5, 0.75, 1.25], // Extra rear left
        [3.5, 0.75, -1.25], // Extra rear right
    ];

    wheelPositions.forEach(pos => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(...pos);
        truck.add(wheel);
    });

    return truck;
}

export { createTruck };
