function Volk() {
	Runner.call(this);

	this.setImage('img/volk.png');
	this.setSpeed(Volk.SPEED);
}

Volk.SPEED = 3;
Volk.prototype = Object.create(Runner.prototype);
Volk.prototype.constructor = Volk;