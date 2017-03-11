$(document).ready(function(){

// Hey, dude. I don't know JS. If you want to help me just contact me.

  $("#work__entry-1").find(".work__image").hover(
      function () {
        $("#work__entry-1").find(".work__title > a").css ({
          'border-bottom': '1px solid #111'
        });
  },  function () {
        $("#work__entry-1").find(".work__title > a").css ({
          'border-bottom': ''
        });
  });
  
  $("#work__entry-2").find(".work__image").hover(
      function () {
        $("#work__entry-2").find(".work__title > a").css ({
          'border-bottom': '1px solid #111'
        });
  },  function () {
        $("#work__entry-2").find(".work__title > a").css ({
          'border-bottom': ''
        });
  });
  
  $("#work__entry-3").find(".work__image").hover(
      function () {
        $("#work__entry-3").find(".work__title > a").css ({
          'border-bottom': '1px solid #111'
        });
  },  function () {
        $("#work__entry-3").find(".work__title > a").css ({
          'border-bottom': ''
        });
  });

  $("#work__entry-4").find(".work__image").hover(
      function () {
        $("#work__entry-4").find(".work__title > a").css ({
          'border-bottom': '1px solid #111'
        });
  },  function () {
        $("#work__entry-4").find(".work__title > a").css ({
          'border-bottom': ''
        });
  });

})