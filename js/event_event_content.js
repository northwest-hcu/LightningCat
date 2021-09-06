var videos=document.querySelectorAll('.movieBox');
for(var i=0;i<videos.length;i++){
  if(videos[i].controls===false){
    videos[i].muted=true;
  }
}

/*文字の置き換え*/
function strReplace(str,remove,insert){
  var array=[];
  str=new String(str);
  array=str.split(remove);
  str=array.join(insert);
  return str;
}

function eventSetFixed(eventList){
  var box_id=document.querySelectorAll('.box_id');
  var event_target=eventList.querySelectorAll('.event_target');
  for(var i=0;i<event_target.length;i++){
    for(var j=0;j<box_id.length;j++){
      if(event_target[i].innerHTML===box_id[j].innerHTML){
        box_id[j].parentNode.style.position='fixed';
        break;
      }
    }
  }
}

function eventSetHoverNormal(eventList){
  var box_id=document.querySelectorAll('.box_id');
  var event_target=eventList.querySelectorAll('.event_target');
  for(var i=0;i<event_target.length;i++){
    for(var j=0;j<box_id.length;j++){
      if(event_target[i].innerHTML===box_id[j].innerHTML){
        box_id[j].parentNode.addEventListener('mouseover',function(){
          this.style.opacity='0.5';
        },false);
        box_id[j].parentNode.addEventListener('mouseout',function(){
          this.style.opacity='1.0';
        },false);
        break;
      }
    }
  }
}

function eventSetHoverInvisibleToVisible(eventList){
  var box_id=document.querySelectorAll('.box_id');
  var event_target=eventList.querySelectorAll('.event_target');
  var event_given=eventList.querySelectorAll('.event_given');
  for(var i=0;i<event_target.length;i++){
    for(var j=0;j<box_id.length;j++){
      if(event_target[i].innerHTML===box_id[j].innerHTML){
        box_id[j].parentNode.addEventListener('mouseover',function(){
          var box_ids=document.querySelectorAll('.box_id');
          for(var i=0;i<event_given.length;i++){
            for(var j=0;j<box_ids.length;j++){
              if(event_given[i].innerHTML===box_ids[j].innerHTML){
                box_ids[j].parentNode.style.opacity='1.0';
              }
            }
          }
        },false);
        box_id[j].parentNode.addEventListener('mouseout',function(){
          var box_ids=document.querySelectorAll('.box_id');
          for(var i=0;i<event_given.length;i++){
            for(var j=0;j<box_ids.length;j++){
              if(event_given[i].innerHTML===box_ids[j].innerHTML){
                box_ids[j].parentNode.style.opacity='0';
              }
            }
          }
        },false);
        break;
      }
    }
  }
  for(var i=0;i<event_given.length;i++){
    for(var j=0;j<box_id.length;j++){
      if(event_given[i].innerHTML===box_id[j].innerHTML){
        box_id[j].parentNode.style.opacity='0';
      }
    }
  }
}

function eventSetHoverVisibleToInvisible(eventList){
  var box_id=document.querySelectorAll('.box_id');
  var event_target=eventList.querySelectorAll('.event_target');
  var event_given=eventList.querySelectorAll('.event_given');
  for(var i=0;i<event_target.length;i++){
    for(var j=0;j<box_id.length;j++){
      if(event_target[i].innerHTML===box_id[j].innerHTML){
        box_id[j].parentNode.addEventListener('mouseover',function(){
          var box_ids=document.querySelectorAll('.box_id');
          for(var i=0;i<event_given.length;i++){
            for(var j=0;j<box_ids.length;j++){
              if(event_given[i].innerHTML===box_ids[j].innerHTML){
                box_ids[j].parentNode.style.opacity='0';
              }
            }
          }
        },false);
        box_id[j].parentNode.addEventListener('mouseout',function(){
          var box_ids=document.querySelectorAll('.box_id');
          for(var i=0;i<event_given.length;i++){
            for(var j=0;j<box_ids.length;j++){
              if(event_given[i].innerHTML===box_ids[j].innerHTML){
                box_ids[j].parentNode.style.opacity='1.0';
              }
            }
          }
        },false);
        break;
      }
    }
  }
}

function eventSetScroll(eventList){
  var box_id=document.querySelectorAll('.box_id');
  var event_target=eventList.querySelectorAll('.event_target');
  var event_given=eventList.querySelectorAll('.event_given');
  var scrollPoint=100;
  if(event_given.length!=0){
    for(var j=0;j<box_id.length;j++){
      if(event_given[0].innerHTML===box_id[j].innerHTML){
        if(box_id[j].parentNode.style.display!=='block'){
          scrollPoint=parseInt(box_id[j].parentNode.style.top);
        }else{
          scrollPoint=box_id[j].parentNode.getBoundingClientRect().top+window.pageYOffset;
        }
        break;
      }
    }
  }
  if(event_target.length!=0){
    for(var j=0;j<box_id.length;j++){
      if(event_target[0].innerHTML===box_id[j].innerHTML){
        box_id[j].parentNode.addEventListener('click',function(){
          document.documentElement.scrollTop=scrollPoint;
        },false);
        break;
      }
    }
  }
}

