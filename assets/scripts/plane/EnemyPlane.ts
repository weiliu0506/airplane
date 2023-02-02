import { _decorator, Component, Node, sp, Prefab, instantiate, Collider, ITriggerEvent } from 'cc';
import { Bullet } from '../bullet/Bullet';
import { Constant } from '../framework/Constant';
const { ccclass, property } = _decorator;

const OUTOFBOUNCE = 50;

@ccclass('EnemyPlane')
export class EnemyPlane extends Component {

    @property(Prefab)
    public bullet01: Prefab | null = null;

    @property
    public createBulletTime = 0.5;

   
    private _bulletRoot:  Node | null = null;

    @property
    public bulletSpeed = 1;

    private _enemySpeed = 0;

    public enemyType = Constant.EnemyType.TYPE1;

    private _needBullet = false;
    private _currCreateBulletTime = 0;


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
        const moveLength = pos.z + this._enemySpeed
        this.node.setPosition(pos.x, pos.y, moveLength);
        
        if(moveLength > OUTOFBOUNCE) {
            this.node.destroy();
        }

        this._currCreateBulletTime += deltaTime;
        if (this._needBullet && this._currCreateBulletTime > this.createBulletTime) {
            this.createEnemyBullet();
            this._currCreateBulletTime = 0;
        }
    }

    public show(speed: number, needBullet: boolean, bulletRoot:  Node) {
        this._enemySpeed = speed;
        this._needBullet = needBullet;
        this._bulletRoot = bulletRoot;
    }

    public createEnemyBullet() {
        const bullet = instantiate(this.bullet01);
        bullet.setParent(this._bulletRoot);
        const pos = this.node.position;
        bullet.setPosition(pos.x, pos.y, pos.z + 7);
        const bulletComp = bullet.getComponent(Bullet);
        bulletComp.show(this.bulletSpeed, false);

        const collider = bullet.getComponent(Collider);
        collider.setGroup(Constant.CollisionType.ENEMY_BULLET);
        collider.setMask(Constant.CollisionType.PLAYER);
    }


    private _onTriggerEnter(event: ITriggerEvent) {
        const colliderGroup = event.otherCollider.getGroup();
        if(colliderGroup === Constant.CollisionType.PLAYER || colliderGroup === Constant.CollisionType.PLAYER_BULLET) {
            this.node.destroy();
        }

    }

}

