(function () {
    $("button", ".info").on("click", function () {
        Game.start();
    });

    var Game = {
        announces : ["Allez, c'est facile !", "Eh non ! :D", "Même mamie y arrive...", "Des chocobons à l'arrivée",
            "Fier(e) tu seras", "Aie confiance en toi", "Force à toi", "DO IT !", "Presque !", "Je crois en toi",
            "<3", "La victoire est proche", ":)", "lol"] ,
        level: 0,
        wrapper: $(".container"),
        start: function () {
            $(".info", ".container").remove();
            this.wrapper.addClass("started");
            this.wrapper.append("<div class='level'></div>");
            this.wrapper.append("<div class='announce'></div>");
            this.target.update(120);
            this.viewFinder.element.css({
                "animation": "mymove 3s linear infinite alternate",
                "-webkit-animation": "mymove 3s linear infinite alternate"
            });
        },
        end: function () {
            Game.wrapper.html("<p>Partie terminé</p>");
        },
        viewFinder: {
            element: $(".viewfinder", ".container")
        },
        target: {
            element : $(".target", ".container"),
            base : 120,
            update : function() {
                var posx = (Math.random() * (Game.wrapper.width() - this.element.width()) ).toFixed(); // Random posX
                this.element.css({
                    "left": posx + "px",
                    "width": this.base + "px"
                }); // Update CSS target
                Game.level++; // Update level
                $(".level", ".container").html("Niveau " + Game.level);
                this.base -= 20; // Update width target
                if (this.base === 0) {
                    this.base = 120;
                    Game.viewFinder.element.css({
                        "animation": "mymove 2s linear infinite alternate",
                        "-webkit-animation": "mymove 2s linear infinite alternate"
                    });
                }
            }
        } // target
    }; // GAME

    document.onkeydown = function (e) {
        var $viewFinderWidth = Game.viewFinder.element.width();
        var $targetOffsetLeft = Game.target.element.offset().left;
        var $targetWidth = Game.target.element.width();
        var $announce = $(".announce", ".container");
        if (e.keyCode === 32) {
            // Win
            if ( ($viewFinderWidth >= $targetOffsetLeft &&
                $viewFinderWidth<= $targetOffsetLeft + $targetWidth ) ) {
                if(Game.level > 11){
                    Game.end();
                }
                Game.target.update();

            }
            // Lose
            else {
                var announce = Game.announces[Math.floor(Math.random() * Game.announces.length)];
                // Si annonce pas déjà visible
                if ($announce.is(":hidden") || $announce.empty()) {
                    $announce.text(announce).fadeIn().delay(2000).fadeOut();
                }
            }
        }

    };

})();

