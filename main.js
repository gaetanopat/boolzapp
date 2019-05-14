// quando clicco sull'icona per inviare il messaggio
$('.send i').click(function(){
  // prendo il valore del testo che scrivo e che invio
  var mine_text = $('.write_message input').val();

  // prendo il nome della persona con cui sto parlando
  // var nome_persona = $('.header_right .person_name').text();

  // se scrivo qualcosa allora faccio qualcosa altrimenti nulla
  if(mine_text){
    // aggiungo al contenitore di tutta la chat un mio messaggio e se scrivo un altro messaggio me ne aggiunge un altro e così via
    $('.container_single_chat').append('<div class="messages"><div class="mine_message green"><p>' + mine_text + '</p></div></div>')
    // resetto l'input text
    $('.write_message input').val('');
    // cambio anche il testo a sinistra, alla persona con cui sto parlando
    $('.chat_container .first_chat .person_message').text(mine_text);
  };
});
