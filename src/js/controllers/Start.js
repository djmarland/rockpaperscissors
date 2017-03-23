'use strict';

import {
    GAME_MODE_STANDARD,
    GAME_MODE_ENHANCED
} from '../models/Game';

export default class Start {
    constructor(template, onGameStart) {
        this.template = template;
        this.onGameStart = onGameStart;
        this.state = {
            players : 1,
            mode : GAME_MODE_STANDARD
        };

        this.playersOption0 = document.getElementById('players-0');
        this.playersOption1 = document.getElementById('players-1');
        this.playersOption2 = document.getElementById('players-2');

        this.modeOptionStandard = document.getElementById('mode-standard');
        this.modeOptionEnhanced = document.getElementById('mode-enhanced');

        this.addListeners();
    }

    setPlayers(number) {
        this.state.players = number;
        this.render();
    }

    setGameMode(mode) {
        this.state.mode = mode;
        this.render();
    }

    addListeners() {
        // todo - use a delegated event handler
        document.getElementById('start-button')
            .addEventListener('click', () => {
                this.onGameStart(
                    this.state.players,
                    this.state.mode
                );
            });

        this.playersOption0
            .addEventListener('click', () => {
                this.setPlayers(0)
            });

        this.playersOption1
            .addEventListener('click', () => {
                this.setPlayers(1)
            });

        this.playersOption2
            .addEventListener('click', () => {
                this.setPlayers(2)
            });

        this.modeOptionStandard
            .addEventListener('click', () => {
                this.setGameMode(GAME_MODE_STANDARD)
            });

        this.modeOptionEnhanced
            .addEventListener('click', () => {
                this.setGameMode(GAME_MODE_ENHANCED)
            });
    }

    render() {
        this.playersOption0.checked = (this.state.players === 0);
        this.playersOption1.checked = (this.state.players === 1);
        this.playersOption2.checked = (this.state.players === 2);
        this.modeOptionStandard.checked = (this.state.mode === GAME_MODE_STANDARD);
        this.modeOptionEnhanced.checked = (this.state.mode === GAME_MODE_ENHANCED);
    }
}