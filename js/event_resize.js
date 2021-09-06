//resize方向
var vec_resize="none";

function resizeLeft(mouse_x){
  var select_box=document.getElementById('select_box');
  var boxLeft=parseInt(select_box.style.left);
  var boxWidth=parseInt(select_box.style.width);
  if(boxWidth>17){
    select_box.style.width=boxWidth-(mouse_x-boxLeft)+"px";
    select_box.style.left=mouse_x+"px";
  }else{
    select_box.style.width="18px";
  }
}

function resizeTop(mouse_y){
  var select_box=document.getElementById('select_box');
  var boxTop=parseInt(select_box.style.top);
  var boxHeight=parseInt(select_box.style.height);
  if(boxHeight>17){
    select_box.style.height=boxHeight-(mouse_y-boxTop)+"px";
    select_box.style.top=mouse_y+"px";
  }else{
    select_box.style.height="18px";
  }
}

function resizeRight(mouse_x){
  var select_box=document.getElementById('select_box');
  var boxRight=select_box.getBoundingClientRect().left+select_box.getBoundingClientRect().width-document.getElementById('target').getBoundingClientRect().left/*+window.pageXOffset*/;
  var boxWidth=select_box.getBoundingClientRect().width;
  if(boxWidth>17){
    select_box.style.width=boxWidth+(mouse_x-boxRight)+"px";
  }else{
    select_box.style.width="18px";
  }
}

function resizeBottom(mouse_y){
  var select_box=document.getElementById('select_box');
  var boxBottom=select_box.getBoundingClientRect().top+select_box.getBoundingClientRect().height-document.getElementById('target').getBoundingClientRect().top/*+window.pageYOffset*/;
  var boxHeight=select_box.getBoundingClientRect().height;
  if(boxHeight>17){
    select_box.style.height=boxHeight+(mouse_y-boxBottom)+"px";
  }else{
    select_box.style.height="18px";
  }
}



function resizeElementSelect(event){
  //select_boxの重複防止
  var select_box=document.getElementById('select_box');
  if(select_box && select_box===this){
    //選択を解除したい場合
    select_box.style.border="0px";
    select_box.style.width=parseInt(select_box.style.width)+4+"px";
    select_box.style.height=parseInt(select_box.style.height)+4+"px";
    document.getElementById('target').removeEventListener('mousemove',resizeElementHover,false);
    document.getElementById('target').removeEventListener('mousedown',resizeElementStart,false);
    debugEventLog('resizeElementHover',0);
    debugEventLog('resizeElementStart',0);
    setTextFontSpace();
    setTextBorder();
    setTextOutlineRadius();
    changeTextFontSpace();
    changeTextBorder();
    changeTextOutlineRadius();
    select_box.removeAttribute('id');
    topMsg("サイズを変更したい要素を選択してください.");
    document.getElementById('target').style.cursor="default";
  }else if(select_box && select_box!==this){
    //別要素を選択したとき
    select_box.style.border="0px";
    select_box.style.width=parseInt(select_box.style.width)+4+"px";
    select_box.style.height=parseInt(select_box.style.height)+4+"px";
    this.style.border="2px dashed red";
    this.style.width=parseInt(this.style.width)-4+"px";
    this.style.height=parseInt(this.style.height)-4+"px";
    setTextFontSpace();
    setTextBorder();
    setTextOutlineRadius();
    changeTextFontSpace();
    changeTextBorder();
    changeTextOutlineRadius();
    select_box.removeAttribute('id');
    this.setAttribute('id','select_box');
    topMsg("破線にカーソルを合わせてドラッグしてください.");
  }else{
    //未選択状態
    this.style.border="2px dashed red";
    this.style.width=parseInt(this.style.width)-4+"px";
    this.style.height=parseInt(this.style.height)-4+"px";
    this.setAttribute('id','select_box');
    document.getElementById('target').addEventListener('mousemove',resizeElementHover,false);
    document.getElementById('target').addEventListener('mousedown',resizeElementStart,false);
    debugEventLog('resizeElementHover',1);
    debugEventLog('resizeElementStart',1);
    topMsg("破線にカーソルを合わせてドラッグしてください.");
  }
}



