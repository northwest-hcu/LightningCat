//現在のイベント
var menuEvent="none";
//各イベントの設定
//作成イベント
document.getElementById('menuCreate').addEventListener('click',enabledCreate,false);
//編集イベント
document.getElementById('menuEdit').addEventListener('click',enabledEdit,false);
//移動イベント
document.getElementById('menuMove').addEventListener('click',enabledMove,false);
//サイズ変更イベント
document.getElementById('menuResize').addEventListener('click',enabledResize,false);
//削除イベント
document.getElementById('menuDelete').addEventListener('click',enabledDelete,false);
//レイヤーイベント
document.getElementById('menuLayer').addEventListener('click',enabledLayer,false);
//印刷イベント
document.getElementById('menuPrint').addEventListener('click',printPage,false);
//OGPイベント
document.getElementById('menuOGP').addEventListener('click',enabledOGP,false);
//その他
document.getElementById('menuOther').addEventListener('click',enabledOther,false);
//イベント設定イベント
document.getElementById('menuEvent').addEventListener('click',enabledEvent,false);
//挿入イベント
document.getElementById('menuInsert').addEventListener('click',function(){
  var menuLists=document.querySelectorAll('#menuFileListPanel .menuList');
  for(var i=0;i<menuLists.length;i++){
    menuLists[i].style.color="white";
    menuLists[i].style.fontWeight="400";
  }
  document.getElementById('menuInsert').style.color="skyblue";
  document.getElementById('menuInsert').style.fontWeight="600";
  document.getElementById('popupWindowInsert').style.display="block";
  document.getElementById('popupWindowPrint').style.display="none";
},false);
//ファイルパネルの表示
document.getElementById('menuFile').addEventListener('click',enabledFile,false);
//テキストボックス作成のショートカット
document.getElementById('menuCreate').addEventListener('dblclick',shortcutCreateText,false);
//PC <= => スマホ
document.getElementById('menuMode').addEventListener('click',changeDevice,false);
//マーカーイベント
document.getElementById('menuMarker').addEventListener('click',enabledMarker,false);
//デバッグ表示
debugEventLog('enabledCreate',1);
debugEventLog('enabledEdit',1);
debugEventLog('enabledMove',1);
debugEventLog('enabledResize',1);
debugEventLog('enabledDelete',1);
debugEventLog('enabledLayer',1);
debugEventLog('enabledFile',1);
debugEventLog('printPage',1);
debugEventLog('menuInsert',1);
debugEventLog('shortcutCreateText',1);
debugEventLog('changeDevice',1);
debugEventLog('enabledOther',1);
debugEventLog('enabledMarker',1);
debugEventLog('enabledEvent',1);


//許可ウインドウの設定
function popupWindowPermissionOpen(msg){
  document.getElementById('popupWindowPermission').style.display="block";
  document.getElementById('popupMsg').innerHTML=msg;
}


//イベントの削除
function eventRemove(){
  //console.log(menuEvent);
  if(menuEvent==="create"){
    disabledCreate();
  }else if(menuEvent==="move"){
    disabledMove();
  }else if(menuEvent==="resize"){
    disabledResize();
  }else if(menuEvent==="delete"){
    disabledDelete();
  }else if(menuEvent==="edit"){
    disabledEdit();
  }else if(menuEvent==="layer"){
    disabledLayer();
  }else if(menuEvent==="file"){
    disabledFile();
  }else if(menuEvent==="ogp"){
    disabledOGP();
  }else if(menuEvent==="other"){
    disabledOther();
  }else if(menuEvent==="marker"){
    disabledMarker();
  }else if(menuEvent==="event"){
    disabledEvent();
  }
  if(menuEvent==="create"){
    if(createMenu==="text"){
      openTextBox();
    }else if(createMenu==="img"){
      openImgBox();
    }else if(createMenu==="movie"){
      openMovieBox();
    }else if(createMenu==="pdf"){
      openPDFBox();
    }else{
      createMenu="none";
    }
  }
  topMsg("");
  document.getElementById('target').style.cursor="default";
}


//テキストボックスのショートカット
function shortcutCreateText(){
  enabledCreate();
  createText();
}


