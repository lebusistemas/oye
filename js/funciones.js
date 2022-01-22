// Hemos omitido los acentos en los comentarios por compatibilidad

var canciones;
var pageName = window.location.pathname;

function cargarTop() {
    //Carga los datos que estan en el JSON (info.json) usando AJAX
    $.ajax({
      url: "datos.json"
    }).done(function (resultado) {

      //Guarda el resultado en variables
      canciones = resultado.canciones;

      //Ordena los eventos segun la fecha (los mas recientes primero)
      canciones = canciones.sort(function(a,b){
        return b.reproducciones - a.reproducciones
      });

      //Crea un string que contenga el HTML que describe el detalle del evento
      var html = ""
      //Recorre el arreglo y concatena el HTML para cada evento
      html = `
            <table class="table table-striped table-hover table-responsive">
              <thead>
                  <tr>
                      <th>Nombre</th>
                      <th>Canci&oacute;n</th>
                  </tr>
              </thead>
              <tbody>
            `
            //.:. Selecciona el TOP 3 de las canciones .:.
            for(var j = 0; j < 3; j++){
              html += `
                      <tr>
                        <td><strong>${canciones[j].nombre}</strong></td>
                        <td><audio controls>
                            <source src="canciones/${canciones[j].ruta}" type="audio/mpeg">
                        </audio></td>
                      </tr>           
                      `
            }
              html += `
                      </tbody>
                    </table>
                    `
      //Modifica el DOM agregando el html generado
      document.getElementById("top-canciones").innerHTML = html
    })
};

function cargarCanciones(parametro) {
  //Carga los datos que estan en el JSON (info.json) usando AJAX
  $.ajax({
    url: "datos.json"
  }).done(function (resultado) {

    //Guarda el resultado en variables
    canciones = resultado.canciones;    

    //Ordena los eventos segun la fecha (los mas recientes primero)
    canciones = canciones.sort(function(a,b){
      return b.reproducciones - a.reproducciones
    });
  
    if (parametro.length > 0){
      var filtroCanciones = [];
      $.each(canciones, function (indexInArray, item) { 
          if(item.nombre.toLowerCase().indexOf(parametro.toLowerCase())!==-1){
              filtroCanciones.push(item);
          }
      });
      canciones=filtroCanciones;
    }
    //Crea un string que contenga el HTML que describe el detalle del evento
    var html = ""
  
    html = `
    <div class="container">
      <div class="row">
    `

    for(var j = 0; j < canciones.length; j++){
      html += `
      <div class="col-lg-4">
        <div class="card m-1">
            <div class="card-header"><img src="imagenes/icon_${canciones[j].icono}.svg" class="card-img-top iconos rounded mx-auto d-block" alt="Canci&0acute;n${canciones[j].icono}"></div>
            <div class="card-body text-center">
                <h5 class="card-title"><strong>${canciones[j].nombre}</strong></h5>
                <p><audio controls>
                    <source src="canciones/${canciones[j].ruta}" type="audio/mpeg">
                </audio></p>
            </div>
        </div>
    </div>
      `
    }
    html += `
      </div>
    </div>
    `

    document.getElementById("canciones").innerHTML = html
  })
};

$( document ).ready(function() {
  pageName = pageName.replace('.html', '');
  pageName = pageName.replace('/', '');

  switch (pageName) {
    case 'index' :
      cargarTop();
        break;
    case 'canciones' :
      cargarCanciones('');
        break;
  }

});

$('#txtBuscar').keyup(function (e) { 
  let parametro=$(this).val();
  cargarCanciones(parametro);
});

function validarLogin(formulario) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(formulario.txtEmail.value)) {
    alert("Email inválido");
    return false;
  }

  if (formulario.txtPassword.value.trim().length == 0) {
    alert("Contraseña obligatoria");
    return false;
  }else{
    if (formulario.txtPassword.value.trim().length < 9) {
      alert("La Contraseña debe tener más de 8 caracteres");
      return false;
    }
  }

  return true;
}

function validarRegistro(formulario) {
  var msg
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  document.getElementById("msjEmail").innerHTML = ""
  document.getElementById("msjPass").innerHTML = ""
  document.getElementById("msjConf").innerHTML = ""
  document.getElementById("msjGenero").innerHTML = ""
  document.getElementById("msjEdad").innerHTML = ""
  document.getElementById("msjTerm").innerHTML = ""
  
  if (!re.test(formulario.txtEmail.value)) {
    msg = "Email inv&aacute;lido"
    document.getElementById("msjEmail").innerHTML = msg

    return false;
  }

  if (formulario.txtContrasena.value.trim().length == 0) {    
    msg = "Contraseña obligatoria"
    document.getElementById("msjPass").innerHTML = msg

    return false;
  }else{
    if (formulario.txtContrasena.value.trim().length < 8) {
      msg = "Contraseña inválida, minimo 8 caracteres"
      document.getElementById("msjPass").innerHTML = msg

      return false;
    }
  }

  if (formulario.txtContrasena.value != formulario.txtConfirmacion.value) {
    msg = "Confirmación no coincide con la contraseña"
    document.getElementById("msjConf").innerHTML = msg

    return false;
  }

  if (formulario.opcGeneros.value == 0) {
    msg = "Debe seleccionar un género"
    document.getElementById("msjGenero").innerHTML = msg

    return false;
  }

  if (formulario.opcEdad.value == "") {
    msg = "Debe seleccionar un rango de edad"
    document.getElementById("msjEdad").innerHTML = msg

    return false;
  }

  if (!formulario.terminos.checked) {
    msg = "Debes aceptar los términos"
    document.getElementById("msjTerm").innerHTML = msg
    
    return false;
  }

  alert("Registro exitoso");
  return true;
}