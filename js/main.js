seccion = "";
offset = 0;
limit = 10;
estado = "";
busqueda = "";
function obtenerDescuentos(offset,limit,subgiros,estado,busqueda){
	$('#contenedorEstablecimientos').html('');
	url = "http://grupomedios.com/intranet/wsdesclub/?m=descuentos&o="+offset+"&l="+limit+"&c="+subgiros+"&lat="+$('#latitud').html()+"&long="+$('#longitud').html()+"&e="+estado+"&b="+busqueda;
	$.ajax({
		url : url,
		beforeSend : function(){
			$('.ui-loader').fadeIn('fast');
		},
		success : function(result){
			r = result.Descuentos;
 			$.each(r, function(index) {
 				/*
 				marca = r[index].Sucursales[0].Marca;
 				calle = r[index].Sucursales[0].Calle;
 				noext = r[index].Sucursales[0].Numero_exterior;
 				noint = r[index].Sucursales[0].Numero_interior;
 				*/
 				marca = r[index].Marca;
 				calle = r[index].Calle;
 				noext = r[index].Numero_Extterior;
 				noint = r[index].Numero_interior;
 				colonia = r[index].Colonia;
 				detallepromo = r[index].detalle_promo;
 				if(detallepromo==""){
 					detallepromo = "promo";
 				}
 				logogrande = r[index].logo_grande;
 				logochico = r[index].logo_chico;
 				if(logochico!=""){

 					imagen = logochico;
 				}else{
 					imagen = logogrande;
 				}
 				output = '<div class="establecimiento"><div class="imagenEstablecimiento"><img class="w100 imgEst" src="'+imagen+'" alt=""></div><div class="descripcion"><h2 class="tituloEstablecimiento">'+marca+'</h2><p class="descripcionEstablecimiento">'+calle+' '+noext+' '+noint+' '+colonia+'</p></div><div class="circulo"><div class="promo"><span>'+detallepromo+'</span></div></div></div>';
				$('#contenedorEstablecimientos').append(output);
			});
			$('.imgEst').error(function(){
				$(this).attr('src','images/desclubgenerica.jpg');
			});
			$('.promo').addClass(seccion);
			$('.ui-loader').fadeOut('fast');
		}
	})
}
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 19.360693100000002, lng: -99.1950667},
    zoom: 12,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
  });
}
$(document).on("pagecreate", "#home", function() {
	if (navigator.geolocation) {
		var options = {
		  enableHighAccuracy: false,
		  timeout: 5000,
		  maximumAge: 0
		};
	    navigator.geolocation.getCurrentPosition(function(position) {
	    var pos = {
	        lat: position.coords.latitude,
	        lng: position.coords.longitude
	      };
	    $('#latitud').html(pos.lat);
	    $('#longitud').html(pos.lng)
	    }, function() {
	      handleLocationError(true, infoWindow, map.getCenter());
	    },options);
  	}
  	$('#buscar').on('keypress', function (event) {
		if(event.which === 13){
			busqueda = $('#buscar').val();
			seccion = "todas";
			$.mobile.navigate( "historico.html" );
		}
	});
});
$(document).on("pagecreate", "#historico", function() {
	/* FIN AGREGAR SUBGIROS */
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
		case "todas":
		subgiros = "";
		break;
	}
	$('#headerhistorico').addClass(seccion);
	$('#filtroshistorico').addClass(seccion);
	/* AGREGAR ESTADOS */
	urlestados = "http://grupomedios.com/intranet/wsdesclub/?m=estados"
	$.ajax({
		url : urlestados,
		success : function(result){
			r = result.Estados;
 			$.each(r, function(index) {
 				if(r[index].idEstado==estado){
 					output = '<option value="'+r[index].idEstado+'" selected>'+r[index].Estado+'</option>';
 				}else{
 					output = '<option value="'+r[index].idEstado+'">'+r[index].Estado+'</option>';
 				}
 				$('#estado').append(output);
 				$("#estado").selectmenu('refresh', true);
 				$("#giro").selectmenu('refresh', true);
 				$("#subgiro").selectmenu('refresh', true);
 			})
		}
	})
	/* FIN AGREGAR ESTADOS */
	/* AGREGAR GIROS */
	urlgiros = "http://grupomedios.com/intranet/wsdesclub/?m=giros"
	$.ajax({
		url : urlgiros,
		success : function(result){
			r = result.Giros;
 			$.each(r, function(index) {
 				if(subgiros == r[index].ids_subcategorias){
 					output = '<option value="'+r[index].ids_subcategorias+'" selected>'+r[index].Giro+'</option>';
 				}else{
 					output = '<option value="'+r[index].ids_subcategorias+'">'+r[index].Giro+'</option>';
 				}
 				$('#giro').append(output);
 				$("#estado").selectmenu('refresh', true);
 				$("#giro").selectmenu('refresh', true);
 				$("#subgiro").selectmenu('refresh', true);
 			})
		}
	})
	/* FIN AGREGAR GIROS */
	/* AGREGAR SUBGIROS */
	urlsubgiros = "http://grupomedios.com/intranet/wsdesclub/?m=subgiros&s="+subgiros
	$.ajax({
		url : urlsubgiros,
		success : function(result){
			r = result.Subgiros;
 			$.each(r, function(index) {
 				if(subgiros == r[index].id_subgiro){
 					output = '<option value="'+r[index].id_subgiro+'" selected>'+r[index].subgiro+'</option>';
 				}else{
 					output = '<option value="'+r[index].id_subgiro+'">'+r[index].subgiro+'</option>';
 				}
 				$('#subgiro').append(output);
 				$("#estado").selectmenu('refresh', true);
 				$("#giro").selectmenu('refresh', true);
 				$("#subgiro").selectmenu('refresh', true);
 			});
		}
	});
	obtenerDescuentos(offset,limit,subgiros,estado,busqueda);
	$('#estado').change(function() {
		estado = $(this).val();
		obtenerDescuentos(offset,limit,subgiros,estado,busqueda);
	});
	$('#giro').change(function() {
		subgiros = $(this).val();
		obtenerDescuentos(offset,limit,subgiros,estado,busqueda);
	});
	$('#subgiro').change(function() {
		subgiros = $(this).val();
		obtenerDescuentos(offset,limit,subgiros,estado,busqueda);
	});
	$('#buscar').on('keypress', function (event) {
		if(event.which === 13){
			busqueda = $('#buscar').val();
			obtenerDescuentos(offset,limit,subgiros,estado,busqueda);
		}
	});
});
$(document).on("pagecreate", "#mapa", function() {
	initMap();
});





$(document).ready(function(){
	$('.menuhome').click(function(e){
		seccion = $(this).attr('rel');
	});
});