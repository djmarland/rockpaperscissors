import Game, {
    GAME_MODE_STANDARD,
    GAME_MODE_ENHANCED,
    MOVE_ROCK,
    MOVE_PAPER,
    MOVE_SCISSORS,
    MOVE_SPOCK,
    MOVE_LIZARD,
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

    it('should allow player one to win', () => {
        const game = new Game(GAME_MODE_STANDARD);
        game.setPlayer1Move(MOVE_ROCK);
        game.setPlayer2Move(MOVE_SCISSORS);
        expect(game.getWinner()).to.equal(PLAYER_ONE_WINS);
        expect(game.getResolutionText()).to.equal('crushes');
    });

    it('should allow player two to win', () => {
        const game = new Game(GAME_MODE_STANDARD);
        game.setPlayer1Move(MOVE_SCISSORS);
        game.setPlayer2Move(MOVE_ROCK);
        expect(game.getWinner()).to.equal(PLAYER_TWO_WINS);
        expect(game.getResolutionText()).to.equal('are crushed by');
    });

    it('should throw for invalid game move', () => {
        expect(() => {
            const game = new Game(GAME_MODE_STANDARD);
            game.setPlayer1Move(MOVE_SPOCK);
        }).throw('Invalid Move for this game mode');
    });

    it('should allow player one to win in enhanced', () => {
        const game = new Game(GAME_MODE_ENHANCED);
        game.setPlayer1Move(MOVE_LIZARD);
        game.setPlayer2Move(MOVE_SPOCK);
        expect(game.getWinner()).to.equal(PLAYER_ONE_WINS);
        expect(game.getResolutionText()).to.equal('poisons');
    });

    it('should allow player two to win in enhanced', () => {
        const game = new Game(GAME_MODE_ENHANCED);
        game.setPlayer1Move(MOVE_SPOCK);
        game.setPlayer2Move(MOVE_LIZARD);
        expect(game.getWinner()).to.equal(PLAYER_TWO_WINS);
        expect(game.getResolutionText()).to.equal('is poisoned by');
    });

    it('should calculate scores', () => {
        const game = new Game(GAME_MODE_STANDARD);
        game.setPlayer1Move(MOVE_ROCK);
        game.setPlayer2Move(MOVE_PAPER);
        expect(game.getPlayer1Score()).to.equal(0);
        expect(game.getPlayer2Score()).to.equal(0);
        expect(game.getWinner()).to.equal(PLAYER_TWO_WINS);
        game.endRound();
        expect(game.getPlayer1Score()).to.equal(0);
        expect(game.getPlayer2Score()).to.equal(1);

        // round 2
        game.setPlayer1Move(MOVE_SCISSORS);
        game.setPlayer2Move(MOVE_PAPER);
        expect(game.getWinner()).to.equal(PLAYER_ONE_WINS);
        game.endRound();
        expect(game.getPlayer1Score()).to.equal(1);
        expect(game.getPlayer2Score()).to.equal(1);
    });


});
