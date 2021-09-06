//現在選択中の作成要素種類
//none:未選択,デフォルト | text:テキストボックス | img:画像 | movie:動画 | pdf:PDF
var createMenu="none";

//原点座標
var setting_pos_x=setting_pos_y=0;

//現在のレイヤーを示す(box用とpanel用)
//panel用 | panel_? ?は階層番号(0~9で0が一番上)
var panel_layer="panel_5";
//box用 | box_? ?は階層番号(0~9で0が一番上)
var box_layer="box_5";
//PC:boxPC, スマホ:boxMobile
var device_name="boxPC";
//PC:panelPC, スマホ:panelMobile
var device_name_panel="panelPC";


//仮想要素作成関数
function newBox(set_x,set_y){
  //IDの重複防止
  if(document.getElementById('virtual_box')){
    document.getElementById('virtual_box').removeAttribute('id');
  }
  //要素の作成・設定
  var virtual_box=document.createElement('div');
  virtual_box.classList.add('box');
  virtual_box.classList.add(box_layer);
  document.getElementById('editable').appendChild(virtual_box);
  virtual_box.style.left=set_x+"px";
  virtual_box.style.top=set_y+"px";
  virtual_box.setAttribute('id','virtual_box');
  //作成要素を返す
  return virtual_box;
}




function getMouseX(){
  return event.pageX-document.getElementById('target').getBoundingClientRect().left-window.pageXOffset;
}

function getMouseY(){
  return event.pageY-document.getElementById('target').getBoundingClientRect().top-window.pageYOffset;
}



function setPanelSelect(line_top,line_bottom,select_box){
  var line_top=parseInt((line_top-document.getElementById('target').getBoundingClientRect().top)/20);
  var line_bottom=parseInt((line_bottom+1-document.getElementById('target').getBoundingClientRect().top)/20);
  var label,panels,panelMiddleX,panelMiddleY;
  var boxLeft=select_box.getBoundingClientRect().left;
  var boxTop=select_box.getBoundingClientRect().top;
  var boxRight=select_box.getBoundingClientRect().left+select_box.getBoundingClientRect().width;
  var boxBottom=select_box.getBoundingClientRect().top+select_box.getBoundingClientRect().height;
  var selectedPanels=document.querySelectorAll('.selectedPanel');
  for(var i=0;i<selectedPanels.length;i++){
    selectedPanels[i].classList.remove('selectedPanel');
  }
  for(i=line_top;i<=line_bottom+1;i++){
    label=".label_"+i;
    var panels=document.querySelectorAll(label+'.'+device_name_panel);
    for(var j=0;j<panels.length;j++){
      panelMiddleX=panels[j].getBoundingClientRect().left+(panels[j].getBoundingClientRect().width/2);
      panelMiddleY=panels[j].getBoundingClientRect().top+(panels[j].getBoundingClientRect().height/2);
      if((boxLeft<panelMiddleX && boxRight>panelMiddleX) && (boxTop<panelMiddleY && boxBottom>panelMiddleY)){
        panels[j].classList.add('selectedPanel');
      }
    }
  }
}



//座標補完
function setBoxSelect(select_box){
  var selectedPanels=document.querySelectorAll('.selectedPanel');
  if(selectedPanels.length>0){
    var tl_x=selectedPanels[0].getBoundingClientRect().left-document.getElementById('target').getBoundingClientRect().left;
    var tl_y=selectedPanels[0].getBoundingClientRect().top-document.getElementById('target').getBoundingClientRect().top;
    var br_x=selectedPanels[0].getBoundingClientRect().left+selectedPanels[0].getBoundingClientRect().width-document.getElementById('target').getBoundingClientRect().left;
    var br_y=selectedPanels[0].getBoundingClientRect().top+selectedPanels[0].getBoundingClientRect().height-document.getElementById('target').getBoundingClientRect().top;
    var flag=0;
    for(var i=0;i<selectedPanels.length;i++){
      panelLeft=selectedPanels[i].getBoundingClientRect().left-document.getElementById("target").getBoundingClientRect().left;
      panelTop=selectedPanels[i].getBoundingClientRect().top-document.getElementById("target").getBoundingClientRect().top;
      panelRight=selectedPanels[i].getBoundingClientRect().left+selectedPanels[i].getBoundingClientRect().width-document.getElementById("target").getBoundingClientRect().left;
      panelBottom=selectedPanels[i].getBoundingClientRect().top+selectedPanels[i].getBoundingClientRect().height-document.getElementById("target").getBoundingClientRect().top;
      if(tl_x>panelLeft){
        tl_x=panelLeft;
      }
      if(tl_y>panelTop){
        tl_y=panelTop;
      }
      if(br_x<panelRight){
        br_x=panelRight;
      }
      if(br_y<panelBottom){
        br_y=panelBottom;
      }
      if(selectedPanels[i].classList.contains(panel_layer)){
        flag=1;
      }
    }
  }
  select_box.style.left=(tl_x-1)+"px";
  select_box.style.top=(tl_y-1)+"px";
  select_box.style.width=(br_x-tl_x+2)+"px";
  select_box.style.height=(br_y-tl_y+2)+"px";
  return flag;
}



