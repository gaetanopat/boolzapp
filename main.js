$(document).ready(function(){
  // funzione data
  function date(){
    var data = new Date();
    var ora = data.getHours();
    var minuti = data.getMinutes();
    if(ora < 10){
      ora = '0' + ora;
    }
    if(minuti < 10){
      minuti = '0' + minuti;
    }
    return ora + '.' + minuti;
  }


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
      $('.container_single_chat').append('<div class="messages"><div class="mine_message green"><p>' + mine_text + '</p><small class="time">' + date() + '</small><i class="fas fa-chevron-down"></i><div class="menu"><div class="important_message">Messaggio importante</div><div class="delete_message">Cancella messaggio</div></div></div></div>')
      // resetto l'input text
      $('.write_message input').val('');
      // cambio anche il testo a sinistra, alla persona con cui sto parlando
      $('.chat_container .chat_on .person_message').text(mine_text);
      setAnswer();
    };
  }

  // funzione per inviare la risposta
  function setAnswer(){
    // ogni secondo mi aggiunge la risposta 'ok'
    setTimeout(function(){
      $('.container_single_chat').append('<div class="messages"><div class="other_message white"><p>Ok</p><small class="time">' + date() +'</small><i class="fas fa-chevron-down"></i><div class="menu"><div class="important_message">Messaggio importante</div><div class="delete_message">Cancella messaggio</div></div></div></div>');
      $('.chat_container .chat_on .person_message').text('Ok');
      }, 1000);
  }

  // quando clicco sull'icona per inviare il messaggio
  $('.send i').click(function(){
    sendMessage();
    $(".container_single_chat").animate({ scrollTop: $('.container_single_chat').prop("scrollHeight")}, 1000);
  });


  // per il tasto invio
  $('.write_message input').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      // oppure if(event.which == 13){} al posto della riga 18 e 19
      sendMessage();
      $(".container_single_chat").animate({ scrollTop: $('.container_single_chat').prop("scrollHeight")}, 1000);
    }
  });

  // intercetto il focus e trasformo l'icona del microfono in invio
  $('.write_message input').focus(function(){
    $('.write_message .send i').toggleClass('fas fa-microphone fas fa-paper-plane');
  }).blur(function(){
      $('.send i').toggleClass('fas fa-microphone fa fas fa-paper-plane')
  });

  // funzione per cambiare chat
  $('.chat').click(function(){
    console.log($(this).children().text());
    // tolgo la classe chat_on da tutte le chat
    $('.chat').removeClass('chat_on');
    // metto la classe chat_on su quella cliccata
    $(this).addClass('chat_on');
    // assegno l'immagine, il nome e il rispettivo messaggio ricevuto alle info in alto a destra
    var img_da_cambiare = $(this).find('.profile_img').attr('src');
    var nome_da_cambiare = $(this).find('.person_name').text();
    var messaggio_ricevuto = $(this).find('.person_message').text();
    $('.header_right').find('.profile_img').attr('src', img_da_cambiare);
    $('.header_right').find('.person_name').text(nome_da_cambiare);
    $('.header_right').find('.last_login').text('Ultimo accesso oggi alle ' + date())
    $('.container_single_chat .messages .other_message p').text(messaggio_ricevuto);
  })

  // per eliminare un messaggio
  $(document).on('click', '.fa-chevron-down', function(){
    // quando clicco sulla freccia in basso aggiungo la classe menu on per vedere il menu a tendina
    $(this).siblings('.menu').toggleClass('menu-on');
    // quando clicco su elimina messaggio
    $('.menu .delete_message').click(function(){
      $(this).parent().parent().remove();
    })
  })

});
