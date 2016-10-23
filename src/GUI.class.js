
function GUIHelper(){}
GUIHelper.formatNumber = function(val){
    var formatted = '';

    var stringValue = val.toString();
    var len = stringValue.length;
    for(var c=len; c>0; c--){
        var pos = (len - c);
        formatted = stringValue[c-1] + (c === len || pos % 3?'':',') + formatted;
    }

    return formatted;
};

function GUI(phaserGame, cannon, enemy, groupLayer){
    var _game = phaserGame;
    var _cannon = cannon;
    var _enemy = enemy;
    var _groupLayer = groupLayer;

    var _currentWordLabel = [];
    var _currentWord = '';


    var _uiBar1 = _game.add.tileSprite(0,32, _game.world.width,16, 'ui_bar');
    var _uiBar2 = _game.add.tileSprite(0,64, _game.world.width,16, 'ui_bar');

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

    var _scoreLabel = _game.add.text(_game.world.width - 128, 18, '0\nScore');
    _scoreLabel.anchor.set(0.25, 0);
    _scoreLabel.fill = '#eee';
    _scoreLabel.stroke = '#000';
    _scoreLabel.strokeThickness = 6;
    _scoreLabel.font = 'VT323';
    _scoreLabel.fontSize = 48;
    _scoreLabel.align = 'right';

    _groupLayer.add(_uiBar1);
    _groupLayer.add(_uiBar2);
    _groupLayer.add(_panel);
    _groupLayer.add(_healthBg);
    _groupLayer.add(_healthBar);
    _groupLayer.add(_healthLabel);
    _groupLayer.add(_scoreBg);
    _groupLayer.add(_scoreLabel);

    var _onLetterChange = function(letterIndex, destroyed){
        _currentWordLabel[letterIndex].stroke = destroyed?'#060':'#600';
        _currentWordLabel[letterIndex].fill = '#def';

        _scoreLabel.text = GUIHelper.formatNumber(_cannon.getScore())+'\nScore';
    };
    _game.onCustomEvent('letter', _onLetterChange);

    var _onHealthChange = function(currentHealth){
        _healthBar.width = currentHealth / 100 * 230;
    };
    _game.onCustomEvent('hit', _onHealthChange);

    var _noobAnimations = function(){
        var cooldownProgress = _enemy.getCooldown();
        if(!cooldownProgress || cooldownProgress <= 0)
            return;

        if(cooldownProgress <= 0.2){
            for(var idx in _currentWordLabel)
                if(_currentWordLabel.hasOwnProperty(idx)) {
                    _currentWordLabel[idx].fill = '#def';
                }
        }
        else if(cooldownProgress <= 0.6){
            for(var idx in _currentWordLabel)
                if(_currentWordLabel.hasOwnProperty(idx))
                    _currentWordLabel[idx].fill = '#111';
        }
        else if(cooldownProgress <= 1.0){
            for(var idx in _currentWordLabel)
                if(_currentWordLabel.hasOwnProperty(idx))
                    _currentWordLabel[idx].fill = '#def';
        }
        else if(cooldownProgress <= 1.4){
            for(var idx in _currentWordLabel)
                if(_currentWordLabel.hasOwnProperty(idx)) {
                    _currentWordLabel[idx].fill = '#111';
                }
        }
    };

    var _update = function(currentWord){

        _noobAnimations();

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
