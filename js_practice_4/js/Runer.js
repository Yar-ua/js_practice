function Runner() {
	var speed;
	var left = 0;
	var image;

	this.getSpeed = function() {
		return speed;
	}

	this.setSpeed = function(value) {
		if (value >=0) {
			speed = value;
		}
	}
	this.getLeft = function() {
		return left;
	}
	this.setLeft = function(value) {
		left=value
	}
	this.getImage = function() {
		return image;
	}
	this.setImage = function(value) {
		image=value;
	}
}

Runner.prototype.run = function() {
	//to do run
	this.setLeft(this.getLeft() + this.getSpeed() * strafe);
}

Runner.prototype.init = function() {
	//to do run
	return document.getElementsByClassName('player ' + this.getImage())[0];

}