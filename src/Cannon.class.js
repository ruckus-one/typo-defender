function Cannon(phaserGame, spriteName, enemy){
    var _game = phaserGame;
    var _sprite = _game.add.sprite(_game.world.width*0.5 - 16, _game.world.height - 32, spriteName);
    _game.physics.arcade.enable(_sprite);
    _sprite.body.immovable = true;

    var _enemy = enemy;
    var _last = false;

    var _health = 100;
    var _score = 0;

    var _keyUp = function(e) {
        if(e.key === _last){
            _last = false;
        }
    };
    var _keyDown = function(e){
        if(e.key === _last)
            return;

        _score += _enemy.hit(e.key);
        _last = e.key;
    };

    _game.input.keyboard.onDownCallback = _keyDown;
    _game.input.keyboard.onUpCallback = _keyUp;

    var _getBody = function(){
        return _sprite;
    };

    var _hit = function(){
        _health -= 5;
        if(_health < 0)
            _health = 0;

        _game.triggerCustomEvent('hit', _health);
    };

    return {
        getBody: _getBody,
        hit: _hit,
        getScore: function(){ return _score; }
    }
}