function printPage(){
  document.getElementById('loadingView').style.display="block";
  var menuLists=document.querySelectorAll('#menuFileListPanel .menuList');
  for(var i=0;i<menuLists.length;i++){
    menuLists[i].style.color="white";
    menuLists[i].style.fontWeight="400";
  }
  document.getElementById('menuPrint').style.color="skyblue";
  document.getElementById('menuPrint').style.fontWeight="600";
  document.getElementById('popupWindowInsert').style.display="none";

  var boxes=document.querySelectorAll('.box');
  for(var i=0;i<boxes.length;i++){
    boxes[i].style.display="";
  }
  var ogp_URL=document.getElementById('popupWindowOGPDetailURL').value;
  var ogp_name=document.getElementById('popupWindowOGPDetailName').value;
  var ogp_title=document.getElementById('popupWindowOGPDetailTitle').value;
  var ogp_image=document.getElementById('popupWindowOGPDetailImage').files;
  var ogp_explain=document.getElementById('popupWindowOGPDeatilExplain').value;
  var ogp_icon=document.getElementById('popupWindowOGPDetailIcon').files;
  document.getElementById('popupWindowOGPDetailURLCode').innerHTML=ogp_URL;
  document.getElementById('popupWindowOGPDetailNameCode').innerHTML=ogp_name;
  document.getElementById('popupWindowOGPDetailTitleCode').innerHTML=ogp_title;
  document.getElementById('popupWindowOGPDetailExplainCode').innerHTML=ogp_explain;

  if(ogp_image.length!=0){
    /*var reader=new FileReader();
    reader.onload=(function(theFile){
      return function(e){
        document.getElementById('popupWindowOGPDetailImageCode').innerHTML=e.target.result;
      }
    })(ogp_image[0]);
    reader.readAsDataURL(ogp_image[0]);*/
    var ogp_image_URL=ogp_URL.split('/');
    ogp_image_URL[ogp_image_URL.length-1]=ogp_image[0].name;
    document.getElementById('popupWindowOGPDetailImageCode').innerHTML=ogp_image_URL[0];
    for(var i=1;i<ogp_image_URL.length;i++){
      document.getElementById('popupWindowOGPDetailImageCode').innerHTML=document.getElementById('popupWindowOGPDetailImageCode').innerHTML+"/"+ogp_image_URL[i];
    }
  }

  if(ogp_icon.length!=0){
    var reader=new FileReader();
    reader.onload=(function(theFile){
      return function(e){
        document.getElementById('popupWindowOGPDetailIconCode').innerHTML=e.target.result;
      }
    })(ogp_icon[0]);
    reader.readAsDataURL(ogp_icon[0]);
  }

  document.getElementById('eventData').innerHTML=document.getElementById('event_list').innerHTML;



  setTimeout(function(){
    //HTMLの前の部分
    var preHTML="<!DOCTYPE html>\n";
    preHTML+="<html prefix='og:http://ogp.me/ns#' lang=\'ja\'>\n";
    preHTML+="<head>\n";
    preHTML+="<title>"+ogp_title+"</title>\n";
    preHTML+="<meta name=\'description\' content=\'"+ogp_explain+"\'>\n";
    preHTML+="<meta charset=\'utf-8\'>\n";
    preHTML+="<meta http-equiv=\'Cache-Control\' content=\'no-cache\'>\n";
    preHTML+="<meta name=\'viewport\' content='width=device-width,user-scalable=no,viewport-fit=cover'>\n";
    preHTML+="<meta property=\'og:url\' content=\'"+ogp_URL+"\'>\n";
    preHTML+="<meta property=\'og:title\' content=\'"+ogp_title+"\'>\n";
    preHTML+="<meta property=\'og:name\' content=\'"+ogp_name+"\'>\n";
    preHTML+="<meta property=\'og:image\' content=\'"+document.getElementById('popupWindowOGPDetailImageCode').innerHTML+"\'>\n";
    preHTML+="<meta property=\'og:description\' content=\'"+ogp_explain+"\'>\n";
    preHTML+="<meta name=\'twitter:card\' content=\'summary_large_image\'>\n";
    preHTML+="<link rel=\'shortcut icon\' type=\'image/x-icon\' href=\'"+document.getElementById('popupWindowOGPDetailIconCode').innerHTML+"\'>\n";
    preHTML+="</head>\n";
    preHTML+="<body>\n";
    preHTML+="<style>\n";
    preHTML+="*{margin:0px;border:0px;padding:0px;font-size:20px;text-decoration:none;list-style:none;font-weight:500;scroll-behavior:smooth;-webkit-text-size-adjust:100%;-webkit-appearance:none;}\n";
    preHTML+="html,body{margin:0px;border:0px;padding:0px;width:100%;background-color:"+document.body.style.backgroundColor+";}\n";
    preHTML+=".box{width:10px;height:10px;border:0px;margin:0px;padding:0px;background-color:rgba(255,255,255,0.0);position:absolute;z-index:40;overflow:hidden;user-select:none;}\n";
    preHTML+="#popupWindowTextContentContent{display:none;}\n";
    preHTML+="#target{margin:0px;border:0px;padding:0px;background-color:rgba(0,0,0,0);position:relative;z-index:2;}\n";
    preHTML+="#editable{position:relative;background-color:rgba(0,0,0,0);}\n";
    preHTML+="#popupWindowOGP{display:none;}\n.box_id{ display:none; }\n#dataList{display:none;}\n.textBox,.imgBox,.movieBox,.pdfBox{width:100%;height:100%;border:0px;}\n";
    preHTML+=".box_0{z-index:300;}\n.box_1{z-index:280;}\n.box_2{z-index:260;}\n.box_3{z-index:240;}\n.box_4{z-index:220;}\n.box_5{z-index:200;}\n.box_6{z-index:180;}\n.box_7{z-index:160;}\n.box_8{z-index:140;}\n.box_9{z-index:120;}";
    preHTML+=".font_0{font-family:'Meiryo',sans-serif;}\n.font_1{font-family:'ヒラギノ角ゴシック',sans-serif;}\n.font_2{font-family:'Arial',sans-serif;}\n.font_3{font-family:'Arial Black',sans-serif;}\n.font_4{font-family:'游ゴシック',sans-serif;}\n.font_5{font-family:'MS P明朝',serif;}\n.font_6{font-family:'ヒラギノ明朝',serif;}\n.font_7{font-family:'MSゴシック',monospace;}\n.font_8{font-family:'MS明朝',monospace;}\n.font_9{font-family:'Lucida Sans Unicode',monospace;}\n.font_10{font-family:'Comic Sans MS',cursive;}\n.font_11{font-family:'Impact',fantasy;}\n";
    preHTML+=".cover_box{display:none;}\n.setLeft{position:absolute;left:0;}\n.setRight{position:absolute;right:0;}\n.setTop{position:absolute;top:0;}\n.setBottom{position:absolute;bottom:0;}\n.setWidth{width:100%;height:auto;position:absolute;}\n.setHeight{height:100%;width:auto;position:absolute;}\n.setAuto{width:100%;height:100%;position:absolute;left:0;top:0;}\n.setCenter.setHeight{left:50%;transform:translateX(-50%);position:absolute;}\n.setMiddle.setWidth{top:50%;transform:translateY(-50%);position:absolute;}\n@media(max-width:767px){\n .boxPC{\n display:none;\n }\n .boxMobile{\n display:block;\n }\n }\n@media(min-width:768px){\n .boxPC{\n display:block;\n }\n .boxMobile{\n display:none;\n }\n }\n </style>\n";
    preHTML+="<div id=\'target\'>";
    preHTML+="<div id=\'editable\'>";
    preHTML+="<!--Coded by LightningCat-->\n";
    preHTML+=document.getElementById('editable').innerHTML;
    preHTML+="<!--Coded by LightningCat-->\n";
    preHTML+="</div>";
    preHTML+="</div>";
    preHTML+="<script src='https://northwest-link.com/LightningCat/js/event_event_content.js'>\n</script>\n";
    preHTML+="</body>\n";
    preHTML+="</html>\n";
    var boxes=document.querySelectorAll('.box');
    var blob=new Blob([preHTML],{type:"text/html"});
    var link=document.getElementById('popupPrintOk');
    link.href=URL.createObjectURL(blob);
    link.download=strReplace(document.getElementById('fileName').value,'/','')+".html";
    document.getElementById('popupWindowPrint').style.display="block";
    for(var i=0;i<boxes.length;i++){
      boxes[i].style.display="none";
    }
    var boxes=document.querySelectorAll('.'+device_name);
    for(var i=0;i<boxes.length;i++){
      boxes[i].style.display="block";
    }
    document.getElementById('loadingView').style.display="none";
    if(document.getElementById('menuPreview').innerHTML==="閉じる"){
      changeLayerAll();
    }
    changeLayerFunc(strReplace(panel_layer,'panel_',''));
  },5000);
}
