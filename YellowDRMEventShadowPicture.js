var YellowD_ShadowPicture_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
	YellowD_ShadowPicture_start.call(this);
	this.loadShadowImages();
};

Scene_Map.prototype.loadShadowImages = function() {
	var locatingLeftTopEventId = 2;
	var locatingRightBottomEventId = 3;
	var locatingLTEvent = $gameMap.event(locatingLeftTopEventId);
	var locatingRBEvent = $gameMap.event(locatingRightBottomEventId);
	var oneBlockPixel = 48;
	var allPicture = [];
	
	var nonBlockArea = this.nonBlockArea();
	
	for (var w = locatingLTEvent.x; w <= locatingRBEvent.x; w++) {
		allPicture.push([]);
		for (var h = locatingLTEvent.y; h <= locatingRBEvent.y; h++) {
			var pictureX = 0;
			var pictureY = 0;
			var Yadjustment = 0;
			allPicture[w].push([]);
			allPicture[w][h] = {
				eventX: w,
				eventY: h,
				picture: new Sprite(),
				nonBlock: false
			};
			pictureX = locatingLTEvent.screenX() + oneBlockPixel * w - oneBlockPixel / 2;
			pictureY = locatingLTEvent.screenY() + oneBlockPixel * h - oneBlockPixel + Yadjustment;
			allPicture[w][h].picture.bitmap = ImageManager.loadPicture('black');
			allPicture[w][h].picture.x = pictureX;
			allPicture[w][h].picture.y = pictureY;
			this.addChild( allPicture[w][h].picture );
			for (var nb of nonBlockArea) {
				if (nb.x == allPicture[w][h].eventX && nb.y == allPicture[w][h].eventY) {
					allPicture[w][h].nonBlock = true;
				};
			};
		};
	};
	for (var eachPictureW of allPicture) {
		for (var eachPictureH of eachPictureW) {
			if (eachPictureH.nonBlock == true) {
				eachPictureH.picture.opacity = 0;
			} else {
				eachPictureH.picture.opacity = 255;
			};
		};
	};
	this.allPicture = allPicture;
};

var YellowD_ShadowPicture_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	YellowD_ShadowPicture_update.call(this);
	this.imagesRefresh();
};

Scene_Map.prototype.imagesRefresh = function() {
	var locatingLeftTopEventId = 2;
	var locatingRightBottomEventId = 3;
	var locatingLTEvent = $gameMap.event(locatingLeftTopEventId);
	var locatingRBEvent = $gameMap.event(locatingRightBottomEventId);
	var oneBlockPixel = 48;
	var allPicture = this.allPicture;
	
	var nonBlockArea = this.nonBlockArea();
	console.log("$currentLittleStage = " + $gameVariables.value(2));
	if (!allPicture || allPicture.length <= 0) return false;
	if (!nonBlockArea || nonBlockArea.length <= 0) {
		for (var eachPictureW of allPicture) {
			for (var eachPictureH of eachPictureW) {
				eachPictureH.picture.opacity = 0;
			};
		};
		return false;
	};
	
	for (var i = 0; i < allPicture.length; i++) {
		for (var j = 0; j < allPicture[i].length; j++) {
			var pictureX = 0;
			var pictureY = 0;
			var Yadjustment = 0;
			var w = allPicture[i][j].eventX - locatingLTEvent.x;
			var h = allPicture[i][j].eventY - locatingLTEvent.y;
			pictureX = locatingLTEvent.screenX() + oneBlockPixel * w - oneBlockPixel / 2;
			pictureY = locatingLTEvent.screenY() + oneBlockPixel * h - oneBlockPixel + Yadjustment;
			allPicture[i][j].picture.x = pictureX;
			allPicture[i][j].picture.y = pictureY;
			for (var nb of nonBlockArea) {
				if (nb.x == allPicture[i][j].eventX && nb.y == allPicture[i][j].eventY) {
					allPicture[i][j].nonBlock = true;
				};
			};
		};
	};
	for (var eachPictureW of allPicture) {
		for (var eachPictureH of eachPictureW) {
			if (eachPictureH.nonBlock == true) {
				eachPictureH.picture.opacity = 0;
			} else {
				eachPictureH.picture.opacity = 255;
			};
		};
	};
};

