$(function(){

  // busqueda general por ajax 
  $( "#search" ).autocomplete({
    source: "/search/ajax",
    minLength: 2,
    select: function( event, res ) {
      window.location.href = res.item.url;
    }
  });

})
