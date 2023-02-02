import { _decorator, Component, Collider, ITriggerEvent, Constraint} from 'cc';
import { Constant } from '../framework/Constant';
const { ccclass, property } = _decorator;

@ccclass('SelfPlane')
export class SelfPlane extends Component {


    onEnable() {
        const collider = this.getComponent(Collider);
        collider.on('onTriggerEnter', this._onTriggerEnter, this);        
    }

    onDisable() {
        const collider = this.getComponent(Collider);
        collider.off('onTriggerEnter', this._onTriggerEnter, this);        
    }

    update(deltaTime: number) {
        
    }

    private _onTriggerEnter(event: ITriggerEvent) {
        const colliderGroup = event.otherCollider.getGroup();
        console.log('colliderGroup: ' + colliderGroup);

        if(colliderGroup === Constant.CollisionType.ENEMY || colliderGroup === Constant.CollisionType.ENEMY_BULLET) {
            console.log('reduce blood');
        }

    }

}

