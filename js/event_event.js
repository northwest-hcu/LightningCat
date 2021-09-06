function setupEventForm(){
  //メニュー部分の初期化
  document.getElementById('popupWindowEventCreateDetailName').value="";
  var eventMenu=document.getElementById('popupWindowEventCreateDetailKind');
  eventMenu=eventMenu.getElementsByTagName('option');
  for(var i=0;i<eventMenu.length;i++){
    eventMenu[i].selected=false;
  }
  eventMenu[0].selected=true;
  //イベントリストの初期化
  var event_object=document.querySelectorAll('.event_object');
  for(var i=0;i<event_object.length;i++){
    event_object[i].style.display="none";
  }
  var event_name_menu=document.querySelectorAll('.event_name_menu');
  for(var i=0;i<event_name_menu.length;i++){
    event_name_menu[i].style.display="block";
  }
  var event_name=document.querySelectorAll('.event_name');
  for(var i=0;i<event_name.length;i++){
    event_name[i].style.display="block";
  }
  var event_window=document.querySelectorAll('.event_window');
  for(var i=0;i<event_window.length;i++){
    event_window[i].style.display="block";
    event_window[i].innerHTML="詳細表示";
  }
  checkEventObject();
}

function checkEventObject(){
  var event_target=document.querySelectorAll('.event_target');
  var event_given=document.querySelectorAll('.event_given');
  var event_object=document.querySelectorAll('.box_id');
  var flag;
  for(var i=0;i<event_target.length;i++){
    flag=1;
    for(var j=0;j<event_object.length;j++){
      if(event_target[i].innerHTML===event_object[j].innerHTML){
        flag=0;
        break;
      }
    }
    if(flag){
      event_target[i].remove();
    }
  }
  for(var i=0;i<event_given.length;i++){
    flag=1;
    for(var j=0;j<event_object.length;j++){
      if(event_given[i].innerHTML===event_object[j].innerHTML){
        flag=0;
        break;
      }
    }
    if(flag){
      event_given[i].remove();
    }
  }
  var delete_btn=document.querySelectorAll('.event_delete');
  for(var i=0;i<delete_btn.length;i++){
    delete_btn[i].addEventListener('click',removeEventContent,false);
  }
}

function addEventContent(){
  topMsg("");
  var event_name_input=textReplaceOut(document.getElementById('popupWindowEventCreateDetailName').value);
  var event_kind_menu=document.getElementById('popupWindowEventCreateDetailKind');
  var event_kind=event_kind_menu.getElementsByTagName('option');
  for(var i=0;i<event_kind.length;i++){
    if(event_kind[i].selected){
      event_kind_menu=event_kind[i].value;
      var event_kind_name=event_kind[i].innerHTML;
      break;
    }
  }
  if(event_name_input.length!=0){
    var event_data=document.createElement('div');
    event_data.classList.add('event_data');
    document.getElementById('event_list').appendChild(event_data);
    var event_name_menu=document.createElement('p');
    event_name_menu.classList.add('event_name_menu');
    event_name_menu.innerHTML="イベント名";
    event_data.appendChild(event_name_menu);
    var event_name=document.createElement('div');
    event_name.classList.add('event_name');
    event_name.innerHTML=event_name_input;
    event_data.appendChild(event_name);
    var event_window=document.createElement('div');
    event_window.classList.add('event_window');
    event_window.innerHTML="詳細非表示";
    event_window.addEventListener('click',toggleEventContent,false);
    event_data.appendChild(event_window);
    var event_object=document.createElement('p');
    event_object.classList.add('event_object');
    event_object.innerHTML="イベント種類";
    event_data.appendChild(event_object);
    var event_object=document.createElement('div');
    event_object.classList.add('event_object');
    event_object.classList.add('event_kind');
    event_object.innerHTML=event_kind_name;
    event_data.appendChild(event_object);
    var event_object=document.createElement('div');
    event_object.classList.add('event_kind_num');
    event_object.innerHTML=event_kind_menu;
    event_data.appendChild(event_object);
    var event_object=document.createElement('div');
    event_object.classList.add('event_delete');
    event_object.classList.add('event_object');
    event_object.innerHTML="削除";
    event_object.addEventListener('click',removeEventContent,false);
    event_data.appendChild(event_object);
    var event_object=document.createElement('p');
    event_object.classList.add('event_object');
    event_object.classList.add('event_target_menu');
    event_object.innerHTML="イベントトリガ";
    event_data.appendChild(event_object);
    var event_object=document.createElement('div');
    event_object.classList.add('event_object');
    event_object.classList.add('event_target_select');
    event_object.innerHTML="選択";
    event_object.addEventListener('click',toggleEventSetting,false);
    event_data.appendChild(event_object);
    var event_object=document.createElement('p');
    event_object.classList.add('event_object');
    event_object.classList.add('event_given_menu');
    event_object.innerHTML="イベントレシーバー";
    event_data.appendChild(event_object);
    var event_object=document.createElement('div');
    event_object.classList.add('event_object');
    event_object.classList.add('event_given_select');
    event_object.innerHTML="選択";
    event_object.addEventListener('click',toggleEventSetting,false);
    event_data.appendChild(event_object);
  }else{
    topMsg("イベント名を入力してください.",'r');
  }
}

