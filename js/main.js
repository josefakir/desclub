$(document).on("pagecreate", "#home", function() {

});
$(document).on("pagecreate", "#historico", function() {
	$('#headerhistorico').addClass(seccion);
	$('#filtroshistorico').addClass(seccion);
	$('.promo').addClass(seccion);
	switch(seccion){
		case "alimentos" :
		subgiros = "21,50,53,62,63,64,65";
		break;
		case "belleza" :
		subgiros = "15,56,58,23,54,55,57";
		break;
		case "educacion" :
		subgiros = "33,67";
		break;
		case "entretenimiento":
		subgiros = "10,51,61";
		break;
		case "moda":
		subgiros = "36,37,59,7";
		break;
		case "servicios":
		subgiros = "2,34,32,35,38,66,68,69";
		break;
		case "turismo":
		subgiros = "60";
		break;
	}
	url = "http://grupomedios.com/intranet/wsdesclub/?m=descuentos&o=0&l=10";
	$.ajax({
		url : url,
		beforeSend : function(){
			$.mobile.loading('show');
		},
		success : function(result){
 			$.each(result, function() {
				console.log(this)
			});
			$.mobile.loading('hide');
		}
	})
});
$(document).ready(function(){
	$('.menuhome').click(function(e){
		seccion = $(this).attr('rel');
	});
});