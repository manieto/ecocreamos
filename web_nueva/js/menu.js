/** menu.js: Funciones de creación y comportamiento del menú. */
function Menu()
{
  // Array asociativo de las opciones
  this.opcionesHash = new Array();
  
  // Opción seleccionada en el menú
  this.opcionSeleccionada;
}


/** Menú lateral. */
Menu.lateral = new Object();

/** Opciones del menú lateral: Código, Texto, URL, RutaCabecera, Subopciones de menú. */
Menu.lateral.opciones =
    [ { id: "PROECO", texto: "Promoción Ecológica"                       , url: "promocion_ecologica.html"                       , cabecera: "/carrusel/general/" }
    , { id: "ESTGEO", texto: "Estudios Geobiológicos"                    , url: "estudios_geobiologicos.html"                    , cabecera: "/carrusel/general/" }
    , { id: "ARQBIO", texto: "Arquitectura Bioenergética"                , url: "arquitectura_bioenergetica.html"                , cabecera: "/carrusel/general/" }
    , { id: "BIREEC", texto: "Bioconstrucción y Rehabilitación Ecológica", url: "bioconstruccion_y_rehabilitacion_ecologica.html", cabecera: "/carrusel/general/"
      , subopciones: [ { id: "EJEREH", texto: "Ejemplo Rehabilitación"                    , url: "ejemplo_rehabilitacion.html"                    , cabecera: "/carrusel/general/" } ] }
    , { id: "MATBIO", texto: "Materiales para Bioconstrucción"           , url: "materiales_bioconstruccion.html"                , cabecera: "/carrusel/general/" }
    , { id: "AISECO", texto: "Aislamientos Ecológicos"                   , url: "aislamientos_ecologicos.html"                   , cabecera: "/carrusel/general/" }
    , { id: "FOOBRE", texto: "Fotos Obras Realizadas"                    , url: "fotos_obras_realizadas.html"                    , cabecera: "/carrusel/general/" }
    , { id: "ARTPUB", texto: "Artículos publicados"                      , url: "articulos_publicados.html"                      , cabecera: "/carrusel/general/" }
    , { id: "PRODUC", texto: "Productos"                                 , url: "productos.html"                                 , cabecera: "/carrusel/productos/"
      , subopciones: [ { id: "AGUVIV", texto: "Agua Viva"                                 , url: "agua_viva.html"                                 , cabecera: "/carrusel/productos/" }
                     , { id: "GAMMA7", texto: "GAMMA 7"                                   , url: "gamma_7.html"                                   , cabecera: "/carrusel/productos/" }
                     , { id: "BIOMAS", texto: "Biomasa"                                   , url: "biomasa.html"                                   , cabecera: "/carrusel/productos/" } ] }
    , { id: "NOTICI", texto: "Noticias"                                  , url: "noticias.html"                                  , cabecera: "/carrusel/general/" }
    ];
                        

/** Establece el código HTML del menú lateral. */
Menu.prototype.dibujar = function ()
{
  // Pintamos el menú
  var html = menu.generar(Menu.lateral.opciones);
  $("#capaMenu").html(html);
  menu.marcarOpcion(null);
}


/** Genera el código HTML del menú lateral. */
Menu.prototype.generar = function (opciones, idUl)
{
  // Generamos el código HTML
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
  
  // Devolvemos el código HTML resultante
  return html;
}


/** Genera el código HTML del menú lateral. */
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
  // Devolvemos si hemos marcado alguna opción
  return algunaOpcionMarcada;
}


/** Gestiona el evento de selección de una opción de menú. */
Menu.prototype.clickOpcion = function (obj)
{
  // Obtenemos el ID real
  var id = obj.id.substring(7);
  
  // Actualizamos el menú
  menu.marcarOpcion(id);
  
  // Actualizamos el contenido
  var url = menu.opcionesHash[id].url;
  $.ajaxSetup( { 'beforeSend': function(xhr) { xhr.overrideMimeType('text/html; charset=ISO-8859-15'); } } );
  $("#capaContenido").load(url + " #contenido");
}


/** Instancia del objeto. */
var menu = new Menu();