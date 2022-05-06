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
const states = [];//état partiel du jeu
/**
 * Déplacement libre
 * Appel à la méthode moveFree
 *  permet de déplacer le joueur d'une case en fonction des touches directionnelles
 * @param {JQuery.KeyDownEvent}event
 */
function move(event) {
    //verifie la fonction
    let abcisse = 0;
    let ordonnee = 0;
    switch (event.key) {
    case "ArrowUp":
        abcisse = 0;
        ordonnee = -1;

        break;
    case "ArrowDown":
        abcisse = 0;
        ordonnee = 1;
        break;
    case "ArrowRight":
        abcisse = 1;
        ordonnee = 0;
        break;
    case "ArrowLeft":
        abcisse = -1;
        ordonnee = 0;
        break;
    case " ":
        if (allOnTarget()) {
            initLevel();
            $("#affichage").text(""); //Pour eviter que ça affiche le texte tout le temps(de la méthode finishLevel)
        }
        break;

    default:
        return;
    }
    if (event.key !== " ") {
        if (!allOnTarget()) {
            let stockState = undefined;
            $(".player").removeClass("basPlayer hautPlayer droitePlayer gauchePlayer");
            const positionPlayerAbs = getPlayerPosition().x;
            const positionPlayerOrd = getPlayerPosition().y;
            if (!getSquareAt({x: positionPlayerAbs + abcisse, y: positionPlayerOrd + ordonnee}).hasClass("wall") &&
                    !getSquareAt({x: positionPlayerAbs + abcisse, y: positionPlayerOrd + ordonnee}).hasClass("box")) {
                stockState = new State({x: positionPlayerAbs, y: positionPlayerOrd});
                getSquareAt({x: positionPlayerAbs, y: positionPlayerOrd}).removeClass("player");
                getSquareAt({x: positionPlayerAbs + abcisse, y: positionPlayerOrd + ordonnee}).addClass("player");
                //j'avais un problème quand je mettais espaceça incrémentais donc j'ai mis une condition pour ne pas incrémenter
                incrMoves(); //méthode qui incrémente le mouvement
            }

            if (getSquareAt({x: positionPlayerAbs + abcisse, y: positionPlayerOrd + ordonnee}).hasClass("box") &&
                    !getSquareAt({x: positionPlayerAbs + abcisse + abcisse, y: positionPlayerOrd + ordonnee + ordonnee}).hasClass("box") &&
                    !getSquareAt({x: positionPlayerAbs + abcisse + abcisse, y: positionPlayerOrd + ordonnee + ordonnee}).hasClass("wall")) {
                stockState = new State({x: positionPlayerAbs, y: positionPlayerOrd}, {x: positionPlayerAbs + abcisse, y: positionPlayerOrd + ordonnee});
                getSquareAt({x: positionPlayerAbs, y: positionPlayerOrd}).removeClass("player");
                getSquareAt({x: positionPlayerAbs + abcisse, y: positionPlayerOrd + ordonnee}).addClass("player");
                getSquareAt({x: positionPlayerAbs + abcisse, y: positionPlayerOrd + ordonnee}).removeClass("box");
                getSquareAt({x: positionPlayerAbs + abcisse + abcisse, y: positionPlayerOrd + ordonnee + ordonnee}).addClass("box");
                //j'avais un problème quand je mettais espaceça incrémentais donc j'ai mis une condition pour ne pas incrémenter

                incrMoves(); //méthode qui incrémente le mouvement
            }
            states.push(stockState);
            if (event.key === "ArrowDown") {
                $(".player").addClass("basPlayer");
            } else if (event.key === "ArrowUp") {
                $(".player").addClass("hautPlayer");
            } else if (event.key === "ArrowRight") {
                $(".player").addClass("droitePlayer");
            } else if (event.key === "ArrowLeft") {
                $(".player").addClass("gauchePlayer");
            }
            if (allOnTarget()) { //on appuye sur l'espace que si toutes les boites sont sur une cible
                finishLevel();
            }
        }
    }
}
let compteur = 0;//variable globale pour incrémenter
/**
 * permet d'incrémenter le compteur de mouvement
 */

function incrMoves() {
    $("#mouvement").text(++compteur);
}
/**
 * Vérifie si toutes les boites sont sur une cible
 * @returns true st toutes les boites sont sur une cible
 * sinon false
 */
function allOnTarget() {
    const boxTarget = document.getElementsByClassName("target");
    for (let i = 0; i < boxTarget.length; i++) {
        if (!$(boxTarget[i]).hasClass("box")) {
            return false;
        }
    }
    return true;
}
/**
 *permet qu'une fois la touche espace est enfoncé, on passe
 de niveau suivant et au dernier niveau on affiche la fin du jeu
 */
function finishLevel() {
    if (allOnTarget()) {
        if (niveau < 6) {
            $("#affichage").text("Appuyer sur ESPACE pour passer au niveau suivant");//affiche de message que si le niveau terminé
        }
        if (niveau === 6) {// si on est au dernier niveau et que toute les boites sont sur des cibles alors le jeu est terminé
            $("#finJeu").text("Vous avez fini tout le jeu! Bien joué");
        }
    }
}
let niveau = 0;//variable globale pour incrémenteur le move -1 car je commence 0;
/**
 * permet de préparer le niveau suivant et remet le compteur
 * de mouvement à 0
 */
function initLevel() {
    compteur = 0;
    $("#world").children()
        .remove();
    buildLevel(++niveau);
    $("#level").text(niveau);//affichage du level
}

/**
 * permet de recommencer le niveau
 */
function recommencerUnNiveau() {
    $("#world").children()
        .remove();//pour sa supprime le niveau précedent
    buildLevel(niveau);
    compteur = 0;
}
/**
 *  décremente compteur
 */
function désincrémenter() {
    $("#mouvement").text(--compteur);
}
function annulerMouvement() {
    if (compteur > 0 && !allOnTarget()) {
        désincrémenter();
        const playerCourant = getPlayerPosition();
    }
}

/**
 * quand la page est chargé
 */
$(() => {
    buildLevel(0);
    $(document).on("keydown", (event) => {
        move(event);
    });
    $("#recommencer").on("click", recommencerUnNiveau);
    /**
 * // fenetre modal
 */
    const modal = document.getElementById("myModal");
    if (!modal) {
        throw Error("exception");
    }

    // Get the button that opens the modal
    const btn = document.getElementById("myBtn");
    if (!btn) {
        throw Error("exception");
    }
    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal

    btn.onclick = function() {
        modal.style.display = "block";
    };

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});