Scene_Map.prototype.nonBlockArea = function() {
	var currentStage = $gameVariables.value(1);
	var currentLittleStage = $gameVariables.value(2);
	switch (currentStage) {
		case 0:
			return [
				{x: 1, y: 13}, {x: 2, y: 13}, {x: 3, y: 13}, 
				{x: 1, y: 14}, {x: 2, y: 14}, {x: 3, y: 14},
				{x: 1, y: 15}, {x: 2, y: 15}, {x: 3, y: 15}
			];
		break;
		case 1:
			if (currentLittleStage >= 1) return [];
			return [
				{x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}, {x: 0, y: 4}, {x: 0, y: 5}, {x: 0, y: 6}, {x: 0, y: 7}, {x: 0, y: 8}, 
				{x: 0, y: 9}, {x: 0, y: 10}, {x: 0, y: 11}, {x: 0, y: 12}, {x: 0, y: 13}, {x: 0, y: 14}, {x: 0, y: 15}, {x: 0, y: 16}, 
				{x: 1, y: 13}, {x: 2, y: 13}, {x: 3, y: 13}, 
				{x: 1, y: 14}, {x: 2, y: 14}, {x: 3, y: 14},
				{x: 1, y: 15}, {x: 2, y: 15}, {x: 3, y: 15}
			];
		break;
		case 2:
			if (currentLittleStage >= 1) return [];
			return [
				{x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}, {x: 0, y: 4}, {x: 0, y: 5}, {x: 0, y: 6}, {x: 0, y: 7}, {x: 0, y: 8}, 
				{x: 0, y: 9}, {x: 0, y: 10}, {x: 0, y: 11}, {x: 0, y: 12}, {x: 0, y: 13}, {x: 0, y: 14}, {x: 0, y: 15}, {x: 0, y: 16}, 
				{x: 1, y: 7}, {x: 2, y: 7}, {x: 3, y: 7}, {x: 4, y: 7}, {x: 5, y: 7}, {x: 6, y: 7}, 
				{x: 1, y: 8}, {x: 2, y: 8}, {x: 3, y: 8}, {x: 4, y: 8}, {x: 5, y: 8}, {x: 6, y: 8}, 
				{x: 1, y: 9}, {x: 2, y: 9}, {x: 3, y: 9}, {x: 4, y: 9}, {x: 5, y: 9}, {x: 6, y: 9}, 
				{x: 1, y: 10}, {x: 2, y: 10}, {x: 3, y: 10}, {x: 4, y: 10}, {x: 5, y: 10}, {x: 6, y: 10}, 
				{x: 1, y: 11}, {x: 2, y: 11}, {x: 3, y: 11}, {x: 4, y: 11}, {x: 5, y: 11}, {x: 6, y: 11}, 
				{x: 1, y: 12}, {x: 2, y: 12}, {x: 3, y: 12}, {x: 4, y: 12}, {x: 5, y: 12}, {x: 6, y: 12}, 
				{x: 1, y: 13}, {x: 2, y: 13}, {x: 3, y: 13}, {x: 4, y: 13}, {x: 5, y: 13}, {x: 6, y: 13}, 
				{x: 1, y: 14}, {x: 2, y: 14}, {x: 3, y: 14}, {x: 4, y: 14}, {x: 5, y: 14}, {x: 6, y: 14}, 
				{x: 1, y: 15}, {x: 2, y: 15}, {x: 3, y: 15}, {x: 4, y: 15}, {x: 5, y: 15}, {x: 6, y: 15}, 
				{x: 1, y: 16}, {x: 2, y: 16}, {x: 3, y: 16}, {x: 4, y: 16}, {x: 5, y: 16}, {x: 6, y: 16}
			];
		break;
		case 3:
			if (currentLittleStage >= 1) return [];
			return [
				{x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}, {x: 0, y: 4}, {x: 0, y: 5}, {x: 0, y: 6}, {x: 0, y: 7}, {x: 0, y: 8}, 
				{x: 0, y: 9}, {x: 0, y: 10}, {x: 0, y: 11}, {x: 0, y: 12}, {x: 0, y: 13}, {x: 0, y: 14}, {x: 0, y: 15}, {x: 0, y: 16}, 
				{x: 1, y: 7}, {x: 2, y: 7}, {x: 3, y: 7}, {x: 4, y: 7}, {x: 5, y: 7}, {x: 6, y: 7}, 
				{x: 1, y: 8}, {x: 2, y: 8}, {x: 3, y: 8}, {x: 4, y: 8}, {x: 5, y: 8}, {x: 6, y: 8}, 
				{x: 1, y: 9}, {x: 2, y: 9}, {x: 3, y: 9}, {x: 4, y: 9}, {x: 5, y: 9}, {x: 6, y: 9}, 
				{x: 1, y: 10}, {x: 2, y: 10}, {x: 3, y: 10}, {x: 4, y: 10}, {x: 5, y: 10}, {x: 6, y: 10}, 
				{x: 1, y: 11}, {x: 2, y: 11}, {x: 3, y: 11}, {x: 4, y: 11}, {x: 5, y: 11}, {x: 6, y: 11}, 
				{x: 1, y: 12}, {x: 2, y: 12}, {x: 3, y: 12}, {x: 4, y: 12}, {x: 5, y: 12}, {x: 6, y: 12}, 
				{x: 1, y: 13}, {x: 2, y: 13}, {x: 3, y: 13}, {x: 4, y: 13}, {x: 5, y: 13}, {x: 6, y: 13}, 
				{x: 1, y: 14}, {x: 2, y: 14}, {x: 3, y: 14}, {x: 4, y: 14}, {x: 5, y: 14}, {x: 6, y: 14}, 
				{x: 1, y: 15}, {x: 2, y: 15}, {x: 3, y: 15}, {x: 4, y: 15}, {x: 5, y: 15}, {x: 6, y: 15}, 
				{x: 1, y: 16}, {x: 2, y: 16}, {x: 3, y: 16}, {x: 4, y: 16}, {x: 5, y: 16}, {x: 6, y: 16},
				{x: 7, y: 13}, {x: 8, y: 13}, {x: 9, y: 13}, {x: 10, y: 13}, {x: 11, y: 13}, {x: 12, y: 13}, {x: 13, y: 13},
				{x: 7, y: 14}, {x: 8, y: 14}, {x: 9, y: 14}, {x: 10, y: 14}, {x: 11, y: 14}, {x: 12, y: 14}, {x: 13, y: 14},
				{x: 7, y: 15}, {x: 8, y: 15}, {x: 9, y: 15}, {x: 10, y: 15}, {x: 11, y: 15}, {x: 12, y: 15}, {x: 13, y: 15},
				{x: 7, y: 16}, {x: 8, y: 16}, {x: 9, y: 16}, {x: 10, y: 16}, {x: 11, y: 16}, {x: 12, y: 16}, {x: 13, y: 16}
			];
		break;
		case 4:
			if (currentLittleStage <= 1) return [];
			if (currentLittleStage >= 3) return [];
			return [
				{x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}, {x: 0, y: 4}, {x: 0, y: 5}, {x: 0, y: 6}, {x: 0, y: 7}, {x: 0, y: 8}, 
				{x: 0, y: 9}, {x: 0, y: 10}, {x: 0, y: 11}, {x: 0, y: 12}, {x: 0, y: 13}, {x: 0, y: 14}, {x: 0, y: 15}, {x: 0, y: 16}, 
				{x: 1, y: 7}, {x: 2, y: 7}, {x: 3, y: 7}, {x: 4, y: 7}, {x: 5, y: 7}, {x: 6, y: 7}, 
				{x: 1, y: 8}, {x: 2, y: 8}, {x: 3, y: 8}, {x: 4, y: 8}, {x: 5, y: 8}, {x: 6, y: 8}, 
				{x: 1, y: 9}, {x: 2, y: 9}, {x: 3, y: 9}, {x: 4, y: 9}, {x: 5, y: 9}, {x: 6, y: 9}, 
				{x: 1, y: 10}, {x: 2, y: 10}, {x: 3, y: 10}, {x: 4, y: 10}, {x: 5, y: 10}, {x: 6, y: 10}, 
				{x: 1, y: 11}, {x: 2, y: 11}, {x: 3, y: 11}, {x: 4, y: 11}, {x: 5, y: 11}, {x: 6, y: 11}, 
				{x: 1, y: 12}, {x: 2, y: 12}, {x: 3, y: 12}, {x: 4, y: 12}, {x: 5, y: 12}, {x: 6, y: 12}, 
				{x: 1, y: 13}, {x: 2, y: 13}, {x: 3, y: 13}, {x: 4, y: 13}, {x: 5, y: 13}, {x: 6, y: 13}, 
				{x: 1, y: 14}, {x: 2, y: 14}, {x: 3, y: 14}, {x: 4, y: 14}, {x: 5, y: 14}, {x: 6, y: 14}, 
				{x: 1, y: 15}, {x: 2, y: 15}, {x: 3, y: 15}, {x: 4, y: 15}, {x: 5, y: 15}, {x: 6, y: 15}, 
				{x: 1, y: 16}, {x: 2, y: 16}, {x: 3, y: 16}, {x: 4, y: 16}, {x: 5, y: 16}, {x: 6, y: 16},
				{x: 7, y: 12}, {x: 8, y: 12}, {x: 9, y: 12}, {x: 10, y: 12}, {x: 11, y: 12}, 
				{x: 7, y: 13}, {x: 8, y: 13}, {x: 9, y: 13}, {x: 10, y: 13}, {x: 11, y: 13}, {x: 12, y: 13}, {x: 13, y: 13},
				{x: 7, y: 14}, {x: 8, y: 14}, {x: 9, y: 14}, {x: 10, y: 14}, {x: 11, y: 14}, {x: 12, y: 14}, {x: 13, y: 14},
				{x: 7, y: 15}, {x: 8, y: 15}, {x: 9, y: 15}, {x: 10, y: 15}, {x: 11, y: 15}, {x: 12, y: 15}, {x: 13, y: 15},
				{x: 7, y: 16}, {x: 8, y: 16}, {x: 9, y: 16}, {x: 10, y: 16}, {x: 11, y: 16}, {x: 12, y: 16}, {x: 13, y: 16}, 
				{x: 12, y: 1}, {x: 13, y: 1}, {x: 14, y: 1}, {x: 15, y: 1}, {x: 16, y: 1}, {x: 17, y: 1}, {x: 18, y: 1}, 
				{x: 12, y: 2}, {x: 13, y: 2}, {x: 14, y: 2}, {x: 15, y: 2}, {x: 16, y: 2}, {x: 17, y: 2}, {x: 18, y: 2}, 
				{x: 12, y: 3}, {x: 13, y: 3}, {x: 14, y: 3}, {x: 15, y: 3}, {x: 16, y: 3}, {x: 17, y: 3}, {x: 18, y: 3}, 
				{x: 12, y: 4}, {x: 13, y: 4}, {x: 14, y: 4}, {x: 15, y: 4}, {x: 16, y: 4}, {x: 17, y: 4}, {x: 18, y: 4}, 
				{x: 12, y: 5}, {x: 13, y: 5}, {x: 14, y: 5}, {x: 15, y: 5}, {x: 16, y: 5}, {x: 17, y: 5}, {x: 18, y: 5}, 
				{x: 12, y: 6}, {x: 13, y: 6}, {x: 14, y: 6}, {x: 15, y: 6}, {x: 16, y: 6}, {x: 17, y: 6}, {x: 18, y: 6}, 
				{x: 12, y: 7}, {x: 13, y: 7}, {x: 14, y: 7}, {x: 15, y: 7}, {x: 16, y: 7}, {x: 17, y: 7}, {x: 18, y: 7}, 
				{x: 12, y: 8}, {x: 13, y: 8}, {x: 14, y: 8}, {x: 15, y: 8}, {x: 16, y: 8}, {x: 17, y: 8}, {x: 18, y: 8}, 
				{x: 12, y: 9}, {x: 13, y: 9}, {x: 14, y: 9}, {x: 15, y: 9}, {x: 16, y: 9}, {x: 17, y: 9}, {x: 18, y: 9}, 
				{x: 12, y: 10}, {x: 13, y: 10}, {x: 14, y: 10}, {x: 15, y: 10}, {x: 16, y: 10}, {x: 17, y: 10}, {x: 18, y: 10}, 
				{x: 12, y: 11}, {x: 13, y: 11}, {x: 14, y: 11}, {x: 15, y: 11}, {x: 16, y: 11}, {x: 17, y: 11}, {x: 18, y: 11}, 
				{x: 12, y: 12}, {x: 13, y: 12}, {x: 14, y: 12}, {x: 15, y: 12}, {x: 16, y: 12}, {x: 17, y: 12}, {x: 18, y: 12}, 
				{x: 12, y: 13}, {x: 13, y: 13}, {x: 14, y: 13}, {x: 15, y: 13}, {x: 16, y: 13}, {x: 17, y: 13}, {x: 18, y: 13}, 
				{x: 12, y: 14}, {x: 13, y: 14}, {x: 14, y: 14}, {x: 15, y: 14}, {x: 16, y: 14}, {x: 17, y: 14}, {x: 18, y: 14}, 
				{x: 12, y: 15}, {x: 13, y: 15}, {x: 14, y: 15}, {x: 15, y: 15}, {x: 16, y: 15}, {x: 17, y: 15}, {x: 18, y: 15}, 
				{x: 12, y: 16}, {x: 13, y: 16}, {x: 14, y: 16}, {x: 15, y: 16}, {x: 16, y: 16}, {x: 17, y: 16}, {x: 18, y: 16}
			];
		break;
		case 5:
			return [];
		break;
		case 6:
			return [];
		break;
		case 7:
			return [];
		break;
		case 8:
			return [];
		break;
		case 9:
			return [];
		break;
		case 10:
			return [];
		break;
		case 11:
			return [];
		break;
		default:
			return [];
		break;
	}
};

