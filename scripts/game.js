"use strict";

console.log("hello world");
/**
 * displays the level character by the square and his type corresponding.
 * @param {number} level is level number.
 */

function buildLevel(level) {
    //va premetrre de diférencier chaque ligne de la map
    for (let ligne = 0; ligne < levels[level].map.length; ligne++) {//parcours les lignes de la map
        $("#world").append(`<div class="line ${ligne}"></div>`); //ajoute des divs dans mon id world

        for (let colonne = 0; colonne < levels[level].map[ligne].length; colonne++) { //parcours les colonnes de la map
            switch (levels[level].map[ligne][colonne]) {//vérifie chaque caractère de la map et asssigne la classe adéquate(couleur de fond)
            case "🧍".charAt(0): //bizarre que le bonhomme prend 2 squares et je ne sais pas pourquoi ça ne donne pas le même résultat quand je rassemble les 2 premier case
                //par des virgules(case "🧍".charAt(0),"🧍".charAt(1):).
                $(`.${ligne}`).append("<div class=\"player square floor\"></div>");//rajouter floor car quand on va remove player, on aura plus de classe donc ca met en blanc
                //alors que ça doit mettre la classe sol
                break;
            case "🧍".charAt(1):
                $(`.${ligne}`).append("<div class=\"player square floor\"></div>");
                break;
            case "x":
                $(`.${ligne}`).append("<div class=\"target square\"></div>");
                break;
            case "#":
                $(`.${ligne}`).append("<div class=\"box square floor\"></div>");
                break;
            case "@":
                $(`.${ligne}`).append("<div class=\"box target square\"></div>");
                break;
            case " ":
                $(`.${ligne}`).append("<div class=\"floor square\"></div>");
                break;
            default:
                $(`.${ligne}`).append("<div class=\"wall square\"></div>");
            }
        }
    }
    const player = document.getElementsByClassName("player");//J'ai vu que y avait un problème avec le joueur qui s'affiche sur 2 cases et donc j'ai créer une
    //liste de la classe player et je supprimer un player comme ça il reste 1 player et non 2.
    player[1].remove();//supprime un player
    console.log(levels[level]);
}

/**
 * renvoye la position du joueur dans le jeu
 * @typedef{object} pos est une position à l'ordonnée y et à l'abcisse x
 * @property{number} x est la colonne de la position.
 * @property{number} y est la ligne de la position .
 * @returns la position du joueur dans le jeu
 */
function getPlayerPosition() {
    const a = $(".player").index();//colonne des lignes
    const o = $(".player").parent()//ligne des parents
        .index();
    return {x: a, y: o};
}
/**
 * renvoye la case du jeu qui se trouve à la position donée
 * @property{number} x est la ligne de la position.
 * @property{number} y est la colonne de la position .
 * @param{pos}pos est la position du joueur
 * @returns la case du jeu qui se trouve à la position donée
 * en argument
 */
function getSquareAt(pos) {
    return $("#world").children()
        .eq(pos.y)
        .children()
        .eq(pos.x);
}
/**
 * Déplacement libre
 * Appel à la méthode moveFree
 *  permet de déplacer le joueur d'une case en fonction des touches directionnelles
 */

function move() {
    moveFree(0, 1, "ArrowDown");
    moveFree(0, -1, "ArrowUp");
    moveFree(1, 0, "ArrowRight");
    moveFree(-1, 0, "ArrowLeft");
}

// }
/**
 * Méthode simplifié pour le deplacement libre
 * permet de déplacer le joueur d'une case en fonction des touches directionnelles
 * @param {number} abcisse est la colonne de la position où il il veut y'aller
 * @param {number} ordonnee est la ligne de la position où il veut y'aller
 * @param {string} direction est la direction du joueur où il veut y'aller
 */
function moveFree(abcisse, ordonnee, direction) {
    $(document).on("keydown", function (event) {//quand on touche le clavier,il
        //verifie la fonction
        const positionPlayerAbs = getPlayerPosition().x;
        const positionPlayerOrd = getPlayerPosition().y;
        if (!getSquareAt({x: positionPlayerAbs + abcisse, y: positionPlayerOrd + ordonnee}).hasClass("wall") &&
            !getSquareAt({x: positionPlayerAbs + abcisse, y: positionPlayerOrd + ordonnee}).hasClass("box")) {
            if (event.key === direction) {
                getSquareAt({x: positionPlayerAbs, y: positionPlayerOrd}).removeClass("player");
                getSquareAt({x: positionPlayerAbs + abcisse, y: positionPlayerOrd + ordonnee}).addClass("player");
                incrMoves();
            }
        }

        if (getSquareAt({x: positionPlayerAbs + abcisse, y: positionPlayerOrd + ordonnee}).hasClass("box") &&
            !getSquareAt({x: positionPlayerAbs + abcisse + abcisse, y: positionPlayerOrd + ordonnee + ordonnee}).hasClass("box") &&
            !getSquareAt({x: positionPlayerAbs + abcisse + abcisse, y: positionPlayerOrd + ordonnee + ordonnee}).hasClass("wall")) {
            if (event.key === direction) {
                getSquareAt({x: positionPlayerAbs, y: positionPlayerOrd}).removeClass("player");
                getSquareAt({x: positionPlayerAbs + abcisse, y: positionPlayerOrd + ordonnee}).addClass("player");
                getSquareAt({x: positionPlayerAbs + abcisse, y: positionPlayerOrd + ordonnee}).removeClass("box");
                getSquareAt({x: positionPlayerAbs + abcisse + abcisse, y: positionPlayerOrd + ordonnee + ordonnee}).addClass("box");
                incrMoves();
            }
        }
    });
}
let i = 0;//variable globale pour incrémenter
/**
 * permet d'incrémenter le compteur de mouvement
 */

function incrMoves() {
    $("#mouvement").text(++i);
}
window.onload = function () {
    buildLevel(0);
    move();
};
