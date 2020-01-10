function executeQuery() {
  $.ajax({
    url: 'http://jservice.io/api/clues',
    success: function(data) {
      console.log(data);
    }
  });
  setTimeout(executeQuery, 5000); // you could choose not to continue on failure...
}

$('#searchBar').keydown(function (e){
  if(e.keyCode == 13){
    var keyword = $("#searchBar").text()
    element.innerHTML = element.innerText || element.textContent;
    executeQuery(url+ document.getElementById('searchBar').innerHTML.replace(/<[^>]*>/g, ""));
  }
});

$(document).ready(function() {
  // run the first time; all subsequent calls will take care of themselves
  setTimeout(executeQuery, 5000);
});