import Game, {
    GAME_MODE_STANDARD,
    MOVE_ROCK,
    PLAYER_ONE_WINS,
    PLAYER_TWO_WINS
} from '../../src/js/models/Game';

describe('Game object', () => {

    it('should throw for invalid game mode', () => {
        expect(() => {new Game('notvalid')}).throw('Invalid Game mode');
    });

    it('should set the game mode on construct', () => {
       const game = new Game(GAME_MODE_STANDARD);
       expect(game.getGameMode()).to.equal(GAME_MODE_STANDARD);
    });

    it('should be a draw if no moves taken', () => {
        const game = new Game(GAME_MODE_STANDARD);
        expect(game.getWinner()).to.equal(null);
    });

    it('should make player one lose if too slow', () => {
        const game = new Game(GAME_MODE_STANDARD);
        game.setPlayer2Move(MOVE_ROCK);
        expect(game.getWinner()).to.equal(PLAYER_TWO_WINS);
    });

    it('should make player two lose if too slow', () => {
        const game = new Game(GAME_MODE_STANDARD);
        game.setPlayer1Move(MOVE_ROCK);
        expect(game.getWinner()).to.equal(PLAYER_ONE_WINS);
    });

});
