/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// This module describes the mechanics of the game itself
// such as calculating scoring and winners/losers

// constants that can be called from elsewhere

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GAME_MODE_STANDARD = exports.GAME_MODE_STANDARD = 'GAME_MODE_STANDARD';
var GAME_MODE_ENHANCED = exports.GAME_MODE_ENHANCED = 'GAME_MODE_ENHANCED';

var MOVE_ROCK = exports.MOVE_ROCK = 'MOVE_ROCK';
var MOVE_PAPER = exports.MOVE_PAPER = 'MOVE_PAPER';
var MOVE_SCISSORS = exports.MOVE_SCISSORS = 'MOVE_SCISSORS';
var MOVE_LIZARD = exports.MOVE_LIZARD = 'MOVE_LIZARD';
var MOVE_SPOCK = exports.MOVE_SPOCK = 'MOVE_SPOCK';

var PLAYER_ONE_WINS = exports.PLAYER_ONE_WINS = 1;
var PLAYER_TWO_WINS = exports.PLAYER_TWO_WINS = 2;

var Game = function () {
    _createClass(Game, null, [{
        key: 'itemInArray',
        value: function itemInArray(item, array) {
            return array.indexOf(item) !== -1;
        }
    }]);

    function Game(gameMode) {
        _classCallCheck(this, Game);

        this.VALID_GAME_MODES = [GAME_MODE_STANDARD, GAME_MODE_ENHANCED];

        this.STANDARD_MOVES = [MOVE_ROCK, MOVE_PAPER, MOVE_SCISSORS];

        this.ENHANCED_MOVES = [MOVE_ROCK, MOVE_PAPER, MOVE_SCISSORS, MOVE_LIZARD, MOVE_SPOCK];

        // define how moves beat each other
        // and their text when 1 beats 2 and vice versa
        this.RESOLUTIONS = {
            MOVE_ROCK: {
                MOVE_SCISSORS: ['crushes', 'are crushed by'],
                MOVE_LIZARD: ['crushes', 'is crushed by']
            },
            MOVE_PAPER: {
                MOVE_SPOCK: ['disproves', 'is disproved by'],
                MOVE_ROCK: ['covers', 'is covered by']
            },
            MOVE_SCISSORS: {
                MOVE_PAPER: ['cut', 'is cut by'],
                MOVE_LIZARD: ['decapitates', 'is decapitated by']
            },
            MOVE_LIZARD: {
                MOVE_PAPER: ['eats', 'is eaten by'],
                MOVE_SPOCK: ['poisons', 'is poisoned by']
            },
            MOVE_SPOCK: {
                MOVE_SCISSORS: ['smashes', 'are smashed by'],
                MOVE_ROCK: ['vaporises', 'is vaporised by']
            }
        };

        if (!Game.itemInArray(gameMode, this.VALID_GAME_MODES)) {
            throw 'Invalid Game mode';
        }

        this.gameMode = gameMode;
        this.availableMoves = this.STANDARD_MOVES;
        if (this.gameMode === GAME_MODE_ENHANCED) {
            this.availableMoves = this.ENHANCED_MOVES;
        }

        this.player1Score = 0;
        this.player2Score = 0;

        this.resetRound();
    }

    _createClass(Game, [{
        key: 'getGameMode',
        value: function getGameMode() {
            return this.gameMode;
        }
    }, {
        key: 'getPlayer1Score',
        value: function getPlayer1Score() {
            return this.player1Score;
        }
    }, {
        key: 'getPlayer2Score',
        value: function getPlayer2Score() {
            return this.player2Score;
        }
    }, {
        key: 'getRandomMove',
        value: function getRandomMove() {
            return this.availableMoves[Math.floor(Math.random() * this.availableMoves.length)];
        }
    }, {
        key: 'validateMove',
        value: function validateMove(move) {
            if (!Game.itemInArray(move, this.availableMoves)) {
                throw 'Invalid Move for this game mode';
            }
        }
    }, {
        key: 'setPlayer1Move',
        value: function setPlayer1Move(move) {
            this.validateMove(move);
            this.player1Move = move;
        }
    }, {
        key: 'getPlayer1Move',
        value: function getPlayer1Move() {
            return this.player1Move;
        }
    }, {
        key: 'setPlayer2Move',
        value: function setPlayer2Move(move) {
            this.validateMove(move);
            this.player2Move = move;
        }
    }, {
        key: 'getPlayer2Move',
        value: function getPlayer2Move() {
            return this.player2Move;
        }
    }, {
        key: 'getWinner',
        value: function getWinner() {
            // a draw if both moves are the same
            if (this.player1Move === this.player2Move) {
                this.resolutionText = 'DRAW';
                return null;
            }
            // a player that failed to choose in time loses
            if (!this.player1Move) {
                return PLAYER_TWO_WINS;
            }
            if (!this.player2Move) {
                return PLAYER_ONE_WINS;
            }

            if (this.player2Move in this.RESOLUTIONS[this.player1Move]) {
                // if this matches then player one has won
                // the first option becomes the resolution text
                this.resolutionText = this.RESOLUTIONS[this.player1Move][this.player2Move][0];
                return PLAYER_ONE_WINS;
            }
            // if we got here then player 2 has won
            // the second option becomes the resolution text (reverse option)
            this.resolutionText = this.RESOLUTIONS[this.player2Move][this.player1Move][1];
            return PLAYER_TWO_WINS;
        }
    }, {
        key: 'getResolutionText',
        value: function getResolutionText() {
            return this.resolutionText;
        }
    }, {
        key: 'endRound',
        value: function endRound() {
            var winner = this.getWinner();
            if (winner === 1) {
                this.player1Score++;
            } else if (winner === 2) {
                this.player2Score++;
            }
        }
    }, {
        key: 'resetRound',
        value: function resetRound() {
            this.player1Move = null;
            this.player2Move = null;
            this.resolutionText = null;
        }
    }]);

    return Game;
}();

