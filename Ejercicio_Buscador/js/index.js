
/*
  Función buscador
*/


$(document).ready(function () {
    $('#formulario').submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: './buscar.php',
            data: $(this).serialize(),
            success: function (response) {
                var jsonData = JSON.parse(response);
                $(".datos").empty();
                if (jsonData) {
                    colocaHtml(jsonData);
                }
            }
        });
    });
});

function colocaHtml(arreglo) {
    $.each(arreglo, function (i, data) {
        $(".datos").append(`
            <div class="tituloContenido card itemMostrado">
                <img src="img/home.jpg">
                <div class="card-stacked">
                   <div class="card-content">
                      <b>Id:</b> ${data.Id}<br>
                      <b>Dirección:</b> ${data.Direccion} <br>
                      <b>Ciudad:</b> ${data.Ciudad}<br>
                      <b>Telefono:</b> ${data.Telefono}<br>
                      <b>Codigo Postal:</b> ${data.Codigo_Postal}<br>
                      <b>Tipo:</b> ${data.Tipo}<br>
                      <b>Precio:</b> ${data.Precio}<br>
                      </div>
                  <div class="card-action"> <a href="#">Ver mas</a> </div> </div> </div> </div>

        `)
    });
}

/*
  Función que ecarga el contenido
*/

document.getElementById("mostrarTodos").addEventListener("click", function () {
  var HtmlNode = document.getElementById("datos");
  $.ajax({
    url: './cargadatos.php',
    type: 'POST',
    data: {},
    success: function (data) {
      var newData = JSON.parse(data)
       for(var i = 0; i < newData.length; i++) {

         HtmlNode.innerHTML = HtmlNode.innerHTML += `<div style="width:100%;padding:0px;background:white;">
                           <img src='img/home.jpg' width='100px' style='float:left'>
                             <li> ${newData[i].Direccion} <li>
                             <li> ${newData[i].Ciudad} <li>
                             <li> ${newData[i].Telefono} <li>
                             <li> ${newData[i].Codigo_Postal} <li>
                             <li> ${newData[i].Tipo} <li>
                             <li> ${newData[i].Precio} <li>

                         </div><br>`

       }
    }
  })
})


/*
Inicializamos el input Ciudad y tipo
*/

$.ajax({
    url: "./data-1.json",
    type: "GET",
    data: {},
    dataType: 'json', // ¡¡¡ Iportantisimo definir el datatype JSON !!!
    success: function (data) {
        /*Sacar elementos unicos del arreglo*/
        var ciudad = {};
        var ciudades = data.filter(function (e) {
            if (ciudad[e.Ciudad]) {
                return false;
            } else {
                ciudad[e.Ciudad] = true
                return true;
            }

        });
        for (var i = 0; i <= 5; i++) {
            $("#selectCiudad").append("<option value= '" + ciudades[i].Ciudad + "'>" + ciudades[i].Ciudad + "</option>");
        }

        var tipo = {};
        var tipos = data.filter(function (e) {
            if (tipo[e.Tipo]) {
                return false;
            } else {
                tipo[e.Tipo] = true
                return true;
            }
        });
        for (var i = 0; i <= 2; i++) {
            $("#selectTipo").append("<option value='" + tipos[i].Tipo + "'>" + tipos[i].Tipo + "</option>");
        }

        $('select').material_select(); //Se debe inicializar el select para que este funcione

    }
})



/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();
