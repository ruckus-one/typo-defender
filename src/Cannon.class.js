function Cannon(phaserGame, enemy){
    var _game = phaserGame;

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
        var key = e.key.toLowerCase();
        if(key === _last)
            return;

        _score += _enemy.hit(key);
        _last = key;
    };

    _game.input.keyboard.onDownCallback = _keyDown;
    _game.input.keyboard.onUpCallback = _keyUp;

    var _hit = function(){
        _health -= 5;
        if(_health < 0)
            _health = 0;

        _game.triggerCustomEvent('hit', _health);
    };

    return {
        hit: _hit,
        getScore: function(){ return _score; }
    }
}