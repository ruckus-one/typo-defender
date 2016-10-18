function GUI(phaserGame, cannon){
    var _game = phaserGame;
    var _cannon = cannon;

    var _currentWordLabel = [];
    var _currentWord = '';

    var _healthBar = _game.add.tileSprite(32, 48, 2, 16, 'health');
    _healthBar.scale.x = 100;
    var _healthLabel = _game.add.text(64, 32, 'Health');
    _healthLabel.anchor.set(0.5);
    _healthLabel.fill = '#b00';
    _healthLabel.stroke = '#000';
    _healthLabel.strokeThickness = 6;
    _healthLabel.font = 'Bubblegum Sans';
    _healthLabel.fontSize = 24;

    var _scoreLabel = _game.add.text(_game.world.width - 128, 32, 'Score:\n0');
    _scoreLabel.anchor.set(0.25);
    _scoreLabel.fill = '#0b0';
    _scoreLabel.stroke = '#000';
    _scoreLabel.strokeThickness = 6;
    _scoreLabel.font = 'Bubblegum Sans';
    _scoreLabel.fontSize = 24;
    _scoreLabel.align = 'right';

    var _onLetterChange = function(letterIndex, destroyed){
        _currentWordLabel[letterIndex].stroke = destroyed?'#060':'#600';
        _currentWordLabel[letterIndex].fill = '#def';

        _scoreLabel.text = 'Score:\n'+_cannon.getScore();
    };
    _game.onCustomEvent('letter', _onLetterChange);

    var _onHealthChange = function(currentHealth){
        _healthBar.scale.x = currentHealth;
    };
    _game.onCustomEvent('hit', _onHealthChange);

    var _update = function(currentWord){
        if(_currentWord === currentWord)
            return;

        for(var letterIndex in _currentWordLabel) {
            _currentWordLabel[letterIndex].destroy();
        }

        _currentWord = currentWord;
        _currentWordLabel = [];

        for(var letterIndex in _currentWord) {
            var letterObject = _game.add.text(_game.world.width * 0.5 + letterIndex*20 - _currentWord.length*0.5*20, 32, _currentWord[letterIndex].getLetter());
            letterObject.anchor.set(0.5);
            letterObject.fill = '#000';
            letterObject.stroke = '#000';
            letterObject.strokeThickness = 6;
            letterObject.font = 'Bubblegum Sans';
            letterObject.fontSize = 32;
            _currentWordLabel.push(letterObject);
        }
    };

    return {
        update: _update
    };
}