//createイベント付与
function enabledCreate(){
  eventRemove();
  menuEvent="create";
  var menuLists=document.querySelectorAll('#menuListPanel .menuList');
  for(var i=0;i<menuLists.length;i++){
    menuLists[i].style.color="white";
    menuLists[i].style.fontWeight="400";
  }
  var createMenuList=document.querySelectorAll('#menuCreateListPanel .menuList');
  for(i=0;i<createMenuList.length;i++){
    createMenuList[i].style.color="white";
    createMenuList[i].style.fontWeight="400";
  }
  document.getElementById('menuCreate').style.color="skyblue";
  document.getElementById('menuCreate').style.fontWeight="600";
  document.getElementById('menuCreateText').addEventListener('click',createText,false);
  document.getElementById('menuCreateImg').addEventListener('click',createImg,false);
  document.getElementById('menuCreateMovie').addEventListener('click',createMovie,false);
  document.getElementById('menuCreatePDF').addEventListener('click',createPDF,false);
  debugEventLog('createText',1);
  debugEventLog('createImg',1);
  debugEventLog('createMovie',1);
  debugEventLog('createPDF',1);
  //menuCreateListPanelの表示
  document.getElementById('menuCreateListPanel').style.display="block";
  topMsg("作成する要素の種類を選択してください.",'b');
}

//createイベントの削除
function disabledCreate(){
  menuEvent="none";
  var menuLists=document.querySelectorAll('#menuListPanel .menuList');
  for(var i=0;i<menuLists.length;i++){
    menuLists[i].style.color="white";
    menuLists[i].style.fontWeight="400";
  }
  document.getElementById('menuCreateText').removeEventListener('click',createText,false);
  document.getElementById('menuCreateImg').removeEventListener('click',createImg,false);
  document.getElementById('menuCreateMovie').removeEventListener('click',createMovie,false);
  document.getElementById('menuCreatePDF').removeEventListener('click',createPDF,false);
  debugEventLog('createText',0);
  debugEventLog('createImg',0);
  debugEventLog('createMovie',0);
  debugEventLog('createPDF',0);
  //menuCreateListPanelの表示
  document.getElementById('menuCreateListPanel').style.display="none";
  document.getElementById('target').removeEventListener('mousedown',createElementStart,false);
  debugEventLog('createElementStart',0);
}

//moveイベント付与
function enabledMove(){
  eventRemove();
  menuEvent="move";
  var menuLists=document.querySelectorAll('#menuListPanel .menuList');
  for(var i=0;i<menuLists.length;i++){
    menuLists[i].style.color="white";
    menuLists[i].style.fontWeight="400";
  }
  document.getElementById('menuMove').style.color="skyblue";
  document.getElementById('menuMove').style.fontWeight="600";
  //すべてのboxに被選択権を付与
  var boxes=document.getElementsByClassName(box_layer);
  for(i=0;i<boxes.length;i++){
    boxes[i].addEventListener('mousedown',moveElementStart,false);
    boxes[i].style.cursor="move";
  }
  debugEventLog('moveElementStart',1);
  topMsg("移動させたい要素をドラッグしてください.",'b');
}

//moveイベントの削除
function disabledMove(){
  menuEvent="none";
  var menuLists=document.querySelectorAll('#menuListPanel .menuList');
  for(var i=0;i<menuLists.length;i++){
    menuLists[i].style.color="white";
    menuLists[i].style.fontWeight="400";
  }
  //すべてのboxに被選択権を付与
  var boxes=document.getElementsByClassName(box_layer);
  for(i=0;i<boxes.length;i++){
    boxes[i].removeEventListener('mousedown',moveElementStart,false);
    boxes[i].style.cursor="default";
  }
  debugEventLog('moveElementStart',0);
}

//resizeイベント付与
function enabledResize(){
  eventRemove();
  menuEvent="resize";
  var menuLists=document.querySelectorAll('#menuListPanel .menuList');
  for(var i=0;i<menuLists.length;i++){
    menuLists[i].style.color="white";
    menuLists[i].style.fontWeight="400";
  }
  document.getElementById('menuResize').style.color="skyblue";
  document.getElementById('menuResize').style.fontWeight="600";
  //すべてのboxに被選択権を付与
  var boxes=document.getElementsByClassName(box_layer);
  for(i=0;i<boxes.length;i++){
    boxes[i].addEventListener('click',resizeElementSelect,false);
  }
  debugEventLog('resizeElementSelect',1);
  topMsg("サイズを変更する要素を選択してください.",'b');
}

