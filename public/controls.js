export class Controls {
    constructor() {
        this.forward = false;
        this.back = false;
        this.left = false;
        this.right = false;
    }

    listeners(socket) {
        document.addEventListener('keydown', (e) => {
            if (e.repeat) return;
            switch(e.keyCode) {
                case 87: //w
                    this.forward = true;
                    this.sendData("1", socket);
                    break;
                case 83: //s
                    this.back = true;
                    this.sendData("2", socket);
                    break;
                case 65: //a
                    this.left = true;
                    this.sendData("3", socket);
                    break;
                case 68: //d
                    this.right = true;
                    this.sendData("4", socket);
                    break;
            }
        });
        document.addEventListener('keyup', (e) => {
            switch(e.keyCode) {
                case 87: //w
                    this.forward = false;
                    this.sendData("0", socket);
                    break;
                case 83: //s
                    this.back = false;
                    this.sendData("0", socket);
                    break;
                case 65: //a
                    this.left = false;
                    this.sendData("0", socket);
                    break;
                case 68: //d
                    this.right = false;
                    this.sendData("0", socket);
                    break;
            }
        });
    }

    checkActive(action, className) {
        if (action) {
            document.querySelector(className).classList.add('active')
        } else {
            document.querySelector(className).classList.remove('active')
        }
    }

    checkControls() {
        this.checkActive(this.forward, '.w');
        this.checkActive(this.back, '.s');
        this.checkActive(this.left, '.a');
        this.checkActive(this.right, '.d');
    }

    sendData(cmd, socket) {
        socket.send(cmd);
    }
}