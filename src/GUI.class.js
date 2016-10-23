function GUI(phaserGame, cannon){
    var _game = phaserGame;
    var _cannon = cannon;

    var _currentWordLabel = [];
    var _currentWord = '';


    var uiBar1 = _game.add.tileSprite(0,32, _game.world.width,16, 'ui_bar');
    var uiBar2 = _game.add.tileSprite(0,64, _game.world.width,16, 'ui_bar');

    var _panel = _game.add.image(_game.world.width*0.5,0, 'ui_panel');
    _panel.anchor.set(0.5, -0.1);

    var _healthBg = _game.add.sprite(16,16, 'ui_health');
    _healthBg.scale.set(0.5);

    var _healthBar = _game.add.tileSprite(31, 32, 230, 35, 'health');
    //_healthBar.tilePosition.x = 9;

    var _healthLabel = _game.add.text(16, 64+16, 'Health');
    _healthLabel.anchor.set(-0.1, 0);
    _healthLabel.fill = '#b00';
    _healthLabel.stroke = '#000';
    _healthLabel.strokeThickness = 6;
    _healthLabel.font = 'VT323';
    _healthLabel.fontSize = 48;

    var _scoreBg = _game.add.sprite(_game.world.width - 16,16, 'ui_health');
    _scoreBg.scale.set(0.5);
    _scoreBg.anchor.set(1, 0);

    var _scoreLabel = _game.add.text(_game.world.width - 128, 64+16, '0\nScore');
    _scoreLabel.anchor.set(0.25, 0.52);
    _scoreLabel.fill = '#eee';
    _scoreLabel.stroke = '#000';
    _scoreLabel.strokeThickness = 6;
    _scoreLabel.font = 'VT323';
    _scoreLabel.fontSize = 40;
    _scoreLabel.align = 'right';

    var _onLetterChange = function(letterIndex, destroyed){
        _currentWordLabel[letterIndex].stroke = destroyed?'#060':'#600';
        _currentWordLabel[letterIndex].fill = '#def';

        _scoreLabel.text = _cannon.getScore()+'\nScore';
    };
    _game.onCustomEvent('letter', _onLetterChange);

    var _onHealthChange = function(currentHealth){
        _healthBar.width = currentHealth / 100 * 230;
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
            var letterObject = _game.add.text(8 + _game.world.width * 0.5 + letterIndex*30 - _currentWord.length*0.5*30, 32, _currentWord[letterIndex].getLetter());
            letterObject.anchor.set(0.5, 0);
            letterObject.fill = '#000';
            letterObject.stroke = '#000';
            letterObject.strokeThickness = 6;
            letterObject.font = 'VT323';
            letterObject.fontSize = 64;
            _currentWordLabel.push(letterObject);
        }
    };

    return {
        update: _update
    };
}