//resizeイベントの削除
function disabledResize(){
  menuEvent="none";
  var menuLists=document.querySelectorAll('#menuListPanel .menuList');
  for(var i=0;i<menuLists.length;i++){
    menuLists[i].style.color="white";
    menuLists[i].style.fontWeight="400";
  }
  //すべてのboxに被選択権を付与
  var boxes=document.getElementsByClassName(box_layer);
  for(i=0;i<boxes.length;i++){
    boxes[i].removeEventListener('click',resizeElementSelect,false);
  }
  debugEventLog('resizeElementSelect',0);
  //select_boxがあれば通常化
  var select_box=document.getElementById('select_box');
  if(select_box){
    select_box.style.border="0px";
    select_box.style.width=parseInt(select_box.style.width)+4+"px";
    select_box.style.height=parseInt(select_box.style.height)+4+"px";
    setTextFontSpace();
    setTextBorder();
    setTextOutlineRadius();
    changeTextFontSpace();
    changeTextBorder();
    changeTextOutlineRadius();
    document.getElementById('target').removeEventListener('mousemove',resizeElementHover,false);
    document.getElementById('target').removeEventListener('mousedown',resizeElementStart,false);
    debugEventLog('resizeElementHover',0);
    debugEventLog('resizeElementStart',0);
    select_box.removeAttribute('id');
    document.getElementById('target').style.cursor="default";
  }
}

//deleteイベント付与
function enabledDelete(){
  eventRemove();
  menuEvent="delete";
  var menuLists=document.querySelectorAll('#menuListPanel .menuList');
  for(var i=0;i<menuLists.length;i++){
    menuLists[i].style.color="white";
    menuLists[i].style.fontWeight="400";
  }
  document.getElementById('menuDelete').style.color="skyblue";
  document.getElementById('menuDelete').style.fontWeight="600";
  //すべてのboxに被選択権を付与
  var boxes=document.getElementsByClassName(box_layer);
  for(i=0;i<boxes.length;i++){
    boxes[i].addEventListener('click',deleteElementSelect,false);
  }
  debugEventLog('deleteElementSelect',1);
  document.getElementById('popupOk').addEventListener('click',deleteTriger,false);
  debugEventLog('deleteTriger',1);
  topMsg("削除する要素を選択してください.",'b');
}

//deleteイベントの削除
function disabledDelete(){
  menuEvent="none";
  var menuLists=document.querySelectorAll('#menuListPanel .menuList');
  for(var i=0;i<menuLists.length;i++){
    menuLists[i].style.color="white";
    menuLists[i].style.fontWeight="400";
  }
  //すべてのboxに被選択権を付与
  var boxes=document.getElementsByClassName(box_layer);
  for(i=0;i<boxes.length;i++){
    boxes[i].removeEventListener('click',deleteElementSelect,false);
    if(boxes[i].classList.contains('delete_box')){
      boxes[i].classList.remove('delete_box');
      boxes[i].style.border="0px";
      boxes[i].style.width=(parseInt(boxes[i].style.width)+4)+"px";
      boxes[i].style.height=(parseInt(boxes[i].style.height)+4)+"px";
    }
  }
  document.getElementById('popupWindowPermission').style.display="none";
  debugEventLog('deleteElementSelect',0);
  document.getElementById('popupCancel').removeEventListener('click',deleteTriger,false);
  debugEventLog('deleteTriger',0);
}

//editイベント付与
function enabledEdit(){
  eventRemove();
  menuEvent="edit";
  var menuLists=document.querySelectorAll('#menuListPanel .menuList');
  for(var i=0;i<menuLists.length;i++){
    menuLists[i].style.color="white";
    menuLists[i].style.fontWeight="400";
  }
  document.getElementById('menuEdit').style.color="skyblue";
  document.getElementById('menuEdit').style.fontWeight="600";
  //すべてのboxに被選択権を付与
  var boxes=document.getElementsByClassName(box_layer);
  for(i=0;i<boxes.length;i++){
    boxes[i].addEventListener('click',editElementSelect,false);
  }
  debugEventLog('editElementSelect',1);
  topMsg("編集したい要素を選択してください.",'b');
}

