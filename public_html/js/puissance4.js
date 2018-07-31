//var plateau = [];
//plateau.fill(0);
//
//for (var i = 0; i < 7; i++) {
//    var tab = [];
//    
//    plateau.push(tab);
//}

var joueur1 = '1';
var joueur2 = '2';

var joueurMain = '1';
var suiteGagnante = 0;



function initialisation() {
    var htmlGenere = ' ';
    
    for (var i = 0; i < 7; i++) {
        var ligne = '<div class="colonne" valeur="'+ i +'">';

        for (var j = 0; j < 6; j++) {
            ligne += '<div class="case" valeur="'+ j +'"></div>';
        }
        htmlGenere += ligne + '</div>';
    }
    $('#grille').html(htmlGenere);
    $('.colonne').click( jouer );
}

function jouer(e) {
    var jeton = 'jeton' + joueurMain;
    
    var caseLibre = $(e.target).parent().children().filter("div:not(.jeton):first");
    caseLibre.addClass('jeton');
    caseLibre.addClass(jeton);
    
    if (joueurMain === '1'){
        joueurMain = '2';
    } else {
        joueurMain = '1';
    }
}

function isOver(e) {
    var carreColonne = $(e.target).parent();
    
    var carre = carreColonne.children().filter("div:not(.jeton):first");
    
    
    var indiceLigne = carre.attr('valeur');
    var indiceColonne = carreColonne.attr('valeur');
    
    checkIsOver(joueurMain, indiceColonne, indiceLigne);
    
    
}

function checkIsOver(idJoueur, indiceColonne, indiceLigne){
    var joueurJeton = '.jeton' + idJoueur;
    var max = 2;
    
    for (var i = -1; i < max; i++) {
        for (var j = -1; j < max; j++) {
     
            var carre = $(""
                    + [valeur=indiceColonne] 
                    + " " 
                    + [valeur=indiceLigne]);
            
            if (carre.hasClass(joueurJeton)){
                checkIsOver(idJoueur,indiceColonne + i,indiceLigne + j);
            }
        }
    }
}

initialisation();
