(function () {
    var $container = $('.container');

    function Game(timeMax) {
        var explication = $("p", ".container");
        var timeoutChange;
        var verification;
        var that = this;
        this.timeMax = timeMax;
        this.timeReaction = null;
        this.start = function () {
            explication.fadeOut(); // Hide text
            var randomApparition = Math.floor((Math.random() * 2000) + this.timeMax); // Time apparition blue
            verification = false;

            timeoutChange = setTimeout(function () {
                $container.css("background", "#90F5FF");
                that.timeReaction = new Date(); // Chronometer before click user
                verification = true;
            }, randomApparition);
        };
        this.checkColor = function () {
            var time = this.timeReaction.getMilliseconds();
            if (verification === true) {
                this.update(time);
                explication.html("Tu as un temps de reaction de " + time + "ms<br>Clique pour recommencer");
                explication.fadeIn();
                verification = "retry";
            }
            else if (verification === false && explication.is(":hidden")) {
                clearTimeout(timeoutChange);
                $container.css("background", "#fff"); // Background white
                explication.html("T'as cliqué trop tôt !<br>Clique pour recommencer");
                explication.fadeIn();
                verification = "retry";
            }
            else if (verification === "retry") {
                $container.css("background", "#FFC143");
                explication.html("<p>Clique pour commencer <span>puis clique lorsque tu vois du bleu</span></p>");
                this.start();
            }
        };
        this.update = function (time) {
            // Send record to controller
            $.ajax({
                type: 'POST',
                url: "register",
                data: {
                    game: "quickclick",
                    score: time
                },
                dataType: 'text',
                success: function () {
                    console.log("Saved");
                },
                error: function (xhr, status, error) {
                    console.log(error);
                }
            });
        }
    }

    var quickclick = new Game(3000);

    $container.one('click', function (e) {
        e.preventDefault();
        quickclick.start();
    });

    $container.on("click", function () {
        quickclick.checkColor();
    });

})();
