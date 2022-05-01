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
                $(`.${ligne}`).append("<div class=\"player square\"></div>");
                break;
            case "🧍".charAt(1):
                $(`.${ligne}`).append("<div class=\"player square\"></div>");
                break;
            case "x":
                $(`.${ligne}`).append("<div class=\"target square\"></div>");
                break;
            case "#":
                $(`.${ligne}`).append("<div class=\"box square\"></div>");
                break;
            case "@":
                $(`.${ligne}`).append("<div class=\"boxWithTarget square\"></div>");
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
window.onload = function () {
    buildLevel(0);
};
