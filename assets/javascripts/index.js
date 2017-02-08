$(document).ready(function() {
  $(".panel-title a").click(function() {
    var span = $(this).find("span").first();
    if (span.hasClass("icon-chevron-down")) {
      span.removeClass("icon-chevron-down"); 
      span.addClass("icon-chevron-up");
    } else {
      span.removeClass("icon-chevron-up"); 
      span.addClass("icon-chevron-down");
    }
  });
});
