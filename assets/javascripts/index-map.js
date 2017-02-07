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
  window.map = map;//将map变量存储在全局
}

//创建marker
var markerArr = [{title:"污水处理厂",content:"",point:"116.580831|35.350238",isOpen:0,icon:{img: "wsclc.png", w: 123, h: 35}},
  {title:"农业学校",content:"",point:"116.592677|35.457099",isOpen:0,icon:{img: "nyxy.png", w: 123,h: 35}},
  {title:"室外测量",content:"",point:"116.61821|35.413464",isOpen:0,icon:{img: "swcs.png", w: 168,h: 35}}
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
      });
    })()
  }
}
//创建InfoWindow
function createInfoBox(i){
  var json = markerArr[i];
var html = ["<div class='infoBoxContent'><div class='title'><strong>中海雅园</strong><span class='price'>均价43000</span></div>",
"<div class='list'><ul><li><div class='left'><img src='house3.jpg'/></div><div class='left'><a target='_blank' href='http://map.baidu.com'>中海雅园南北通透四居室</a><p>4室2厅，205.00平米，3层</p></div><div class='rmb'>760万</div></li>"
,"<li><div class='left'><img src='house1.jpg'/></div><div class='left'><a target='_blank' href='http://map.baidu.com'>中海雅园四居室还带保姆间</a><p>2室1厅，112.00平米，16层</p></div><div class='rmb'>300万</div></li>"
,"<li><div class='left'><img src='house2.jpg'/></div><div class='left'><a target='_blank' href='http://map.baidu.com'>《有钥匙 随时看》花园水系</a><p>3室2厅，241.00平米，16层</p></div><div class='rmb'>400万</div></li>"
,"<li><div class='left'><img src='house3.jpg'/></div><div class='left'><a target='_blank' href='http://map.baidu.com'>富力城D区正规楼王大三居</a><p>3室3厅，241.00平米，17层</p></div><div class='rmb'>600万</div></li>"
,"<li class='last'><div class='left'><img src='house1.jpg'/></div><div class='left'><a target='_blank' href='http://map.baidu.com'>富力城豪，身份人士的象征</a><p>4室2厅，213.90平米，25层</p></div><div class='rmb'>700万</div></li>"
,"</ul></div>"
,"</div>"];
  
  var ib = new BMapLib.InfoBox(map, html.join(""), {
    boxStyle: {
      background:"url('assets/images/tipbox.gif') no-repeat center top",
      width: "515px",
      height: "353px"
    },
    closeIconMargin: "1px 1px 0 0",
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
