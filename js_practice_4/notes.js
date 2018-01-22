// предварительное наполнение классами игры по практике 4

// класс игрока
var Player = {
	constructor: function(name, position, speed) {
		this.name = name;
		this.position = position;
		this.speed = speed;
		return this;
	}
};

// класс помехи
var Hitch = {
	constructor: function(name, deltaSpeed) {
		this.name = name;
		this.deltaSpeed = deltaSpeed;
		return this;
	}
}


// создаем зайца и волка
var rabbit, wolf;

rabbit = Object.create(Player).constructor("rabbit", 0, 5);
wolf = Object.create(Player).constructor("wolf", 0, 3);

// создаем препятствия
var berry, stone
berry = Object.create(Hitch).constructor("berry", getRandDeltaSpeed(1, 3));
stone = Object.create(Hitch).constructor("stone", getRandDeltaSpeed(-3, -1));


// генератор изменения скорости задаваемой препятствием
function getRandDeltaSpeed(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


function A() {
	var val;

	this.getval = function() {
		return val;
	}

	this.setval = function(value) {
		val=value;
	}

}