exports.default = Game;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Game = __webpack_require__(0);

var _Game2 = _interopRequireDefault(_Game);

var _Start = __webpack_require__(4);

var _Start2 = _interopRequireDefault(_Start);

var _GameBoard = __webpack_require__(3);

var _GameBoard2 = _interopRequireDefault(_GameBoard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// This is the overall App class, which is responsible
// for maintaining the app state and choosing a controller to render

// React components would make this easier, but I'm using Vanilla JS
// here instead

var APP_STATE_START = 'start';
var APP_STATE_BOARD = 'board';

var App = function () {
    function App() {
        _classCallCheck(this, App);

        this.startBoard = document.getElementById('template-start');
        this.gameBoard = document.getElementById('template-board');
        this.startController = new _Start2.default(this.startBoard, this.startGame.bind(this));
        this.boardController = new _GameBoard2.default(this.gameBoard, this.endGame.bind(this));
        this.state = {
            view: APP_STATE_START
        };
        this.render();
    }

    _createClass(App, [{
        key: 'startGame',
        value: function startGame(players, mode) {
            this.state.view = APP_STATE_BOARD;
            // create a new game
            var game = new _Game2.default(mode);
            this.boardController.setGame(game, players);
            this.render();
        }
    }, {
        key: 'endGame',
        value: function endGame() {
            this.state.view = APP_STATE_START;
            this.render();
        }
    }, {
        key: 'render',
        value: function render() {
            this.startBoard.classList.add('hidden');
            this.gameBoard.classList.add('hidden');
            if (this.state.view === APP_STATE_START) {
                this.startBoard.classList.remove('hidden');
                this.startController.render();
            } else if (this.state.view === APP_STATE_BOARD) {
                this.gameBoard.classList.remove('hidden');
            }
        }
    }]);

    return App;
}();

exports.default = App;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Game = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameBoard = function () {
    function GameBoard(template, onGameEnd) {
        _classCallCheck(this, GameBoard);

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
            showingResult: false,
            playerOnePlayed: false,
            playerTwoPlayed: false
        };

        this.addListeners();
        this.render();
    }

    _createClass(GameBoard, [{
        key: 'showResult',
        value: function showResult() {
            if (!this.state.playerOnePlayed || !this.state.playerTwoPlayed) {
                // not ready
                this.render();
                return;
            }
            this.state.showingResult = true;
            this.game.endRound();
            this.render();
        }
    }, {
        key: 'makePlayer1Move',
        value: function makePlayer1Move(move) {
            this.game.setPlayer1Move(move);
            this.state.playerOnePlayed = true;
            this.showResult();
        }
    }, {
        key: 'makePlayer2Move',
        value: function makePlayer2Move(move) {
            this.game.setPlayer2Move(move);
            this.state.playerTwoPlayed = true;
            this.showResult();
        }
    }, {
        key: 'nextRound',
        value: function nextRound() {
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
    }, {
        key: 'addListeners',
        value: function addListeners() {
            var _this = this;

            // todo - use a delegated event handler
            document.getElementById('back-button').addEventListener('click', this.onGameEnd);
            this.nextRoundButton.addEventListener('click', this.nextRound.bind(this));

            // add listeners to the buttons
            // todo - the button names should be built up using the
            // Game constants, rather than hard coding them here
            this.player1.querySelector('.move-rock').addEventListener('click', function () {
                _this.makePlayer1Move(_Game.MOVE_ROCK);
            });
            this.player1.querySelector('.move-paper').addEventListener('click', function () {
                _this.makePlayer1Move(_Game.MOVE_PAPER);
            });
            this.player1.querySelector('.move-scissors').addEventListener('click', function () {
                _this.makePlayer1Move(_Game.MOVE_SCISSORS);
            });
            this.player1.querySelector('.move-lizard').addEventListener('click', function () {
                _this.makePlayer1Move(_Game.MOVE_LIZARD);
            });
            this.player1.querySelector('.move-spock').addEventListener('click', function () {
                _this.makePlayer1Move(_Game.MOVE_SPOCK);
            });

            this.player2.querySelector('.move-rock').addEventListener('click', function () {
                _this.makePlayer2Move(_Game.MOVE_ROCK);
            });
            this.player2.querySelector('.move-paper').addEventListener('click', function () {
                _this.makePlayer2Move(_Game.MOVE_PAPER);
            });
            this.player2.querySelector('.move-scissors').addEventListener('click', function () {
                _this.makePlayer2Move(_Game.MOVE_SCISSORS);
            });
            this.player2.querySelector('.move-lizard').addEventListener('click', function () {
                _this.makePlayer2Move(_Game.MOVE_LIZARD);
            });
            this.player2.querySelector('.move-spock').addEventListener('click', function () {
                _this.makePlayer2Move(_Game.MOVE_SPOCK);
            });
        }
    }, {
        key: 'setGame',
        value: function setGame(game, players) {
            this.game = game;
            this.players = players;
            this.nextRound();
        }
    }, {
        key: 'render',
        value: function render() {
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

            var p1Move = null;
            var p2Move = null;
            var result = null;
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

            var items = document.querySelectorAll('.move-lizard, .move-spock');
            [].forEach.call(items, function (item) {
                item.classList.remove('hidden');
                if (this.game.getGameMode() === _Game.GAME_MODE_STANDARD) {
                    item.classList.add('hidden');
                }
            }.bind(this));
        }
    }]);

    return GameBoard;
}();

exports.default = GameBoard;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Game = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Start = function () {
    function Start(template, onGameStart) {
        _classCallCheck(this, Start);

        this.template = template;
        this.onGameStart = onGameStart;
        this.state = {
            players: 1,
            mode: _Game.GAME_MODE_STANDARD
        };

        this.playersOption0 = document.getElementById('players-0');
        this.playersOption1 = document.getElementById('players-1');
        this.playersOption2 = document.getElementById('players-2');

        this.modeOptionStandard = document.getElementById('mode-standard');
        this.modeOptionEnhanced = document.getElementById('mode-enhanced');

        this.addListeners();
    }

    _createClass(Start, [{
        key: 'setPlayers',
        value: function setPlayers(number) {
            this.state.players = number;
            this.render();
        }
    }, {
        key: 'setGameMode',
        value: function setGameMode(mode) {
            this.state.mode = mode;
            this.render();
        }
    }, {
        key: 'addListeners',
        value: function addListeners() {
            var _this = this;

            // todo - use a delegated event handler
            document.getElementById('start-button').addEventListener('click', function () {
                _this.onGameStart(_this.state.players, _this.state.mode);
            });

            this.playersOption0.addEventListener('click', function () {
                _this.setPlayers(0);
            });

            this.playersOption1.addEventListener('click', function () {
                _this.setPlayers(1);
            });

            this.playersOption2.addEventListener('click', function () {
                _this.setPlayers(2);
            });

            this.modeOptionStandard.addEventListener('click', function () {
                _this.setGameMode(_Game.GAME_MODE_STANDARD);
            });

            this.modeOptionEnhanced.addEventListener('click', function () {
                _this.setGameMode(_Game.GAME_MODE_ENHANCED);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            this.playersOption0.checked = this.state.players === 0;
            this.playersOption1.checked = this.state.players === 1;
            this.playersOption2.checked = this.state.players === 2;
            this.modeOptionStandard.checked = this.state.mode === _Game.GAME_MODE_STANDARD;
            this.modeOptionEnhanced.checked = this.state.mode === _Game.GAME_MODE_ENHANCED;
        }
    }]);

    return Start;
}();

exports.default = Start;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _App = __webpack_require__(1);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(2);

new _App2.default();

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map