//editイベントの削除
function disabledEdit(){
  menuEvent="none";
  var menuLists=document.querySelectorAll('#menuListPanel .menuList');
  for(var i=0;i<menuLists.length;i++){
    menuLists[i].style.color="white";
    menuLists[i].style.fontWeight="400";
  }
  //すべてのboxに被選択権を付与
  var boxes=document.getElementsByClassName(box_layer);
  for(i=0;i<boxes.length;i++){
    boxes[i].removeEventListener('click',editElementSelect,false);
  }
  debugEventLog('editElementSelect',0);
  closeTextBox();
  closeImgBox();
  closeMovieBox();
  closePDFBox();
  var select_box=document.getElementById('select_box');
  if(select_box){
    select_box.removeAttribute('id');
  }
}

//layerイベント付与
function enabledLayer(){
  eventRemove();
  menuEvent="layer";
  var menuLists=document.querySelectorAll('#menuListPanel .menuList');
  for(var i=0;i<menuLists.length;i++){
    menuLists[i].style.color="white";
    menuLists[i].style.fontWeight="400";
  }
  document.getElementById('menuLayer').style.color="skyblue";
  document.getElementById('menuLayer').style.fontWeight="600";
  document.getElementById('menuLayerListPanel').style.display="block";
  //メニューパネルの表記処理
  var layerMenuLists=document.querySelectorAll('#menuLayerListPanel .menuList');
  for(i=0;i<layerMenuLists.length;i++){
    layerMenuLists[i].style.color="white";
    layerMenuLists[i].style.fontWeight="400";
  }
  var num=strReplace(box_layer,'box_','');
  document.getElementById('menuLayer'+num).style.color="skyblue";
  document.getElementById('menuLayer'+num).style.fontWeight="600";
  topMsg("編集したいレイヤーを選択してください.",'b');
}

//layerイベントの削除
function disabledLayer(){
  menuEvent="none";
  var menuLists=document.querySelectorAll('#menuListPanel .menuList');
  for(var i=0;i<menuLists.length;i++){
    menuLists[i].style.color="white";
    menuLists[i].style.fontWeight="400";
  }
  document.getElementById('menuLayerListPanel').style.display="none";
}

//ファイルイベント付与
function enabledFile(){
  eventRemove();
  menuEvent="file";
  var menuLists=document.querySelectorAll('#menuListPanel .menuList');
  for(var i=0;i<menuLists.length;i++){
    menuLists[i].style.color="white";
    menuLists[i].style.fontWeight="400";
  }
  document.getElementById('menuFile').style.color="skyblue";
  document.getElementById('menuFile').style.fontWeight="600";
  document.getElementById('menuFileListPanel').style.display="block";
  var layerMenuLists=document.querySelectorAll('#menuFileListPanel .menuList');
  for(i=0;i<layerMenuLists.length;i++){
    layerMenuLists[i].style.color="white";
    layerMenuLists[i].style.fontWeight="400";
  }
  if(document.getElementById('menuPreview').innerHTML==="閉じる"){
    layerBack();
  }
  var boxes=document.querySelectorAll('.box.'+device_name);
  for(var i=0;i<boxes.length;i++){
    boxes[i].removeEventListener('dblclick',enabledEdit,false);
    boxes[i].removeEventListener('dblclick',editElementSelect,false);
  }
}

//ファイルイベントの削除
function disabledFile(){
  menuEvent="none";
  var menuLists=document.querySelectorAll('#menuListPanel .menuList');
  for(var i=0;i<menuLists.length;i++){
    menuLists[i].style.color="white";
    menuLists[i].style.fontWeight="400";
  }
  document.getElementById('menuFileListPanel').style.display="none";
  if(document.getElementById('menuPreview').innerHTML==="閉じる"){
    changeLayerAll();
  }
  document.getElementById('popupWindowInsert').style.display="none";
  document.getElementById('popupWindowPrint').style.display="none";
  layerBack();
  var boxes=document.querySelectorAll('.box.'+device_name);
  for(var i=0;i<boxes.length;i++){
    boxes[i].addEventListener('dblclick',enabledEdit,false);
    boxes[i].addEventListener('dblclick',editElementSelect,false);
  }
}

