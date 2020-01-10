
const prodURL = 'http://vincentvtran.pythonanywhere.com/hello';
const localURL = 'http://localhost:5000/'


var scatterData = [];
var pieData = [12,9,3];
var barData = [];


function executeQuery() {
  $.ajax({
    url: prodURL,
    success: function(data) {
      console.log(data);
      var positives = 0;
      var negatives = 0;
      var neutrals = 0;
      var scores = {};
      for (var i = 0; i < data.length; i++) {
          if (data[i].sentiment.neg > 0.5) {
            negatives++;
          } else if (data[i].sentiment.pos > 0.5) {
            positives++;
          } else {
            neutrals++;
          }
          if (score[i].sentiment.neu != 0) {
            scores.x = score[i].sentiment.pos;
            scores.y = score[i].sentiment.neg;
            scatterData.push(scores);
          }
      }
      
      

      pieData = [negatives, positives, neutrals];
      console.log(pieData);
      label = ['NEGATIVE', 'POSITIVE', 'NEUTRAL'];
      removeData(pieChart);
      addData(pieChart, label, pieData);

    }
  });
}


function addData(chart, label, data) {
  chart.data.labels.push(label[0]);
  chart.data.labels.push(label[1]);
  chart.data.labels.push(label[2]);
  chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data[0]);
      dataset.data.push(data[1]);
      dataset.data.push(data[2]);
  });
  chart.update();
}

function removeData(chart) {
  chart.data.labels.pop();
  chart.data.labels.pop();
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
      dataset.data.pop();
      dataset.data.pop();
  });
  chart.update();
}



$('#searchBar').keydown(function (e){
  if(e.keyCode == 13){
    var keyword = $("#searchBar").text()
    element.innerHTML = element.innerText || element.textContent;
    executeQuery(url+ document.getElementById('searchBar').innerHTML.replace(/<[^>]*>/g, ""));
  }
});

// document.getElementById('searchBar').addEventListener('keypress', function(event) {
//   // you could also do keyCode === 13
//   if (event.key === 'Enter') {
//     console.log('do ajax request here');
//   }
// })

$(document).ready(function() {
  // run the first time; all subsequent calls will take care of themselves
  executeQuery();

  var ctx = document.getElementById('scatterPlot').getContext('2d');
  var scatterChart = new Chart(ctx, {
  type: 'scatter',
  data: {
      datasets: [{
          label: 'Scatter Dataset',
          data: scatterData
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
    data: pieData,
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

var ctx3 = document.getElementById('barGraph').getContext('2d');
var myBarChart = new Chart(ctx3, {
  type: 'horizontalBar',
  data: [{x:'2016-12-25', y:20}, {x:'2016-12-26', y:10}]
});


});