import { _decorator, Component, Node, Input, EventTouch } from 'cc';
import { GameManager } from '../framework/GameManager';
const { ccclass, property } = _decorator;

@ccclass('UIMain')
export class UIMain extends Component {


    @property
    public planeSpeed = 10;

    @property(Node)
    public playerPlane: Node | null = null;

    @property(GameManager)
    public gameMamager: GameManager | null = null;


    start() {
        this.node.on(Input.EventType.TOUCH_START, this._touchStart, this);
        this.node.on(Input.EventType.TOUCH_MOVE, this._touchMove, this);
        this.node.on(Input.EventType.TOUCH_END, this._touchEnd, this);
    }

    update(deltaTime: number) {
        
    }

    _touchStart(event: EventTouch) {
        this.gameMamager.isShooting(true);
    }

    _touchMove(event: EventTouch) {
        const delta = event.getDelta()
        let pos = this.playerPlane.position;
        const r = 0.01
        this.playerPlane.setPosition(pos.x + r * delta.x * this.planeSpeed, pos.y, pos.z - r * delta.y * this.planeSpeed);
    }

    _touchEnd(event: EventTouch) {
        this.gameMamager.isShooting(false);
        
    }
}