//OGPイベント付与
function enabledOGP(){
  eventRemove();
  menuEvent="ogp";
  var menuLists=document.querySelectorAll('#menuListPanel .menuList');
  for(var i=0;i<menuLists.length;i++){
    menuLists[i].style.color="white";
    menuLists[i].style.fontWeight="400";
  }
  document.getElementById('menuOGP').style.color="skyblue";
  document.getElementById('menuOGP').style.fontWeight="600";
  document.getElementById('popupWindowOGP').style.display="block";
  topMsg('URLをシェアしたときに表示される情報を入力してください.','b');
}

//OGPイベントの削除
function disabledOGP(){
  menuEvent="none";
  var menuLists=document.querySelectorAll('#menuListPanel .menuList');
  for(var i=0;i<menuLists.length;i++){
    menuLists[i].style.color="white";
    menuLists[i].style.fontWeight="400";
  }
  document.getElementById('popupWindowOGP').style.display="none";
  topMsg();
}


//その他イベント付与
function enabledOther(){
  eventRemove();
  menuEvent="other";
  var menuLists=document.querySelectorAll('#menuListPanel .menuList');
  for(var i=0;i<menuLists.length;i++){
    menuLists[i].style.color="white";
    menuLists[i].style.fontWeight="400";
  }
  document.getElementById('menuOther').style.color="skyblue";
  document.getElementById('menuOther').style.fontWeight="600";
  document.getElementById('popupWindowOther').style.display="block";
}

//その他イベントの削除
function disabledOther(){
  menuEvent="none";
  var menuLists=document.querySelectorAll('#menuListPanel .menuList');
  for(var i=0;i<menuLists.length;i++){
    menuLists[i].style.color="white";
    menuLists[i].style.fontWeight="400";
  }
  document.getElementById('popupWindowOther').style.display="none";
}

//マーカーイベントの追加
function enabledMarker(){
  eventRemove();
  menuEvent="marker";
  var menuLists=document.querySelectorAll('#menuListPanel .menuList');
  for(var i=0;i<menuLists.length;i++){
    menuLists[i].style.color="white";
    menuLists[i].style.fontWeight="400";
  }
  document.getElementById('menuMarker').style.color="skyblue";
  document.getElementById('menuMarker').style.fontWeight="600";
  var panels=document.querySelectorAll('.panel');
  for(var i=0;i<panels.length;i++){
    panels[i].addEventListener('click',setMarker,false);
  }
  var markedPanels=document.querySelectorAll('.markedPanel');
  for(var i=0;i<markedPanels.length;i++){
    markedPanels[i].addEventListener('click',setMarker,false);
  }
  topMsg('マーカーを置きたいパネルをクリックしてください.','b');
}

//マーカーイベントの削除
function disabledMarker(){
  menuEvent="none";
  var menuLists=document.querySelectorAll('#menuListPanel .menuList');
  for(var i=0;i<menuLists.length;i++){
    menuLists[i].style.color="white";
    menuLists[i].style.fontWeight="400";
  }
  var panels=document.querySelectorAll('.panel');
  for(var i=0;i<panels.length;i++){
    panels[i].removeEventListener('click',setMarker,false);
  }
  var markedPanels=document.querySelectorAll('.markedPanel');
  for(var i=0;i<markedPanels.length;i++){
    markedPanels[i].removeEventListener('click',setMarker,false);
  }
  topMsg();
}

