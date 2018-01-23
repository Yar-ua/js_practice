function Game() {
	var track1; // наверное не определяются переменные
	var track2; // наверное не определяются переменные

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
	
    function ifEndGame(){
        if (zaec.getLeft() >= document.getElementsByClassName('stadium')[0].clientWidth) {
            alert('заяц добежал');
            return false;
        }
    };

    //выполняем бег зайца и волка
    zaec.run();
    volk.run();

    // перемещаем изображение зайца и волка по треку
    game.getTrack1().style.left = zaec.getLeft() + 'px';
    game.getTrack2().style.left = volk.getLeft() + 'px';

    ifEndGame();

	console.log('console: game run')
}


Game.prototype.restart = function() {
	//to do
    console.log('console: game restart')
}


Game.prototype.init = function() {
    // инициализируем div'ы с зайцем и волком как track1 track2
    game.setTrack1(document.getElementsByClassName('player zaec')[0]);
    game.setTrack2(document.getElementsByClassName('player volk')[0]);

    // создаем зайца и волка
    zaec = new Zaec();
    volk = new Volk();
    
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
