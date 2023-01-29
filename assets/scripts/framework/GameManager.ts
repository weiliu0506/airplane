import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { Bullet } from '../bullet/Bullet';
import { Constant } from './Constant';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property(Node)
    public playerPlane: Node | null = null;

    @property(Prefab)
    public bullet01: Prefab | null = null;

    @property(Prefab)
    public bullet02: Prefab | null = null;

    @property(Prefab)
    public bullet03: Prefab | null = null;

    @property(Prefab)
    public bullet04: Prefab | null = null;

    @property(Prefab)
    public bullet05: Prefab | null = null;

    @property(Prefab)
    public enemy01: Prefab | null = null;

    @property(Prefab)
    public enemy02: Prefab | null = null;

    @property
    public createEnemyTime = 1;

    @property
    public enemy01Speed = 0.5;

    @property
    public enemy02Speed = 0.7;


    @property
    public shootTime = 0.3;

    @property
    public bulletSpeed = 1;

    @property(Node)
    public bulletRoot:  Node | null = null;

    private _curShootTime = 0;
    private _isShooting = false;

    private curCreateEnemyTime = 0;
    private _combinationInterval = 0;

    start() {
        this._init();
    }

    update(deltaTime: number) {
        this._curShootTime += deltaTime;
        if (this._isShooting && this._curShootTime > this.shootTime) {
            this.createPlayerBullet();
            this._curShootTime = 0;
        }

        switch (this._combinationInterval) {
            case Constant.CombinationType.PLANE1:
                
                break;
        
            case Constant.CombinationType.PLANE2:
                
                break;
            
            case Constant.CombinationType.PLANE3:
            
                break;
        }
        
    }

    public createPlayerBullet() {
        const bullet = instantiate(this.bullet01);
        bullet.setParent(this.bulletRoot);
        const pos = this.playerPlane.position;
        bullet.setPosition(pos.x, pos.y, pos.z - 7);
        const bulletComp = bullet.getComponent(Bullet);
        bulletComp.bulletSpeed = this.bulletSpeed;
    }

    private _init() {
        this._curShootTime = this.shootTime;
        this.changePlaneMode();
    }

    public isShooting(value : boolean) {
        this._isShooting = value;
    }

    private changePlaneMode() {
        this.schedule(this._modeChanged, 10, 3);
    }

    private _modeChanged() {
        this._combinationInterval++;
    }
}

