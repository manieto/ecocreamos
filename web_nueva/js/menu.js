/** menu.js: Funciones de creaci�n y comportamiento del men�. */
function Menu()
{
  // Array asociativo de las opciones
  this.opcionesHash = new Array();
  
  // Opci�n seleccionada en el men�
  this.opcionSeleccionada;
}


/** Men� lateral. */
Menu.lateral = new Object();

/** Opciones del men� lateral: C�digo, Texto, URL, RutaCabecera, Subopciones de men�. */
Menu.lateral.opciones =
    [ { id: "PROECO", texto: "Promoci�n Ecol�gica"                       , url: "promocion_ecologica.html"                       , cabecera: "/carrusel/general/" }
    , { id: "ESTGEO", texto: "Estudios Geobiol�gicos"                    , url: "estudios_geobiologicos.html"                    , cabecera: "/carrusel/general/" }
    , { id: "ARQBIO", texto: "Arquitectura Bioenerg�tica"                , url: "arquitectura_bioenergetica.html"                , cabecera: "/carrusel/general/" }
    , { id: "BIREEC", texto: "Bioconstrucci�n y Rehabilitaci�n Ecol�gica", url: "bioconstruccion_y_rehabilitacion_ecologica.html", cabecera: "/carrusel/general/"
      , subopciones: [ { id: "EJEREH", texto: "Ejemplo Rehabilitaci�n"                    , url: "ejemplo_rehabilitacion.html"                    , cabecera: "/carrusel/general/" } ] }
    , { id: "MATBIO", texto: "Materiales para Bioconstrucci�n"           , url: "materiales_bioconstruccion.html"                , cabecera: "/carrusel/general/" }
    , { id: "AISECO", texto: "Aislamientos Ecol�gicos"                   , url: "aislamientos_ecologicos.html"                   , cabecera: "/carrusel/general/" }
    , { id: "FOOBRE", texto: "Fotos Obras Realizadas"                    , url: "fotos_obras_realizadas.html"                    , cabecera: "/carrusel/general/" }
    , { id: "ARTPUB", texto: "Art�culos publicados"                      , url: "articulos_publicados.html"                      , cabecera: "/carrusel/general/" }
    , { id: "PRODUC", texto: "Productos"                                 , url: "productos.html"                                 , cabecera: "/carrusel/productos/"
      , subopciones: [ { id: "AGUVIV", texto: "Agua Viva"                                 , url: "agua_viva.html"                                 , cabecera: "/carrusel/productos/" }
                     , { id: "GAMMA7", texto: "GAMMA 7"                                   , url: "gamma_7.html"                                   , cabecera: "/carrusel/productos/" }
                     , { id: "BIOMAS", texto: "Biomasa"                                   , url: "biomasa.html"                                   , cabecera: "/carrusel/productos/" } ] }
    , { id: "NOTICI", texto: "Noticias"                                  , url: "noticias.html"                                  , cabecera: "/carrusel/general/" }
    ];
                        

/** Establece el c�digo HTML del men� lateral. */
Menu.prototype.dibujar = function ()
{
  // Pintamos el men�
  var html = menu.generar(Menu.lateral.opciones);
  $("#capaMenu").html(html);
  menu.marcarOpcion(null);
}


/** Genera el c�digo HTML del men� lateral. */
Menu.prototype.generar = function (opciones, idUl)
{
  // Generamos el c�digo HTML
  var html = "";
  html += (idUl)?('<ul id="' + idUl + '">\n'):('<ul>\n');
  for (var i=0; i<opciones.length; i++)
  {
    var opc = opciones[i];
    menu.opcionesHash[opc.id] = opc;
    html += '<li id="opc' + opc.id + '"><span id="opcSpan' + opc.id + '" onclick="menu.clickOpcion(this);">' + opc.texto + '</span>';
    if (opc.subopciones && opc.subopciones.length>0) { html += menu.generar(opc.subopciones, "opcSub" + opc.id); }
    html += '</li>\n';
  }
  html += "</ul>\n";
  
  // Devolvemos el c�digo HTML resultante
  return html;
}


/** Genera el c�digo HTML del men� lateral. */
Menu.prototype.marcarOpcion = function (id, opciones)
{
  if (!opciones) { opciones = Menu.lateral.opciones; }
  var algunaOpcionMarcada = false;
  for (var i=0; i<opciones.length; i++)
  {
    var opc = opciones[i];
    
    // Miramos previamente el estado de las subopciones
    var subopcionMarcada = false;
    if (opc.subopciones && opc.subopciones.length>0) { subopcionMarcada = menu.marcarOpcion(id, opc.subopciones); }
    
    // Actualizamos el propio estado
    var opcionMarcada = (subopcionMarcada || opc.id==id);
    $("#opcSpan" + opc.id).css("color", (opcionMarcada)?"green":"black");
    if ($("#opcSub" + opc.id)) { $("#opcSub" + opc.id).css("display", (opcionMarcada)?"":"none"); }
    algunaOpcionMarcada = algunaOpcionMarcada || opcionMarcada;
  }
  // Devolvemos si hemos marcado alguna opci�n
  return algunaOpcionMarcada;
}


/** Gestiona el evento de selecci�n de una opci�n de men�. */
Menu.prototype.clickOpcion = function (obj)
{
  // Obtenemos el ID real
  var id = obj.id.substring(7);
  
  // Actualizamos el men�
  menu.marcarOpcion(id);
  
  // Actualizamos el contenido
  var url = menu.opcionesHash[id].url;
  $.ajaxSetup( { 'beforeSend': function(xhr) { xhr.overrideMimeType('text/html; charset=ISO-8859-15'); } } );
  $("#capaContenido").load(url + " #contenido");
}


/** Instancia del objeto. */
var menu = new Menu();