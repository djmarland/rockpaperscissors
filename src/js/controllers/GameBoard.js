'use strict';

import {
    GAME_MODE_STANDARD,
    MOVE_PAPER,
    MOVE_SCISSORS,
    MOVE_ROCK,
    MOVE_LIZARD,
    MOVE_SPOCK
} from '../models/Game';

export default class GameBoard {
    constructor(template, onGameEnd) {
        this.template = template;
        this.onGameEnd = onGameEnd;
        this.game = null;
        this.players = null;

        this.player1 = document.getElementById('player1');
        this.player2 = document.getElementById('player2');

        // todo, convert to use data-attributes instead of classes
        this.player1Buttons = this.player1.querySelector('.playerButtons');
        this.player2Buttons = this.player2.querySelector('.playerButtons');

        this.player1Score = this.player1.querySelector('.score');
        this.player2Score = this.player2.querySelector('.score');

        this.player1Move = this.player1.querySelector('.move');
        this.player2Move = this.player2.querySelector('.move');

        this.nextRoundButton = document.getElementById('next-round');

        this.result = document.getElementById('result-text');

        this.state = {
            showingResult : false,
            playerOnePlayed : false,
            playerTwoPlayed : false,
        };

        this.addListeners();
        this.render();
    }

    showResult() {
        if (!this.state.playerOnePlayed ||
            !this.state.playerTwoPlayed
        ) {
            // not ready
            this.render();
            return;
        }
        this.state.showingResult = true;
        this.game.endRound();
        this.render();
    }

    makePlayer1Move(move) {
        this.game.setPlayer1Move(move);
        this.state.playerOnePlayed = true;
        this.showResult();
    }

    makePlayer2Move(move) {
        this.game.setPlayer2Move(move);
        this.state.playerTwoPlayed = true;
        this.showResult();
    }

    nextRound() {
        this.game.resetRound();
        this.state.playerOnePlayed = false;
        this.state.playerTwoPlayed = false;
        this.state.showingResult = false;
        this.render();

        // calculate the move for CPU players
        if (this.players < 2) {
            this.makePlayer2Move(this.game.getRandomMove());
        }
        if (this.players < 1) {
            this.makePlayer1Move(this.game.getRandomMove());
        }
    }

    addListeners() {
        // todo - use a delegated event handler
        document.getElementById('back-button')
            .addEventListener('click', this.onGameEnd);
        this.nextRoundButton
            .addEventListener('click', this.nextRound.bind(this));

        // add listeners to the buttons
        // todo - the button names should be built up using the
        // Game constants, rather than hard coding them here
        this.player1.querySelector('.move-rock')
            .addEventListener('click', () => {
                this.makePlayer1Move(MOVE_ROCK)
            });
        this.player1.querySelector('.move-paper')
            .addEventListener('click', () => {
                this.makePlayer1Move(MOVE_PAPER)
            });
        this.player1.querySelector('.move-scissors')
            .addEventListener('click', () => {
                this.makePlayer1Move(MOVE_SCISSORS)
            });
        this.player1.querySelector('.move-lizard')
            .addEventListener('click', () => {
                this.makePlayer1Move(MOVE_LIZARD)
            });
        this.player1.querySelector('.move-spock')
            .addEventListener('click', () => {
                this.makePlayer1Move(MOVE_SPOCK)
            });


        this.player2.querySelector('.move-rock')
            .addEventListener('click', () => {
                this.makePlayer2Move(MOVE_ROCK)
            });
        this.player2.querySelector('.move-paper')
            .addEventListener('click', () => {
                this.makePlayer2Move(MOVE_PAPER)
            });
        this.player2.querySelector('.move-scissors')
            .addEventListener('click', () => {
                this.makePlayer2Move(MOVE_SCISSORS)
            });
        this.player2.querySelector('.move-lizard')
            .addEventListener('click', () => {
                this.makePlayer2Move(MOVE_LIZARD)
            });
        this.player2.querySelector('.move-spock')
            .addEventListener('click', () => {
                this.makePlayer2Move(MOVE_SPOCK)
            });
    }

    setGame(game, players) {
        this.game = game;
        this.players = players;
        this.nextRound();
    }

    render() {
        if (!this.game) {
            return;
        }

        // I'm manipulating the DOM manually here, as I'm
        // not using a template or JSX
        // todo, use a proper template
        this.player1Buttons.classList.add('hidden');
        this.player2Buttons.classList.add('hidden');
        if (!this.state.playerOnePlayed) {
            this.player1Buttons.classList.remove('hidden');
        }
        if (!this.state.playerTwoPlayed) {
            this.player2Buttons.classList.remove('hidden');
        }

        this.player1Score.innerHTML = this.game.getPlayer1Score();
        this.player2Score.innerHTML = this.game.getPlayer2Score();

        let p1Move = null;
        let p2Move = null;
        let result = null;
        this.nextRoundButton.classList.add('hidden');
        if (this.state.showingResult) {
            p1Move = this.game.getPlayer1Move();
            p2Move = this.game.getPlayer2Move();
            result = this.game.getResolutionText();
            this.nextRoundButton.classList.remove('hidden');
        }
        this.result.innerHTML = result;
        this.player1Move.innerHTML = '<div class="move-icon move-icon--' + p1Move + '"></div>';
        this.player2Move.innerHTML = '<div class="move-icon move-icon--' + p2Move + '"></div>';

        const items = document.querySelectorAll('.move-lizard, .move-spock');
        [].forEach.call(items, function(item) {
            item.classList.remove('hidden');
            if (this.game.getGameMode() === GAME_MODE_STANDARD) {
                item.classList.add('hidden');
            }
        }.bind(this));
    }
}