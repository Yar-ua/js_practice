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

    // блокируем кнопку run на время бега
    // function blockRunButton(value) {
    //     switch (value) {
    //         case true:
    //             document.getElementById('run').setAttribute('class', 'disabled');
    //             console.log('disable');
    //             break;
    //         case false:
    //             document.getElementById('run').removeAttribute('disabled');
    //             console.log('enable');
    //             break;
    //     }
    // }


    //выполняем бег зайца и волка
    function runRunners() {
        zaec.run();
        volk.run();
        zaec.init().style.left = zaec.getLeft() * strafe + 'px';
        volk.init().style.left = volk.getLeft() * strafe + 'px';
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

    // изменить скорость бегуна в зависимости от аффекта барьера
    function changeSpeed(runner, barrier) {
        runner.setSpeed(runner.getSpeed() + barrier.getAffect());
    }

    //blockRunButton(true);
    removeBarriers();
    barrier1 = setBarrier(zaec, game.getTrack1());
    barrier2 = setBarrier(volk, game.getTrack2());
    runRunners();
    changeSpeed(zaec, barrier1);
    changeSpeed(volk, barrier2);
    if (haveWinner()) {
        changeActiveButtons('run', 'restart');
    };
    //blockRunButton(false);

}


Game.prototype.restart = function() {
	//to do
    //removeBarriers();
    delete zaec;
    delete volk;
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
    
    console.log('game init');
}

// сделать нормальный рестарт

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

document.getElementById("restart").addEventListener('click', function() {
    game.restart();
});


function changeActiveButtons(button1, button2){
    document.getElementById(button1).setAttribute('hidden', '');
    document.getElementById(button2).removeAttribute('hidden');
}