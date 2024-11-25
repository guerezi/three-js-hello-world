import * as THREE from 'three';

import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

function setUpBuildings(scene) {
    const building1Geometry = new THREE.BoxGeometry(30, 40, 30);
    const building1Material = new THREE.MeshStandardMaterial({ color: 0x666666 });
    const building1 = new THREE.Mesh(building1Geometry, building1Material);

    building1.castShadow = true;
    building1.position.set(-35, 20, -35);

    const sidewalk1Geometry = new THREE.BoxGeometry(40, 1, 40);
    const sidewalk1Material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
    const sidewalk1 = new THREE.Mesh(sidewalk1Geometry, sidewalk1Material);

    sidewalk1.castShadow = true;
    sidewalk1.position.set(-30, 0.5, -30);

    scene.add(building1, sidewalk1);

    const parkingLotGeometry = new THREE.PlaneGeometry(30, 30);
    const parkingLotMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        metalness: 0,
        roughness: 1,
    });
    const parkingLot = new THREE.Mesh(parkingLotGeometry, parkingLotMaterial);

    parkingLot.receiveShadow = true;
    parkingLot.rotation.x = -Math.PI / 2;
    parkingLot.position.y = 0;
    parkingLot.position.set(35, 1.01, 35);

    const sidewalk2Geometry = new THREE.BoxGeometry(40, 1, 40);
    const sidewalk2Material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
    const sidewalk2 = new THREE.Mesh(sidewalk2Geometry, sidewalk2Material);

    sidewalk2.castShadow = true;
    sidewalk2.position.set(30, 0.5, 30);

    scene.add(parkingLot, sidewalk2);

    const building3Geometry = new THREE.BoxGeometry(30, 30, 30);
    const building3Material = new THREE.MeshStandardMaterial({ color: 0x666666 });
    const building3 = new THREE.Mesh(building3Geometry, building3Material);

    building3.castShadow = true;
    building3.position.set(35, 15, -35);

    const sidewalk3Geometry = new THREE.BoxGeometry(40, 1, 40);
    const sidewalk3Material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
    const sidewalk3 = new THREE.Mesh(sidewalk3Geometry, sidewalk3Material);

    sidewalk3.castShadow = true;
    sidewalk3.position.set(30, 0.5, -30);

    scene.add(building3, sidewalk3);


    const fieldGeometry = new THREE.PlaneGeometry(30, 30);
    const fieldMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        metalness: 0,
        roughness: 1,
    });
    const field = new THREE.Mesh(fieldGeometry, fieldMaterial);

    field.receiveShadow = true;
    field.rotation.x = -Math.PI / 2;
    field.position.y = 0;
    field.position.set(-35, 1.01, 35);

    const sidewalk4Geometry = new THREE.BoxGeometry(40, 1, 40);
    const sidewalk4Material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
    const sidewalk4 = new THREE.Mesh(sidewalk4Geometry, sidewalk4Material);

    sidewalk4.castShadow = true;
    sidewalk4.position.set(-30, 0.5, 30);

    scene.add(field, sidewalk4);

    const treeLoader = new OBJLoader();
    const treeMTLLoader = new MTLLoader();

    treeMTLLoader.load('/cartoonTree/CartoonTree.mtl', function (materials) {
        materials.preload();
        treeLoader.setMaterials(materials);
    });

    treeLoader.load('/cartoonTree/CartoonTree.obj', function (object) {
        let tree1 = object.clone();

        tree1.position.set(-45, 2, 45);
        tree1.castShadow = true;

        let tree2 = object.clone();

        tree2.position.set(-25, 2, 25);
        tree2.castShadow = true;

        let tree3 = object.clone();

        tree3.position.set(-45, 2, 25);
        tree3.castShadow = true;

        let tree4 = object.clone();

        tree4.position.set(-25, 2, 45);
        tree4.castShadow = true;

        scene.add(tree1, tree2, tree3, tree4);
    });

    const statueLoader = new OBJLoader();
    const statueMTLLoader = new MTLLoader();

    statueMTLLoader.load('/ParkStatue_L3.123c3890953a-87f2-41fb-83c3-cf54cbff7f7d/10081_Park-Statue_V3_L3.mtl', function (materials) {
        materials.preload();
        statueLoader.setMaterials(materials);
    });

    statueLoader.load('/ParkStatue_L3.123c3890953a-87f2-41fb-83c3-cf54cbff7f7d/10081_Park-Statue_V3_L3.obj', function (object) {
        object.position.set(-35, 1, 35);
        object.rotation.x = - Math.PI / 2;
        object.rotation.z = Math.PI / 2;
        object.scale.set(0.03, 0.03, 0.03);
        object.castShadow = true;

        scene.add(object);
    });

    const benchLoader = new OBJLoader();
    const benchMTLLoader = new MTLLoader();

    benchMTLLoader.load('/ConcreteBench_L3.123c0afe9d8a-57a5-4112-909e-de9cf6033bae/ConcreteBench-L3.mtl', function (materials) {
        materials.preload();
        benchLoader.setMaterials(materials);
    });

    benchLoader.load('/ConcreteBench_L3.123c0afe9d8a-57a5-4112-909e-de9cf6033bae/ConcreteBench-L3.obj', function (object) {
        object.position.set(-35, 1, 25);
        object.rotation.x = - Math.PI / 2;
        object.scale.set(0.03, 0.03, 0.03);
        object.castShadow = true;

        let bench = object.clone();

        bench.position.set(-25, 1, 35);
        bench.rotation.x = - Math.PI / 2;
        bench.rotation.z = - Math.PI / 2;
        bench.scale.set(0.03, 0.03, 0.03);
        bench.castShadow = true;

        scene.add(bench, object);
    });
}

export { setUpBuildings };

