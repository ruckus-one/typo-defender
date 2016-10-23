function WordEnemy(phaserGame){

    var _dictionary = ['peaceful','daily','coat','ordinary','macho','colour','resolute','boring','flag','bustling','tramp','eight','shelter','account','number','whine','grease','art','jelly','obeisant','homeless','kill','paltry','prefer','lie','prevent','cracker','many','helpless','grandiose','repair','kind','legal','position','adamant','insurance','entertaining','rate','ring','smoke','sore','soothe','wriggle','obedient','gifted','accessible','psychedelic','spotty','devilish','helpful','tax','tidy','office','cute','profit','curl','wobble','difficult','labored','slip','expansion','doubt','few','pin','digestion','stare','gentle','snotty','untidy','spotted','land','bore','ritzy','alive','money','precede','ruin','light','interest','bee','trucks','blue','disastrous','sudden','unbiased','silent','rock','representative','slap','enchanted','twist','building','queue','cough','line','war','salty','dime','debonair','reminiscent'];
    
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

    var _check = function (otherBody) {
        for(var idx in _letters){
            if(!_letters.hasOwnProperty(idx) || _letters[idx].isDestroyed())
                continue;

            var letter = _letters[idx];
            if(letter.getSprite().position.y > _game.world.height - 160){
                letter.destroy();
                otherBody.hit();
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