function resizeElementHover(event){
  var touchRange=10;
  //現在の座標の取得
  var mouse_x=getMouseX();
  var mouse_y=getMouseY();
  var target=document.getElementById('target');
  var select_box=document.getElementById('select_box');
  var boxLeft=select_box.getBoundingClientRect().left+2-document.getElementById('target').getBoundingClientRect().left;
  var boxTop=select_box.getBoundingClientRect().top+2-document.getElementById('target').getBoundingClientRect().top;
  var boxRight=select_box.getBoundingClientRect().left+select_box.getBoundingClientRect().width+2-document.getElementById('target').getBoundingClientRect().left;
  var boxBottom=select_box.getBoundingClientRect().top+select_box.getBoundingClientRect().height+2-document.getElementById('target').getBoundingClientRect().top;
  if( ( (boxLeft-touchRange<mouse_x && boxLeft+touchRange>mouse_x) && (boxTop-touchRange<mouse_y && boxTop+touchRange>mouse_y) ) || ( (boxRight-touchRange<mouse_x && boxRight+touchRange>mouse_x) && (boxBottom-touchRange<mouse_y && boxBottom+touchRange>mouse_y) ) ){
    target.style.cursor="nwse-resize";
  }else if( ( (boxLeft-touchRange<mouse_x && boxLeft+touchRange>mouse_x) && (boxBottom-touchRange<mouse_y && boxBottom+touchRange>mouse_y) ) || ( (boxRight-touchRange<mouse_x && boxRight+touchRange>mouse_x) && (boxTop-touchRange<mouse_y && boxTop+touchRange>mouse_y) ) ){
    target.style.cursor="nesw-resize";
  }else if( (boxLeft-touchRange<mouse_x && boxLeft+touchRange>mouse_x) || (boxRight-touchRange<mouse_x && boxRight+touchRange>mouse_x) ){
    if(boxTop<mouse_y && boxBottom>mouse_y){
      target.style.cursor="ew-resize";
    }else{
      target.style.cursor="default";
    }
  }else if( (boxTop-touchRange<mouse_y && boxTop+touchRange>mouse_y) || (boxBottom-touchRange<mouse_y && boxBottom+touchRange>mouse_y) ){
    if(boxLeft<mouse_x && boxRight>mouse_x){
      target.style.cursor="ns-resize";
    }else{
      target.style.cursor="default";
    }
  }else{
    target.style.cursor="default";
  }
}



