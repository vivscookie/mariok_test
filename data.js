class Char{
    constructor(NOME,VELOCIDADE,MANOBRABILIDADE,PODER,PONTOS,LOOK){
        this.NOME = NOME;
        this.VELOCIDADE = VELOCIDADE;
        this.MANOBRABILIDADE = MANOBRABILIDADE;
        this.PODER = PODER;
        this.PONTOS = PONTOS;
        this.LOOK = LOOK;
    }
}

const Mario = new Char ("Mario", 4, 3, 3, 0,"/assets/mario.gif");
const Luigi = new Char ("Luigi", 3, 4, 4, 0, "/assets/luigi.gif");
const Peach = new Char ("Peach", 3, 4, 2, 0, "/assets/peach.gif");
const Yoshi = new Char("Yoshi", 2, 4, 3, 0, "/assets/yoshi.gif");
const Bowser = new Char("Bowser", 5, 2, 5, 0, "/assets/bowser.gif");
const DonkeyKong = new Char("Donkey Kong", 2, 2, 5, 0, "/assets/dk.gif");

window.personagens = [Mario, Luigi, Peach, Yoshi, Bowser, DonkeyKong];
