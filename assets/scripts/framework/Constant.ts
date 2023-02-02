import { _decorator } from 'cc';
const { ccclass, property } = _decorator;


export class Constant {
   
    public static EnemyType = {
        TYPE1: 1, 
        TYPE2: 2,
    }

    public static CombinationType = {
        PLANE1: 1, 
        PLANE2: 2, 
        PLANE3: 3, 
    }

    public static CollisionType = {
        PLAYER: 1 << 1, 
        ENEMY: 1 << 2, 
        PLAYER_BULLET: 1 << 3, 
        ENEMY_BULLET: 1 << 4, 
    }
}