function resizeElementStart(event){
  var touchRange=10;
  //現在の座標の取得
  var mouse_x=getMouseX();
  var mouse_y=getMouseY();
  var select_box=document.getElementById('select_box');
  var boxLeft=select_box.getBoundingClientRect().left-document.getElementById('target').getBoundingClientRect().left/*-window.pageXOffset*/;
  var boxTop=select_box.getBoundingClientRect().top-document.getElementById('target').getBoundingClientRect().top/*-window.pageYOffset*/;
  var boxRight=select_box.getBoundingClientRect().left+select_box.getBoundingClientRect().width+2-document.getElementById('target').getBoundingClientRect().left/*-window.pageXOffset*/;
  var boxBottom=select_box.getBoundingClientRect().top+select_box.getBoundingClientRect().height+2-document.getElementById('target').getBoundingClientRect().top/*-window.pageYOffset*/;
  //選択ヶ所の方向を保存
  if( (mouse_x>boxLeft-touchRange && mouse_x<boxLeft+touchRange) && (mouse_y>boxTop-touchRange && mouse_y<boxTop+touchRange) ){
    //左上
    vec_resize="topLeft";
  }else if( (mouse_x>boxRight-touchRange && mouse_x<boxRight+touchRange) && (mouse_y>boxTop-touchRange && mouse_y<boxTop+touchRange) ){
    //右上
    vec_resize="topRight";
  }else if( (mouse_x>boxLeft-touchRange && mouse_x<boxLeft+touchRange) && (mouse_y>boxBottom-touchRange && mouse_y<boxBottom+touchRange) ){
    //左下
    vec_resize="bottomLeft";
  }else if( (mouse_x>boxRight-touchRange && mouse_x<boxRight+touchRange) && (mouse_y>boxBottom-touchRange && mouse_y<boxBottom+touchRange) ){
    //右下
    vec_resize="bottomRight";
  }else if( (mouse_x>boxLeft-touchRange && mouse_x<boxLeft+touchRange) && (mouse_y>boxTop && mouse_y<boxBottom) ){
    //左端
    vec_resize="left";
  }else if( (mouse_x>boxLeft && mouse_x<boxRight) && (mouse_y>boxTop-touchRange && mouse_y<boxTop+touchRange) ){
    //上端
    vec_resize="top";
  }else if( (mouse_x>boxRight-touchRange && mouse_x<boxRight+touchRange) && (mouse_y>boxTop && mouse_y<boxBottom) ){
    //右端
    vec_resize="right";
  }else if( (mouse_x>boxLeft && mouse_x<boxRight) && (mouse_y>boxBottom-touchRange && mouse_y<boxBottom+touchRange) ){
    //下端
    vec_resize="bottom";
  }else{
    vec_resize="none";
  }
  //方向が指定されているなら
  if(vec_resize!=="none"){
    //仮想的なboxを作成
    select_box.style.border="2px dashed red";
    var virtual_box=newBox(parseInt(select_box.style.left),parseInt(select_box.style.top));
    virtual_box.style.width=select_box.style.width;
    virtual_box.style.height=select_box.style.height;
    var boxLeft=select_box.getBoundingClientRect().left-document.getElementById('target').getBoundingClientRect().left;
    var boxTop=select_box.getBoundingClientRect().top-document.getElementById('target').getBoundingClientRect().top;
    var boxRight=select_box.getBoundingClientRect().left+select_box.getBoundingClientRect().width+2-document.getElementById('target').getBoundingClientRect().left;
    var boxBottom=select_box.getBoundingClientRect().top+select_box.getBoundingClientRect().height+2-document.getElementById('target').getBoundingClientRect().top;
    //仮想の要素を隠す
    virtual_box.style.display="none";
    //一度、該当エリアのパネル上の情報を削除
    setPanelSelect(select_box.getBoundingClientRect().top,select_box.getBoundingClientRect().top+select_box.getBoundingClientRect().height,select_box);
    var selectedPanels=document.querySelectorAll('.selectedPanel');
    for(var i=0;i<selectedPanels.length;i++){
      selectedPanels[i].classList.remove(panel_layer);
    }
    //イベントの追加
    document.getElementById('target').addEventListener('mousemove',resizeElementMove,false);
    document.getElementById('target').addEventListener('mouseup',resizeElementEnd,false);
    document.getElementById('target').addEventListener('mouseleave',resizeElementEnd,false);
    debugEventLog('resizeElementMove',1);
    debugEventLog('resizeElementEnd(up)',1);
    debugEventLog('resizeElementEnd(leave)',1);
  }
}



function resizeElementMove(event){
  var select_box=document.getElementById('select_box');
  //var touchRange=5;
  //現在の座標の取得
  var mouse_x=getMouseX();
  var mouse_y=getMouseY();
  var boxLeft=select_box.getBoundingClientRect().left-document.getElementById('target').getBoundingClientRect().left;
  var boxTop=select_box.getBoundingClientRect().top-document.getElementById('target').getBoundingClientRect().top;
  var boxRight=select_box.getBoundingClientRect().left+select_box.getBoundingClientRect().width+2-document.getElementById('target').getBoundingClientRect().left;
  var boxBottom=select_box.getBoundingClientRect().top+select_box.getBoundingClientRect().height+2-document.getElementById('target').getBoundingClientRect().top;
  //拡大・縮小処理
  if(vec_resize==="topLeft" && (mouse_x<boxRight-10 && mouse_y<boxBottom-10) ){
    //左上+限界値
    resizeLeft(mouse_x);
    resizeTop(mouse_y);
  }else if(vec_resize==="topRight" && (mouse_x>boxLeft+10 && mouse_y<boxBottom-10) ){
    //右上+限界値
    resizeRight(mouse_x);
    resizeTop(mouse_y);
  }else if(vec_resize==="bottomLeft" && (mouse_x<boxRight-10 && mouse_y>boxTop+10) ){
    //左下+限界値
    resizeLeft(mouse_x);
    resizeBottom(mouse_y);
  }else if(vec_resize==="bottomRight" && (mouse_x>boxLeft+10 && mouse_y>boxTop+10) ){
    //右下+限界値
    resizeRight(mouse_x);
    resizeBottom(mouse_y);
  }else if(vec_resize==="left" && (mouse_x<boxRight-10)){
    resizeLeft(mouse_x);
  }else if(vec_resize==="top" && (mouse_y<boxBottom-10)){
    resizeTop(mouse_y);
  }else if(vec_resize==="right" && (mouse_x>boxLeft+10)){
    resizeRight(mouse_x);
  }else if(vec_resize==="bottom" && (mouse_y>boxTop+10)){
    resizeBottom(mouse_y);
  }

  setPanelSelect(select_box.getBoundingClientRect().top,select_box.getBoundingClientRect().top+select_box.getBoundingClientRect().height,select_box);
}




