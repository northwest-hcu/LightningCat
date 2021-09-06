//eventName:設定するイベントリスナー名, flag:0ならremove,1ならadd
function debugEventLog(eventName,flag){
  var eventPanel=document.getElementById('debugEventPanel');
  var array=[];
  if(flag){
    //console.log("addEvent:"+eventName);
    eventPanel.innerHTML+=eventName+"<br>";
  }else{
    //console.log("removeEvent:"+eventName);
    array=eventPanel.innerHTML.split('<br>');
    eventPanel.innerHTML="";
    for(var i=0;i<array.length;i++){
      if(array[i]!==eventName && array[i]!==""){
        eventPanel.innerHTML+=array[i]+"<br>";
      }
    }
  }
}

//メッセージの記述
function topMsg(msg,flag){
  //メッセージの記述
  document.getElementById('popupWindowMsgContent').innerHTML=msg;
  if(flag==="b"){
    document.getElementById('popupWindowMsg').style.backgroundColor="blue";
  }else if(flag==="r"){
    document.getElementById('popupWindowMsg').style.backgroundColor="red";
  }else{
    document.getElementById('popupWindowMsg').style.backgroundColor="black";
  }
}

//文字の置き換え
function strReplace(str,remove,insert){
  var array=[];
  str=new String(str);
  array=str.split(remove);
  str=array.join(insert);
  return str;
}

//dragの禁止
function draglock(event){
  if(event.preventDefault){
    event.preventDefault();
  }else{
    return false;
  }
}

//RGBaの分割
function RGBAtoR(str,def){
  str=strReplace(str,'(','');
  str=strReplace(str,')','');
  str=strReplace(str,' ','');
  var array=[];
  array=str.split(',');
  if(array.length===3){
    array[3]=1.0;
    array[0]=strReplace(array[0],'rgb','');
  }else if(array.length===4){
    array[0]=strReplace(array[0],'rgba','');
  }else{
    if(def==='black'){
      return 0;
    }else{
      return 255;
    }
  }
  return array[0];
}

//RGBaの分割
function RGBAtoG(str,def){
  str=strReplace(str,'(','');
  str=strReplace(str,')','');
  str=strReplace(str,' ','');
  var array=[];
  array=str.split(',');
  if(array.length===3){
    array[3]=1.0;
    array[0]=strReplace(array[0],'rgb','');
  }else if(array.length===4){
    array[0]=strReplace(array[0],'rgba','');
  }else{
    if(def==='black'){
      return 0;
    }else{
      return 255;
    }
  }
  return array[1];
}
//RGBaの分割
function RGBAtoB(str,def){
  str=strReplace(str,'(','');
  str=strReplace(str,')','');
  str=strReplace(str,' ','');
  var array=[];
  array=str.split(',');
  if(array.length===3){
    array[3]=1.0;
    array[0]=strReplace(array[0],'rgb','');
  }else if(array.length===4){
    array[0]=strReplace(array[0],'rgba','');
  }else{
    if(def==='black'){
      return 0;
    }else{
      return 255;
    }
  }
  return array[2];
}
//RGBaの分割
function RGBAtoA(str){
  str=strReplace(str,'(','');
  str=strReplace(str,')','');
  str=strReplace(str,' ','');
  var array=[];
  array=str.split(',');
  if(array.length===3){
    array[3]=1.0;
    array[0]=strReplace(array[0],'rgb','');
  }else if(array.length===4){
    array[0]=strReplace(array[0],'rgba','');
  }else{
    return "1.0";
  }
  return array[3];
}


function createID(){
  var random,id;
  var flag=1;
  var ids=document.querySelectorAll('.box_id');
  while(flag){
    id="";
    while(id.length!==8){
      random=Math.floor(Math.random()*32).toString(32);
      id+=String(random);
    }
    flag=0;
    for(var i=0;i<ids.length;i++){
      if(ids[i].innerHTML===id){
        flag=1;
        break;
      }
    }
  }
  return id;
}

function parseBordertoColor(borderStr){
  var array=[];
  str=new String(borderStr);
  array=str.split('px');
  str=array[1];
  array=str.split('solid');
  return array[1];
}

function parseBordertoSize(borderStr){
  var array=[];
  str=new String(borderStr);
  array=str.split('px');
  str=array[0];
  return str;
}
