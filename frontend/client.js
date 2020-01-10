
const prodURL = 'http://vincentvtran.pythonanywhere.com/api/';
const localURL = 'http://localhost:5000/'


var scatterData = [];
var pieData = [1, 2, 3];
const pieLabel = ["Negative", "Positive", "Neutral"];
var barData = [];

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

function executeQuery(keyword) {
  console.log("Keyword: " + prodURL + keyword)
  $.ajax({
    url: prodURL + keyword,
    success: function (data) {
      console.log(data);

      var positives = 0;
      var negatives = 0;
      var neutrals = 0;
      var scores = {};

      addToPieGraph(data);




      // for (var i = 0; i < data.length; i++) {
      // if (data[i].sentiment.neg > 0.5) {
      //   negatives++;
      // } else if (data[i].sentiment.pos > 0.5) {
      //   positives++;
      // } else {
      //   neutrals++;
      // }
      //     if (scores[i].sentiment.neg != 0) {
      //       scores.x = score[i].sentiment.pos;
      //       scores.y = score[i].sentiment.neg;
      //       scatterData.push(scores);
      //     }
      // }

      // pieData = [negatives, positives, neutrals];
      // console.log(pieData);
      // label = ['NEGATIVE', 'POSITIVE', 'NEUTRAL'];
      // removeData(pieChart);
      // addData(pieChart, label, pieData);
    }
  });
}

function addToScatterPlot(form) {

}

function addToBarGraph(form) {

}

function addToPieGraph(form) {
  let positives = 0;
  let negatives = 0;
  let neutrals = 0;
  for (let i = 0; i < form.length; i++) {
    if (form[i].sentiment.neg > 0.1) {
      negatives++;
    } else if (form[i].sentiment.pos > 0.1) {
      positives++;
    } else {
      neutrals++;
    }
  }
  //Negative, Positives, Neutrals
  pieData = [negatives, positives, neutrals];
  removeData(pieChart);
  addData(pieChart, pieLabel, pieData);
  console.log(pieData);
}
// Graph Functions
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


// Execute Events
$('#searchBar').keydown(function (e) {
  if (e.keyCode == 13) {
    var keyword = $("#searchBar").val()
    executeQuery(keyword);
  }
});

$(document).ready(function () {
  // run the first time; all subsequent calls will take care of themselves
  executeQuery("capitalone");

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


  var ctx3 = document.getElementById('barGraph').getContext('2d');
  var myBarChart = new Chart(ctx3, {
    type: 'horizontalBar',
    data: [{ x: '2016-12-25', y: 20 }, { x: '2016-12-26', y: 10 }]
  });

});