function resizeElementEnd(event){
  //イベントの削除
  document.getElementById('target').removeEventListener('mousemove',resizeElementMove,false);
  document.getElementById('target').removeEventListener('mouseup',resizeElementEnd,false);
  document.getElementById('target').removeEventListener('mouseleave',resizeElementEnd,false);
  debugEventLog('resizeElementMove',0);
  debugEventLog('resizeElementEnd(up)',0);
  debugEventLog('resizeElementEnd(leave)',0);
  var virtual_box=document.getElementById('virtual_box');
  var select_box=document.getElementById('select_box');
  //var touchRange=5;
  //現在の座標の取得
  var mouse_x=getMouseX();
  var mouse_y=getMouseY();
  var boxLeft=select_box.getBoundingClientRect().left-document.getElementById('target').getBoundingClientRect().left;
  var boxTop=select_box.getBoundingClientRect().top-document.getElementById('target').getBoundingClientRect().top;
  var boxRight=select_box.getBoundingClientRect().left+select_box.getBoundingClientRect().width+2-document.getElementById('target').getBoundingClientRect().left;
  var boxBottom=select_box.getBoundingClientRect().top+select_box.getBoundingClientRect().height+2-document.getElementById('target').getBoundingClientRect().top;
  //拡大・縮小処理
  if(vec_resize==="topLeft" && (mouse_x<boxRight-10 && mouse_y<boxBottom-10) ){
    //左上+限界値
    resizeLeft(mouse_x);
    resizeTop(mouse_y);
  }else if(vec_resize==="topRight" && (mouse_x>boxLeft+10 && mouse_y<boxBottom-10) ){
    //右上+限界値
    resizeRight(mouse_x);
    resizeTop(mouse_y);
  }else if(vec_resize==="bottomLeft" && (mouse_x<boxRight-10 && mouse_y>boxTop+10) ){
    //左下+限界値
    resizeLeft(mouse_x);
    resizeBottom(mouse_y);
  }else if(vec_resize==="bottomRight" && (mouse_x>boxLeft+10 && mouse_y>boxTop+10) ){
    //右下+限界値
    resizeRight(mouse_x);
    resizeBottom(mouse_y);
  }else if(vec_resize==="left" && (mouse_x<boxRight-10)){
    resizeLeft(mouse_x);
  }else if(vec_resize==="top" && (mouse_y<boxBottom-10)){
    resizeTop(mouse_y);
  }else if(vec_resize==="right" && (mouse_x>boxLeft+10)){
    resizeRight(mouse_x);
  }else if(vec_resize==="bottom" && (mouse_y>boxTop+10)){
    resizeBottom(mouse_y);
  }
  setPanelSelect(select_box.getBoundingClientRect().top,select_box.getBoundingClientRect().top+select_box.getBoundingClientRect().height,select_box);

  //座標補完
  if(setBoxSelect(select_box)){
    //重なりがあった
    virtual_box.style.display="block";
    select_box.style.left=virtual_box.style.left;
    select_box.style.top=virtual_box.style.top;
    select_box.style.width=virtual_box.style.width;
    select_box.style.height=virtual_box.style.height;
    virtual_box.remove();
    select_box=document.getElementById('select_box');
    setPanelSelect(select_box.getBoundingClientRect().top,select_box.getBoundingClientRect().top+select_box.getBoundingClientRect().height,select_box);
  }else{
    //重なりがなかった
    virtual_box.remove();
    select_box=document.getElementById('select_box');
    setPanelSelect(select_box.getBoundingClientRect().top,select_box.getBoundingClientRect().top+select_box.getBoundingClientRect().height,select_box);
    select_box.style.width=(parseInt(select_box.style.width)-4)+"px";
    select_box.style.height=(parseInt(select_box.style.height)-4)+"px";
  }
  var selectedPanels=document.querySelectorAll('.selectedPanel');
  for(var i=0;i<selectedPanels.length;i++){
    selectedPanels[i].classList.remove('selectedPanel');
    selectedPanels[i].classList.add(panel_layer);
  }
  if(select_box){
    setTextFontSpace();
    setTextBorder();
    setTextOutlineRadius();
    changeTextFontSpace();
    changeTextBorder();
    changeTextOutlineRadius();
  }
}
