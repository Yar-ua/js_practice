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
    this.setLeft(this.getLeft() + this.getSpeed());
}

Runner.prototype.init = function() {
    //to do run
    var div = document.createElement("DIV");
    div.setAttribute('class', 'player ' + this.getImage());
    div.style.left = this.getLeft() * strafe + 'px';
    this.html = div;
}

Runner.prototype.destroy = function() {
    //deleting html object
    document.getElementsByClassName(this.getImage())[0].remove();
        
}