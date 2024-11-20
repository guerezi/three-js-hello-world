import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { camera } from '../setup/camera';
import { renderer } from '../setup/renderer';

const controls = new OrbitControls(camera, renderer.domElement);

function setupControls() {
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
}

export { setupControls };