//イベントイベントの追加
function enabledEvent(){
  eventRemove();
  menuEvent="event";
  var menuLists=document.querySelectorAll('#menuListPanel .menuList');
  for(var i=0;i<menuLists.length;i++){
    menuLists[i].style.color="white";
    menuLists[i].style.fontWeight="400";
  }
  document.getElementById('menuEvent').style.color="skyblue";
  document.getElementById('menuEvent').style.fontWeight="600";
  document.getElementById('popupWindowEventCreate').style.display="block";
  topMsg('イベントメニューを選択してください.','b');
  setupEventForm();
  var event_window=document.querySelectorAll('.event_window');
  for(var i=0;i<event_window.length;i++){
    event_window[i].addEventListener('click',toggleEventContent,false);
  }
  var event_target=document.querySelectorAll('.event_target_select');
  var event_given=document.querySelectorAll('.event_given_select');
  for(var i=0;i<event_target.length;i++){
    event_target[i].addEventListener('click',toggleEventSetting,false);
  }
  for(var i=0;i<event_given.length;i++){
    event_given[i].addEventListener('click',toggleEventSetting,false);
  }
  var boxes=document.querySelectorAll('.box.'+device_name+'.'+box_layer);
  for(var i=0;i<boxes.length;i++){
    boxes[i].removeEventListener('dblclick',enabledEdit,false);
    boxes[i].removeEventListener('dblclick',editElementSelect,false);
  }
}

//イベントイベントの削除
function disabledEvent(){
  menuEvent="none";
  var menuLists=document.querySelectorAll('#menuListPanel .menuList');
  for(var i=0;i<menuLists.length;i++){
    menuLists[i].style.color="white";
    menuLists[i].style.fontWeight="400";
  }
  document.getElementById('popupWindowEventCreate').style.display="none";
  topMsg();
  var event_window=document.querySelectorAll('.event_window');
  for(var i=0;i<event_window.length;i++){
    event_window[i].removeEventListener('click',toggleEventContent,false);
  }
  resetEventBtn();
  var boxes=document.querySelectorAll('.box.'+device_name+'.'+box_layer);
  for(var i=0;i<boxes.length;i++){
    boxes[i].addEventListener('dblclick',enabledEdit,false);
    boxes[i].addEventListener('dblclick',editElementSelect,false);
  }
}

document.getElementById('event_add').addEventListener('click',addEventContent,false);

//レイヤーイベントの追加
for(var i=0;i<10;i++){
  document.getElementById('menuLayer'+i).addEventListener('click',changeLayer,false);
  debugEventLog('changeLayer'+i,1);
}
document.getElementById('menuPreview').addEventListener('click',changeLayerAll,false);
debugEventLog('changeLayerAll',1);


//印刷イベントの追加
document.getElementById('popupPrintCancel').addEventListener('click',function(){
  var menuLists=document.querySelectorAll('#menuFileListPanel .menuList');
  for(var i=0;i<menuLists.length;i++){
    menuLists[i].style.color="white";
    menuLists[i].style.fontWeight="400";
  }
  document.getElementById('popupWindowPrint').style.display="none";
},false);

document.getElementById('popupPrintOk').addEventListener('click',function(){
  var menuLists=document.querySelectorAll('#menuFileListPanel .menuList');
  for(var i=0;i<menuLists.length;i++){
    menuLists[i].style.color="white";
    menuLists[i].style.fontWeight="400";
  }
  document.getElementById('popupWindowPrint').style.display="none";
},false);

//挿入イベントの処理
document.getElementById('popupInsertOk').addEventListener('click',insertPage,false);

//挿入イベントの処理中断
document.getElementById('popupInsertCancel').addEventListener('click',function(){
  document.getElementById('popupWindowInsert').style.display="none";
  var menuLists=document.querySelectorAll('#menuFileListPanel .menuList');
  for(var i=0;i<menuLists.length;i++){
    menuLists[i].style.color="white";
    menuLists[i].style.fontWeight="400";
  }
},false);

//表層・深層機能
document.getElementById('menuLayerFace').addEventListener('click',changeLayerFace,false);
document.getElementById('menuLayerDeep').addEventListener('click',changeLayerDeep,false);