function createElementStart(event){
  //イベントの削除
  document.getElementById('target').removeEventListener('mousedown',createElementStart,false);
  debugEventLog('createElementStart',0);
  //座標の取得
  setting_pos_x=getMouseX();
  setting_pos_y=getMouseY();
  //要素の生成
  var virtual_box=newBox(setting_pos_x,setting_pos_y);
  virtual_box.classList.add(device_name);
  //イベントの追加
  document.getElementById('target').addEventListener('mousemove',createElementMove,false);
  document.getElementById('target').addEventListener('mouseup',createElementEnd,false);
  document.getElementById('target').addEventListener('mouseleave',createElementEnd,false);
  debugEventLog('createElementMove',1);
  debugEventLog('createElementEnd(up)',1);
  debugEventLog('createElementEnd(leave)',1);
}



function createElementMove(event){
  //マウス座標の取得
  var mouse_x=getMouseX();
  var mouse_y=getMouseY();
  //要素情報の取得
  var virtual_box=document.getElementById('virtual_box');
  //重なっているところはselectedに
  if(mouse_y>=setting_pos_y){
    setPanelSelect(setting_pos_y-window.pageYOffset,mouse_y-window.pageYOffset,virtual_box);
  }else{
    setPanelSelect(mouse_y-window.pageYOffset,setting_pos_y-window.pageYOffset,virtual_box);
  }
  //描画
  drawRect(setting_pos_x,setting_pos_y,mouse_x,mouse_y);
}



function createElementEnd(event){
  //イベントの削除
  document.getElementById('target').removeEventListener('mousemove',createElementMove,false);
  document.getElementById('target').removeEventListener('mouseup',createElementEnd,false);
  document.getElementById('target').removeEventListener('mouseleave',createElementEnd,false);
  debugEventLog("createElementMove",0);
  debugEventLog("createElementEnd(up)",0);
  debugEventLog("createElementEnd(leave)",0);
  //マウス座標の取得
  var mouse_x=getMouseX();
  var mouse_y=getMouseY();
  //要素情報の取得
  var virtual_box=document.getElementById('virtual_box');
  //重なっているところはselectedに
  if(mouse_y>=setting_pos_y){
    setPanelSelect(setting_pos_y-window.pageYOffset,mouse_y-window.pageYOffset,virtual_box);
  }else{
    setPanelSelect(mouse_y-window.pageYOffset,setting_pos_y-window.pageYOffset,virtual_box);
  }
  //描画
  drawRect(setting_pos_x,setting_pos_y,mouse_x,mouse_y);
  //座標補完
  if(setBoxSelect(virtual_box)){
    //重なりがあった
    var selectedPanels=document.querySelectorAll('.selectedPanel');
    virtual_box.remove();
    for(var i=0;i<selectedPanels.length;i++){
      selectedPanels[i].classList.remove('selectedPanel');
    }
  }else{
    //重なりがなかった
    var selectedPanels=document.querySelectorAll('.selectedPanel');
    if(selectedPanels.length!=0){
      for(var i=0;i<selectedPanels.length;i++){
        selectedPanels[i].classList.remove('selectedPanel');
        selectedPanels[i].classList.add(panel_layer);
      }
      virtual_box.removeAttribute('id');
      virtual_box.setAttribute('id','select_box');
      var cover_box=document.createElement('div');
      cover_box.classList.add('cover_box');
      virtual_box.appendChild(cover_box);
      var box_id=document.createElement('div');
      box_id.classList.add('box_id');
      virtual_box.appendChild(box_id);
      box_id.innerHTML=createID();
      //内容別処理
      if(createMenu==="text"){
        setText();
      }else if(createMenu==="img"){
        setImg();
      }else if(createMenu==="movie"){
        setMovie();
      }else if(createMenu==="pdf"){
        setPDF();
      }else{
        createMenu="none";
      }
    }else{
      virtual_box.remove();
    }
  }
}