function toggleEventContent(event){
  var event_content=this.parentNode;
  var event_object=event_content.querySelectorAll('.event_object');
  var event_window=event_content.querySelectorAll('.event_window');
  event_window=event_window[0];
  for(var i=0;i<event_object.length;i++){
    if(event_window.innerHTML==="詳細表示"){
      event_object[i].style.display="block";
    }else{
      event_object[i].style.display="none";
    }
  }
  if(event_window.innerHTML==="詳細表示"){
    event_window.innerHTML="詳細非表示";
  }else{
    event_window.innerHTML="詳細表示";
  }
  topMsg("");
}

function toggleEventSetting(event){
  if(this.innerHTML==="選択中"){
    resetEventBtn();
    topMsg("イベントメニューを選択してください.",'b');
  }else{
    resetEventBtn();
    var box_ids=document.querySelectorAll('.box_id');
    this.innerHTML="選択中";
    this.style.backgroundColor="lime";
    if(this.classList.contains('event_target_select')){
      var event_target=this.parentNode.querySelectorAll('.event_target');
      for(var i=0;i<event_target.length;i++){
        for(var j=0;j<box_ids.length;j++){
          if(box_ids[j].innerHTML===event_target[i].innerHTML){
            var cover_box=box_ids[j].parentNode.querySelectorAll('.cover_box');
            cover_box=cover_box[0];
            cover_box.style.backgroundColor="rgba(255,0,0,0.5)";
          }
        }
      }
      topMsg("イベントトリガに追加・削除する要素を選択してください.",'b');
    }else if(this.classList.contains('event_given_select')){
      var event_given=this.parentNode.querySelectorAll('.event_given');
      for(var i=0;i<event_given.length;i++){
        for(var j=0;j<box_ids.length;j++){
          if(box_ids[j].innerHTML===event_given[i].innerHTML){
            var cover_box=box_ids[j].parentNode.querySelectorAll('.cover_box');
            cover_box=cover_box[0];
            cover_box.style.backgroundColor="rgba(255,0,0,0.5)";
          }
        }
      }
      topMsg("イベントレシーバーに追加・削除する要素を選択してください.",'b');
    }
    var boxes=document.querySelectorAll('.box.'+device_name+'.'+box_layer);
    for(var i=0;i<boxes.length;i++){
      boxes[i].addEventListener('click',toggleEventSelect,false);
    }
  }
}

function toggleEventSelect(event){
  var target_box=this;
  var box_id=target_box.querySelectorAll('.box_id');
  var cover_box=target_box.querySelectorAll('.cover_box');
  var event_target=document.querySelectorAll('.event_target_select');
  var event_given=document.querySelectorAll('.event_given_select');
  if(box_id.length!=0){
    box_id=box_id[0].innerHTML;
  }
  if(cover_box.length!=0){
    cover_box=cover_box[0];
  }
  for(var i=0;i<event_target.length;i++){
    if(event_target[i].innerHTML==="選択中"){
      var event_object=event_target[i];
      break;
    }
  }
  for(var i=0;i<event_given.length;i++){
    if(event_given[i].innerHTML==="選択中"){
      var event_object=event_given[i];
      break;
    }
  }
  if(checkEventList(event_object,box_id)){
    removeEventObject(event_object,box_id,cover_box);
  }else{
    addEventObject(event_object,box_id,cover_box);
  }
}

function checkEventList(event_object,box_id){
  if(event_object.classList.contains('event_target_select')){
    var event_tag=".event_target";
  }else if(event_object.classList.contains('event_given_select')){
    var event_tag=".event_given";
  }
  var targetData=event_object.parentNode.querySelectorAll(event_tag);
  for(var i=0;i<targetData.length;i++){
    if(targetData[i].innerHTML===box_id){
      return true;
    }
  }
  return false;
}

function removeEventContent(event){
  var event_data=this.parentNode;
  event_data.remove();
  resetEventBtn();
}

function addEventObject(targetObj,objectID,cover_box){
  var event_object=document.createElement('div');
  event_object.classList.add('event_object');
  event_object.innerHTML=objectID;
  targetObj.before(event_object);
  if(targetObj.classList.contains('event_target_select')){
    event_object.classList.add('event_target');
  }else if(targetObj.classList.contains('event_given_select')){
    event_object.classList.add('event_given');
  }
  cover_box.style.backgroundColor="rgba(255,0,0,0.5)";
}

function removeEventObject(targetObj,objectID,cover_box){
  if(targetObj.classList.contains('event_target_select')){
    var event_tag=".event_target";
  }else if(targetObj.classList.contains('event_given_select')){
    var event_tag=".event_given";
  }
  var target_element=targetObj.parentNode.querySelectorAll(event_tag);
  for(var i=0;i<target_element.length;i++){
    if(target_element[i].innerHTML===objectID){
      target_element[i].remove();
      break;
    }
  }
  cover_box.style.backgroundColor="rgba(0,0,0,0)";
}

function resetEventBtn(){
  var event_target=document.querySelectorAll('.event_target_select');
  var event_given=document.querySelectorAll('.event_given_select');
  for(var i=0;i<event_target.length;i++){
    event_target[i].innerHTML="選択";
    event_target[i].style.backgroundColor="white";
  }
  for(var i=0;i<event_given.length;i++){
    event_given[i].innerHTML="選択";
    event_given[i].style.backgroundColor="white";
  }
  var cover_boxes=document.querySelectorAll('.cover_box');
  for(var i=0;i<cover_boxes.length;i++){
    cover_boxes[i].style.backgroundColor="rgba(0,0,0,0)";
  }
  var boxes=document.querySelectorAll('.box.'+device_name+'.'+box_layer);
  for(var i=0;i<boxes.length;i++){
    boxes[i].removeEventListener('click',toggleEventSelect,false);
  }
}
