import * as THREE from 'three';

const crossingGeometry = new THREE.PlaneGeometry(20, 20);
const crossingMaterial = new THREE.MeshStandardMaterial();
const crossing = new THREE.Mesh(crossingGeometry, crossingMaterial);

function setUpRoad(scene) {
    const roadGeometry = new THREE.PlaneGeometry(100, 100, 20, 20);
    const roadTextureLoader = new THREE.TextureLoader();

    const roadBaseColor = roadTextureLoader.load('/Asphalt_005_SD/Asphalt_005_COLOR.jpg');
    const roadAmbientOcclusion = roadTextureLoader.load('/Asphalt_005_SD/Asphalt_005_OCC.jpg');
    const roadNormalMap = roadTextureLoader.load('/Asphalt_005_SD/Asphalt_005_NORM.jpg');
    const roadRoughnessMap = roadTextureLoader.load('/Asphalt_005_SD/Asphalt_005_ROUGH.jpg');
    const roadHeightMap = roadTextureLoader.load('/Asphalt_005_SD/Asphalt_005_DISP.png');

    const roadMaterial = new THREE.MeshStandardMaterial({
        map: roadBaseColor,
        aoMap: roadAmbientOcclusion,
        normalMap: roadNormalMap,
        roughnessMap: roadRoughnessMap,
        displacementMap: roadHeightMap,
        displacementScale: 0.3,
        side: THREE.DoubleSide,
        metalness: 0,
        roughness: 1,
    });

    roadGeometry.setAttribute('uv2', roadGeometry.attributes.uv);
    const road = new THREE.Mesh(roadGeometry, roadMaterial);

    roadBaseColor.wrapS = roadBaseColor.wrapT = THREE.RepeatWrapping;
    roadAmbientOcclusion.wrapS = roadAmbientOcclusion.wrapT = THREE.RepeatWrapping;
    roadNormalMap.wrapS = roadNormalMap.wrapT = THREE.RepeatWrapping;
    roadRoughnessMap.wrapS = roadRoughnessMap.wrapT = THREE.RepeatWrapping;
    roadHeightMap.wrapS = roadHeightMap.wrapT = THREE.RepeatWrapping;

    roadBaseColor.repeat.set(24, 24);
    roadAmbientOcclusion.repeat.set(24, 24);
    roadNormalMap.repeat.set(24, 24);
    roadRoughnessMap.repeat.set(24, 24);
    roadHeightMap.repeat.set(24, 24);

    road.receiveShadow = true;
    road.rotation.x = -Math.PI / 2;

    crossing.rotation.x = -Math.PI / 2;
    crossing.position.y = -0.01;

    scene.add(road, crossing);
}

export { crossing, setUpRoad };

