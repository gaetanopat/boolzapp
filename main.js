$(document).ready(function(){

  // quando scrivo nell'input della ricerca chat
  $('.search_chat input').keyup(function(){
    // mi salvo quello che scrivo in una variabile tutto in minuscolo
    var val = $(this).val().toLowerCase();
    // nascondo le chat
    $('.chat').hide();

    // scorro tutti i nomi delle persone
    $(".chat .person_name").each(function(){
      // salvo il nome di ogni persona in minuscolo
      var name = $(this).text().toLowerCase();
      // controllo lettera per lettera per selezionare quelli che contengono il valore inserito nell'input
      if(name.indexOf(val) != -1){
        // visualizzo la chat che m'interessa
        $(this).parent().parent().show();
      }
    });
  });

  // funzione per inviare il messaggio
  function sendMessage(){
    // prendo il valore del testo che scrivo e che invio
    var mine_text = $('.write_message input').val();

    // se scrivo qualcosa allora faccio qualcosa altrimenti nulla
    if(mine_text){
      // aggiungo al contenitore di tutta la chat un mio messaggio e se scrivo un altro messaggio me ne aggiunge un altro e così via
      $('.container_single_chat').append('<div class="messages"><div class="mine_message green"><p>' + mine_text + '<small class="time">14.30</small></p></div></div>')
      // resetto l'input text
      $('.write_message input').val('');
      // cambio anche il testo a sinistra, alla persona con cui sto parlando
      $('.chat_container .first_chat .person_message').text(mine_text);
      setAnswer();
    };
  }

  // per la risposta
  function setAnswer(){
    // ogni secondo mi aggiunge la risposta 'ok'
    setTimeout(function(){
      $('.container_single_chat').append('<div class="messages"><div class="other_message white"><p>Ok<small class="time">14.30</small></p></div></div>');
      $('.chat_container .first_chat .person_message').text('Ok');
      }, 1000);
  }

  // quando clicco sull'icona per inviare il messaggio
  $('.send i').click(function(){
    sendMessage();
  });


  // per il tasto invio
  $('.write_message input').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      // oppure if(event.which == 13){} al posto della riga 18 e 19
      sendMessage();
    }
  });


  // intercetto il focus e trasformo l'icona del microfono in invio
  $('.write_message input').focus(function(){
    $('.write_message .send i').toggleClass('fas fa-microphone fas fa-paper-plane');
  }).blur(function(){
      $('.send i').toggleClass('fas fa-microphone fa fas fa-paper-plane')
  });
});