function YellowDSetBlockEvent() {
	var currentStage = $gameVariables.value(1);
	var blockEventPosition = [];
	var blockEventId = [
		4, 5, 6, 7, 8, 9, 
		11, 12, 13, 14, 15, 16, 17, 18, 19, 
		20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 
		30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 
		40, 41, 42
	];
	for (eachEventId of blockEventId) {
		$gameMap.event(eachEventId).setPosition(0, 19);
	};
	switch (currentStage) {
		case 1:
			blockEventPosition = [
				{x: 1, y: 12}, {x: 2, y: 12}, {x: 3, y: 12},
				{x: 4, y: 13}, {x: 4, y: 14}, {x: 4, y: 15}
			];
		break;
		case 2:
			blockEventPosition = [
				{x: 1, y: 6}, {x: 2, y: 6}, {x: 3, y: 6}, {x: 4, y: 6}, {x: 5, y: 6}, {x: 6, y: 6}, {x: 7, y: 6}, 
				{x: 7, y: 7},{x: 7, y: 8}, {x: 7, y: 9}, {x: 7, y: 10}, {x: 7, y: 11}, 
				{x: 7, y: 12}, {x: 7, y: 13}, {x: 7, y: 14}, {x: 7, y: 15}, {x: 7, y: 16}
			];
		break;
		case 3:
			blockEventPosition = [
				{x: 1, y: 6}, {x: 2, y: 6}, {x: 3, y: 6}, {x: 4, y: 6}, {x: 5, y: 6}, {x: 6, y: 6}, {x: 7, y: 6}, 
				{x: 7, y: 7},{x: 7, y: 8}, {x: 7, y: 9}, {x: 7, y: 10}, {x: 7, y: 11}, {x: 7, y: 12}, 
				{x: 8, y: 12}, {x: 9, y: 12}, {x: 10, y: 12}, {x: 11, y: 12}, {x: 12, y: 12}, {x: 13, y: 12}, {x: 14, y: 12}, 
				{x: 14, y: 13}, {x: 14, y: 14}, {x: 14, y: 15}, {x: 14, y: 16}
			];
		break;
		case 4:
			blockEventPosition = [
				{x: 1, y: 6}, {x: 2, y: 6}, {x: 3, y: 6}, {x: 4, y: 6}, {x: 5, y: 6}, {x: 6, y: 6}, {x: 7, y: 6}, 
				{x: 7, y: 7},{x: 7, y: 8}, {x: 7, y: 9}, {x: 7, y: 10}, {x: 7, y: 11}, 
				{x: 8, y: 11}, {x: 9, y: 11}, {x: 10, y: 11}, {x: 11, y: 11}, 
			];
		break;
		case 5:
			blockEventPosition = [];
		break;
		case 6:
			blockEventPosition = [];
		break;
		case 7:
			blockEventPosition = [];
		break;
		case 8:
			blockEventPosition = [];
		break;
		case 9:
			blockEventPosition = [];
		break;
		case 10:
			blockEventPosition = [];
		break;
		case 11:
			blockEventPosition = [];
		break;
		default:
			blockEventPosition = [];
		break;
	}
	for (eachPosition of blockEventPosition) {
		var eventId = blockEventId.shift();
		$gameMap.event(eventId).setPosition(eachPosition.x, eachPosition.y);
	};
	
	
};

Window_Message.prototype.numVisibleRows = function() {
    return 3;
};