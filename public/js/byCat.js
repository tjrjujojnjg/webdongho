$(document).on('click','.btn-outline-success',function(e){
    e.preventDefault();
    var parent= $(this).parents('.col-sm-4');
    var src= parent.find('img').attr('src');
    var cart=$(document).find('.iconShopping')
    var parTop= parent.offset().top;
    var parLeft=parent.offset().left;
    $('<img />', { 
      class: 'img-product-fly',
      src: src//var tu hang 91
    }).appendTo('body').css({
      'top': parTop,
      'left': parLeft + parent.width() - 20,
    });
    setTimeout(function(){
      $(document).find('.img-product-fly').css({
        'top': cart.offset().top,
        'left': cart.offset().left
      });
      setTimeout(function(){
        $(document).find('.img-product-fly').remove();
      },2000)
    },500)
    setTimeout(()=>{
      window.location.reload()
    },2500)
  });