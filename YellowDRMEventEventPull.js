Input.keyMapper = {
    9: 'tab',       // tab
    13: 'ok',       // enter
    16: 'shift',    // shift
    17: 'control',  // control
    18: 'control',  // alt
    27: 'escape',   // escape
    32: 'ok',       // space
    33: 'pageup',   // pageup
    34: 'pagedown', // pagedown
    37: 'left',     // left arrow
    38: 'up',       // up arrow
    39: 'right',    // right arrow
    40: 'down',     // down arrow
    45: 'escape',   // insert
    81: 'pageup',   // Q
    87: 'pagedown', // W
    88: 'escape',   // X
    90: 'ok',       // Z
    96: 'escape',   // numpad 0
    98: 'down',     // numpad 2
    100: 'left',    // numpad 4
    102: 'right',   // numpad 6
    104: 'up',      // numpad 8
    120: 'debug',   // F9
		65:  'A',				// A
};

function YellowDEventPullInitialize() {
	var pullableEventsId = [];
	for (var eachEvent of $dataMap.events) {
		if (!eachEvent || !eachEvent.note) continue;
		if (eachEvent.note.includes("<pullable>")) {
			pullableEventsId.push(eachEvent.id);
		};
	};
	$gameSystem.pullableEventsId = pullableEventsId;
	// $gameSwitches.setValue(12, true);
};

var YellowDEventPull_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
	YellowDEventPull_start.call(this);
	YellowDEventPullInitialize();
};

var YellowDEventPull_mapUpdate = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
  YellowDEventPull_mapUpdate.call(this);
	
	if ( $gameSwitches.value(12) && Input.isPressed('A') ) {
		var eventPulling = new YellowDEventPull();
	} else {
		if ( !$gameSwitches.value(11) ) {
			var eventPullingUntriggered = new RoguelikeEventPullUntriggered();
		};
	};
};

function YellowDEventPull() {
	//拉動方向紀錄，與玩家面向方向相反。8=往上拉、2=往下拉、4=往左拉、6=往右拉。
	$gameVariables.setValue(11, 0);
	// $gameSystem.roguelikeEventPullDirection = 0;
	if ( !$gameSystem.pullableEventsId || $gameSystem.pullableEventsId.length <= 0 ) { return false; };
	$gameSystem.pullableEventsId.forEach(function(eachEventId) {
		var eventX = $gameMap.event(eachEventId).x;
		var eventY = $gameMap.event(eachEventId).y;
		switch ($gamePlayer.direction()) {
			//玩家面朝上的情況
			case 8:
				if ( (eventX === $gamePlayer.x) && ($gamePlayer.y - eventY === 1) ) {
					// $gameSystem.roguelikeEventPullDirection = 10 - $gamePlayer.direction();
					$gameVariables.setValue(11, 10 - $gamePlayer.direction());
					$gameSelfSwitches.setValue([$gameMap._mapId, eachEventId, 'B'], true);
				};
			break;
			//玩家面朝下的情況
			case 2:
				if ( (eventX === $gamePlayer.x) && ($gamePlayer.y - eventY === -1) ) {
					// $gameSystem.roguelikeEventPullDirection = 10 - $gamePlayer.direction();
					$gameVariables.setValue(11, 10 - $gamePlayer.direction());
					$gameSelfSwitches.setValue([$gameMap._mapId, eachEventId, 'B'], true);
				};
			break;
			//玩家面朝左的情況
			case 4:
				if ( ($gamePlayer.y === eventY) && ($gamePlayer.x - eventX === 1) ) {
					// $gameSystem.roguelikeEventPullDirection = 10 - $gamePlayer.direction();
					$gameVariables.setValue(11, 10 - $gamePlayer.direction());
					$gameSelfSwitches.setValue([$gameMap._mapId, eachEventId, 'B'], true);
				};
			break;
			//玩家面朝右的情況
			case 6:
				if ( ($gamePlayer.y === eventY) && ($gamePlayer.x - eventX === -1) ) {
					// $gameSystem.roguelikeEventPullDirection = 10 - $gamePlayer.direction();
					$gameVariables.setValue(11, 10 - $gamePlayer.direction());
					$gameSelfSwitches.setValue([$gameMap._mapId, eachEventId, 'B'], true);
				};
			break;
			default:
			break;
		};
	});
};

function RoguelikeEventPullUntriggered() {
	// $gameSystem.roguelikeEventPullDirection = 0;
	$gameVariables.setValue(11, 0);
	if ( !$gameSystem.pullableEventsId || $gameSystem.pullableEventsId.length <= 0 ) { return false; };
	$gameSystem.pullableEventsId.forEach(function(eachEventId) {
		$gameSelfSwitches.setValue([$gameMap._mapId, eachEventId, 'B'], false);
	});
};

//判斷事件是否可以拉動
// function RoguelikeEventPullable(eventId) {
	// var pullable = true;
	// var actorFaction = $gameSystem.partyMemberConditionContent.some
											// (x => x.name === $dataMap.events[eventId].name) ? 
										 // "player" : "enemy";
	// var actor = actorFaction === "player" ? 
							// $gameSystem.partyMemberConditionContent.find(x => x.name === $dataMap.events[eventId].name) : 
							// actorFaction === "enemy" ? 
							// $gameSystem.EnemyInformation.find(x => x.enemyIndex === $gameSystem.battleMembersPriority.find(y => y.eventId === eventId).enemyIndex) : 
							// {};
	// var actorCondition = actor.condition;
	
	// condition 65 = 暗影束縛
	// if ( actorCondition.some(x => x.conditionId === 65) ) { pullable = false; };
	
	
	// return pullable;
// };