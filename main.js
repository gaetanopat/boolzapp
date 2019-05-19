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
      // aggiungo al contenitore di tutta la chat attiva un mio messaggio e se scrivo un altro messaggio me ne aggiunge un altro e così via
      $('.container_single_chat.active').append('<div class="messages"><div class="mine_message green"><p>' + mine_text + '</p><small class="time">' + date() + '</small><i class="fas fa-chevron-down"></i><div class="menu"><div class="important_message">Messaggio importante</div><div class="delete_message">Cancella messaggio</div></div></div></div>')
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
      // quando deve inviare la risposta l'altro utente è online
      $('.container_single_chat.active').parent().siblings('header').find('.header_right').find('.last_login').text('online');
      // aggiungo alla chat attiva la risposta 'Ok'
      $('.container_single_chat.active').append('<div class="messages"><div class="other_message white"><p>Ok</p><small class="time">' + date() +'</small><i class="fas fa-chevron-down"></i><div class="menu"><div class="important_message">Messaggio importante</div><div class="delete_message">Cancella messaggio</div></div></div></div>');
      // aggiungo 'Ok' anche alla chat dell'utente selezionato a sinistra
      $('.chat_container .chat_on .person_message').text('Ok');
      // scrollo per vedere sempre l'ultimo messaggio
      var pixelScroll = $(".container_single_chat.active")[0].scrollHeight;
      $(".container_single_chat.active").scrollTop(pixelScroll);
    }, 1000); // ogni secondo
  }

  // quando clicco sull'icona per inviare il messaggio
  $('.send i').click(function(){
    // richiamo la funzione per inviare il messaggio
    sendMessage();
    // scrollo per vedere sempre l'ultimo messaggio
    var pixelScroll = $(".container_single_chat.active")[0].scrollHeight;
    $(".container_single_chat.active").scrollTop(pixelScroll);
  });


  // per il tasto invio
  $('.write_message input').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      // oppure if(event.which == 13){} al posto della riga 18 e 19
      sendMessage();
      var pixelScroll = $(".container_single_chat.active")[0].scrollHeight;
      $(".container_single_chat.active").scrollTop(pixelScroll);
    }
  });

  // intercetto il focus e trasformo l'icona del microfono in invio
  $('.write_message input').focus(function(){
    $('.write_message .send i').toggleClass('fas fa-microphone fas fa-paper-plane');
  }).blur(function(){
      $('.send i').toggleClass('fas fa-microphone fa fas fa-paper-plane')
  });

  // per ogni chat assegno un 'data-conversazione' che partirà da 1 a 5 nel nostro caso
  var i = 0;
  $('.chat').each(function(){
    i++;
    $(this).attr('data-conversazione', i);
  });
  // per ogni contenitore di chat (di destra) assegno un 'data-conversazione' che partirà da 1 a 5 nel nostro caso
  var j = 0;
  $('.container_single_chat').each(function(){
    j++;
    $(this).attr('data-conversazione', j);
  });

  // funzione per cambiare chat
  $('.chat').click(function(){
    // prendo il valore dell'attributo 'data-conversazione' della chat
    var conversazione = $(this).attr('data-conversazione');
    // tolgo la classe chat_on da tutte le chat
    $('.chat').removeClass('chat_on');
    // metto la classe chat_on su quella cliccata
    $(this).addClass('chat_on');

    // tolgo la classe active a tutti
    $('.container_single_chat').removeClass('active');
    // prendo il contenitore di chat con lo stesso valore di 'data-conversazione' della chat
    var pannello_conversazione = $('.container_single_chat[data-conversazione="'+ conversazione +'"]');
    // ci aggiungo la classe active
    pannello_conversazione.addClass('active');
    // prendo l'immagine, il nome e il messaggio ricevuti dalla chat a sinistra
    var img_da_cambiare = $(this).find('.profile_img').attr('src');
    var nome_da_cambiare = $(this).find('.person_name').text();
    var messaggio_ricevuto = $(this).find('.person_message').text();
    // assegno l'immagine, il nome e il rispettivo ultimo accesso alle info in alto a destra
    $('.header_right').find('.profile_img').attr('src', img_da_cambiare);
    $('.header_right').find('.person_name').text(nome_da_cambiare);
    $('.header_right').find('.last_login').text('Ultimo accesso oggi alle ' + date())
    // assegno il messaggio ricevuto alla conversazione attiva
    $('.container_single_chat.active .messages .other_message p').text(messaggio_ricevuto);
  })

  // per eliminare un messaggio, quando clicco sulla freccia verso il basso
  $(document).on('click', '.fa-chevron-down', function(){
    // aggiungo la classe menu_on per vedere il menu a tendina
    $(this).siblings('.menu').toggleClass('menu_on');
    // mi salvo l'ultimo messaggio della conversazione attuale
    var last_message = $(this).closest('.container_single_chat.active').find('.messages p:last').text();
    console.log('Ultimo messaggio della conversazione ' + last_message);
    // mi salvo il messaggio precedente all'ultimo per sostituirlo in caso dovessi cancellare l'ultimo messaggio
    var replaced_message = $(this).closest('.messages').prev('.messages').find('p').text();
    console.log('Penultimo messaggio della conversazione ' + replaced_message);

    // quando clicco su elimina messaggio
    $('.menu .delete_message').click(function(){
      // mi salvo il testo del messaggio che cancello per poi verificare che non sia l'ultimo messaggio della conversazione
      var selected_message_delete = $(this).closest('.messages').find('p').text();
      console.log('Il messaggio selezionato è: ' + selected_message_delete);
      console.log('Ultimo messaggio della conversazione ' + last_message);
      // rimuovo il messaggio selezionato
      $(this).closest('.messages').remove();
      // se questo rimosso era l'ultimo messaggio della conversazione
      if(selected_message_delete == last_message){
        console.log('true');
        // metto a sinistra l'ultimo messaggio trovato
        $('.chat_container .chat_on .person_message').text(replaced_message);
      } else {
        console.log('false');
      }
    });

  })

});
