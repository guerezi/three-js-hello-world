import * as THREE from 'three';
import { camera } from '../setup/camera';
import { ambientLight, directionalLight } from '../setup/lights';
import { renderer } from '../setup/renderer';

const cycleTime = 100;  // Tempo total para cada ciclo (em segundos)
let timeElapsed = 0; // Tempo decorrido desde o início do ciclo

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
    sun.position.set(30, 50, 0);
    scene.add(sun);

    moon.position.set(-30, 50, 0);
    scene.add(moon);

    glowMesh.scale.set(1.1, 1.1, 1.1); // Slightly larger than the sun
    scene.add(glowMesh);
}


function updateSunAndMoon(delta) {
    timeElapsed += delta;

    // Normaliza o tempo entre 0 e 1, onde 0 é o nascer do sol e 1 o pôr do sol
    let cycleProgress = (timeElapsed % cycleTime) / cycleTime;
    let angle = cycleProgress * Math.PI * 2; // Converte o progresso do ciclo para um ângulo em radianos

    // Atualiza a posição do Sol e da Lua ao longo de uma órbita suave
    sun.position.x = Math.cos(angle) * 50;
    sun.position.y = Math.sin(angle) * 50;

    moon.position.x = -sun.position.x // Math.cos(angle + Math.PI) * 50; // Lua está sempre oposta ao Sol
    moon.position.y = -sun.position.y // Math.sin(angle + Math.PI) * 50;

    glowMesh.position.copy(sun.position); // Posiciona o brilho do Sol no mesmo lugar que o Sol

    directionalLight.position.copy(sun.position); // Luz direcional segue o Sol

    // Transição suave entre dia e noite
    let sunHeight = sun.position.y / 50; // Altura normalizada do Sol (entre -1 e 1)
    sunHeight = Math.max(0, Math.min(1, sunHeight)); // Limitando valores entre 0 e 1

    // Interpolação da intensidade da luz (transição suave)
    const dayIntensity = 1;
    const nightIntensity = 0.2;
    directionalLight.intensity = THREE.MathUtils.lerp(nightIntensity, dayIntensity, sunHeight);
    ambientLight.intensity = THREE.MathUtils.lerp(0.3, 0.7, sunHeight);

    // Interpolação da cor do céu (transição suave)
    const daySkyColor = new THREE.Color(0x87ceeb); // Céu azul durante o dia
    const nightSkyColor = new THREE.Color(0x000022); // Céu escuro durante a noite
    const currentSkyColor = daySkyColor.clone().lerp(nightSkyColor, 1 - sunHeight);

    // Aplicar a cor gradiente ao fundo da cena
    renderer.setClearColor(currentSkyColor);

    // (Opcional) Você pode também ajustar a cor da luz direcional para imitar o pôr do sol
    const sunsetColor = new THREE.Color(0xff4500); // Cor alaranjada do pôr do sol
    directionalLight.color = sunsetColor.clone().lerp(new THREE.Color(0xffffff), sunHeight);
}

export { setUpSunAndMoon, updateSunAndMoon };
