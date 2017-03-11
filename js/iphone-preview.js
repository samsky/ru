$( window ).load(function() {
  $(function() {


  var $content = $('.contentt'),
    $wrapper = $('.wrapperr');

  //----------------------------------------------------------------------
  // Inner scroll section

  var viewports = [],
    wrapperOffsetTop = $wrapper.offset().top;

  $('.viewport').each(function() {
    var $container = $(this),
      $block = $container.find('img'),
      $section = $(this).parent(),
      containerHeight = $container.height(),
      blockHeight = $block.height(),
      sectionOffsetTop = $section.offset().top + situation().reserved,
      vp = { // Object needed to make link
        fixed: false,
        offsetTop: $section.offset().top,
        scrollPosition: 0,
        scrollHeight: blockHeight - containerHeight
      };

    viewports.push(vp);

    $(window).bind('scroll mousewheel', function() { // Mousewheel for faster reaction in Chrome and Opera
      var currentScrollTop = $(window).scrollTop(),
        currentDistance = currentScrollTop - sectionOffsetTop; // hck here

      if (currentDistance >= 0 && currentDistance <= vp.scrollHeight) {
        vp.fixed = true;
        vp.scrollPosition = currentDistance;
      } else {
        vp.fixed = false;
        if (currentDistance < 0) {
          vp.scrollPosition = 0;
        } else if (currentDistance > vp.scrollHeight) {
          vp.scrollPosition = vp.scrollHeight;
        }
      }

      var state = situation();
      $block.css('top', '-' + vp.scrollPosition + 'px');
      if (state.fixed) {
        $wrapper.css({
          position: 'fixed',
          top: '-' + (state.offset - wrapperOffsetTop) + 'px',
          paddingTop: 0
        });
      } else {
        $wrapper.css({
          position: 'relative',
          top: 0,
          paddingTop: state.padding + 'px' // To compensate traversed inner scroll
        });
      }
    });

    $(window).resize(function() {
      var scrollTop = $(window).scrollTop();

      $(window).scrollTop(0).trigger('scroll');
      $content.css('height', 'auto');
      $wrapper.css('width', 'auto');

      wrapperOffsetTop = $wrapper.offset().top;
      containerHeight = $container.height();
      blockHeight = $block.height();
      sectionOffsetTop = $section.offset().top + situation(vp).reserved;
      vp.offsetTop = $section.offset().top;
      vp.scrollHeight = blockHeight - containerHeight;

      $content.css('height', ($content.height() + situation().reserved) + 'px');
      $wrapper.css('width', $wrapper.width() + 'px');
      $(window).scrollTop(scrollTop).trigger('scroll');
    });
  });

  $content.css('height', ($content.height() + situation().reserved) + 'px');
  $wrapper.css('width', $wrapper.width() + 'px');

  function situation(till) {
    var state = {
      fixed: false,
      offset: 0, // For fixed postition
      padding: 0, // For static position
      reserved: 0 // Scroll space for inner block
    };
    for (var i = 0; i < viewports.length; i++) {
      var o = viewports[i];
      if (till && o == till) break;

      state.reserved += o.scrollHeight;
      if (o.scrollPosition > 0) state.offset = o.offsetTop;
      if (o.scrollPosition == o.scrollHeight) state.padding += o.scrollHeight;
      if (o.fixed) state.fixed = true;
    }
    return state;
  }

  //----------------------------------------------------------------------
  // Parallax section

  var $paracontainer = $('<div class="paracontainer">');

  $('.p1 img').css('top', ($('.viewport.ls1 img').height() - $('.viewport.ls1').height()) + 'px');
  $('.p2 img').css('top', ($('.viewport.ls2 img').height() - $('.viewport.ls2').height()) + 'px');
  $('.parallax img').each(function() {
    var $block = $(this),
      $clone = $block.clone(),
      blockOffset = $block.offset(),
      windowHeight = viewportHeight(),
      parallaxRate = 0.35;

    $clone.css({
      'position': 'absolute',
      'left': blockOffset.left,
      'top': blockOffset.top
    }).appendTo($paracontainer);
    $block.hide();

    $(window).bind('scroll mousewheel', function() {
      var currentPosition = $(window).scrollTop() - (blockOffset.top - windowHeight);
      $clone.css('padding-top', ((currentPosition > 0) ? (currentPosition * parallaxRate) : 0) + 'px');
    });

    $(window).resize(function() {
      var scrollTop = $(window).scrollTop();
      $(window).scrollTop(0).trigger('scroll');

      blockOffset = $block.show().offset();
      $block.hide();
      $clone.css({
        'left': blockOffset.left,
        'top': blockOffset.top,
        'padding-top': 0
      });
      windowHeight = viewportHeight();

      $(window).scrollTop(scrollTop).trigger('scroll');
    });
  });
  $wrapper.after($paracontainer);

  function viewportHeight() { // Because $(window).height() returns wrong value :(
    var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0];
    return w.innerHeight || e.clientHeight || g.clientHeight;
  }

  //----------------------------------------------------------------------

  $(window).trigger('scroll'); // When pages was opened by block anchor etc.

});
});

