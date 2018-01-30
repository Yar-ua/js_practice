var strafe = 55;    // по заданию Клеточка 55px = player.width / 2

function Game() {
	var track1;
	var track2;

	this.getTrack1 = function() {
		return track1;
	}

	this.getTrack2 = function() {
		return track2;
	}

	this.setTrack1 = function(value) {
		track1=value;
	}

	this.setTrack2 = function(value) {
		track2=value;
	}
}


Game.prototype.run = function() {

    function runRunners() {
        //выполняем бег зайца и волка
        zaec.run();
        volk.run();
        // перемещаем изображение зайца и волка по треку
        zaecPic.style.left = zaec.getLeft() * strafe + 'px';
        volkPic.style.left = volk.getLeft() * strafe + 'px';
    }

    //инициализировать и сгенерировать хтмл препятствия
    function getHtml(element) {
        var div = document.createElement("DIV");
        div.setAttribute('class', 'barrier ' + element.getImage());
        div.style.left = element.getLeft() * strafe + 'px';
        return div;
    };


    function setBarrier(runner, track) {
        barrier = new Barrier;
        barrier.init();
        barrier.setLeft(runner.getLeft() + runner.getSpeed());
        track.appendChild(getHtml(barrier));
        return barrier;
    };


    //удалить все барьеры, если они существуют
    function removeBarriers() {
        if (document.querySelector("div.barrier") != null) {
            do {
                document.querySelector("div.barrier").remove();
            } while (document.querySelector("div.barrier").remove() != null)
        delete barrier1;
        delete barrier2;
        }
    }

    removeBarriers();
    barrier1 = setBarrier(zaec, game.getTrack1());
    barrier2 = setBarrier(volk, game.getTrack2());
    runRunners();
}


Game.prototype.restart = function() {
	//to do
    console.log('console: game restart')
}


Game.prototype.init = function() {
    // инициализируем div'ы с зайцем и волком как track1 track2
    game.setTrack1(document.getElementById('track1'));
    game.setTrack2(document.getElementById('track2'));

    // создаем зайца и волка
    zaec = new Zaec();
    zaecPic = zaec.init();
    volk = new Volk();
    volkPic = volk.init();

    console.log('game init');
}
    

// +++++++++++++

// если загружена страница то инициализируем игру
document.addEventListener("DOMContentLoaded", function(){
    // создание и инициализация игры при загрузке страницы
    game = new Game();
    game.init();
    console.log('page loaded');
});

// бег игроков при нажатии кнопки run
document.getElementById("run").addEventListener('click', function() {
    game.run();
});