//リアルタイム描画
function drawRect(tl_x,tl_y,br_x,br_y){
  var new_box=document.getElementById("virtual_box");
  //エラーを対策+リアルタイム描画
  if(tl_x<=br_x && tl_y<=br_y){
    new_box.style.left=parseInt(tl_x)-1+"px";
    new_box.style.top=parseInt(tl_y)-1+"px";
    new_box.style.width=parseInt(br_x)+2-parseInt(tl_x)+"px";
    new_box.style.height=parseInt(br_y)+2-parseInt(tl_y)+"px";
  }else if(tl_x>br_x && tl_y<=br_y){
    new_box.style.left=parseInt(br_x)-1+"px";
    new_box.style.top=parseInt(tl_y)-1+"px";
    new_box.style.width=parseInt(tl_x)+2-parseInt(br_x)+"px";
    new_box.style.height=parseInt(br_y)+2-parseInt(tl_y)+"px";
  }else if(tl_x<=br_x && tl_y>br_y){
    new_box.style.left=parseInt(tl_x)-1+"px";
    new_box.style.top=parseInt(br_y)-1+"px";
    new_box.style.width=parseInt(br_x)+2-parseInt(tl_x)+"px";
    new_box.style.height=parseInt(tl_y)+2-parseInt(br_y)+"px";
  }else if(tl_x>br_x && tl_y>br_y){
    new_box.style.left=parseInt(br_x)-1+"px";
    new_box.style.top=parseInt(br_y)-1+"px";
    new_box.style.width=parseInt(tl_x)+2-parseInt(br_x)+"px";
    new_box.style.height=parseInt(tl_y)+2-parseInt(br_y)+"px";
  }
}



//テキスト
function createText(){
  //disabledCreate();
  //ドラッグ範囲指定の有効化
  var createMenuList=document.querySelectorAll('#menuCreateListPanel .menuList');
  for(var i=0;i<createMenuList.length;i++){
    createMenuList[i].style.color="white";
    createMenuList[i].style.fontWeight="400";
  }
  document.getElementById('menuCreateText').style.color="skyblue";
  document.getElementById('menuCreateText').style.fontWeight="600";
  document.getElementById('target').addEventListener('mousedown',createElementStart,false);
  debugEventLog('createElementStart',1);
  topMsg("パネルをドラッグしてください.",'b');
  createMenu="text";
}

function setText(){
  //要素の編集
  if(document.getElementById('select_box')){
    setTextContent();
  }
  topMsg("テキスト情報を入力してください.",'b');
}

//画像
function createImg(){
  //disabledCreate();
  //ドラッグ範囲指定の有効化
  var createMenuList=document.querySelectorAll('#menuCreateListPanel .menuList');
  for(var i=0;i<createMenuList.length;i++){
    createMenuList[i].style.color="white";
    createMenuList[i].style.fontWeight="400";
  }
  document.getElementById('menuCreateImg').style.color="skyblue";
  document.getElementById('menuCreateImg').style.fontWeight="600";
  document.getElementById('target').addEventListener('mousedown',createElementStart,false);
  debugEventLog('createElementStart',1);
  topMsg("パネルをドラッグしてください.",'b');
  createMenu="img";
}

function setImg(){
  //要素の編集
  if(document.getElementById('select_box')){
    setImgContent();
  }
  topMsg("イメージ情報を入力してください.",'b');
}

//動画
function createMovie(){
  //disabledCreate();
  //ドラッグ範囲指定の有効化
  var createMenuList=document.querySelectorAll('#menuCreateListPanel .menuList');
  for(var i=0;i<createMenuList.length;i++){
    createMenuList[i].style.color="white";
    createMenuList[i].style.fontWeight="400";
  }
  document.getElementById('menuCreateMovie').style.color="skyblue";
  document.getElementById('menuCreateMovie').style.fontWeight="600";
  document.getElementById('target').addEventListener('mousedown',createElementStart,false);
  debugEventLog('createElementStart',1);
  topMsg("パネルをドラッグしてください.",'b');
  createMenu="movie";
}

function setMovie(){
  //要素の編集
  if(document.getElementById('select_box')){
    setMovieContent();
  }
  topMsg("動画データを入力してください.",'b');
}

//PDF
function createPDF(){
  //disabledCreate();
  //ドラッグ範囲指定の有効化
  var createMenuList=document.querySelectorAll('#menuCreateListPanel .menuList');
  for(var i=0;i<createMenuList.length;i++){
    createMenuList[i].style.color="white";
    createMenuList[i].style.fontWeight="400";
  }
  document.getElementById('menuCreatePDF').style.color="skyblue";
  document.getElementById('menuCreatePDF').style.fontWeight="600";
  document.getElementById('target').addEventListener('mousedown',createElementStart,false);
  debugEventLog('createElementStart',1);
  topMsg("パネルをドラッグしてください.",'b');
  createMenu="pdf";
}

function setPDF(){
  //要素の編集
  if(document.getElementById('select_box')){
    setPDFContent();
  }
  topMsg("PDFデータを入力してください.",'b');
}
