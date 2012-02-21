$(function(){
  $('.best_in_place').best_in_place();

  $('#usersearch').keyup(function(){
    $("tr.hide").removeClass('hide');  
    $.get('/admin/users/search', 'get=' + $(this).val(), function(resp){
      $('tbody tr').hide()
      $('tbody').append(resp);
      $('.best_in_place').best_in_place();
    });
  });


});
