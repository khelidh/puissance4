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

var plateau = [];

function initPlateau() {
    
    for (var i = 0; i < 7; i++) {
        var colonne = [];
        
        for (var j = 0; j < 6; j++) {
            colonne.push(-1);
        }
        plateau.push(colonne);
    }
    
    return plateau;
}

function jouerPlateau(colonne,ligne) {
    plateau[colonne][ligne] = joueurMain;
}

function isOverWithPlateau() {
    
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 6; j++) {
            if (plateau[i][j] == joueurMain){
                suiteGagnante = 1;
                checkSuiteOnPlateau(i,j);
            }
        }
    }
}    

function checkSuite(x,y,dx,dy){
    console.log('checkSuite(x,y,dx,dy)');

    if (plateau[x + dx][y + dy] == joueurMain){
        suiteGagnante++;
        
        if (suiteGagnante == 4){
            alert('gg');
            return;
        }
        checkSuite(x + dx, y + dy, dx, dy);      
    }
}

function checkSuiteOnPlateau(x,y) {
    console.log('checkSuiteOnPlateau(x,y)');
    console.log('BEFORE - Suite = ' + suiteGagnante);
    for (var dx = -1; dx < 2; dx++){
        for(var dy = -1; dy < 2; dy++) {
            console.log('dx/dy ' + dx + '/' + dy);
            if (dx != 0 || dy != 0){
                console.log('MIDDLE - Suite = ' + suiteGagnante);

                if (plateau[x + dx][y + dy] === joueurMain){
                    console.log('AFTER - Suite = ' + suiteGagnante);
                    suiteGagnante++;
                    
                    checkSuite(x + dx,y + dy,dx,dy);
               }
               else {
                   suiteGagnante = 0;
               }
           }
           else {
               suiteGagnante = 0;
           }
        }
    }
}


function initialisation() {
    initPlateau();
    
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
    
    var indiceLigne = parseInt(caseLibre.attr('valeur'));
    var indiceColonne = parseInt($(e.target).parent().attr('valeur'));
    jouerPlateau(indiceColonne,indiceLigne);
    //checkIsOver(joueurMain, indiceColonne, indiceLigne);
    
    isOverWithPlateau();
    
    if (joueurMain === '1'){
        joueurMain = '2';
    } else {
        joueurMain = '1';
    }
}

function checkDirection(joueurJeton, indiceColonne, indiceLigne, dX, dY, suite) {
    var carre = $('.colonne[valeur="' + (indiceColonne + dX) + '"] > [valeur="' + (indiceLigne + dY) + '"]');
    
    if (carre.hasClass(joueurJeton)){
        suite++;
        
        if (suite == 4){
            alert('GG');
            return;
        }
        checkDirection(joueurJeton,(indiceColonne + dX), (indiceLigne + dY), dX, dY, suite);
    }
        
    
}

function checkIsOver(idJoueur, indiceColonne, indiceLigne){
    var joueurJeton = 'jeton' + idJoueur;
    var max = 1;
    
    for (var i = -1; i <= max; i++) {
        for (var j = -1; j <= max; j++) {
            
            if (!(i === 0 && j === 0)){
                
                var carre = $('.colonne[valeur="' + (indiceColonne + i) + '"] > [valeur="' + (indiceLigne + j) + '"]');
                
//                console.log('i : ' + i + '  --- j : ' +j);
//                console.log('Carre actuel : ' + carre.attr('valeur'));
//                console.log('  Indice Colonne - ' + indiceColonne);
//                console.log('  Indice Ligne - ' + indiceLigne);

                if (carre.hasClass(joueurJeton)){
                    checkDirection(joueurJeton, indiceColonne, indiceLigne, dX, dY, suiteGagnante + 1);
                }
                else if (suiteGagnante === 4){
                    alert('Gagnée par joueur ' + joueurMain);
                    return;
                }
                else {                
                    console.log('NUL');
                    suiteGagnante = 0;
                }

                console.log('\n');
            }    
        }
    }
}



initialisation();
