//Size.js

window.Size = function(w, h){
	this.width = Math.ceil(parseFloat(w));
	this.height = Math.ceil(parseFloat(h));
}

/**
 * 指定した画像のもともとの大きさを表すSizeを取得します。
 * 画面要素としてのサイズを取得する場合は、Size.fromElement(elm)を使用します。
 */
Size.fromImage = function(img){
	if (typeof img.naturalWidth != 'undefined') {
		// for Firefox,
		// Safari,
		// Chrome
 		return new Size(img.naturalWidth, img.naturalHeight);
	}
	else {
		// for IE,
		// Opera
		var tmp = new Image();
		tmp.src = img.src;
		return new Size(tmp.width, tmp.height);
	}
};

/**
 * 指定した要素の大きさを表すSizeを取得します。
 */
Size.fromElement = function(elm){
	var style = elm.currentStyle || document.defaultView.getComputedStyle(elm, "");
	return new Size(parseFloat(style.width), parseFloat(style.height));
};

/**
 * このSizeが空（面積を持たない）かどうかを返します。
 */
Size.prototype.isEmpty = function(){
	return (this.width == 0 || this.height == 0);
}

/**
 * このSizeが縦長かどうかを返します。
 */
Size.prototype.isVLong = function(){
	return (this.width < this.height);
};

/**
 * このSizeが横長かどうかを返します。
 */
Size.prototype.isHLong = function(){
	return (this.height < this.width);
};

/**
 * このSizeが正方形かどうかを返します。
 */
Size.prototype.isSquare = function(){
	if(this.isEmpty()){
		return false;
	}
	return (this.width == this.height);
};

/**
 * このSizeを指定した倍率で大きくしたSizeを取得します。
 */
Size.prototype.zoom = function(ratio){
	var r = parseFloat(ratio);
	return new Size(this.width * r, this.height * r);
};

/**
 * このSizeと別のSizeの差を計算して返します。
 */
Size.prototype.delta = function(){
	var w = 0;
	var h = 0;
	switch(arguments.length){
		case 1:
			w = arguments[0].width;
			h = arguments[0].height;
			break;
		case 2:
			w = arguments[0];
			h = arguments[1];
			break;
		default:
			throw new Error("Invalid Arguments.");
	}
	return new Size(this.width - w, this.height - h);
};

/**
 * このSizeが、指定された高さ・幅以下にならないようにアスペクト比を保持してリサイズします。
 */
Size.prototype.fitmin = function(){
	var w = 0;
	var h = 0;
	switch(arguments.length){
		case 1:
			if(arguments[0] instanceof Size){
				w = arguments[0].width;
				h = arguments[0].height;
			}
			else{
				throw new Error("Invalid Arguments.");
			}
			break;
		case 2:
			w = arguments[0];
			h = arguments[1];
			break;
		default:
			throw new Error("Invalid Arguments.");
	}
	var rw = w / this.width;
	var rh = h / this.height;
	if(1 < rw || 1 < rh){
		var r = (rh < rw) ? rw : rh;
		return this.zoom(r);
	}
	else{
		return this;
	}
};

/**
 * このSizeが、指定された高さ・幅以下になるようにアスペクト比を保持してリサイズします。
 */
Size.prototype.fitmax = function(){
	var w = 0;
	var h = 0;
	switch(arguments.length){
		case 1:
			if(arguments[0] instanceof Size){
				w = arguments[0].width;
				h = arguments[0].height;
			}
			else{
				throw new Error("Invalid Arguments.");
			}
		case 2:
			w = arguments[0];
			h = arguments[1];
			break;
		default:
			throw new Error("Invalid Arguments.");
	}
	var rw = w / this.width;
	var rh = h / this.height;
	if(rw < 1 || rh < 1){
		var r = (rw < rh) ? rw : rh;
		return this.zoom(r);
	}
	else{
		return this;
	}
};

/**
 * このSizeをCSSとして取得します。
 */
Size.prototype.toCSS = function(){
	return {"width": parseInt(this.width).toString() + "px", "height": parseInt(this.height).toString() + "px"};
};
