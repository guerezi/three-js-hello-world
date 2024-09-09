import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// Criação da cena
const scene = new THREE.Scene();

// Consfiguração inicial da câmera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Criação do renderizador (WebGL)
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Não entendi o que isso faz
document.body.appendChild(renderer.domElement);

// Criação de controles para a câmera (OrbitControls importado)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// Criação do cubo com cor inicial 
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true; // Esse é pra luz
scene.add(cube);

// Adiciona informações de moviento para o cubo
const moveSpeed = 0.1;
const movement = { forward: false, backward: false, left: false, right: false, up: false, down: false };

// Criação do piso (só pra ter sombra )
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
// Coloca na horizontal e abaixo do cubo (-1), o cubo inicia em 0,0,0 como não especifiquei
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1;
floor.receiveShadow = true; // Tem sombra nele tbm
scene.add(floor);

// Adiciona luz ambiente e direcional
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Luz 100% branca feia
scene.add(ambientLight);

// Luz spot em cima da cena, branca também 
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(0, 10, 0);
directionalLight.position.set(1, 10, 1);
directionalLight.castShadow = true;
// Configurações da sombra da luz spot 
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;
scene.add(directionalLight);


// Criação do loop de animação, atualiza a cena a cada frame
// Deus me perdoe mas isso parece feio demais
function animate() {
    requestAnimationFrame(animate);

    controls.update();
    updateCubePosition();

    renderer.render(scene, camera);
}
animate();

// Atualiza o tamanho do renderizador e da câmera quando a janela é redimensionada
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Função para atualizar a posição do cubo com base nos controles de movimento
function updateCubePosition() {
    if (movement.forward) cube.position.z -= moveSpeed;
    if (movement.backward) cube.position.z += moveSpeed;
    if (movement.left) cube.position.x -= moveSpeed;
    if (movement.right) cube.position.x += moveSpeed;
    if (movement.up) cube.position.y += moveSpeed;
    if (movement.down) cube.position.y -= moveSpeed;
}

function nextInt(value) {
    return Math.floor(Math.random() * value);
}

// Eventos de teclado para mudar a cor do cubo e movimentar (keyDown)
window.addEventListener('keydown', (event) => {
    if (event.key === 'z') cube.material.color.setHex(Math.random() * 0xffffff);
    else if (event.key === 'x') cube.material.color.set(`hsl(${nextInt(180)}, ${nextInt(100)}%, ${nextInt(100)}%)x`)
    else if (event.key === 'r') cube.material.color.set('red')
    else if (event.key === 'g') cube.material.color.set('rgb(0,255,0)')
    else if (event.key === 'b') cube.material.color.set('rgb(0%,0%,100%)')

    // Controles de movimento
    if (event.key == 'w') movement.forward = true;
    if (event.key == 's') movement.backward = true;
    if (event.key == 'a') movement.left = true;
    if (event.key == 'd') movement.right = true;
    if (event.key == ' ') movement.up = true;
    if (event.key == 'Shift') movement.down = true;
});

// Eventos de teclado para parar a movimentação (keyUp)
window.addEventListener('keyup', (event) => {
    if (event.key == 'w') movement.forward = false;
    if (event.key == 's') movement.backward = false;
    if (event.key == 'a') movement.left = false;
    if (event.key == 'd') movement.right = false;
    if (event.key == ' ') movement.up = false;
    if (event.key == 'Shift') movement.down = false;
});
