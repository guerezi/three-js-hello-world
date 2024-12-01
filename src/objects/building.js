import * as THREE from 'three';

import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';


function loadMaterials(loader, url) {
    return new Promise((resolve, reject) => {
        loader.load(
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

function loadObject(loader, url, materials) {
    return new Promise((resolve, reject) => {
        if (materials) loader.setMaterials(materials);

        loader.load(
            url,
            (object) => resolve(object),
            undefined,
            (error) => reject(error)
        );
    });
}

async function setUpBuildings(scene) {
    // Sidewalk

    const sidewalk1Geometry = new THREE.BoxGeometry(40, 1, 40);
    const sidewalk1TextureLoader = new THREE.TextureLoader();

    const sidewalk1BaseColor = sidewalk1TextureLoader.load('/sidewalk/Arc_Pavement_001_basecolor.jpg');
    const sidewalk1AmbientOcclusion = sidewalk1TextureLoader.load('/sidewalk/Arc_Pavement_001_ambientOcclusion.jpg');
    const sidewalk1NormalMap = sidewalk1TextureLoader.load('/sidewalk/Arc_Pavement_001_normal.jpg');
    const sidewalk1RoughnessMap = sidewalk1TextureLoader.load('/sidewalk/Arc_Pavement_001_roughness.jpg');
    const sidewalk1HeightMap = sidewalk1TextureLoader.load('/sidewalk/Arc_Pavement_001_height.png');

    const sidewalk1Material = new THREE.MeshStandardMaterial({
        map: sidewalk1BaseColor,
        aoMap: sidewalk1AmbientOcclusion,
        normalMap: sidewalk1NormalMap,
        roughnessMap: sidewalk1RoughnessMap,
        displacementMap: sidewalk1HeightMap,
        displacementScale: 0.01,
        side: THREE.DoubleSide,
        metalness: 0,
        roughness: 1,
    });

    sidewalk1Geometry.setAttribute('uv2', sidewalk1Geometry.attributes.uv);
    const sidewalk1 = new THREE.Mesh(sidewalk1Geometry, sidewalk1Material);

    sidewalk1BaseColor.wrapS = sidewalk1BaseColor.wrapT = THREE.RepeatWrapping;
    sidewalk1AmbientOcclusion.wrapS = sidewalk1AmbientOcclusion.wrapT = THREE.RepeatWrapping;
    sidewalk1NormalMap.wrapS = sidewalk1NormalMap.wrapT = THREE.RepeatWrapping;
    sidewalk1RoughnessMap.wrapS = sidewalk1RoughnessMap.wrapT = THREE.RepeatWrapping;
    sidewalk1HeightMap.wrapS = sidewalk1HeightMap.wrapT = THREE.RepeatWrapping;

    sidewalk1BaseColor.repeat.set(16, 16);
    sidewalk1AmbientOcclusion.repeat.set(16, 16);
    sidewalk1NormalMap.repeat.set(16, 16);
    sidewalk1RoughnessMap.repeat.set(16, 16);
    sidewalk1HeightMap.repeat.set(16, 16);

    sidewalk1.castShadow = true;
    sidewalk1.receiveShadow = true;
    sidewalk1.position.set(-30, 0.5, -30);


    const sidewalk2 = sidewalk1.clone();
    sidewalk2.position.set(30, 0.5, -30);

    const sidewalk3 = sidewalk1.clone();
    sidewalk3.position.set(30, 0.5, 30);

    const sidewalk4 = sidewalk1.clone();
    sidewalk4.position.set(-30, 0.5, 30);

    scene.add(sidewalk1, sidewalk2, sidewalk3, sidewalk4);



    // LOT 1 and 2 - Buildings
    let buildingNYMaterials = await loadMaterials(new MTLLoader(), '/buildings/13940_New_York_City_Brownstone_Building_v1_l2.mtl');
    let buildingNYObecjt = await loadObject(new OBJLoader(), '/buildings/13940_New_York_City_Brownstone_Building_v1_l2.obj', buildingNYMaterials);

    buildingNYObecjt.scale.set(0.045, 0.045, 0.045);

    buildingNYObecjt.traverse(function (model) {
        if (model.isMesh) {
            model.castShadow = true;
            model.receiveShadow = true;
        }
    });

    let building1Obecjt = buildingNYObecjt.clone();
    let building2Obecjt = buildingNYObecjt.clone();
    let building3Obecjt = buildingNYObecjt.clone();
    let building4Obecjt = buildingNYObecjt.clone();

    building1Obecjt.position.set(-40, 0, -32);
    building1Obecjt.rotation.x = - Math.PI / 2;
    building1Obecjt.rotation.z = Math.PI / 2;

    building2Obecjt.position.set(-25, 0, -32);
    building2Obecjt.rotation.x = - Math.PI / 2;
    building2Obecjt.rotation.z = Math.PI / 2;

    building3Obecjt.position.set(40, 0, -32);
    building3Obecjt.rotation.x = - Math.PI / 2;
    building3Obecjt.rotation.z = Math.PI / 2;

    building4Obecjt.position.set(25, 0, -32);
    building4Obecjt.rotation.x = - Math.PI / 2;
    building4Obecjt.rotation.z = Math.PI / 2;

    scene.add(building1Obecjt, building2Obecjt, building3Obecjt, building4Obecjt);

    // LOT 3 - Parking lot
    let fenceMaterials = await loadMaterials(new MTLLoader(), '/Fence/Fence.mtl');
    let fenceObecjt = await loadObject(new OBJLoader(), '/Fence/model.obj', fenceMaterials);

    fenceObecjt.scale.set(2.25, 2, 2);
    fenceObecjt.castShadow = true;
    fenceObecjt.receiveShadow = true;

    fenceObecjt.traverse(function (model) {
        if (model.isMesh) {
            model.castShadow = true;
        }
    });

    let fence1 = fenceObecjt.clone();
    let fence2 = fenceObecjt.clone();

    fence1.position.set(20, 0, 27.6);
    fence1.rotation.y = - Math.PI / 2;

    fence2.position.set(20, 0, 42.5);
    fence2.rotation.y = - Math.PI / 2;

    scene.add(fence1, fence2);

    const parkinglotGeometry = new THREE.PlaneGeometry(30, 30);
    const parkinglotTextureLoader = new THREE.TextureLoader();

    const parkinglotBaseColor = parkinglotTextureLoader.load('/Asphalt_005_SD/Asphalt_005_COLOR.jpg');
    const parkinglotAmbientOcclusion = parkinglotTextureLoader.load('/Asphalt_005_SD/Asphalt_005_OCC.jpg');
    const parkinglotNormalMap = parkinglotTextureLoader.load('/Asphalt_005_SD/Asphalt_005_NORM.jpg');
    const parkinglotRoughnessMap = parkinglotTextureLoader.load('/Asphalt_005_SD/Asphalt_005_ROUGH.jpg');
    const parkinglotHeightMap = parkinglotTextureLoader.load('/Asphalt_005_SD/Asphalt_005_DISP.png');

    const parkinglotMaterial = new THREE.MeshStandardMaterial({
        map: parkinglotBaseColor,
        aoMap: parkinglotAmbientOcclusion,
        normalMap: parkinglotNormalMap,
        roughnessMap: parkinglotRoughnessMap,
        displacementMap: parkinglotHeightMap,
        displacementScale: 0.3,
        side: THREE.DoubleSide,
        metalness: 0,
        roughness: 1,
    });

    parkinglotGeometry.setAttribute('uv2', parkinglotGeometry.attributes.uv);
    const parkinglot = new THREE.Mesh(parkinglotGeometry, parkinglotMaterial);

    parkinglotBaseColor.wrapS = parkinglotBaseColor.wrapT = THREE.RepeatWrapping;
    parkinglotAmbientOcclusion.wrapS = parkinglotAmbientOcclusion.wrapT = THREE.RepeatWrapping;
    parkinglotNormalMap.wrapS = parkinglotNormalMap.wrapT = THREE.RepeatWrapping;
    parkinglotRoughnessMap.wrapS = parkinglotRoughnessMap.wrapT = THREE.RepeatWrapping;
    parkinglotHeightMap.wrapS = parkinglotHeightMap.wrapT = THREE.RepeatWrapping;

    parkinglotBaseColor.repeat.set(16, 16);
    parkinglotAmbientOcclusion.repeat.set(16, 16);
    parkinglotNormalMap.repeat.set(16, 16);
    parkinglotRoughnessMap.repeat.set(16, 16);
    parkinglotHeightMap.repeat.set(16, 16);

    parkinglot.receiveShadow = true;
    parkinglot.rotation.x = -Math.PI / 2;
    parkinglot.position.set(35, 1.01, 35);

    const car1Materials = await loadMaterials(new MTLLoader(), '/Car-Model/Car.mtl');
    car1Materials.materials.Body.color.r = Math.random()
    car1Materials.materials.Body.color.g = Math.random()
    car1Materials.materials.Body.color.b = Math.random()
    const car1Object = await loadObject(new OBJLoader(), '/Car-Model/Car.obj', car1Materials);

    car1Object.scale.set(2.5, 2.5, 2.5);
    car1Object.castShadow = true;
    car1Object.receiveShadow = true;
    car1Object.position.set(25, 1.2, 42);

    const car2Materials = await loadMaterials(new MTLLoader(), '/Car-Model/Car.mtl');
    car2Materials.materials.Body.color.r = Math.random()
    car2Materials.materials.Body.color.g = Math.random()
    car2Materials.materials.Body.color.b = Math.random()
    const car2Object = await loadObject(new OBJLoader(), '/Car-Model/Car.obj', car2Materials);

    car2Object.scale.set(2.5, 2.5, 2.5);
    car2Object.castShadow = true;
    car2Object.receiveShadow = true;
    car2Object.position.set(32, 1.2, 42);

    scene.add(parkinglot, car1Object, car2Object);

    // LOT 4 - Park
    const textureLoader = new THREE.TextureLoader();

    const colorTexture = textureLoader.load('Grass_001_SD/Grass_001_COLOR.jpg');
    const normalTexture = textureLoader.load('Grass_001_SD/Grass_001_NORM.jpg');
    const roughnessTexture = textureLoader.load('Grass_001_SD/Grass_001_ROUGH.jpg');
    const aoTexture = textureLoader.load('Grass_001_SD/Grass_001_OCC.jpg');
    const displacementTexture = textureLoader.load('Grass_001_SD/Grass_001_DISP.png');

    // Create the geometry and material
    const fieldGeometry = new THREE.PlaneGeometry(30, 30, 128, 128); // Add subdivisions for displacement
    const fieldMaterial = new THREE.MeshStandardMaterial({
        map: colorTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        aoMap: aoTexture,
        displacementMap: displacementTexture,
        displacementScale: 0.5,
    });

    // Create the mesh
    const field = new THREE.Mesh(fieldGeometry, fieldMaterial);

    field.receiveShadow = true;
    field.rotation.x = -Math.PI / 2;
    field.position.set(-35, 1.01, 35);

    scene.add(field);

    let treeMaterials = await loadMaterials(new MTLLoader(), '/cartoonTree/CartoonTree.mtl');
    let tree = await loadObject(new OBJLoader(), '/cartoonTree/CartoonTree.obj', treeMaterials);

    tree.traverse(function (model) {
        if (model.isMesh) {
            model.castShadow = true;
            model.receiveShadow = true;
        }
    });

    let tree1 = tree.clone();
    let tree2 = tree.clone();
    let tree3 = tree.clone();
    let tree4 = tree.clone();

    tree1.position.set(-45, 2, 45);
    tree2.position.set(-25, 2, 25);
    tree3.position.set(-45, 2, 25);
    tree4.position.set(-25, 2, 45);
    scene.add(tree1, tree2, tree3, tree4);

    let statueMaterials = await loadMaterials(new MTLLoader(), '/ParkStatue/10081_Park-Statue_V3_L3.mtl');
    let statueObecjt = await loadObject(new OBJLoader(), '/ParkStatue/10081_Park-Statue_V3_L3.obj', statueMaterials);

    statueObecjt.traverse(function (model) {
        if (model.isMesh) {
            model.castShadow = true;
            model.receiveShadow = true;
        }
    });

    statueObecjt.position.set(-35, 1, 35);
    statueObecjt.rotation.x = - Math.PI / 2;
    statueObecjt.rotation.z = Math.PI / 2;
    statueObecjt.scale.set(0.03, 0.03, 0.03);
    statueObecjt.castShadow = true;

    scene.add(statueObecjt);

    let benchMaterial = await loadMaterials(new MTLLoader(), '/ConcreteBench/ConcreteBench-L3.mtl');
    let benchObject = await loadObject(new OBJLoader(), '/ConcreteBench/ConcreteBench-L3.obj', benchMaterial);

    benchObject.traverse(function (model) {
        if (model.isMesh) {
            model.castShadow = true;
            model.receiveShadow = true;
        }
    });

    let bench1 = benchObject.clone();
    let bench2 = benchObject.clone();

    bench1.position.set(-35, 1, 25);
    bench1.rotation.x = - Math.PI / 2;
    bench1.scale.set(0.03, 0.03, 0.03);
    bench1.castShadow = true;

    bench2.position.set(-25, 1, 35);
    bench2.rotation.x = - Math.PI / 2;
    bench2.rotation.z = - Math.PI / 2;
    bench2.scale.set(0.03, 0.03, 0.03);
    bench2.castShadow = true;

    scene.add(bench1, bench2);

}

export { setUpBuildings };

