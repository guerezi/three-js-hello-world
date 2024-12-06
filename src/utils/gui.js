import * as dat from 'dat.gui';
import { createVehicle, removeVehicle } from '../objects/vehicle';

function setUpGUI() {
    const gui = new dat.GUI();
    const settings = {
        createVehicle: () => createVehicle('right'),
        createVehicleUp: () => createVehicle('up'),
        createVehicleLeft: () => createVehicle('left'),
        createVehicleDown: () => createVehicle('down'),
        removeVehicle: () => removeVehicle()
    };

    gui.add(settings, 'createVehicle').name('Add Vehicle Right');
    gui.add(settings, 'createVehicleUp').name('Add Vehicle Up');
    gui.add(settings, 'createVehicleLeft').name('Add Vehicle Left');
    gui.add(settings, 'createVehicleDown').name('Add Vehicle Down');
    gui.add(settings, 'removeVehicle').name('Remove Vehicle');
}

export { setUpGUI };
