// Animate Smooth Scroll
$('#view-work').on('click', function() {
    const landing = $('#landing').position().top;

    $('html, body').animate(
      {
        scrollTop: landing
      },
      900
    );
  });