function eventSetClickOpenToClose(eventList){
  var box_id=document.querySelectorAll('.box_id');
  var event_target=eventList.querySelectorAll('.event_target');
  var event_given=eventList.querySelectorAll('.event_given');
  for(var i=0;i<event_target.length;i++){
    for(var j=0;j<box_id.length;j++){
      if(event_target[i].innerHTML===box_id[j].innerHTML){
        box_id[j].parentNode.addEventListener('click',function(){
          var box_ids=document.querySelectorAll('.box_id');
          for(var i=0;i<event_given.length;i++){
            for(var j=0;j<box_ids.length;j++){
              if(event_given[i].innerHTML===box_ids[j].innerHTML){
                box_ids[j].parentNode.style.display='none';
              }
            }
          }
        },false);
        break;
      }
    }
  }
}

function eventSetClickCloseToOpen(eventList){
  var box_id=document.querySelectorAll('.box_id');
  var event_target=eventList.querySelectorAll('.event_target');
  var event_given=eventList.querySelectorAll('.event_given');
  for(var i=0;i<event_target.length;i++){
    for(var j=0;j<box_id.length;j++){
      if(event_target[i].innerHTML===box_id[j].innerHTML){
        box_id[j].parentNode.addEventListener('click',function(){
          var box_ids=document.querySelectorAll('.box_id');
          for(var i=0;i<event_given.length;i++){
            for(var j=0;j<box_ids.length;j++){
              if(event_given[i].innerHTML===box_ids[j].innerHTML){
                box_ids[j].parentNode.style.display='block';
              }
            }
          }
        },false);
        break;
      }
    }
  }
}


function eventSetDefaultClose(eventList){
  var box_id=document.querySelectorAll('.box_id');
  var event_target=eventList.querySelectorAll('.event_target');
  for(var i=0;i<event_target.length;i++){
    for(var j=0;j<box_id.length;j++){
      if(event_target[i].innerHTML===box_id[j].innerHTML){
        box_id[j].parentNode.style.display='none';
        break;
      }
    }
  }
}

function eventSetToggleOpenClose(eventList){
  var box_id=document.querySelectorAll('.box_id');
  var event_target=eventList.querySelectorAll('.event_target');
  var event_given=eventList.querySelectorAll('.event_given');
  for(var i=0;i<event_target.length;i++){
    for(var j=0;j<box_id.length;j++){
      if(event_target[i].innerHTML===box_id[j].innerHTML){
        box_id[j].parentNode.addEventListener('click',function(){
          var box_ids=document.querySelectorAll('.box_id');
          for(var i=0;i<event_given.length;i++){
            for(var j=0;j<box_ids.length;j++){
              if(event_given[i].innerHTML===box_ids[j].innerHTML){
                if(box_ids[j].parentNode.style.display==='block'){
                  box_ids[j].parentNode.style.display='none';
                }else{
                  box_ids[j].parentNode.style.display='block';
                }
              }
            }
          }
        },false);
        break;
      }
    }
  }
}


function setupEvent(){
  var eventLists=document.querySelectorAll('.event_data');
  for(var i=0;i<eventLists.length;i++){
    var eventMenu=eventLists[i].querySelectorAll('.event_kind_num');
    if(eventMenu.length!=0){
      eventMenu=parseInt(strReplace(eventMenu[0].innerHTML,'event_',''));
      if(eventMenu===0){
        eventSetFixed(eventLists[i]);
      }else if(eventMenu===1){
        eventSetHoverNormal(eventLists[i]);
      }else if(eventMenu===2){
        eventSetHoverInvisibleToVisible(eventLists[i]);
      }else if(eventMenu===3){
        eventSetHoverVisibleToInvisible(eventLists[i]);
      }else if(eventMenu===4){
        eventSetScroll(eventLists[i]);
      }else if(eventMenu===5){
        eventSetClickOpenToClose(eventLists[i]);
      }else if(eventMenu===6){
        eventSetClickCloseToOpen(eventLists[i]);
      }else if(eventMenu===7){
        eventSetDefaultClose(eventLists[i]);
      }else if(eventMenu===8){
        eventSetToggleOpenClose(eventLists[i]);
      }
    }
  }
}

function resetupEvents(){
  var eventLists=document.querySelectorAll('.event_data');
  for(var i=0;i<eventLists.length;i++){
    var eventMenu=eventLists[i].querySelectorAll('.event_kind_num');
    if(eventMenu.length!=0){
      eventMenu=parseInt(strReplace(eventMenu[0].innerHTML,'event_',''));
      if(eventMenu===7){
        eventSetDefaultClose(eventLists[i]);
      }
    }
  }
}

function resetMobileFontSize(){
  var textBox=document.querySelectorAll('.boxMobile .textBox');
  var baseFont=parseFloat(39*20);
  for(var i=0;i<textBox.length;i++){
    var pxFont=parseFloat(textBox[i].style.fontSize);
    if(window.matchMedia('(max-width:480px)').matches){
      var fontSize=(pxFont/baseFont)*180.0;
    }else{
      var fontSize=(pxFont/baseFont)*100.0;
    }
    textBox[i].style.fontSize=fontSize+"vw";
    console.log(fontSize);
  }
}


setupEvent();
resetMobileFontSize();
window.addEventListener('resize',function(){
  if(window.matchMedia('(max-width:767px)').matches){
    var boxes=document.querySelectorAll('.box.boxPC');
  }else if(window.matchMedia('(min-width:768px)').matches){
    var boxes=document.querySelectorAll('.box.boxMobile');
  }
  for(var i=0;i<boxes.length;i++){
    boxes[i].style.display='';
  }
  resetupEvents();
},false);
