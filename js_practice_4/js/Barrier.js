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
}

Barrier.prototype.destroy = function() {

}