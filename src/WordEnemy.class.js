function WordEnemy(phaserGame){

    var _dictionary = [
        'mosh',
        'barbarian',
        'power',
        'heavy'
    ];

    var _game = phaserGame;
    var _letters = [];

    var _generateWord = function () {
        _letters = [];
        var newWord = _dictionary[parseInt(Math.random()*_dictionary.length)];

        for(var idx in newWord){
            if(!newWord.hasOwnProperty(idx))
                continue;

            _letters.push(new LetterRocket(_game, idx, newWord[idx].toLowerCase()));
        }
    };

    var _checkForNewWord = function () {
        for(var idx in _letters){
            if(_letters.hasOwnProperty(idx) && !_letters[idx].isDestroyed()){
                return;
            }
        }

        _generateWord();
    };

    var _update = function () {
        _checkForNewWord();

        for(var idx in _letters) {
            if(!_letters.hasOwnProperty(idx))
                continue;

            _letters[idx].update();
        }
    };

    var _check = function () {
        for(var idx in _letters){
            if(!_letters.hasOwnProperty(idx) || _letters[idx].isDestroyed())
                continue;

            var letter = _letters[idx];
            if(letter.getSprite().position.y > _game.world.height - 160){
                letter.destroy();
                _game.triggerCustomEvent('letter', idx, false);
            }
        }
    };

    var _hit = function (letter){
        for(var idx in _letters){
            if(!_letters.hasOwnProperty(idx) || _letters[idx].isDestroyed() || !_letters[idx].checkLetter(letter))
                continue;

            _letters[idx].destroy();
            _game.triggerCustomEvent('letter', idx, true);
            return 10;
        }

        return 0;
    };

    var _getLetters = function(){
        return _letters;
    };

    return {
        update: _update,
        check: _check,
        hit: _hit,
        getLetters: _getLetters
    }
}