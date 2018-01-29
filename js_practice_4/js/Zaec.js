function Zaec() {
	Runner.call(this);

	this.setImage('zaec');
	this.setSpeed(Zaec.SPEED);
}

Zaec.SPEED = 5;
Zaec.prototype = Object.create(Runner.prototype);
Zaec.prototype.constructor = Zaec;