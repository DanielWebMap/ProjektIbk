//Menü Grundlage

const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', function() {
    nav.classList.toggle('nav-open');
});

//CHARTS DIAGRAMM

var windowWidth = $(window).width();
if (windowWidth > 400) {

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Aktivität', 'Anzahl'],
    ['Skitage',23],
    ['Wanderungen', 8],
    ['Fahrradtouren',4],
    ['Rodeltage',5],
    ['Kurztrips',2]
  ]);


  var options = {
        pieHole: 0.3,
        slices: { 0: { color: '#2e9eda' }, 1: { color: '#9eda2e' }, 2: { color: '#5fbcc3' }, 3: { color: '#2a6ac3' }, 4: { color: '#D0D07B' }, 5: { color: '#DE7080' }, 6: { color: '#B374CA' }, },
        backgroundColor: 'none',
        width: 800,
        height: 350,
        legend: { position: 'right' },
        pieSliceTextStyle: {
            color: 'black',
        }
  };

  var chart = new google.visualization.PieChart(document.getElementById('chart'));
  chart.draw(data, options);
  
  
}
}

else if (windowWidth < 400) {


  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Aktivität', 'Anzahl'],
      ['Skitage',23],
      ['Wanderungen', 8],
      ['Fahrradtouren',4],
      ['Rodeltage',5],
      ['Kurztrips',2]
    ]);
  
  
    var options = {
          pieHole: 0.3,
          slices: { 0: { color: '#2e9eda' }, 1: { color: '#9eda2e' }, 2: { color: '#5fbcc3' }, 3: { color: '#2a6ac3' }, 4: { color: '#D0D07B' }, 5: { color: '#DE7080' }, 6: { color: '#B374CA' }, },
          backgroundColor: 'none',
          width: 380,
          height: 250,
          legend: { position: 'right', textStyle: {
            fontSize: 9 } },
          pieSliceTextStyle: {
              color: 'black',
          }
    };
  
    var chart = new google.visualization.PieChart(document.getElementById('chart'));
    chart.draw(data, options);
  }
  }


