var menue = document.querySelector(".menu");
var scoreUi = document.querySelector('.game-over-notify--score');
function playBtn(){
	if (gameCount > 0) {
		Restart();
	}
	if (menue.classList.contains('fade')) {
		gameStop = 1;
	}else{
		menue.classList.toggle('fade');
		window.setTimeout(function(){
			gameStop = 0;
		},250);
	}
}
function toMenue(){
	menue.classList.remove('fade');
	gameOverWindow.classList.remove('active');	
}
function rest(){
	Restart();
	gameOverWindow.classList.remove('active');	
}
function otherList(numberList){
	var elements = document.querySelectorAll('.menu__list--item.menu__list--item--main');
	elements.forEach(function(item, i, arr){
		item.classList.remove('active');
	})
	document.querySelector('.menu__list--item.menu__list--item--main[data-menu="'+numberList+'"]').classList.toggle('active');
}
var greatWallBtn = document.querySelector('#greatWall');
function vallToggle(){
		greatWallBtn.classList.remove('menu__list-button--green');
		greatWallBtn.classList.remove('menu__list-button--orange');
	if (greatWall == 0) {
		greatWallBtn.classList.add('menu__list-button--green');
		greatWall = 1;
	}else{
		greatWallBtn.classList.add('menu__list-button--orange');
		greatWall = 0;
	}
}