//テキストボックスのリアルタイム編集
document.getElementById('popupWindowTextContentContent').addEventListener('change',changeTextContent,false);
document.getElementById('popupWindowTextDetailBackColor_R').addEventListener('change',changeTextBackColor,false);
document.getElementById('popupWindowTextDetailBackColor_G').addEventListener('change',changeTextBackColor,false);
document.getElementById('popupWindowTextDetailBackColor_B').addEventListener('change',changeTextBackColor,false);
document.getElementById('popupWindowTextDetailBackColor_A').addEventListener('change',changeTextBackColor,false);
document.getElementById('popupWindowTextDetailFontColor_R').addEventListener('change',changeTextFontColor,false);
document.getElementById('popupWindowTextDetailFontColor_G').addEventListener('change',changeTextFontColor,false);
document.getElementById('popupWindowTextDetailFontColor_B').addEventListener('change',changeTextFontColor,false);
document.getElementById('popupWindowTextDetailFontColor_A').addEventListener('change',changeTextFontColor,false);
document.getElementById('popupWindowTextDetailFontSize').addEventListener('change',changeTextFontSize,false);
document.getElementById('popupWindowTextDetailFontSpace').addEventListener('change',changeTextFontSpace,false);
document.getElementById('popupWindowTextDetailFontFamily').addEventListener('change',changeTextFontFamily,false);
document.getElementById('popupWindowTextDetailBorder').addEventListener('change',changeTextBorder,false);
document.getElementById('popupWindowTextDetailBorderColor_R').addEventListener('change',changeTextBorder,false);
document.getElementById('popupWindowTextDetailBorderColor_G').addEventListener('change',changeTextBorder,false);
document.getElementById('popupWindowTextDetailBorderColor_B').addEventListener('change',changeTextBorder,false);
document.getElementById('popupWindowTextDetailOutlineRadius').addEventListener('change',changeTextOutlineRadius,false);
var textPlaceCheckBox=document.getElementsByName('popupWindowTextDetailPlace');
for(var index=0;index<textPlaceCheckBox.length;index++){
  textPlaceCheckBox[index].addEventListener('change',changeTextPlace,false);
}
document.getElementById('popupWindowTextDetailLink').addEventListener('change',changeTextLink,false);

//画像のリアルタイム編集
document.getElementById('popupWindowImgFile').addEventListener('change',changeImgFile,false);
document.getElementById('popupWindowImgLink').addEventListener('change',changeImgLink,false);
var imgPlaceCheckBox=document.getElementsByName('popupWindowImgPlace');
for(var index=0;index<imgPlaceCheckBox.length;index++){
  imgPlaceCheckBox[index].addEventListener('change',changeImgPlace,false);
}
var imgLRCheckBox=document.getElementsByName('popupWindowImgLR');
for(var index=0;index<imgLRCheckBox.length;index++){
  imgLRCheckBox[index].addEventListener('change',changeImgLR,false);
}
var imgTBCheckBox=document.getElementsByName('popupWindowImgTB');
for(var index=0;index<imgTBCheckBox.length;index++){
  imgTBCheckBox[index].addEventListener('change',changeImgTB,false);
}


//動画のリアルタイム編集
document.getElementById('popupWindowMovieFile').addEventListener('change',changeMovieFile,false);
var moviePlaceCheckBox=document.getElementsByName('popupWindowMoviePlace');
for(var index=0;index<moviePlaceCheckBox.length;index++){
  moviePlaceCheckBox[index].addEventListener('change',changeMoviePlace,false);
}
var movieLRCheckBox=document.getElementsByName('popupWindowMovieLR');
for(var index=0;index<movieLRCheckBox.length;index++){
  movieLRCheckBox[index].addEventListener('change',changeMovieLR,false);
}
var movieTBCheckBox=document.getElementsByName('popupWindowMovieTB');
for(var index=0;index<movieTBCheckBox.length;index++){
  movieTBCheckBox[index].addEventListener('change',changeMovieTB,false);
}
var moviePlayCheckBox=document.getElementsByName('popupWindowMoviePlay');
for(var index=0;index<moviePlayCheckBox.length;index++){
  moviePlayCheckBox[index].addEventListener('change',changeMoviePlay,false);
}

//PDFのリアルタイム編集
document.getElementById('popupWindowPDFFile').addEventListener('change',changePDFFile,false);

//背景色のリアルタイム編集
document.getElementById('popupWindowOtherDetailBackColor_R').addEventListener('change',changeBackColor,false);
document.getElementById('popupWindowOtherDetailBackColor_G').addEventListener('change',changeBackColor,false);
document.getElementById('popupWindowOtherDetailBackColor_B').addEventListener('change',changeBackColor,false);
