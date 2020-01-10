
const prodURL = 'http://vincentvtran.pythonanywhere.com/api/';
const localURL = 'http://localhost:5000/'


var scatterData = [];
var pieData = [12,9,3];
var barData = [];

//Scatter Chart
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

  // Pie Chart
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
  
function executeQuery(keyword) {
  console.log("Keyword: "+prodURL+keyword)
  $.ajax({
    url: prodURL + keyword,
    success: function(data) {
      console.log(data);
      addToScatterPlot(data);
    }
  });
}

function addToScatterPlot(form){
  var categories = [];
  for(i=0;i<form.length;i++){
    const extractedDate = form[i].date;
    const extractedPositivity = form[i].sentiment.pos;
    const extractedNegativity = form[i].sentiment.neg;
    const extractedNeutral = form[i].sentiment.neu;

    sentiment = [extractedNeutral,extractedNegativity,extractedPositivity]
    sentiment.sort();
    const max = sentiment[2];
    if(!categories.includes(extractedDate)){
      categories.push(extractedDate);
    }
    newResult = {x: extractedDate, y: max};
    console.log(newResult);
    scatterChart.data.datasets.push(newResult);
    scatterChart.update();
  }
}

function addToBarGraph(form){

}

function addToPieGraph(form){

}
// Graph Functions
function addData(chart, label, data) {
  chart.data.labels.push(label[0]);
  chart.data.labels.push(label[1]);
  chart.data.labels.push(label[2]);
  chart.data.datasets.forEach((dataset) => {
      dataset.data.datasets.data.push(data[0]);
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


// Execute Events
$('#searchBar').keydown(function (e){
  if(e.keyCode == 13){
    var keyword = $("#searchBar").val()
    executeQuery(keyword);
  }
});

$(document).ready(function() {
  // run the first time; all subsequent calls will take care of themselves
  executeQuery("default");

});