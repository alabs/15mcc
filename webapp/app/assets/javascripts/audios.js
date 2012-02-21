
// prestado de http://html5doctor.com/native-audio-in-the-browser/
// comprobaciones de browsers y tipo de audio
var myAudio = document.createElement('audio'); 

if (myAudio.canPlayType) {
  // Currently canPlayType(type) returns: "", "maybe" or "probably" 
  var canPlayMp3 = !!myAudio.canPlayType && "" != myAudio.canPlayType('audio/mpeg');
  var canPlayOgg = !!myAudio.canPlayType && "" != myAudio.canPlayType('audio/ogg; codecs="vorbis"');
}

$(function(){

  if ( $('audio').length != 0 ) { 
    var file = $('audio source').attr('src');

    // comprobamos por tipo de fichero que se suba
    var file_ext = file.split('?')[0].split('.')[1];
    var canPlayHtml5;

    switch (file_ext) {
      case "mp3": canPlayHtml5 = canPlayMp3; break;
      case "ogg": canPlayHtml5 = canPlayOgg; break;
      default: canPlayHtml5 = false;
    }

    if (canPlayHtml5 == false) {
      // si no puede reproducir lo que le pasamos  nativamente lo servimos por flash

      $('audio').hide();

      jwplayer('flash-fallback').setup({
        'flashplayer': '/assets/player.swf',
        'id': 'playerID',
        'width': '360',
        'height': '24',
        'controlbar': 'bottom',
        'file': file
      });

    }
  }

});
