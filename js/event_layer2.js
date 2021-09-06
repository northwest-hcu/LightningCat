function changeLayer(event){
  var panels=document.querySelectorAll(device_name_panel);
  for(var i=0;i<panels.length;i++){
    panels[i].style.display="block";
  }
  //メニュー表示の処理
  var num=parseInt(this.innerHTML);
  var layerMenuLists=document.querySelectorAll('#menuLayerListPanel .menuList');
  for(var i=0;i<layerMenuLists.length;i++){
    layerMenuLists[i].style.color="white";
    layerMenuLists[i].style.fontWeight="400";
  }
  document.getElementById('menuLayer'+num).style.color="skyblue";
  document.getElementById('menuLayer'+num).style.fontWeight="600";
  //表示処理
  panel_layer="panel_"+num;
  box_layer="box_"+num;
  //該当物だけ表示
  layerBack();
  //使用済みのパネルをHideへ
  hideAllPanel();
  //panel_layerのパネルだけHideから戻す
  openClassPanel(panel_layer);
  //targetの背景色を編集用に
  document.getElementById('target').style.backgroundColor="rgb(200,200,200)";
  //動画を全部とめる
  var videos=document.querySelectorAll('.movieBox');
  for(var i=0;i<videos.length;i++){
    videos[i].pause();
  }
}

function changeLayerFunc(num){
  var panels=document.querySelectorAll(device_name_panel);
  for(var i=0;i<panels.length;i++){
    panels[i].style.display="block";
  }
  //メニュー表示の処理
  var layerMenuLists=document.querySelectorAll('#menuLayerListPanel .menuList');
  for(var i=0;i<layerMenuLists.length;i++){
    layerMenuLists[i].style.color="white";
    layerMenuLists[i].style.fontWeight="400";
  }
  document.getElementById('menuLayer'+num).style.color="skyblue";
  document.getElementById('menuLayer'+num).style.fontWeight="600";
  //表示処理
  panel_layer="panel_"+num;
  box_layer="box_"+num;
  //該当物だけ表示
  layerBack();
  //使用済みのパネルをHideへ
  hideAllPanel();
  //panel_layerのパネルだけHideから戻す
  openClassPanel(panel_layer);
  //targetの背景色を編集用に
  document.getElementById('target').style.backgroundColor="rgb(200,200,200)";
  //動画を全部とめる
  var videos=document.querySelectorAll('.movieBox');
  for(var i=0;i<videos.length;i++){
    videos[i].pause();
  }
}

function layerBack(){
  var boxes=document.querySelectorAll('.box');
  var cover_boxes=document.querySelectorAll('.cover_box');
  for(var i=0;i<boxes.length;i++){
    if(boxes[i].classList.contains(box_layer) && boxes[i].classList.contains(device_name)){
      boxes[i].style.display="block";
    }else{
      boxes[i].style.display="none";
    }
  }
  for(var i=0;i<cover_boxes.length;i++){
    if(cover_boxes[i].parentNode.classList.contains(box_layer) && cover_boxes[i].parentNode.classList.contains(device_name)){
      cover_boxes[i].style.display="block";
    }else{
      cover_boxes[i].style.display="none";
    }
  }
}

function hideAllPanel(){
  for(var i=0;i<10;i++){
    var usedPanels=document.querySelectorAll('.panel_'+i);
    for(var j=0;j<usedPanels.length;j++){
      usedPanels[j].classList.remove('panel_'+i);
      usedPanels[j].classList.add('panel_'+i+'_hide');
    }
  }
}

function openClassPanel(panel_layer){
  var panels=document.querySelectorAll('.'+panel_layer+'_hide');
  for(var i=0;i<panels.length;i++){
    panels[i].classList.remove(panel_layer+'_hide');
    panels[i].classList.add(panel_layer);
  }
}

function changeLayerAll(){
  //「ファイル」メニューの表記処理
  var menuContent=document.getElementById('menuPreview').innerHTML;
  var menuLists=document.querySelectorAll('#menuFileListPanel .menuList');
  for(var i=0;i<menuLists.length;i++){
    menuLists[i].style.color="white";
    menuLists[i].style.fontWeight="400";
  }
  document.getElementById('popupWindowPrint').style.display="none";
  document.getElementById('popupWindowInsert').style.display="none";
  //閉じるボタンを用意
  if(menuContent==="プレビュー"){
    document.getElementById('menuPreview').innerHTML="閉じる";
    document.getElementById('menuPreview').style.color="skyblue";
    document.getElementById('menuPreview').style.fontWeight="600";
    //boxの全表示
    var boxes=document.querySelectorAll('.box.'+device_name);
    for(i=0;i<boxes.length;i++){
      boxes[i].style.display="block";
    }
    hideAllPanel();
    //背景色を見せる
    document.getElementById('target').style.backgroundColor="rgba(0,0,0,0)";
    //パネルの不可視可
    var panels=document.querySelectorAll('.panel');
    for(var i=0;i<panels.length;i++){
      panels[i].classList.add('panelToken');
      panels[i].classList.remove('panel');
    }
    //自動再生動画を流す
    var videos=document.querySelectorAll('.movieBox');
    for(var i=0;i<videos.length;i++){
      if(videos[i].controls===false){
        videos[i].play();
        videos[i].muted=true;
      }else{
        videos[i].pause();
      }
    }
    //カバーを外す
    var cover_boxes=document.querySelectorAll('.cover_box');
    for(var i=0;i<cover_boxes.length;i++){
      cover_boxes[i].style.display="none";
    }
  }else{
    //表記の初期化
    document.getElementById('menuPreview').innerHTML="プレビュー";
    document.getElementById('menuPreview').style.color="white";
    document.getElementById('menuPreview').style.fontWeight="400";
    //パネルの可視化
    var panels=document.querySelectorAll('.panelToken');
    for(var i=0;i<panels.length;i++){
      panels[i].classList.remove('panelToken');
      panels[i].classList.add('panel');
    }
    //パネルの実体化
    hideAllPanel();
    openClassPanel(panel_layer);
    //ターゲットの色を戻す
    document.getElementById('target').style.backgroundColor="rgb(200,200,200)";
    //全動画停止
    var videos=document.querySelectorAll('.movieBox');
    for(var i=0;i<videos.length;i++){
      videos[i].pause();
    }
    //boxの再設定
    layerBack();
  }
}

function changeLayerFace(){
  var num=parseInt(strReplace(panel_layer,'panel_',''));
  if(num!==0){
    changeLayerFunc(num-1);
  }
}

function changeLayerDeep(){
  var num=parseInt(strReplace(panel_layer,'panel_',''));
  if(num!==9){
    changeLayerFunc(num+1);
  }
}
