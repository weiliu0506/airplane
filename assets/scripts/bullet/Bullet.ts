import { _decorator, Component, Node, Collider, ITriggerEvent } from 'cc';
import { Constant } from '../framework/Constant';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {

    private _bulletSpeed = 0;

    private _isPlayer = true;

    
    onEnable() {
        const collider = this.getComponent(Collider);
        collider.on('onTriggerEnter', this._onTriggerEnter, this);        
    }

    onDisable() {
        const collider = this.getComponent(Collider);
        collider.off('onTriggerEnter', this._onTriggerEnter, this);        
    }

    update(deltaTime: number) {
        const pos = this.node.position;

        if(this._isPlayer) {
            const moveLength = pos.z - this._bulletSpeed;
            this.node.setPosition(pos.x, pos.y, moveLength);

            if (moveLength < -50) {
                this.node.destroy();
                console.log('player bullet destroy');
            }
        }else {
            const moveLength = pos.z + this._bulletSpeed;
            this.node.setPosition(pos.x, pos.y, moveLength);

            if (moveLength > 50) {
                this.node.destroy();
                console.log('enemy bullet destroy');
            }
        }

        
    }


    show(speed: number, isPlayer: boolean) {
        this._bulletSpeed = speed;
        this._isPlayer = isPlayer;
    }


    private _onTriggerEnter(event: ITriggerEvent) {
        this.node.destroy();
    }
}

