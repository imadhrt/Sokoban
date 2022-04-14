"use strict";

/**
 * @typedef {Object} Level Description d'un niveau de Sokoban.
 * @property {"easy" | "medium" | "difficult"} difficulty La dificulté du jeu.
 * @property {number} [best] Le nombre minimal de mouvement pour gagner.
 * @property {string[]} map
 * La carte du niveau, ligne par ligne, avec la signification suivante pour chaque symbole :
 *   * `🧍` – le joueur,
 *   * `x` – une cible,
 *   * `#` – une boite,
 *   * `@` – une boite sur une cible,
 *   * ` ` – (espace) le sol,
 *   * *autre* – un mur.
 */

/**
 * Structure de données *globale* pour les données concernant les différents niveaux du jeu.
 * @type {Level[]}
 */
const levels = [
    {
        difficulty: "easy",
        best: 10,
        map: [
            "          ",
            "   ┌─┐    ",
            "   │x│    ",
            "   │ └──┐ ",
            " ┌─┘#🧍#x│ ",
            " │x # ┌─┘ ",
            " └──┐#│   ",
            "    │x│   ",
            "    └─┘   ",
            "          ",
        ],
    },
    {
        difficulty: "easy",
        best: 89,
        map: [
            "           ",
            " ┌───┐     ",
            " │🧍  │ ┌─┐ ",
            " │ ##│ │x│ ",
            " │ # └─┘x│ ",
            " └┬┐    x│ ",
            "  ├┘  ╷  │ ",
            "  │   ├──┘ ",
            "  │   │    ",
            "  └───┘    ",
            "           ",
        ],
    },
    {
        difficulty: "easy",
        best: 33,
        map: [
            "        ",
            "  ┌──┐  ",
            " ┌┘  │  ",
            " │🧍# │  ",
            " ├┐# └┐ ",
            " ├┘ # │ ",
            " │x#  │ ",
            " │xx@x│ ",
            " └────┘ ",
            "        ",
        ],
    },
    {
        difficulty: "medium",
        best: 253,
        map: [
            "                     ",
            "     ┌───┐           ",
            "     │   │           ",
            "     │#  │           ",
            "   ┌─┘  #└┐          ",
            "   │  # # │          ",
            " ┌─┘ │ ┌┐ │   ┌────┐ ",
            " │   │ └┘ └───┘  xx│ ",
            " │ #  #          xx│ ",
            " └───┐ ═══ ╷🧍┌┐  xx│ ",
            "     │     ├───────┘ ",
            "     └─────┘         ",
            "                     ",
        ],
    },
    {
        difficulty: "medium",
        map: [
            "                 ",
            " ┌────┬──────┐   ",
            " │xx  │      └─┐ ",
            " │xx  │ #  #   │ ",
            " │xx  ╵#──┬┐   │ ",
            " │xx    🧍 └┘   │ ",
            " │xx  ╷ ╷  #  ╶┤ ",
            " └─┬──┘ └╴# #  │ ",
            "   │ #  # # #  │ ",
            "   │           │ ",
            "   └───────────┘ ",
            "                 ",
        ],
    },
    {
        difficulty: "medium",
        map: [
            "                    ",
            "         ┌──────┐   ",
            "         │     🧍│   ",
            "         │ #═# ┌┘   ",
            "         │ #  #│    ",
            "         ├╴# # │    ",
            " ┌──────┬┤ # ═ └─┐  ",
            " │xxxx  └┘ #  #  │  ",
            " ├╴xxx    #  #   │  ",
            " │xxxx  ┌────────┘  ",
            " └──────┘           ",
            "                    ",
        ],
    },
    {
        difficulty: "difficult",
        best: 57,
        map: [
            "              ",
            "  ┌──┐  ┌───┐ ",
            " ┌┘  │  │   │ ",
            " │ # └──┘#  │ ",
            " │  #xxxx # │ ",
            " └┐    ╷ 🧍 ┌┘ ",
            "  └────┴───┘  ",
            "              ",
        ],
    },
];
/**
 * displays the level character by the squares and his type corresponding.
 * 
 * @param {number} level is level number
 */

function buildLevel(level) {
    //va premetrre de diférencier chaque ligne de la map
    for (let ligne = 0; ligne < levels[level].map.length; ligne++) {//parcours les lignes de la map
        //$("#world").append("<div class=" + "line"+ ligne +"></div>"); //ajoute des divs dans mon id world
        $("#world").append('<div class="line ' + ligne + '"></div>'); //ajoute des divs dans mon id world

        for (let colonne = 0; colonne < levels[level].map[ligne].length; colonne++) { //parcours les colonnes de la map
            switch (levels[level].map[ligne][colonne]) {//vérifie chaque caractère de la map et asssigne la classe adéquate(couleur de fond)
                case "🧍".charAt(0): //bizarre que le bonhomme prend 2 squares et je ne sais pas pourquoi ça ne donne pas le même résultat quand je rassemble les 2 premier case 
                    //par des virgules(case "🧍".charAt(0),"🧍".charAt(1):). 
                    $("." + ligne).append('<div class="player square"></div>');
                    break;
                case "🧍".charAt(1):
                    $("." + ligne).append('<div class="player square"></div>');
                    break;
                case "x":
                    $("." + ligne).append('<div class="target square"></div>');
                    break;
                case "#":
                    $("." + ligne).append('<div class="box square"></div>');
                    break;
                case "@":
                    $("." + ligne).append('<div class="boxWithTarget square"></div>');
                    break;
                case " ":
                    $("." + ligne).append('<div class="floor square"></div>');
                    break;
                default:
                    $("." + ligne).append('<div class="wall square"></div>');



            }
        }
    }
    let player= document.getElementsByClassName("player");//J'ai vu que y avait un problème avec le joueur qui s'affiche sur 2 cases et donc j'ai créer une 
    //liste de la classe player et je supprimer un player comme ça il reste 1 player et non 2.
    player[1].remove();//supprime un player
    console.log(levels[level]);
}


window.onload = function () {
    buildLevel(0);


};
