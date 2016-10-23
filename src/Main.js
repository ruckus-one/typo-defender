var VERSION = "$$_VERSION_INFO_$$";
window.onload = function () {
    var game = new Phaser.Game(1920, 1080, Phaser.AUTO, '',
        {
            preload: preload,
            create: create,
            update: update
        });

    game.customEvents = [];
    game.onCustomEvent = function (eventKey, callback) {
        if(!this.customEvents.hasOwnProperty(eventKey)){
            this.customEvents[eventKey] = [];
        }

        this.customEvents[eventKey].push(callback);
    };
    game.triggerCustomEvent = function(eventKey, arg1, arg2, arg3){
        if(!this.customEvents.hasOwnProperty(eventKey))
            return;

        for(var idx in this.customEvents[eventKey])
            if(this.customEvents[eventKey].hasOwnProperty(idx) && typeof this.customEvents[eventKey][idx] === 'function')
                this.customEvents[eventKey][idx](arg1, arg2, arg3);
    };

    var cannon,
        enemy,
        gui;

    WebFontConfig = {

        //  'active' means all requested fonts have finished loading
        //  We set a 1 second delay before calling 'createText'.
        //  For some reason if we don't the browser cannot render the text the first time it's created.
        active: function() { game.time.events.add(Phaser.Timer.SECOND, textLoaded, this); },

        //  The Google Fonts we want to load (specify as many as you like in the array)
        google: {
            families: ['VT323']
        }

    };

    function preload() {
        game.load.image('ui_darkgreen', 'resources/images/ui_darkgreen.png', 4,4);
        game.load.image('ui_panel', 'resources/images/ui_panel.png', 4,4);
        game.load.image('ui_health', 'resources/images/ui_health.png', 512,128);
        game.load.image('ui_bar', 'resources/images/ui_bar.png', 96,16);
        game.load.image('health', 'resources/images/health.png', 24,16);
        game.load.image('rocket', 'resources/images/rocket.png', 32,32);
        game.load.image('city', 'resources/images/city.png', 960,306);
        game.load.spritesheet('explosion', 'resources/images/explosion.png', 96,96);

        game.stage.backgroundColor = '#485870';

        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    }

    function create() {
        enemy = new WordEnemy(game);
        cannon = new Cannon(game, 'city', enemy);

        var city = game.add.tileSprite(0, game.world.height - 306, game.world.width, 306, 'city');
        game.world.sendToBack(city);
        game.physics.arcade.enable(city);
        city.body.immovable = true;

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    }

    function textLoaded(){
        gui = new GUI(game, cannon, enemy);
    }

    function update() {
        enemy.update();
        enemy.check(cannon);

        if(gui)
            gui.update(enemy.getLetters());
    }
};