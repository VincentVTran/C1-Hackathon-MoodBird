function executeQuery() {
  $.ajax({
    url: 'http://jservice.io/api/clues',
    success: function(data) {
      console.log(data);
    }
  });
  setTimeout(executeQuery, 5000); // you could choose not to continue on failure...
}

$(document).ready(function() {
  // run the first time; all subsequent calls will take care of themselves
  setTimeout(executeQuery, 5000);
});