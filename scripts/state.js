"use strict";

/**
 * état partiel du jeu entre 2 mouvement
 */
class State {
    /**
 * @param {{x:number,y:number}} playerPosition est la position du player
 * @param {{x:number,y:number} | undefined} boxPosition est la position de la boite
 */
    constructor(playerPosition, boxPosition = undefined) {
        /** @private */
        this._playerPosition = {...playerPosition};
        /** @private */
        this._boxPosition = boxPosition === undefined ? undefined : {...boxPosition};//il peut avoir une boite à la position et donc on assigne la valeur sinon undefined.
    }

    /**
 * Accesseur sur la position du player
 */
    get playerPosition() {
        return {...this._playerPosition};//crée à chaque fois des nvx objets
    }
    /**
    * Accesseur sur la position de la boite
    */

    get boxPosition() {
        return this._boxPosition !== undefined ? {...this._boxPosition} : undefined;
    }
}
const s = new State({x: 1, y: 2});
const pos = s.playerPosition;
pos.x = 20;
console.log(s.playerPosition); // réponse correcte { x: 1, y: 2 }
s.playerPosition.y = 50;
console.log(s.playerPosition); // réponse correcte { x: 1, y: 2 }
