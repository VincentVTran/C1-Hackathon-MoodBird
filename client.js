
const prodURL = 'https://vincentvtran.pythonanywhere.com/api/';
const localURL = 'http://localhost:5000/'


var scatterData = [{x:4,y:3}];
var pieData = [1, 2, 3];
const pieLabel = ["Negative", "Positive", "Neutral"];
var barData = [];

//Scatter Plot
var ctx = document.getElementById('scatterPlot').getContext('2d');
var scatterChart = new Chart(ctx, {
  type: 'scatter',
  data: {
    datasets: [{
      label: 'Negative Sentiment Scatter Plot',
      data: [{x: 10, y: 4}]
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

//Bar Graph
var ctx3 = document.getElementById('barGraph').getContext('2d');
var myBarChart = new Chart(ctx3, {
  type: 'bar',
  label: '# of Votes',
  data: {
    datasets: [{
      label: 'Positive Sentiment Bar Graph',
      data: [{x: 10, y: 4}]
    }],
    backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
},
options: {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
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

function executeQuery(keyword) {
  console.log("Keyword: " + prodURL + keyword)
  $.ajax({
    url: prodURL + keyword,
    success: function (data) {
      console.log(data);
      addToPieGraph(data);
      addToScatterPlot(data);
      addToBarGraph(data);
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

function addToScatterPlot(form){
  var categories = [];

  //Removing data
  size = scatterChart.data.datasets[0].data.length;
  for(i = 0;i < size;i++){
    scatterChart.data.datasets[0].data.pop();
  }

  //Adding data
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
    
    newResult = {x: categories.indexOf(extractedDate), y:  extractedNegativity};
    // console.log(newResult);
    
    scatterChart.data.datasets[0].data.push(newResult); 
    // scatterChart.data.datasets.push(categories.indexOf(extractedDate));
    // scatterChart.data.datasets[i].data.push(max);
  }
  console.log(scatterChart.data.datasets);
  scatterChart.update();
}

function addToBarGraph(form) {
   //Removing data
    size = myBarChart.data.datasets[0].data.length;
  for(i = 0;i < size;i++){
    myBarChart.data.datasets[0].data.pop();
    console.log(myBarChart.data.datasets[0].data.length);
  }
  // console.log(myBarChart.data);
  positiveCount = 0;
  for(i=0;i<form.length;i++){
    const extractedDate = form[i].date;
    const extractedPositivity = form[i].sentiment.pos;
    const extractedNegativity = form[i].sentiment.neg;
    const extractedNeutral = form[i].sentiment.neu;

    sentiment = [extractedNeutral,extractedNegativity,max]
    sentiment.sort();
    const max = sentiment[2];
    if(!myBarChart.data.labels.includes(extractedDate)){
      myBarChart.data.labels.push(extractedDate);
    }
    
    newResult = {x: myBarChart.data.labels.indexOf(extractedDate), y: extractedPositivity};
    // console.log(newResult);
    myBarChart.data.datasets[0].data.push(newResult); 
  }
  console.log(myBarChart.data);
  myBarChart.update();
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
});