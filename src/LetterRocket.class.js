function Explosion(phaserGame, x,y, spriteName, layerGroup){
    var _sprite = phaserGame.add.sprite(x,y, spriteName || 'explosion');
    _sprite.position.x -= _sprite.width*0.5;
    _sprite.position.y -= _sprite.height*0.5;

    var _animation = _sprite.animations.add('default', [0,1,2,3,4,5,6,7,8,9,10,11,12]);
    _sprite.animations.play('default', 10);

    _animation.onComplete.add(function () {
        _sprite.destroy();
    }, this);

    layerGroup.add(_sprite);
}

function LetterRocket(phaserGame, index, letter, layerGroup){
    var _game = phaserGame;

    var width = _game.world.width;
    var _sprite = _game.add.sprite(-width*0.75 + width*1.75*Math.random(), -48*index, 'rocket');
    _game.physics.arcade.enable(_sprite);

    var _layerGroup = layerGroup;
    var _destroyed = false;

    var target = {x: _game.world.width*0.5 + 16, y: _game.world.height-32};
    _sprite.body.rotation = _sprite.rotation = Math.atan2(target.y - _sprite.body.y, target.x - _sprite.body.x);
    _sprite.scale.set(2);
    _game.physics.arcade.velocityFromRotation(_sprite.body.rotation, 300, _sprite.body.velocity);

    var _letter = _game.add.text(0,0, letter);
    _letter.anchor.set(0.5);
    _letter.fill = '#def';
    _letter.stroke = '#600';
    _letter.strokeThickness = 4;
    _letter.font = 'VT323';
    _letter.fontSize = 40;

    _layerGroup.add(_sprite);
    _layerGroup.add(_letter);

    var _update = function () {
        if(!_destroyed) {
            _letter.x = _sprite.body.x;
            _letter.y = _sprite.body.y;
        }
    };

    var _destroy = function () {
        _sprite.destroy();
        _letter.destroy();
        _destroyed = true;

        new Explosion(_game, _sprite.position.x, _sprite.position.y, 'explosion', _layerGroup);
    };

    var _getSprite = function () {
        return _sprite;
    };

    var _checkLetter = function (letter) {
        return (letter === _letter.text);
    };

    var _getLetter = function () {
        return _letter.text;
    };

    return {
        update: _update,
        destroy: _destroy,
        getSprite: _getSprite,
        checkLetter: _checkLetter,
        getLetter: _getLetter,
        isDestroyed: function(){ return _destroyed; }
    };
}