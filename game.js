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

const Mario = new Char ("Mario", 4, 3, 3, 0,"assets/mario.gif");
const Luigi = new Char ("Luigi", 3, 4, 4, 0, "assets/luigi.gif");
const Peach = new Char ("Peach", 3, 4, 2, 0, "assets/peach.gif");
const Yoshi = new Char("Yoshi", 2, 4, 3, 0, "assets/yoshi.gif");
const Bowser = new Char("Bowser", 5, 2, 5, 0, "assets/bowser.gif");
const DonkeyKong = new Char("Donkey Kong", 2, 2, 5, 0, "assets/dk.gif");

const personagens = [Mario, Luigi, Peach, Yoshi, Bowser, DonkeyKong];

window.personagens = personagens;
window.onRaceUpdate = null;

function logEvent(message) {
    console.log(message);
    if (typeof window !== 'undefined' && typeof window.onRaceUpdate === 'function') {
        window.onRaceUpdate(message);
    }
}

async function rollDice() { return Math.floor(Math.random() * 6) + 1; }
async function getRandomBlock() {
    let random = Math.random();
    if (random < 0.33) return "RETA";
    if (random < 0.66) return "CURVA";
    return "CONFRONTO";
}
async function logRollResult(characterName, block, diceResult, attribute) {
    logEvent(`${characterName} rolou ${block} de ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2) {
    // reset points
    character1.PONTOS = 0;
    character2.PONTOS = 0;

    for (let round = 1; round < 6; round++) {
        logEvent(`🏁 ${round}ª volta`);
        let block = await getRandomBlock();
        logEvent(`Bloco: ${block}`);
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block == "RETA") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;
            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);
        }

        if (block == "CURVA") {
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;
            await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
        }

        if (block == "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;
            logEvent(`${character1.NOME} 🎲 rolou ${diceResult1} + ${character1.PODER} = ${powerResult1}`);
            logEvent(`${character2.NOME} 🎲 rolou ${diceResult2} + ${character2.PODER} = ${powerResult2}`);

            if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                character2.PONTOS--;
            } else if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                character1.PONTOS--;
            }
        }

        if (totalTestSkill1 > totalTestSkill2) {
            character1.PONTOS++;
            logEvent(`${character1.NOME} total: ${totalTestSkill1}`);
        } else if (totalTestSkill1 < totalTestSkill2) {
            character2.PONTOS++;
            logEvent(`${character2.NOME} total: ${totalTestSkill2}`);
        } else {
            logEvent('Empate!');
        }
        logEvent('---');
    }
}

async function declareWinner(character1, character2) {
    logEvent("🏁 Fim da corrida 🏁 \n Resultado:\n");
    if (character1.PONTOS > character2.PONTOS) logEvent(`${character1.NOME} venceu com ${character1.PONTOS}`);
    else if (character2.PONTOS > character1.PONTOS) logEvent(`${character2.NOME} venceu com ${character2.PONTOS}`);
    else logEvent('Empate!');
}

window.playRaceEngine = playRaceEngine;
window.declareWinner = declareWinner;
