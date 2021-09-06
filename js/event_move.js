var panelCount=0;

//座標補完(左上を中心に)
function setBoxSelectTL(select_box){
  var selectedPanels=document.querySelectorAll('.selectedPanel');
  if(selectedPanels.length>0){
    var tl_x=selectedPanels[0].getBoundingClientRect().left;
    var tl_y=selectedPanels[0].getBoundingClientRect().top;
    for(var i=0;i<selectedPanels.length;i++){
      panelLeft=selectedPanels[i].getBoundingClientRect().left;
      panelTop=selectedPanels[i].getBoundingClientRect().top;
      panelRight=selectedPanels[i].getBoundingClientRect().left+selectedPanels[i].getBoundingClientRect().width;
      panelBottom=selectedPanels[i].getBoundingClientRect().top+selectedPanels[i].getBoundingClientRect().height;
      if(tl_x>panelLeft){
        tl_x=panelLeft;
      }
      if(tl_y>panelTop){
        tl_y=panelTop;
      }
    }
  }
  select_box.style.left=(tl_x-document.getElementById('target').getBoundingClientRect().left)+"px";
  select_box.style.top=(tl_y-document.getElementById('target').getBoundingClientRect().top)+"px";
}


function moveElementStart(event){
  //ID重複禁止
  if(document.getElementById('select_box')){
    document.getElementById('select_box').removeAttribute('id');
  }
  //マウスの値取得
  var mouse_x=getMouseX();
  var mouse_y=getMouseY();
  //選択中の要素
  this.setAttribute('id','select_box');
  var select_box=document.getElementById('select_box');
  //カーソルの変更
  document.getElementById('target').style.cursor="move";
  //仮想要素に移し替える
  var virtual_box=newBox(select_box.getBoundingClientRect().left,select_box.getBoundingClientRect().top);
  virtual_box.style.width=(select_box.getBoundingClientRect().width)+"px";
  virtual_box.style.height=(select_box.getBoundingClientRect().height)+"px";
  virtual_box.style.left=(select_box.getBoundingClientRect().left-document.getElementById('target').getBoundingClientRect().left)+"px";
  virtual_box.style.top=(select_box.getBoundingClientRect().top-document.getElementById('target').getBoundingClientRect().top)+"px";
  //仮想の要素を隠す
  virtual_box.style.display="none";
  //一度、該当エリアのパネル上の情報を削除
  setPanelSelect(select_box.getBoundingClientRect().top,select_box.getBoundingClientRect().top+select_box.getBoundingClientRect().height,select_box);
  var selectedPanels=document.querySelectorAll('.selectedPanel');
  panelCount=selectedPanels.length;
  for(var i=0;i<selectedPanels.length;i++){
    selectedPanels[i].classList.remove(panel_layer);
  }
  //要素をマウス座標に移動
  select_box.style.left=mouse_x-(select_box.getBoundingClientRect().width/2)+"px";
  select_box.style.top=mouse_y-(select_box.getBoundingClientRect().height/2)+"px";
  //イベントの追加
  document.getElementById('target').addEventListener('mousemove',moveElementMove,false);
  document.getElementById('target').addEventListener('mouseup',moveElementEnd,false);
  document.getElementById('target').addEventListener('mouseleave',moveElementEnd,false);
  debugEventLog('moveElementMove',1);
  debugEventLog('moveElementEnd(up)',1);
  debugEventLog('moveElementEnd(leave)',1);
}



function moveElementMove(event){
  //要素の座標を再設定
  var select_box=document.getElementById('select_box');
  var mouse_x=getMouseX();
  var mouse_y=getMouseY();
  select_box.style.left=mouse_x-(select_box.getBoundingClientRect().width/2)+"px";
  select_box.style.top=mouse_y-(select_box.getBoundingClientRect().height/2)+"px";
  setPanelSelect(select_box.getBoundingClientRect().top,select_box.getBoundingClientRect().top+select_box.getBoundingClientRect().height,select_box);
}



function moveElementEnd(event){
  //イベントの削除
  document.getElementById('target').removeEventListener('mousemove',moveElementMove,false);
  document.getElementById('target').removeEventListener('mouseup',moveElementEnd,false);
  document.getElementById('target').removeEventListener('mouseleave',moveElementEnd,false);
  debugEventLog('moveElementMove',0);
  debugEventLog('moveElementEnd(up)',0);
  debugEventLog('moveElementEnd(leave)',0);
  //要素の座標を再設定
  var select_box=document.getElementById('select_box');
  var virtual_box=document.getElementById('virtual_box');
  var mouse_x=getMouseX();
  var mouse_y=getMouseY();
  select_box.style.left=mouse_x-(select_box.getBoundingClientRect().width/2)+"px";
  select_box.style.top=mouse_y-(select_box.getBoundingClientRect().height/2)+"px";
  setPanelSelect(select_box.getBoundingClientRect().top,select_box.getBoundingClientRect().top+select_box.getBoundingClientRect().height,select_box);
  setBoxSelectTL(select_box);
  setPanelSelect(select_box.getBoundingClientRect().top,select_box.getBoundingClientRect().top+select_box.getBoundingClientRect().height,select_box);
  var selectedPanels=document.querySelectorAll('.selectedPanel');
  var flag=0;
  if(panelCount!==selectedPanels.length){
    flag=1;
  }
  for(var i=0;i<selectedPanels.length;i++){
    if(selectedPanels[i].classList.contains(panel_layer)){
      flag=1;
      break;
    }
  }
  if(flag){
    //重なりがあった
    virtual_box.style.display="block";
    select_box.style.left=virtual_box.style.left;
    select_box.style.top=virtual_box.style.top;
    virtual_box.remove();
    setPanelSelect(select_box.getBoundingClientRect().top,select_box.getBoundingClientRect().top+select_box.getBoundingClientRect().height,select_box);
  }else{
    //重なりがなかった
    virtual_box.remove();
    var select_box=document.getElementById('select_box');
    select_box.style.left=parseInt(select_box.style.left)-1+"px";
    select_box.style.top=parseInt(select_box.style.top)-1+"px";
    setPanelSelect(select_box.getBoundingClientRect().top,select_box.getBoundingClientRect().top+select_box.getBoundingClientRect().height,select_box);
  }
  selectedPanels=document.querySelectorAll('.selectedPanel');
  for(i=0;i<selectedPanels.length;i++){
    selectedPanels[i].classList.add(panel_layer);
    selectedPanels[i].classList.remove('selectedPanel');
  }
  document.getElementById('target').style.cursor="default";
  select_box.removeAttribute('id');
}
