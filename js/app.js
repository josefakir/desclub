var pagina = 0;
var limit = 30;
if(pagina==0){
    offset = pagina*limit;
}else{
    offset = pagina*limit;
}
var subgiros = '';
var busqueda = '';
var estado = '';
var seccion = 'todas';
var subgiros = '';
/* FUNCIÓN PARA OBTENER DESCUENTOS */
function obtenerDescuentos(offset,limit,subgiros,estado,busqueda){
    url = "http://grupomedios.com/intranet/wsdesclub/?m=descuentos2&o="+offset+"&l="+limit+"&c="+subgiros+"&lat="+$('#latitud').html()+"&long="+$('#longitud').html()+"&e="+estado+"&b="+busqueda;
    $.ajax({
        url : url,
        beforeSend : function(){
            $('.ui-loader').fadeIn('fast');
        },
        success : function(result){
            r = result.Descuentos;
            $.each(r, function(index) {
                marca = r[index].Marca;
                calle = r[index].Calle;
                noext = r[index].Numero_Extterior;
                noint = r[index].Numero_interior;
                colonia = r[index].Colonia;
                distancia = parseFloat(r[index].Distancia);
                distancia = distancia.toFixed(3);
                detallepromo = r[index].detalle_promo;
                efectivo = r[index].Efectivo;
                tarjeta = r[index].Tarjeta;
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
                vigencia = r[index].termina_contrato;
                sucursal = r[index].Sucursal;
                restricciones = r[index].Restricciones;
                promocion = r[index].Promocion;
                output = '<a class="enlacesingle" href="#single" data-logosingle="'+imagen+'" data-efectivosingle="'+efectivo+'" data-tarjetasingle="'+tarjeta+'" data-vigenciasingle="'+vigencia+'" data-sucursalsingle="'+sucursal+'" data-direccionsingle="'+calle+' '+noext+' '+noint+' '+colonia+'" data-restriccionessingle="'+restricciones+'" data-promocionsingle="'+promocion+'"><div class="establecimiento"><div class="imagenEstablecimiento"><img class="w100 imgEst" src="'+imagen+'" alt=""></div><div class="descripcion"><h2 class="tituloEstablecimiento">'+marca+'</h2><p class="descripcionEstablecimiento">'+calle+' '+noext+' '+noint+' '+colonia+'</p><p class="distancia">'+distancia+' Km</p></div><div class="circulo"><div class="promo"><span>'+detallepromo+'</span></div></div></div></a>';
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
/* FIN FUNCIÓN OBTENER DESCUENTOS */ 
$(document).on("pageinit", "#home", function() {
    var subgiros = '';
    var busqueda = '';
    var estado = '';
    var seccion = 'todas';
    var defaultLatLng = new google.maps.LatLng(22.5526803, -120.8497347);  // Default to MEX
    if ( navigator.geolocation ) {
        function success(pos) {
            $('#latitud').html(pos.coords.latitude);
            $('#longitud').html(pos.coords.longitude);
        }
        function fail(error) {
        }
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
    }
    $('.menuhome').click(function(e){
        seccion = $(this).attr('rel');
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
        $('#seccion').html(seccion);
        $('#subgiros').html(subgiros);
    });
});
$(document).on("pageshow", "#home", function() {
   $('#footer').removeClass();
   pagina = 0;
   if(pagina==0){
    offset = pagina*limit;
}else{
    offset = pagina*limit;
}
});
$(document).on("pageshow", "#historico", function() {
    pagina = 0;
    offset = pagina*limit;
    $('header').removeClass('alimentos belleza educacion entretenimiento moda servicios turismo todas');
    $('header').addClass($('#seccion').html());
    $('#footer').addClass($('#seccion').html());
    $('.promo').addClass($('#seccion').html());
    subgiros = $('#subgiros').html();
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
            $('#giro').html('');
            $('#giro').append('<option value="">SELECCIONE</option>');
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
    urlsubgiros = "http://grupomedios.com/intranet/wsdesclub/?m=subgiros&s="+subgiros;
    $.ajax({
        url : urlsubgiros,
        success : function(result){
            r = result.Subgiros;
            $('#subgiro').html('');
            $('#subgiro').append('<option value="">SELECCIONE</option>');
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
    /* MOSTRAR DESCUENTOS */
    $('#contenedorEstablecimientos').html('');
    obtenerDescuentos(offset,limit,subgiros,estado,busqueda);
    $('#estado').change(function() {
        estado = $(this).val();
        pagina = 0;
        offset = pagina * limit;
        $('#contenedorEstablecimientos').html('');
        obtenerDescuentos(offset,limit,subgiros,estado,busqueda);
    });
    $('#giro').change(function() {
        subgiros = $(this).val();
        pagina = 0;
        offset = pagina * limit;
        $('#contenedorEstablecimientos').html('');
        /* AGREGAR SUBGIROS */
        urlsubgiros = "http://grupomedios.com/intranet/wsdesclub/?m=subgiros&s="+subgiros;
        $.ajax({
            url : urlsubgiros,
            success : function(result){
                r = result.Subgiros;
                $('#subgiro').html('');
                $('#subgiro').append('<option>SELECCIONE</option>');
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
    });
$('#subgiro').change(function() {
    subgiros = $(this).val();
    pagina = 0;
    offset = pagina * limit;
    $('#contenedorEstablecimientos').html('');
    obtenerDescuentos(offset,limit,subgiros,estado,busqueda);
});    
$(document).on('click', '.enlacesingle', function(e){
        // This example will work because it was bind with event delegation process
        $('#logosingle').html('');
        $('#efectivosingle').html('');
        $('#efectivosingle').html('');
        $('#tarjetasingle').html('');
        $('#efectivosingle').html('');
        $('#vigenciasingle').html('');
        $('#sucursalsingle').html('');
        $('#direccionsingle').html('');
        $('#restriccionessingle').html('');
        $('#promocionsingle').html('');
        $('#logosingle').html($(this).attr('data-logosingle'));
        $('#efectivosingle').html($(this).attr('data-efectivosingle'));
        $('#efectivosingle').html($(this).attr('data-efectivosingle'));
        $('#tarjetasingle').html($(this).attr('data-tarjetasingle')+"%");
        $('#efectivosingle').html($(this).attr('data-efectivosingle')+"%");
        $('#vigenciasingle').html($(this).attr('data-vigenciasingle'));
        $('#sucursalsingle').html($(this).attr('data-sucursalsingle'));
        $('#direccionsingle').html($(this).attr('data-direccionsingle'));
        $('#restriccionessingle').html($(this).attr('data-restriccionessingle'));
        $('#promocionsingle').html($(this).attr('data-promocionsingle'));
    });
});
$(document).on("pageinit", "#map-page", function() {
    $.mobile.loading('show');
    var defaultLatLng = new google.maps.LatLng(22.5526803, -120.8497347);  // Default to MEX
    if ( navigator.geolocation ) {
        function success(pos) {
            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        }
        function fail(error) {
            drawMap(defaultLatLng);  
        }
        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
    } else {
        drawMap(defaultLatLng);  // No geolocation support, show default map
    }
    function drawMap(latlng) {
        var myOptions = {
            zoom: 15,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        // Add an overlay to the map of current lat/lng
        var marker = new google.maps.Marker({
            position: latlng,
            map: map
        });
        google.maps.event.addListenerOnce(map, 'idle', function() {
            google.maps.event.trigger(map, 'resize');
            map.setCenter(latlng);
        });
        var marcadores = [];
        /* ARREGLO DE MARCADORES SUCURSALES */
        $.ajax({
            beforeSend : function(){
                $.mobile.loading('show');
            },
            url : 'http://grupomedios.com/intranet/wsdesclub/?m=descuentos2&o=0&l=100&lat='+$('#latitud').html()+'&long='+$('#longitud').html(),
            success : function(result){
                r = result.Descuentos;
                cont = 0;
                $.each(r, function(index) {
                    imgmarcador = r[index].categoria;
                    imgmarcador = imgmarcador.replace(" ", "_");
                    imgmarcador = imgmarcador.replace(" ", "_");
                    clasemarcador = imgmarcador;
                    imgmarcador = "images/"+imgmarcador+".png";
                    marca = r[index].Marca;
                    calle = r[index].Calle;
                    noext = r[index].Numero_Extterior;
                    noint = r[index].Numero_interior;
                    colonia = r[index].Colonia;
                    distancia = parseFloat(r[index].Distancia);
                    distancia = distancia.toFixed(3);
                    detallepromo = r[index].detalle_promo;
                    efectivo = r[index].Efectivo;
                    tarjeta = r[index].Tarjeta;
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
                    vigencia = r[index].termina_contrato;
                    sucursal = r[index].Sucursal;
                    restricciones = r[index].Restricciones;
                    promocion = r[index].Promocion;
                    var contentString = '<a class="enlacesingle" href="#single" data-logosingle="'+imagen+'" data-efectivosingle="'+efectivo+'" data-tarjetasingle="'+tarjeta+'" data-vigenciasingle="'+vigencia+'" data-sucursalsingle="'+sucursal+'" data-direccionsingle="'+calle+' '+noext+' '+noint+' '+colonia+'" data-restriccionessingle="'+restricciones+'" data-promocionsingle="'+promocion+'"><div class="tooltipmapa"><img class="imagenmapa" src="'+r[index].logo_chico+'"/><h2>'+r[index].Sucursal+'</h2><p class="direccionmapa">'+calle+' '+noint+' '+noext+' '+colonia+'</p></div></a>';
                    var infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });
                    marcadores[cont] = new google.maps.Marker({
                        position: new google.maps.LatLng(r[index].Latitud, r[index].Longitud),
                        map: map,
                        icon: imgmarcador
                    });
                    marcadores[cont].addListener('click', function(mEvent) {
                        infowindow.open(map, marcadores[cont]);
                        infowindow.setPosition(mEvent.latLng);
                    });
                    cont++;
                });
$.mobile.loading('hide');

}
});
/* ARREGLO DE MARCADORES SUCURSALES */


}
$(document).on('click', '.enlacesingle', function(e){
        // This example will work because it was bind with event delegation process
        $('#logosingle').html('');
        $('#efectivosingle').html('');
        $('#efectivosingle').html('');
        $('#tarjetasingle').html('');
        $('#efectivosingle').html('');
        $('#vigenciasingle').html('');
        $('#sucursalsingle').html('');
        $('#direccionsingle').html('');
        $('#restriccionessingle').html('');
        $('#promocionsingle').html('');
        $('#logosingle').html($(this).attr('data-logosingle'));
        $('#efectivosingle').html($(this).attr('data-efectivosingle'));
        $('#efectivosingle').html($(this).attr('data-efectivosingle'));
        $('#tarjetasingle').html($(this).attr('data-tarjetasingle')+"%");
        $('#efectivosingle').html($(this).attr('data-efectivosingle')+"%");
        $('#vigenciasingle').html($(this).attr('data-vigenciasingle'));
        $('#sucursalsingle').html($(this).attr('data-sucursalsingle'));
        $('#direccionsingle').html($(this).attr('data-direccionsingle'));
        $('#restriccionessingle').html($(this).attr('data-restriccionessingle'));
        $('#promocionsingle').html($(this).attr('data-promocionsingle'));
    });
});

$(document).on("pageshow", "#single", function() {
    $('header').removeClass('alimentos belleza educacion entretenimiento moda servicios turismo todas');
    $('header').addClass($('#seccion').html());
    $('#single_imagen').attr('src',$('#logosingle').html());
    if($('#efectivosingle').html()!="%"){
        $('#nohayefectivoytarjeta').hide();
        $('#sihayefectivoytarjeta').show();
    }else{
        $('#nohayefectivoytarjeta').show();
        $('#sihayefectivoytarjeta').hide();
    }
    $('#promocion_single').html($('#promocionsingle').html());
    $('#efectivo_single').html($('#efectivosingle').html());
    $('#tarjeta_single').html($('#tarjetasingle').html());
    $('#vig').html($('#vigenciasingle').html());
    $('#direccion_single').html($('#direccionsingle').html());
    $('#restriccion_single').html($('#restriccionessingle').html());
    $('#sucursal_single').html($('#sucursalsingle').html());
    $('#emailtarjeta').html(localStorage.email);
    $('#nombretarjeta').html(localStorage.nombre);
    $('#membresiatarjeta').html(localStorage.membresia);
    $('#vigenciatarjeta').html(localStorage.vigencia);
    $(document).on('click', '#usarcupon', function(e){
        if(localStorage.aut){
            $('#cupon_tarjeta').fadeIn();
        }else{
            alert('Tienes que registrarte para usar el cupon');
        }
    });
    $(document).on('click', '#cerrarcupon', function(e){
        $('#cupon_tarjeta').fadeOut();
    });
});
$(document).on("pageshow", "#tarjeta", function() {
    if(localStorage.aut){
        $('#noregistrado').hide();
        $('#siregistrado').show();
    }else{
        $('#noregistrado').show();
        $('#siregistrado').hide();
    }
    $('#noregistrado').fadeOut();
    $('#siregistrado').fadeIn();
    $('#sesionproyecto').html("Proyecto: "+localStorage.proyecto);
    $('#sesionnombre').html("Nombre: "+localStorage.nombre);
    $('#sesionmembresia').html("# de membresía: "+localStorage.membresia);
    $('#sesionemail').html("Email: "+localStorage.email);
    $('#sesionvigencia').html("Vigencia: "+localStorage.vigencia);
    $('#botonregistro').click(function(e){
        numerodemembresia = $('#numerodemembresia').val();
        e.preventDefault();
        url = "http://graphicsandcode.com/vcorp/consultamembresias.php?m="+numerodemembresia;
        $.ajax({
            url : url,
            success : function(data){
                console.log(data);
                if(data==null){
                    alert('Membresía inválida');
                }else{
                    localStorage.aut = true;
                    localStorage.proyecto = data.id_corporativo;
                    localStorage.nombre = data.nombres+" "+data.paterno+" "+data.materno;
                    localStorage.membresia = data.membresia;
                    localStorage.email = data.email;
                    localStorage.vigencia = data.fecha_final;
                    $('#siregistrado').fadeIn();
                    $('#sesionproyecto').html("Proyecto: "+localStorage.proyecto);
                    $('#sesionnombre').html("Nombre: "+localStorage.nombre);
                    $('#sesionmembresia').html("# de membresía: "+localStorage.membresia);
                    $('#sesionemail').html("Email: "+localStorage.email);
                    $('#sesionvigencia').html("Vigencia: "+localStorage.vigencia);
                }
            }
        })
})
});
$(document).on("scrollstart",function(){
  if (($(window).scrollTop() >= $(document).height() - $(window).height() - 1) && ($.mobile.activePage[0].id=="historico")) {
    pagina++;
    offset = pagina * limit;
    obtenerDescuentos(offset,limit,subgiros,estado,busqueda);
}
});
$(document).on("scrollstop",function(){
  if (($(window).scrollTop() >= $(document).height() - $(window).height() - 1) && ($.mobile.activePage[0].id=="historico")) {
    pagina++;
    offset = pagina * limit;
    obtenerDescuentos(offset,limit,subgiros,estado,busqueda);
}
});
