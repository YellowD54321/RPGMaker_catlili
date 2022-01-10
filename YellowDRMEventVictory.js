function YellowDVictoryEventSetting() {
	var checkPointEventId = [];
	var keyEventId = [];
	var victoryWay = [];
	var currentStage = $gameVariables.value(1);
	$gameSystem.yellowDVictoryWay = [];
	
	switch (currentStage) {
		case 1:
			victoryWay = [
				{checkPointEventId: 46, keyEventId: [44], checked: false}
			];
			victoryWay.calledEvent = false;
		break;
		case 2:
			victoryWay = [
				{checkPointEventId: 46, keyEventId: [1], checked: false}
			];
			victoryWay.calledEvent = false;
		break;
		case 3:
			victoryWay = [
				{checkPointEventId: 46, keyEventId: [49], checked: false}
			];
			victoryWay.calledEvent = false;
		break;
		case 4:
			victoryWay = [
				{checkPointEventId: 46, keyEventId: [47, 48, 55, 56, 57, 58, 59, 60, 61, 62, 63], checked: false}
			];
			victoryWay.calledEvent = false;
		break;
		case 5:
			victoryWay = [
				{checkPointEventId: 46, keyEventId: [58, 69, 71], checked: false}, 
				{checkPointEventId: 74, keyEventId: [58, 69, 71], checked: false}, 
				{checkPointEventId: 75, keyEventId: [58, 69, 71], checked: false}
			];
			victoryWay.calledEvent = false;
		break;
		case 6:
		break;
		case 7:
			victoryWay = [];
			victoryWay.calledEvent = false;
		break;
		case 8:
			victoryWay = [
				{checkPointEventId: 46, keyEventId: [48], checked: false}, 
				{checkPointEventId: 46, keyEventId: [56], checked: false}, 
				{checkPointEventId: 46, keyEventId: [57], checked: false}, 
				{checkPointEventId: 46, keyEventId: [59], checked: false}
			];
		break;
		case 9:
			victoryWay = [
				{checkPointEventId: 46, keyEventId: [44, 62], checked: false}, 
				{checkPointEventId: 74, keyEventId: [44, 62], checked: false}
			];
		break;
		case 10:
		break;
		case 11:
		break;
		case 12:
		break;
		case 13:
		break;
		case 14:
		break;
		default:
			victoryWay = [];
		break;
	};
		$gameSystem.yellowDVictoryWay = victoryWay;
};

var YellowDVictoryWayCheck_mapUpdate = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
  YellowDVictoryWayCheck_mapUpdate.call(this);
	YellowDVictoryWayCheck();
};

function YellowDVictoryWayCheck() {
	var currentStage = $gameVariables.value(1);
	var currentLittleStage = $gameVariables.value(2);
	var victoryWay = $gameSystem.yellowDVictoryWay;
	
	if (!victoryWay || victoryWay.length == 0) return false;
	if (victoryWay.calledEvent) return true;
	// if (currentStage == 7) return false;
	
	for (eachWay of victoryWay) {
		for (eachkeyEventId of eachWay.keyEventId) {
			var checkPointEvent = $gameMap.event(eachWay.checkPointEventId);
			var keyEvent = $gameMap.event(eachkeyEventId);
			if (checkPointEvent.x == keyEvent.x && checkPointEvent.y == keyEvent.y) {
				eachWay.checked = true;
				if (currentStage == 5) {
					$gameVariables.setValue(2, currentLittleStage+1);
					keyEvent._opacity = 0;
					keyEvent._through = true;
					keyEvent.setPosition(eachkeyEventId, eachkeyEventId);
					checkPointEvent.setPosition(eachWay.checkPointEventId, eachWay.checkPointEventId);
					if (currentLittleStage < 3) {
						$gameMap.event(victoryWay[currentLittleStage].checkPointEventId).setPosition(7, 4);
					};
				} else if (currentStage == 8) {
					keyEvent._opacity = 0;
					keyEvent._through = true;
					keyEvent.setPosition(eachkeyEventId, eachkeyEventId);
					$gameVariables.setValue(2, currentLittleStage+1);
					$gameTemp.reserveCommonEvent(19);
				};
			};
		};
	};
	if (!victoryWay.calledEvent && victoryWay.length > 0 && !victoryWay.some(x => x.checked == false)) {
		if (currentStage != 8) {
			//Call victory event.
			console.log("victoryWay is passing.");
			victoryWay.calledEvent = true;
			$gameTemp.reserveCommonEvent(2);
		};
	};
};