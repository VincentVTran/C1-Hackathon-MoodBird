

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

  var ctx = document.getElementById('scatterPlot').getContext('2d');
  var scatterChart = new Chart(ctx, {
  type: 'scatter',
  data: {
      datasets: [{
          label: 'Scatter Dataset',
          data: [{
              x: -10,
              y: 0
          }, {
              x: 0,
              y: 10
          }, {
              x: 10,
              y: 5
          }]
      }]
  },
  options: {
      scales: {
          xAxes: [{
              type: 'linear',
              position: 'bottom'
          }]
      }
  }
  });
  // And for a pie chart
  var ctx2 = document.getElementById('pieChart').getContext('2d');
  var pieChart = new Chart(ctx2, {
type: 'pie',
data: {
  labels: ['NEGATIVE', 'POSITIVE', 'NEUTRAL'],
  datasets: [{
    label: 'Percentage of Sentiments',
    data: [12, 19, 3],
    backgroundColor: [
      'rgba(255, 99, 132, 0.5)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
    ],
    borderColor: [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
    ],
    borderWidth: 1
  }]
},
options: {
   cutoutPercentage: 40,
  responsive: false,
}
});

});