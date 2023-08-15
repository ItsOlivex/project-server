import { Controls } from './controls.js';


let socket = new WebSocket("ws://192.168.1.4:8080/controls");
const controls = new Controls();

socket.onopen = (e) => {
    controls.listeners(socket)
}

const interval = setInterval(main, 100);

function main() {
    controls.checkControls();
}
