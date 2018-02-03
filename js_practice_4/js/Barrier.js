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
	function getRandom(min, max) {
		// если выпадет аффект 0 то генерировать еще раз, аффект не может быть 0
		// для верного задания скорости
		do {
			value = Math.ceil( Math.random() * (max - min) + min );
		} while (value == 0);
        return value;
    }
    
    // проверка аффекта и установ картинки
    this.setAffect(getRandom(-3, 3));
    if (this.getAffect() >= 0) {
    	this.setImage('yagoda');
    } else {
    	this.setImage('kamen');
    };

    
    console.log('affect ' + this.getAffect());
}


Barrier.prototype.destroy = function() {
	delete this;
}