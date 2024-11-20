import * as THREE from 'three';

function createMotorcycle() {
    const motorcycle = new THREE.Group();

    // Motorcycle body
    const bodyGeometry = new THREE.BoxGeometry(2, 0.5, 0.75);
    const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.75;
    motorcycle.add(body);

    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.25, 16);
    const wheelMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const wheelPositions = [
        [-1, 0.5, 0], // Front
        [1, 0.5, 0], // Back
    ];

    wheelPositions.forEach(pos => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(...pos);
        motorcycle.add(wheel);
    });

    // Handlebars
    const handlebarGeometry = new THREE.BoxGeometry(0.75, 0.1, 0.1);
    const handlebarMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
    const handlebars = new THREE.Mesh(handlebarGeometry, handlebarMaterial);
    handlebars.position.set(-1, 1.1, 0); // Position at the front
    motorcycle.add(handlebars);

    return motorcycle;
}

export { createMotorcycle };
