import * as THREE from 'three';

const crossingGeometry = new THREE.PlaneGeometry(20, 20);
const crossing = new THREE.Mesh(crossingGeometry, new THREE.MeshStandardMaterial({ color: 0x666666 }));

function setUpRoad(scene) {

    // const textureLoader = new THREE.TextureLoader();
    // const roadTexture = textureLoader.load('path/to/your/road_texture.jpg');  // Replace with the path to your texture
    // const roadNormalMap = textureLoader.load('path/to/your/road_normal_map.jpg'); // Replace with your normal map path

    // // https://www.sketchuptextureclub.com/textures/architecture/roads/roads

    // // Optionally, set the texture to repeat
    // roadTexture.wrapS = THREE.RepeatWrapping;
    // roadTexture.wrapT = THREE.RepeatWrapping;
    // roadTexture.repeat.set(10, 10);  // Adjust repetition based on road size

    // // Normal map repetition settings
    // roadNormalMap.wrapS = THREE.RepeatWrapping;
    // roadNormalMap.wrapT = THREE.RepeatWrapping;
    // roadNormalMap.repeat.set(10, 10);  // Same repeat as the diffuse map for consistency


    const roadGeometry = new THREE.PlaneGeometry(100, 100);
    const roadMaterial = new THREE.MeshStandardMaterial({
        color: 0x666666,
        side: THREE.DoubleSide,
        metalness: 0,
        roughness: 1,
    });
    const road = new THREE.Mesh(roadGeometry, roadMaterial);

    road.receiveShadow = true;
    road.rotation.x = -Math.PI / 2;
    road.position.y = 0;
    scene.add(road);

    crossing.receiveShadow = true;
    crossing.rotation.x = -Math.PI / 2;
    crossing.position.y = 0.1;
    scene.add(crossing);
}

export { crossing, setUpRoad };

