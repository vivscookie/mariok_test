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

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA";
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

            async function rollDice() {
                return Math.floor(Math.random() * 6) + 1;
            }

            async function getRandomBlock() {
                let random = Math.random();
                let result;

                switch (true) {
                    case random < 0.33:
                        result = "RETA";
                        break;
                    case random < 0.66:
                        result = "CURVA";
                        break;
                    default:
                        result = "CONFRONTO";
                }

                return result;
            }

            async function logRollResult(characterName, block, diceResult, attribute) {
                console.log(`${characterName} rolou ${block} de ${diceResult} + ${attribute} = ${diceResult + attribute} `);
            }

            async function playRaceEngine(character1, character2) {
                for (let round = 1; round < 6; round++) {
                    console.log(`🏁 ${round}ª volta`);
                    let block = await getRandomBlock();
                    console.log(`${block}!`);
                    //rolar os dados
                    let diceResult1 = await rollDice();
                    let diceResult2 = await rollDice();

                    //teste de habilidade
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

                        console.log(`${character1.NOME} 🎲 rolou ${diceResult1} + ${character1.PODER} de poder = ${powerResult1}`);
                        console.log(`${character2.NOME} 🎲 rolou ${diceResult2} + ${character2.PODER} de poder = ${powerResult2}`);

                        if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                            console.log(`${character1.NOME} ganhou o confronto. ${character2.NOME} perdeu um ponto.`);
                            character2.PONTOS--;
                        } else if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                            console.log(`${character2.NOME} ganhou o confronto. ${character1.NOME} perdeu um ponto.`);
                            character1.PONTOS--;
                        } else if (powerResult1 == powerResult2) {
                            console.log("Empate!");
                        } else if (powerResult1 > powerResult2 && character2.PONTOS == 0) {
                            console.log("Nada acontece feijoada");
                        } else if (powerResult2 > powerResult1 && character1.PONTOS == 0) {
                            console.log("Nada acontece feijoada");
                        }
                    }
                    if (totalTestSkill1 > totalTestSkill2) {
                        console.log(`${character1.NOME} marcou um ponto!`);
                        character1.PONTOS++;
                    } else if (totalTestSkill1 < totalTestSkill2) {
                        console.log(`${character2.NOME} marcou um ponto!`);
                        character2.PONTOS++;
                    } else {
                        console.log("Empate!");
                    }
                    console.log("*********************");
                }
            }

            async function declareWinner(character1, character2) {
                console.log("🏁 Fim da corrida 🏁 \n Resultado:\n")
                if (character1.PONTOS > character2.PONTOS) {
                    console.log(`${character1.NOME} venceu a corrida com ${character1.PONTOS} ponto(s) 🏆`);
                } else if (character2.PONTOS > character1.PONTOS) {
                    console.log(`${character2.NOME} venceu a corrida com ${character2.PONTOS} ponto(s) 🏆`);
                } else {
                    console.log("Empate!");
                }
            }

        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        //teste de habilidade
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

            console.log(`${character1.NOME} 🎲 rolou ${diceResult1} + ${character1.PODER} de poder = ${powerResult1}`);
            console.log(`${character2.NOME} 🎲 rolou ${diceResult2} + ${character2.PODER} de poder = ${powerResult2}`);

            /*
            IF TERNÁRIO - faz a mesma coisa que o if abaixo, em menos linhas
            character2.PONTOS -= powerResult1>powerResult2 && character2.PONTOS>0?1:0;
            character1.PONTOS -= powerResult2>powerResult1 && character1.PONTOS>0?1:0;
            console.log(powerResult1==powerResult2 ? "Empate!" : "");*/

            if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                console.log(`${character1.NOME} ganhou o confronto. ${character2.NOME} perdeu um ponto.`);
                character2.PONTOS--;
            } else if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                console.log(`${character2.NOME} ganhou o confronto. ${character1.NOME} perdeu um ponto.`);
                character1.PONTOS--;
            } else if (powerResult1 == powerResult2) {
                console.log("Empate!");
            } else if (powerResult1 > powerResult2 && character2.PONTOS == 0) {
                console.log("Nada acontece feijoada");
            } else if (powerResult2 > powerResult1 && character1.PONTOS == 0) {
                console.log("Nada acontece feijoada");
            }
        }
        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTOS++;
        } else if (totalTestSkill1 < totalTestSkill2) {
            console.log(`${character2.NOME} marcou um ponto!`);
            character2.PONTOS++;
        } else {
            console.log("Empate!");
        }
        console.log("*********************");
    }
}

async function declareWinner(character1, character2) {
    console.log("🏁 Fim da corrida 🏁 \n Resultado:\n")
    if (player1.PONTOS > player2.PONTOS) {
        console.log(`${player1.NOME} venceu a corrida com ${player1.PONTOS} ponto(s) 🏆`);
    } else if (player2.PONTOS > player1.PONTOS) {
        console.log(`${player2.NOME} venceu a corrida com ${player2.PONTOS} ponto(s) 🏆`);
    } else {
        console.log("Empate!");
    }
}


(async function main() {
    // Execução automática removida para evitar erros no carregamento da página.
    // Se desejar testar a engine de corrida, chame `playRaceEngine(player1, player2)`
    // a partir de um contexto onde `player1` e `player2` estejam definidos.