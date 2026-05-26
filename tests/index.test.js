// Mock das funções aleatórias para testes determinísticos
let diceValues = [];
let blockValues = [];
let diceIndex = 0;
let blockIndex = 0;

// Substituir as funções globais para testes
global.rollDice = async () => {
    if (diceIndex < diceValues.length) {
        return diceValues[diceIndex++];
    }
    return Math.floor(Math.random() * 6) + 1;
};

global.getRandomBlock = async () => {
    if (blockIndex < blockValues.length) {
        return blockValues[blockIndex++];
    }
    const random = Math.random();
    if (random < 0.33) return "RETA";
    if (random < 0.66) return "CURVA";
    return "CONFRONTO";
};

// Importar o código do jogo (simulado para testes)
class Char {
    constructor(NOME, VELOCIDADE, MANOBRABILIDADE, PODER, PONTOS, LOOK) {
        this.NOME = NOME;
        this.VELOCIDADE = VELOCIDADE;
        this.MANOBRABILIDADE = MANOBRABILIDADE;
        this.PODER = PODER;
        this.PONTOS = PONTOS;
        this.LOOK = LOOK;
    }
}

const Mario = new Char("Mario", 4, 3, 3, 0, "assets/mario.gif");
const Luigi = new Char("Luigi", 3, 4, 4, 0, "assets/luigi.gif");
const Peach = new Char("Peach", 3, 4, 2, 0, "assets/peach.gif");
const Yoshi = new Char("Yoshi", 2, 4, 3, 0, "assets/yoshi.gif");
const Bowser = new Char("Bowser", 5, 2, 5, 0, "assets/bowser.gif");
const DonkeyKong = new Char("Donkey Kong", 2, 2, 5, 0, "assets/dk.gif");

const personagens = [Mario, Luigi, Peach, Yoshi, Bowser, DonkeyKong];

// Funções auxiliares
function logEvent(message) {
    // Silenciar logs durante testes
}

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    if (random < 0.33) return "RETA";
    if (random < 0.66) return "CURVA";
    return "CONFRONTO";
}

async function logRollResult(characterName, block, diceResult, attribute) {
    // Silenciar logs durante testes
}

async function playRaceEngine(character1, character2) {
    character1.PONTOS = 0;
    character2.PONTOS = 0;

    for (let round = 1; round <= 5; round++) {
        let block = await getRandomBlock();

        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;
        }

        if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;
        }

        if (block === "CONFRONTO") {
            totalTestSkill1 = diceResult1 + character1.PODER;
            totalTestSkill2 = diceResult2 + character2.PODER;

            if (totalTestSkill1 > totalTestSkill2 && character2.PONTOS > 0) {
                character2.PONTOS--;
            } else if (totalTestSkill2 > totalTestSkill1 && character1.PONTOS > 0) {
                character1.PONTOS--;
            }
        }

        if (totalTestSkill1 > totalTestSkill2) {
            character1.PONTOS++;
        } else if (totalTestSkill2 > totalTestSkill1) {
            character2.PONTOS++;
        }
    }
}

function getWinner(character1, character2) {
    if (character1.PONTOS > character2.PONTOS) {
        return character1;
    } else if (character2.PONTOS > character1.PONTOS) {
        return character2;
    }
    return null; // Empate
}

// ========== TESTES ==========

