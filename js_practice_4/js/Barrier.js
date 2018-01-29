function Barrier() {
	var image;
	var left;
	var affect;

	this.getLeft = function() {
		return left
	};

	this.setLeft = function(value) {
		left=value;
	};

	this.getAffect = function() {
		return affect;
	};

	this.setAffect = function(value) {
		affect = value;
	};

	this.getImage = function() {
		return image;
	};

	this.setImage = function(value) {
		image = value
	};
};

Barrier.prototype.init = function() {
	//randomly generate the affecte value and corresponding image
	function getRandomArbitrary(min, max) {
        return Math.round( Math.random() * (max - min) + min );
    }

    this.setAffect(getRandomArbitrary(-3, 3));
    
    if (this.getAffect() >= 0) {
    	this.setImage('yagoda');
    } else {
    	this.setImage('kamen');
    }

    console.log('affect ' + this.getAffect());
}

Barrier.prototype.destroy = function() {

}