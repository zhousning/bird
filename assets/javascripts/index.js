$(document).ready(function() {
  $(".panel-title>a").click(function() {
    changeCollapse(this, "icon-chevron-down","icon-chevron-up");
  });
  $(".dropdown-btn>a").click(function() {
    changeCollapse(this, "icon-sort-down","icon-sort-up");
  });
});

function changeCollapse(obj, down, up){
  var span = $(obj).find("span").first();
  if (span.hasClass(down)) {
    span.removeClass(down); 
    span.addClass(up);
  } else {
    span.removeClass(up); 
    span.addClass(down);
  }
}
