$(function(){

  // date and time picker for Fecha
  $.datepicker.regional['es'] = {
    closeText: 'Cerrar',
    prevText: '&#x3c;Ant',
    nextText: 'Sig&#x3e;',
    currentText: 'Hoy',
    monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
    'Jul','Ago','Sep','Oct','Nov','Dic'],
    dayNames: ['Domingo','Lunes','Martes','Mi&eacute;rcoles','Jueves','Viernes','S&aacute;bado'],
    dayNamesShort: ['Dom','Lun','Mar','Mi&eacute;','Juv','Vie','S&aacute;b'],
    dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','S&aacute;'],
    weekHeader: 'Sm',
    dateFormat: 'dd/mm/yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
  };

  $.datepicker.setDefaults($.datepicker.regional['es']);

  $.timepicker.regional['es'] = {
    timeOnlyTitle: 'Tiempo',
    timeText: 'Tiempo',
    hourText: 'Hora',
    minuteText: 'Minuto',
    secondText: 'Segundo',
    millisecText: 'Milisegundo',
    currentText: 'Ahora',
    closeText: 'Hecho',
    ampm: false
  };

  $.timepicker.setDefaults($.timepicker.regional['es']);

  $('#text_happened_at, #image_happened_at, #audio_happened_at, #video_happened_at').datetimepicker({
    defaultDate: new Date(2011, 03, 15, 0, 0),
    numberOfMonths: 3,
    showButtonPanel: true,
    dateFormat: 'yy-mm-dd',
    timeFormat: 'hh:mm:ss',
    hourGrid: 2,
    minuteGrid: 5 
  });

  // autocomplete for tags
  $('#text_tags, #video_tags, #image_tags, #audio_tags, #node_tags').tagit({ 
    tagSource: "/tags/search.json",
    removeConfirmation: true,
    allowSpaces: true
  });

  // markdown
  var converter = Markdown.getSanitizingConverter();
  var editor = new Markdown.Editor(converter);
  editor.run();

  $(".show_markdown_help").click( function(event){
     event.preventDefault();
     if ( $(this).hasClass("hide_markdown_help") ){
       $(this).text("ver ayuda de marcado");
       $(this).removeClass("hide_markdown_help");
     } else {
       $(this).addClass("hide_markdown_help");
       $(this).text("esconder ayuda de marcado");
     }
     $(this).next().slideToggle("slow", "linear");
   });


});
