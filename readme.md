# Simulador de corrida Mario Kart
Projeto de simulação simples de uma corrida Mario Kart.

## Personagens
- Mario
- Peach
- Luigi
- Bowser
- Yoshi
- Donkey Kong

## Regras de negócio

### Jogadores:
O computador deve receber dois personagens para disputar a corrida em um objeto cada

### Pistas:
- Os personagens irão correr em uma pista aleatória de 5 rodadas
- A cada rodada, será sorteado um bloco da pista que pode ser uma reta, curva ou confronto
- Caso o bloco da pista seja uma RETA, o jogador deve rolar um dado de 6 lados e somar o atributo VELOCIDADE, quem vence ganha um ponto
- Caso o bloco da pista seja uma CURVA, o jogador deve rolar um dado de 6 lados e somar o atributo MANOBRABILIDADE, quem vence ganha um ponto
- Caso o bloco da pista seja um CONFRONTO, o jogador deve rolar um dado de 6 lados e somar o atributo PODER, quem perde perde um ponto
- Nenhum jogador pode ter pontuação negativa
- Em caso de empate, ninguém pontua

### Condição de vitória:
Ao final, vence quem acumulou mais pontos