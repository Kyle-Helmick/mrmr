var socket = io(),
  user,
  i,
  div,
  div2,
  h5,
  a,
  join,
  div3,
  div4,
  ul;

socket.emit( 'request-user', null );
socket.emit( 'request-rooms', null );

socket.on( 'room-to-clients', function roomtoclients( res ) {
  $( '#chat-insert' ).append( $( '<li>' ).text( res.name + ': ' + res.message ));
});

socket.on( 'send-user', function receiveUser( res ) {
  user = res;
  console.log( res.name );
  document.getElementById( 'text-bar' ).placeholder = res.name;
  $( '#ddOwner' ).hide();
  if ( user.ownsRoom == true ) {
    $( '#ddOwner' ).show();
  }
});

socket.on( 'send-rooms', function receiveRooms( res ) {

  $( '#accordion' ).empty();
  for ( i = 0; i < res.length; i++ ) {
    $( '#' + res [ i ].name + 'List' ).empty();
  }

  div = $( '<div>', { 'class': 'card' });
  div2 = $( '<div>', { 'class': 'card-header', 'role': 'tab', 'id': 'H' + res [ 0 ].name });
  h5 = $( '<h5>', { 'class': 'mb-0' });
  a = $( '<a>', { 'data-toggle': 'collapse', 'data-parent': '#accordion', 'href': '#C' + res [ 0 ].name, 'aria-expanded': 'true', 'aria-controls': 'C' + res [ 0 ].name }).text( res [ 0 ].name );
  join = $( '<button>', { 'class': 'btn side-btn', 'onclick': 'changeRoom( "' + res [ 0 ].name + '" )' }).text( 'Join' );

  h5 = h5.append( a );
  div2 = div2.append( h5 );
  div2 = div2.append( join );

  div3 = $( '<div>', { 'id': 'C' + res [ 0 ].name, 'class': 'collapse show', 'role': 'tabpanel', 'aria-labelledby': 'H' + res [ 0 ].name });
  div4 = $( '<div>', { 'class': 'card-block' });
  ul = $( '<ul>', { 'id': res [ 0 ].name + 'List' });

  div4 = div4.append( ul );
  div3 = div3.append( div4 );

  div = div.append( div2 );
  div = div.append( div3 );

  $( '#accordion' ).append( div );

  for ( j = 0; j < res [ 0 ].users.length; j++ ) {
    $( '#' + res [ 0 ].name + 'List' ).append( $( '<p>' ).text( res [ 0 ].users[ j ].name ));
  }

  for ( i = 1; i < res.length; i++ ) {
    div = $( '<div>', { 'class': 'card' });
    div2 = $( '<div>', { 'class': 'card-header', 'role': 'tab', 'id': 'H' + res [ i ].name });
    h5 = $( '<h5>', { 'class': 'mb-0' });
    a = $( '<a>', { 'class': 'collapsed', 'data-toggle': 'collapse', 'data-parent': '#accordion', 'href': '#C' + res [ i ].name, 'aria-expanded': 'false', 'aria-controls': 'C' + res [ i ].name }).text( res [ i ].name );
    join = $( '<button>', { 'class': 'btn side-btn', 'onclick': 'changeRoom( "' + res [ i ].name + '" )' }).text( 'Join' );

    h5 = h5.append( a );
    div2 = div2.append( h5 );
    div2 = div2.append( join );

    div3 = $( '<div>', { 'id': 'C' + res [ i ].name, 'class': 'collapse show', 'role': 'tabpanel', 'aria-labelledby': 'H' + res [ i ].name });
    div4 = $( '<div>', { 'class': 'card-block' });
    ul = $( '<ul>', { 'id': res [ i ].name + 'List' });

    div4 = div4.append( ul );
    div3 = div3.append( div4 );

    div = div.append( div2 );
    div = div.append( div3 );

    $( '#accordion' ).append( div );

    for ( j = 0; j < res [ i ].users.length; j++ ) {
      $( '#' + res [ i ].name + 'List' ).append( $( '<p>' ).text( res [ i ].users[ j ].name ));
    }
  }
});

function makeRoom() {
  socket.emit( 'make-room', user );
}
