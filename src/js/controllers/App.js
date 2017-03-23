'use strict';

import Game from './../models/Game';
import Start from './Start';
import GameBoard from './GameBoard';

// This is the overall App class, which is responsible
// for maintaining the app state and choosing a controller to render

// React components would make this easier, but I'm using Vanilla JS
// here instead

const APP_STATE_START = 'start';
const APP_STATE_BOARD = 'board';

export default class App {
    constructor() {
        this.startBoard = document.getElementById('template-start');
        this.gameBoard = document.getElementById('template-board');
        this.startController = new Start(
            this.startBoard,
            this.startGame.bind(this)
        );
        this.boardController = new GameBoard(
            this.gameBoard,
            this.endGame.bind(this)
        );
        this.state = {
            view : APP_STATE_START
        };
        this.render();
    }

    startGame(players, mode) {
        this.state.view = APP_STATE_BOARD;
        // create a new game
        const game = new Game(mode);
        this.boardController.setGame(game, players);
        this.render();
    }

    endGame() {
        this.state.view = APP_STATE_START;
        this.render();
    }

    render() {
        this.startBoard.classList.add('hidden');
        this.gameBoard.classList.add('hidden');
        if (this.state.view === APP_STATE_START) {
            this.startBoard.classList.remove('hidden');
            this.startController.render();
        } else if (this.state.view === APP_STATE_BOARD) {
            this.gameBoard.classList.remove('hidden');
        }
    }
}