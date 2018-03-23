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

    // проверка кто победил
    function haveWinner() {
        if (volk.getLeft() >= zaec.getLeft()) {
            alert('Волк догнал зайца!');
            return true;
        };
        if (zaec.getLeft() * strafe >= track1.clientWidth) {
            alert('Заяц добежал!');
            return true;
        }
    }


    //выполняем бег зайца и волка
    function runRunners() {
        zaec.run();
        volk.run();
        zaec.html.style.left = zaec.getLeft() * strafe + 'px';
        volk.html.style.left = volk.getLeft() * strafe + 'px';
    }


    // установить барьеры на поле
    function setBarrier(runner, track) {
        barrier = new Barrier;
        barrier.init();
        barrier.setLeft(runner.getLeft() + runner.getSpeed());
        barrier.getHtml(barrier.getLeft());
        track.appendChild(barrier.html);
        return barrier;
    };


    // изменить скорость бегуна в зависимости от аффекта барьера
    function changeSpeed(runner, barrier) {
        runner.setSpeed(runner.getSpeed() + barrier.getAffect());
    }

//////////////// run
    removeBarriers();
    barrier1 = setBarrier(zaec, game.getTrack1());
    barrier2 = setBarrier(volk, game.getTrack2());
    runRunners();
    changeSpeed(zaec, barrier1);
    changeSpeed(volk, barrier2);
    if (haveWinner()) {
        changeActiveButtons('run', 'restart');
    };

}


Game.prototype.restart = function() {
	//to do
    zaec.destroy();
    volk.destroy();
    delete zaec;
    delete volk;
    removeBarriers();
    game.init();
    changeActiveButtons('restart', 'run');
    console.log('console: game restart');
}


Game.prototype.init = function() {
    // инициализируем div'ы с зайцем и волком как track1 track2
    game.setTrack1(document.getElementById('track1'));
    game.setTrack2(document.getElementById('track2'));

    // создаем зайца и волка
    zaec = new Zaec();
    volk = new Volk();
    zaec.init();
    volk.init();
    game.getTrack1().appendChild(zaec.html);
    game.getTrack2().appendChild(volk.html)
    
    console.log('game init');
}

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


// рестарт по нажатию кнопки
document.getElementById("restart").addEventListener('click', function() {
    game.restart();
});


// меняем значение кнопки run/restart
function changeActiveButtons(button1, button2){
    document.getElementById(button1).setAttribute('hidden', '');
    document.getElementById(button2).removeAttribute('hidden');
}

//удалить все барьеры, если они существуют
function removeBarriers(barrier) {
    if (typeof barrier1 != 'undefined') {
        barrier1.destroy();
        delete barrier1;
    }
    if (typeof barrier2 != 'undefined') {
        barrier2.destroy();
        delete barrier2;    
    }
};
