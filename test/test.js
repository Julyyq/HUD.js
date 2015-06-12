window.onload = function() {
	
	var isIE = /*@cc_on!@*/0;
	
	var css = {
		showBtn: "show",
		hideBtn: "hide"
	}
	var showBtn = document.getElementsByClassName(css.showBtn)[0],
		hideBtn = document.getElementsByClassName(css.hideBtn)[0];
	
	var showBtnHandler = function(e) {
		console.log("do some thing");
	}
	
	var hideBtnHandler = function(e) {
		console.log("do some thing");
	}
	
	showBtn.addEventListener("click", showBtnHandler);
	hideBtn.addEventListener("click", hideBtnHandler);
}