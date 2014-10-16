$(document).ready(function(){
  $.getJSON('/data', function(json){
    var headerSource = $("#header-template").html();
    var footerSource = $('#footer-template').html();

    var headerTemplate = Handlebars.compile(headerSource);
    var footerTemplate = Handlebars.compile(footerSource);

    $('#header').html(headerTemplate(json));
    $('#footer').html(footerTemplate(json));

  });
});
