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
	
    // function ifEndGame(){
    //     if (zaec.getLeft() >= document.getElementsByClassName('stadium')[0].clientWidth) {
    //         alert('заяц добежал');
    //         return false;
    //     }
    // };

    function runRunners() {

        //выполняем бег зайца и волка
        zaec.run();
        volk.run();

        // перемещаем изображение зайца и волка по треку
        zaecPic.style.left = zaec.getLeft() + 'px';
        volkPic.style.left = volk.getLeft() + 'px';
    }

    function setBarrier() {
        barrier = new Barrier();
        barrier.init();

        var barrierDiv = document.createElement("DIV");
        barrierDiv.setAttribute('class', 'barrier ' + barrier.getImage());
        barrierDiv.style.left = barrier.getAffect() * strafe + 'px';

        var track1 = document.getElementById('track1');
        track1.appendChild(barrierDiv);
    }

    setBarrier();
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