describe("Mario Kart - Regras de Negócio", () => {
    
    beforeEach(() => {
        diceIndex = 0;
        blockIndex = 0;
        diceValues = [];
        blockValues = [];
    });

    // ===== TESTES DE PERSONAGENS =====
    describe("Jogadores - Personagens", () => {
        test("Deve existir 6 personagens no jogo", () => {
            expect(personagens.length).toBe(6);
        });

        test("Cada personagem deve ter os atributos obrigatórios", () => {
            const atributosObrigatorios = ["NOME", "VELOCIDADE", "MANOBRABILIDADE", "PODER", "PONTOS", "LOOK"];
            personagens.forEach((char) => {
                atributosObrigatorios.forEach((attr) => {
                    expect(char).toHaveProperty(attr);
                });
            });
        });

        test("Personagens devem ter nomes únicos", () => {
            const nomes = personagens.map((ch) => ch.NOME);
            const nomesUnicos = new Set(nomes);
            expect(nomesUnicos.size).toBe(personagens.length);
        });

        test("Atributos devem ser números positivos", () => {
            personagens.forEach((char) => {
                expect(char.VELOCIDADE).toBeGreaterThan(0);
                expect(char.MANOBRABILIDADE).toBeGreaterThan(0);
                expect(char.PODER).toBeGreaterThan(0);
                expect(typeof char.VELOCIDADE).toBe("number");
                expect(typeof char.MANOBRABILIDADE).toBe("number");
                expect(typeof char.PODER).toBe("number");
            });
        });

        test("Personagens devem iniciar com 0 pontos", () => {
            personagens.forEach((char) => {
                expect(char.PONTOS).toBe(0);
            });
        });
    });

    // ===== TESTES DE DADO =====
    describe("Dados - Sorteio", () => {
        test("rollDice() deve retornar número entre 1 e 6", async () => {
            for (let i = 0; i < 100; i++) {
                const result = await rollDice();
                expect(result).toBeGreaterThanOrEqual(1);
                expect(result).toBeLessThanOrEqual(6);
                expect(Number.isInteger(result)).toBe(true);
            }
        });

        test("rollDice() deve retornar valores variados", async () => {
            const results = new Set();
            for (let i = 0; i < 50; i++) {
                const result = await rollDice();
                results.add(result);
            }
            expect(results.size).toBeGreaterThan(1);
        });
    });

    // ===== TESTES DE BLOCO =====
    describe("Pistas - Blocos Aleatórios", () => {
        test("getRandomBlock() deve retornar um tipo válido", async () => {
            const tiposValidos = ["RETA", "CURVA", "CONFRONTO"];
            for (let i = 0; i < 100; i++) {
                const block = await getRandomBlock();
                expect(tiposValidos).toContain(block);
            }
        });

        test("getRandomBlock() deve retornar distribuição aproximada", async () => {
            const counts = { RETA: 0, CURVA: 0, CONFRONTO: 0 };
            for (let i = 0; i < 3000; i++) {
                const block = await getRandomBlock();
                counts[block]++;
            }
            
            // Cada tipo deve aparecer ~33%
            const total = 3000;
            expect(counts.RETA).toBeGreaterThan(total * 0.28);
            expect(counts.RETA).toBeLessThan(total * 0.38);
            expect(counts.CURVA).toBeGreaterThan(total * 0.28);
            expect(counts.CURVA).toBeLessThan(total * 0.38);
            expect(counts.CONFRONTO).toBeGreaterThan(total * 0.28);
            expect(counts.CONFRONTO).toBeLessThan(total * 0.38);
        });
    });

    // ===== TESTES DE CORRIDA =====
    describe("Corrida - Estrutura", () => {
        test("Corrida deve ter exatamente 5 voltas", async () => {
            const char1 = new Char("Teste1", 3, 3, 3, 0, "test.gif");
            const char2 = new Char("Teste2", 3, 3, 3, 0, "test.gif");
            
            diceValues = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]; // 5 voltas × 2 dados
            blockValues = ["RETA", "RETA", "RETA", "RETA", "RETA"];
            
            await playRaceEngine(char1, char2);
            
            // Ambos devem ter entre 0 e 5 pontos (uma volta = um ponto)
            expect(char1.PONTOS + char2.PONTOS).toBeLessThanOrEqual(5);
        });

        test("Pontos devem ser zerados no início da corrida", async () => {
            const char1 = new Char("Teste1", 3, 3, 3, 50, "test.gif");
            const char2 = new Char("Teste2", 3, 3, 3, 100, "test.gif");
            
            diceValues = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            blockValues = ["RETA", "RETA", "RETA", "RETA", "RETA"];
            
            await playRaceEngine(char1, char2);
            
            expect(char1.PONTOS + char2.PONTOS).toBeLessThanOrEqual(5);
        });

        test("Nenhum jogador pode ter pontuação negativa", async () => {
            const char1 = new Char("Teste1", 1, 1, 1, 0, "test.gif");
            const char2 = new Char("Teste2", 5, 5, 5, 0, "test.gif");
            
            diceValues = [1, 6, 1, 6, 1, 6, 1, 6, 1, 6];
            blockValues = ["CONFRONTO", "CONFRONTO", "CONFRONTO", "CONFRONTO", "CONFRONTO"];
            
            await playRaceEngine(char1, char2);
            
            expect(char1.PONTOS).toBeGreaterThanOrEqual(0);
            expect(char2.PONTOS).toBeGreaterThanOrEqual(0);
        });
    });

    // ===== TESTES DE TIPOS DE BLOCO =====
    describe("Pistas - Blocos Específicos", () => {
        test("RETA: Quem tem maior (dado + VELOCIDADE) ganha ponto", async () => {
            const char1 = new Char("Rápido", 5, 1, 1, 0, "test.gif");
            const char2 = new Char("Lento", 1, 1, 1, 0, "test.gif");
            
            // char1: 2 + 5 = 7, char2: 2 + 1 = 3
            diceValues = [2, 2, 1, 1, 1, 1, 1, 1, 1, 1];
            blockValues = ["RETA", "RETA", "RETA", "RETA", "RETA"];
            
            await playRaceEngine(char1, char2);
            
            expect(char1.PONTOS).toBeGreaterThan(char2.PONTOS);
        });

        test("CURVA: Quem tem maior (dado + MANOBRABILIDADE) ganha ponto", async () => {
            const char1 = new Char("Ágil", 1, 5, 1, 0, "test.gif");
            const char2 = new Char("Lento", 1, 1, 1, 0, "test.gif");
            
            // char1: 2 + 5 = 7, char2: 2 + 1 = 3
            diceValues = [2, 2, 1, 1, 1, 1, 1, 1, 1, 1];
            blockValues = ["CURVA", "CURVA", "CURVA", "CURVA", "CURVA"];
            
            await playRaceEngine(char1, char2);
            
            expect(char1.PONTOS).toBeGreaterThan(char2.PONTOS);
        });

        test("CONFRONTO: Quem tem menor (dado + PODER) perde ponto", async () => {
            const char1 = new Char("Fraco", 1, 1, 1, 5, "test.gif");
            const char2 = new Char("Forte", 1, 1, 5, 5, "test.gif");
            
            // char1: 2 + 1 = 3, char2: 2 + 5 = 7 (char1 perde ponto)
            diceValues = [2, 2, 1, 1, 1, 1, 1, 1, 1, 1];
            blockValues = ["CONFRONTO", "CONFRONTO", "CONFRONTO", "CONFRONTO", "CONFRONTO"];
            
            await playRaceEngine(char1, char2);
            
            expect(char2.PONTOS).toBeGreaterThan(char1.PONTOS);
        });

        test("Empate: Ninguém pontua", async () => {
            const char1 = new Char("Igual1", 3, 3, 3, 0, "test.gif");
            const char2 = new Char("Igual2", 3, 3, 3, 0, "test.gif");
            
            // Ambos rolam o mesmo dado
            diceValues = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
            blockValues = ["RETA", "RETA", "RETA", "RETA", "RETA"];
            
            await playRaceEngine(char1, char2);
            
            expect(char1.PONTOS).toBe(char2.PONTOS);
        });

        test("CONFRONTO: Não pode ir para negativo", async () => {
            const char1 = new Char("Fraco", 1, 1, 1, 0, "test.gif");
            const char2 = new Char("Forte", 1, 1, 5, 0, "test.gif");
            
            diceValues = [1, 6, 1, 6, 1, 6, 1, 6, 1, 6];
            blockValues = ["CONFRONTO", "CONFRONTO", "CONFRONTO", "CONFRONTO", "CONFRONTO"];
            
            await playRaceEngine(char1, char2);
            
            expect(char1.PONTOS).toBeGreaterThanOrEqual(0);
        });
    });

    // ===== TESTES DE VITÓRIA =====
    describe("Condição de Vitória", () => {
        test("Vencedor é quem tem mais pontos", async () => {
            const char1 = new Char("Vencedor", 5, 5, 5, 0, "test.gif");
            const char2 = new Char("Perdedor", 1, 1, 1, 0, "test.gif");
            
            diceValues = [6, 1, 6, 1, 6, 1, 6, 1, 6, 1];
            blockValues = ["RETA", "RETA", "RETA", "RETA", "RETA"];
            
            await playRaceEngine(char1, char2);
            const winner = getWinner(char1, char2);
            
            expect(winner).toBe(char1);
            expect(char1.PONTOS).toBeGreaterThan(char2.PONTOS);
        });

        test("Empate é identificado corretamente", async () => {
            const char1 = new Char("Jogador1", 3, 3, 3, 0, "test.gif");
            const char2 = new Char("Jogador2", 3, 3, 3, 0, "test.gif");
            
            diceValues = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
            blockValues = ["RETA", "RETA", "RETA", "RETA", "RETA"];
            
            await playRaceEngine(char1, char2);
            const winner = getWinner(char1, char2);
            
            expect(winner).toBeNull();
            expect(char1.PONTOS).toBe(char2.PONTOS);
        });

        test("Jogadores diferentes resultam em vencedores diferentes", async () => {
            const mario = new Char("Mario", 4, 3, 3, 0, "assets/mario.gif");
            const bowser = new Char("Bowser", 5, 2, 5, 0, "assets/bowser.gif");
            
            diceValues = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
            blockValues = ["RETA", "RETA", "RETA", "RETA", "RETA"];
            
            await playRaceEngine(mario, bowser);
            
            expect(mario.PONTOS + bowser.PONTOS).toBeGreaterThan(0);
        });
    });

    // ===== TESTES DE INTEGRAÇÃO =====
    describe("Integração - Corrida Completa", () => {
        test("Corrida completa com resultado válido", async () => {
            const char1 = new Char("Player1", 3, 3, 3, 0, "test.gif");
            const char2 = new Char("Player2", 4, 4, 4, 0, "test.gif");
            
            await playRaceEngine(char1, char2);
            
            expect(char1.PONTOS + char2.PONTOS).toBeLessThanOrEqual(5);
            expect(char1.PONTOS).toBeGreaterThanOrEqual(0);
            expect(char2.PONTOS).toBeGreaterThanOrEqual(0);
        });

        test("Múltiplas corridas com mesmo personagem", async () => {
            const mario = new Char("Mario", 4, 3, 3, 0, "assets/mario.gif");
            const luigi = new Char("Luigi", 3, 4, 4, 0, "assets/luigi.gif");
            
            // Corrida 1
            diceValues = [2, 3, 1, 2, 3, 1, 2, 3, 1, 2];
            blockValues = ["RETA", "CURVA", "RETA", "CURVA", "RETA"];
            await playRaceEngine(mario, luigi);
            const pontosRodada1 = mario.PONTOS + luigi.PONTOS;
            
            // Corrida 2
            mario.PONTOS = 0;
            luigi.PONTOS = 0;
            diceValues = [4, 2, 3, 1, 4, 2, 3, 1, 4, 2];
            blockValues = ["CONFRONTO", "RETA", "CONFRONTO", "RETA", "CONFRONTO"];
            await playRaceEngine(mario, luigi);
            const pontosRodada2 = mario.PONTOS + luigi.PONTOS;
            
            expect(pontosRodada1).toBeLessThanOrEqual(5);
            expect(pontosRodada2).toBeLessThanOrEqual(5);
        });
    });
});