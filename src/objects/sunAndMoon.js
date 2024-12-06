import * as THREE from 'three';
import { camera } from '../setup/camera';
import { ambientLight, directionalLight } from '../setup/lights';
import { renderer } from '../setup/renderer';

const cycleTime = 100;
let timeElapsed = 0;

const sunGeometry = new THREE.SphereGeometry(6, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);

const moonGeometry = new THREE.SphereGeometry(2, 32, 32);
const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xbbbbbb });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);

const glowShader = {
    uniforms: {
        "c": { type: "f", value: 1.0 },
        "p": { type: "f", value: 1.4 },
        glowColor: { type: "c", value: new THREE.Color(0xffbb00) },
        viewVector: { type: "v3", value: camera.position }
    },
    vertexShader: `
        uniform vec3 viewVector;
        varying float intensity;
        void main() {
            vec3 vNormal = normalize( normalMatrix * normal );
            vec3 vNormel = normalize( normalMatrix * viewVector );
            intensity = pow( 0.8 - dot(vNormal, vNormel), 3.0 );
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `,
    fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() {
            vec3 glow = glowColor * intensity;
            gl_FragColor = vec4( glow, 1.0 );
        }
    `,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true
};
const glowGeometry = new THREE.SphereGeometry(6, 32, 32);
const glowMaterial = new THREE.ShaderMaterial(glowShader);
const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);

function setUpSunAndMoon(scene) {
    sun.castShadow = false;
    sun.position.set(60, 100, 0);
    scene.add(sun);

    moon.position.set(-60, 100, 0);
    scene.add(moon);

    glowMesh.scale.set(1.1, 1.1, 1.1);
    scene.add(glowMesh);
}

function updateSunAndMoon(delta) {
    timeElapsed += delta;

    let cycleProgress = (timeElapsed % cycleTime) / cycleTime;
    let angle = cycleProgress * Math.PI * 2;

    sun.position.x = Math.cos(angle) * 100;
    sun.position.y = Math.sin(angle) * 100;
    moon.position.x = -sun.position.x
    moon.position.y = -sun.position.y

    glowMesh.position.copy(sun.position);
    directionalLight.position.copy(sun.position);

    let sunHeight = sun.position.y / 100;
    sunHeight = Math.max(0, Math.min(1, sunHeight));

    const dayIntensity = 1;
    const nightIntensity = 0.2;
    directionalLight.intensity = THREE.MathUtils.lerp(nightIntensity, dayIntensity, sunHeight) + 1;
    ambientLight.intensity = THREE.MathUtils.lerp(0.3, 0.7, sunHeight);

    const daySkyColor = new THREE.Color(0x87ceeb);
    const nightSkyColor = new THREE.Color(0x000022);
    const currentSkyColor = daySkyColor.clone().lerp(nightSkyColor, 1 - sunHeight);

    renderer.setClearColor(currentSkyColor);

    const sunsetColor = new THREE.Color(0xff4500);
    directionalLight.color = sunsetColor.clone().lerp(new THREE.Color(0xffffff), sunHeight);
}

export { setUpSunAndMoon, updateSunAndMoon };
