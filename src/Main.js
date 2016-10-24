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

    var loader;

    var cannon,
        enemy,
        gui;

    var layer1,
        layer2,
        layer3;

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
        game.load.image('mobile_button', 'resources/images/mobile_button.png', 130,124);
        game.load.spritesheet('explosion', 'resources/images/explosion.png', 96,96);

        game.stage.backgroundColor = '#485870';

        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    }

    function create() {
        loader = new Loader(game, 'rocket');
        
        layer1 = game.add.group();
        layer2 = game.add.group();
        layer3 = game.add.group();

        enemy = new WordEnemy(game, layer2);
        cannon = new Cannon(game, enemy, layer1);

        var city = game.add.tileSprite(0, game.world.height - 306, game.world.width, 306, 'city');
        layer1.add(city);

        game.world.sendToBack(city);
        game.physics.arcade.enable(city);
        city.body.immovable = true;

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    }

    function textLoaded(){
        loader.destroy();
        loader = null;

        gui = new GUI(game, cannon, enemy, layer3);
    }

    function update() {
        if(loader) {
            loader.update();
            return;
        }

        enemy.update();
        enemy.check(cannon);

        if(gui)
            gui.update(enemy.getLetters());
    }
};