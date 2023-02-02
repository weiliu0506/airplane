import { _decorator, Component, Node, Prefab, instantiate, math } from 'cc';
import { Bullet } from '../bullet/Bullet';
import { EnemyPlane } from '../plane/EnemyPlane';
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

    private _curCreateEnemyTime = 0;
    private _combinationInterval = 1;

    start() {
        this._init();
    }

    update(deltaTime: number) {
        this._curShootTime += deltaTime;
        if (this._isShooting && this._curShootTime > this.shootTime) {
            this.createPlayerBullet();
            this._curShootTime = 0;
        }
        
        this._curCreateEnemyTime += deltaTime;

        if(this._combinationInterval === Constant.CombinationType.PLANE1) {
            if(this._curCreateEnemyTime > this.createEnemyTime) {
                this.createEnemyPlane();
                this._curCreateEnemyTime = 0;
            }    
        }else if(this._combinationInterval === Constant.CombinationType.PLANE2) {
            if(this._curCreateEnemyTime > this.createEnemyTime * 0.8) {
                const randomCombination = math.randomRangeInt(1,3);
                if(randomCombination === Constant.CombinationType.PLANE2) {
                    this.createCombination1();
                }else {
                    this.createEnemyPlane();
                }
                this._curCreateEnemyTime = 0;
            }
        }else {
            if(this._curCreateEnemyTime > this.createEnemyTime * 0.8) {
                const randomCombination = math.randomRangeInt(1,4);
                if(randomCombination === Constant.CombinationType.PLANE2) {
                    this.createCombination1();
                }else if(randomCombination === Constant.CombinationType.PLANE3) {
                    this.createCombination2();
                }else {
                    this.createEnemyPlane();
                }
                this._curCreateEnemyTime = 0;
            }
        }
    }

    //创建玩家子弹
    public createPlayerBullet() {
        const bullet = instantiate(this.bullet01);
        bullet.setParent(this.bulletRoot);
        const pos = this.playerPlane.position;
        bullet.setPosition(pos.x, pos.y, pos.z - 7);
        const bulletComp = bullet.getComponent(Bullet);
        bulletComp.show(this.bulletSpeed, true);
    }

    

    private _init() {
        this._curShootTime = this.shootTime;
        this.changePlaneMode();
    }

    //创建敌机
    public createEnemyPlane() {
        const whichEnemy= math.randomRangeInt(1,3);
        let prefab: Prefab = null;
        let speed = 0;
        if (whichEnemy === Constant.EnemyType.TYPE1) {
            prefab = this.enemy01;
            speed = this.enemy01Speed;
        }else {
            prefab = this.enemy02;
            speed = this.enemy02Speed;
        }

        const enemy = instantiate(prefab);
        enemy.setParent(this.node);
        const enemyComp = enemy.getComponent(EnemyPlane);
        enemyComp.show(speed, true, this.bulletRoot);

        const randomPos = math.randomRangeInt(-25, 26);
        enemy.setPosition(randomPos, 0, -50);
    }

    //创建组合1
    public createCombination1() {
        const enemyArray = new Array<Node>(5);
        for (let index = 0; index < enemyArray.length; index++) {
            enemyArray[index] = instantiate(this.enemy01);
            const element = enemyArray[index];
            element.setParent(this.node);
            element.setPosition(20 - index * 10, 0, -50);
            const enemyComp = element.getComponent(EnemyPlane);
            enemyComp.show(this.enemy01Speed, false, this.bulletRoot);
        }
    }

    //创建组合2
    public createCombination2() {
        const enemyArray = new Array<Node>(7);

        const CombinationPos = [
            -15, 0, -65,
            -10, 0, -60,
            -5, 0, -55,
            0, 0, -50,
            5, 0, -55,
            10, 0, -60,
            15, 0, -65
        ];

        for (let index = 0; index < enemyArray.length; index++) {
            enemyArray[index] = instantiate(this.enemy02);
            const element = enemyArray[index];
            element.setParent(this.node);
            element.setPosition(CombinationPos[index*3], CombinationPos[index*3+1], CombinationPos[index*3+2]);
            const enemyComp = element.getComponent(EnemyPlane);
            enemyComp.show(this.enemy02Speed, false, this.bulletRoot);
        }
    }

    //是否开火
    public isShooting(value : boolean) {
        this._isShooting = value;
    }

    //定时调度切换飞机模式
    private changePlaneMode() {
        this.schedule(this._modeChanged, 10, 3);
    }

    private _modeChanged() {
        this._combinationInterval++;
    }
}

