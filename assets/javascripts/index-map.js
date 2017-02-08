/**
 * 百度地图API相关
 * start
 **/
$(function() {
  initMap();
});

function initMap(){
  createMap();
  addMarker();
}
 
function createMap(){
  var map = new BMap.Map("maps");//在百度地图容器中创建一个地图
  var point = new BMap.Point(116.5859, 35.419975);
  map.centerAndZoom(point,13);//设定地图的中心点和坐标并将地图显示在地图容器中
  map.enableScrollWheelZoom();
  window.map = map;//将map变量存储在全局
}

//创建marker
var markerArr = [{title:"污水处理厂",content:"",point:"116.580831|35.350238",isOpen:0,
    icon:{img: "wsclc.png", w: 123, h: 35},pollutant:[["PM2.5", 260], ["PM10", 250],["NO2", 100],["SO2", 10],["CO", 16],["O3", 15]]},
  {title:"农业学校",content:"",point:"116.592677|35.457099",isOpen:0,
    icon:{img: "nyxy.png", w: 123,h: 35},pollutant:[["PM2.5", 260], ["PM10", 200],["NO2", 200],["SO2", 30],["CO", 126],["O3", 15]]},
  {title:"室外测量",content:"",point:"116.61821|35.413464",isOpen:0,
    icon:{img: "swcs.png", w: 168,h: 35},pollutant:[["PM2.5", 260], ["PM10", 180],["NO2", 320],["SO2", 20],["CO", 16],["O3", 15]]}
];
function addMarker(){
  for(var i=0; i<markerArr.length; i++){
    var json = markerArr[i];
    var p0 = json.point.split("|")[0];
    var p1 = json.point.split("|")[1];
    var point = new BMap.Point(p0,p1);
    var iconImg = createIcon(json.icon);
    var marker = new BMap.Marker(point,{icon:iconImg});

    map.addOverlay(marker);

    (function(){
      var index = i;
      var _map = map;
      var _ib = createInfoBox(index);
      var _marker = marker;

      _marker.addEventListener("click",function(){
        _ib.open(_marker);
        createChart();
      });
    })()
  }
}
//创建InfoWindow
function createInfoBox(i){
  var json = markerArr[i];
  var polluteHtml = "";
  for (var j=0; j<json.pollutant.length; j++) {
    polluteHtml += "<li class='list-group-item'>";
    if (json.pollutant[j][1]>=0 && json.pollutant[j][1]<=80) {
      polluteHtml += "<div class='circle-badge bcgcolor-reseda'>";
    } else if (json.pollutant[j][1]>80 && json.pollutant[j][1]<=200) {
      polluteHtml += "<div class='circle-badge bcgcolor-buff'>";
    } else {
      polluteHtml += "<div class='circle-badge bcgcolor-light-red'>";
    }
    polluteHtml += "<strong>"+json.pollutant[j][1]+"</strong></div><p class='pollutant-title'>"+json.pollutant[j][0]+"</p></li>";
  }
  var html = ["<div id='place-air-index'>",
  "<div class='panel'>",
  "<div class='panel-heading'><h3 class='panel-title'><span class='glyphicon glyphicon-stats'></span>"+ json.title + "_空气指数变化</h3></div>",
  "<hr/>",
  "<div class='panel-body'>",
  "<div class='row pollute-status-wrapper'>",
  "<div class='col-md-4 pollute-status-left'><h2 class='aqi-number'>260 <small>AQI</small></h2>",
  "<div class='status-badge'>中度污染</div>",
  "<p class='pollutant-wrapper'>首要污染物：<span>PM2.5</span></p>",
  "</div>",
  "<div class='col-md-8 pollute-status-right'>",
  "<ul class='list-group list-group-horizontal'>"+polluteHtml+"</ul>",
  "<p class='suggest-info'><img src='assets/images/suggest-heart.png'/>儿童老年人病人应停留室内,一般人避免户外活动</p>",
  "</div>",
  "</div>",
  "<div class='aqi-wrapper'><canvas id='myChart' height='120'></canvas></div>",
  "</div></div>"];
  var ib = new BMapLib.InfoBox(map, html.join(""), {
    boxStyle: {
      width: "515px",
      height: "350px"
    },
    offset: new BMap.Size(0, 0),
    closeIconUrl: "assets/images/close.png",
    closeIconMargin: "16px 20px 0 0",
    enableAutoPan: true,
    align: INFOBOX_AT_TOP
  });
  return ib;
}
//创建一个Icon
function createIcon(json){
  var icon = new BMap.Icon("assets/images/"+json.img, new BMap.Size(json.w,json.h))
  return icon;
}
/**百度地图API相关end**/

function createChart(){
  var ctx = document.getElementById("myChart").getContext("2d");
  var barChartData = {
    labels : ["27日16:00","27日18:00","28日00:00","28日04:00","28日08:00","28日10:00","28日12:00","28日14:00"],
  	datasets : [
  		{
  			backgroundColor : "rgba(229,61,25,1)",
  			borderColor : "rgba(229,61,25,1)",
  			data : [100,100,100,100,100,100,100,100]
  		}
  	]
  }
  myChart = new Chart(ctx, {
    type: 'bar',
    data: barChartData,
    options: {
      responsive: true,
      legend: {
        display: false
      },
      tooltips: {
        mode: 'point'
      },
      layout: {
        padding: 0
      },
      title: {
            display: true,
            text: 'AQI',
            position: 'left'
      },
      scales: {
        xAxes: [{
          stacked: true,
          barThickness: 10,
          gridLines: {
            display: false
          },
          scaleLabel: {
            display: true
          }
        }],
        yAxes: [{
          ticks: {
                    max: 400,
                    min: 0,
                    stepSize: 200
                }, 
        }]
      }
    }
  });
}
