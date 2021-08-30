$( document ).ready(function() {
    let botao = document.querySelector("#botao");
	let menu_lateral = document.querySelector(".menu_lateral");
		  
	botao.onclick = function() {
	    menu_lateral.classList.toggle("active");
	}
  });