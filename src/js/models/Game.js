'use strict';

// This module describes the mechanics of the game itself
// such as calculating scoring and winners/losers

// constants that can be called from elsewhere
export const GAME_MODE_STANDARD = 'GAME_MODE_STANDARD';
export const GAME_MODE_ENHANCED = 'GAME_MODE_ENHANCED';

export const MOVE_ROCK = 'MOVE_ROCK';
export const MOVE_PAPER = 'MOVE_PAPER';
export const MOVE_SCISSORS = 'MOVE_SCISSORS';
export const MOVE_LIZARD = 'MOVE_LIZARD';
export const MOVE_SPOCK = 'MOVE_SPOCK';

export const PLAYER_ONE_WINS = 1;
export const PLAYER_TWO_WINS = 2;

export default class Game {

    static itemInArray(item, array) {
        return array.indexOf(item) !== -1;
    }

    constructor(gameMode) {
        this.VALID_GAME_MODES = [
            GAME_MODE_STANDARD, GAME_MODE_ENHANCED
        ];

        this.STANDARD_MOVES = [
            MOVE_ROCK, MOVE_PAPER, MOVE_SCISSORS
        ];

        this.ENHANCED_MOVES = [
            MOVE_ROCK, MOVE_PAPER, MOVE_SCISSORS, MOVE_LIZARD, MOVE_SPOCK
        ];

        this.RESOLUTIONS = {
            MOVE_ROCK : {
                MOVE_SCISSORS : ['crushes','are crushed by'],
                MOVE_LIZARD : ['crushes', 'is crushed by'],
            },
            MOVE_PAPER : {
                MOVE_SPOCK : ['disproves', 'is disproved by'],
                MOVE_ROCK : ['covers','is covered by'],
            },
            MOVE_SCISSORS : {
                MOVE_PAPER : ['cut', 'is cut by'],
                MOVE_LIZARD : ['decapitates', 'is decapitated by'],
            },
            MOVE_LIZARD : {
                MOVE_PAPER : ['eats', 'is eaten by'],
                MOVE_SPOCK : ['poisons', 'is poisoned by'],
            },
            MOVE_SPOCK : {
                MOVE_SCISSORS : ['smashes', 'are smashed by'],
                MOVE_ROCK : ['vaporises', 'is vaporised by'],
            },
        };

        if (!Game.itemInArray(gameMode, this.VALID_GAME_MODES)) {
            throw 'Invalid Game mode';
        }

        this.gameMode = gameMode;
        this.availableMoves = Game.STANDARD_MOVES;
        if (this.gameMode === GAME_MODE_ENHANCED) {
            this.availableMoves = Game.ENHANCED_MOVES;
        }

        this.player1Score = 0;
        this.player2Score = 0;

        this.resetRound();
    }

    getGameMode() {
        return this.gameMode;
    }

    getPlayer1Score() {
        return this.player1Score;
    }

    getPlayer2Score() {
        return this.player2Score;
    }

    getRandomMove() {
        return this.availableMoves[
            Math.floor(Math.random() * this.availableMoves.length)
        ];
    }

    validateMove(move) {
        if (!Game.itemInArray(move, this.availableMoves)) {
            throw 'Invalid Move for this game mode';
        }
    }

    setPlayer1Move(move) {
        this.validateMove(move);
        this.player1Move = move;
    }

    setPlayer2Move(move) {
        this.validateMove(move);
        this.player2Move = move;
    }

    getWinner() {
        // a draw if both moves are the same
        if (this.player1Move === this.player2Move) {
            return null;
        }
        // a player that failed to choose in time loses
        if (!this.player1Move) {
            return PLAYER_TWO_WINS;
        }
        if (!this.player2Move) {
            return PLAYER_ONE_WINS;
        }

        if (this.player2Move in Game.RESOLUTIONS[this.player1Move]) {
            // if this matches then player one has won
            // the first option becomes the resolution text
            this.resolutionText =
                Game.RESOLUTIONS[this.player1Move][this.player2Move][0];
            return PLAYER_ONE_WINS;
        }
        // if we got here then player 2 has won
        // the second option becomes the resolution text (reverse option)
        this.resolutionText =
            Game.RESOLUTIONS[this.player2Move][this.player1Move][1];
        return PLAYER_TWO_WINS;
    }

    endRound() {
        const winner = this.getWinner();
        if (winner === 1) {
            this.player1Score++;
        } else if (winner === 2) {
            this.player2Score++;
        }
        this.player1Move = null;
        this.player2Move = null;
    }

    resetRound() {
        this.player1Move = null;
        this.player2Move = null;
        this.resolutionText = null;
    }
}
