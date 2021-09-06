function insertPage(){
  topMsg("");
  var topPanels=document.querySelectorAll('.TopP');
  for(var i=0;i<topPanels.length;i++){
    topPanels[i].classList.remove('TopP');
  }
  var topPanels=document.querySelectorAll('.TopHide');
  for(var i=0;i<topPanels.length;i++){
    topPanels[i].classList.remove('TopHide');
  }
  var middlePanels=document.querySelectorAll('.MiddleP');
  for(var i=0;i<topPanels.length;i++){
    middlePanels[i].classList.remove('MiddleP');
  }
  var middlePanels=document.querySelectorAll('.MiddleHide');
  for(var i=0;i<middlePanels.length;i++){
    middlePanels[i].classList.remove('MiddleHide');
  }
  var bottomPanels=document.querySelectorAll('.BottomP');
  for(var i=0;i<bottomPanels.length;i++){
    bottomPanels[i].classList.remove('BottomP');
  }
  var bottomPanels=document.querySelectorAll('.BottomHide');
  for(var i=0;i<bottomPanels.length;i++){
    bottomPanels[i].classList.remove('BottomHide');
  }
  var insertFile=document.getElementById('insertFile').files;
  if(insertFile.length!=0){
    insertFile=insertFile[0];
    var reader=new FileReader();
    reader.onload=(function(theFile){
      return function(e){
        var content=e.target.result;
        var array=content.split('<!--Coded by LightningCat-->');
        if(array.length===3){
          content=array[1];
          document.getElementById("editable").innerHTML=content;
          reSelectPanel();
          changeLayerFunc(5);
          document.getElementById('popupWindowTextContentContent').addEventListener('change',changeTextContent,false);
          getOGP();
          setBackColor();
          document.getElementById('event_list').innerHTML=document.getElementById('eventData').innerHTML;
        }else{
          topMsg("対応していないファイルです.",'r');
        }
      }
    })(insertFile);
    reader.readAsText(insertFile);
  }
  eventRemove();
}

function reSelectPanel(){
  for(var i=0;i<10;i++){
    //既存のパネル除去
    changeLayerFunc(i);
    var selectedPanels=document.querySelectorAll('.panel_'+i);
    for(var j=0;j<selectedPanels.length;j++){
      selectedPanels[j].classList.remove('panel_'+i);
    }

    //レイヤーの重なり処理
    //changeLayerFunc(i);
    openPanelPC();
    var boxes=document.querySelectorAll('.box_'+i+'.boxPC');
    for(var j=0;j<boxes.length;j++){
      setPanelSelect(boxes[j].getBoundingClientRect().top,boxes[j].getBoundingClientRect().top+boxes[j].getBoundingClientRect().height,boxes[j]);
      var selectedPanels=document.querySelectorAll('.selectedPanel.panelPC');
      for(var k=0;k<selectedPanels.length;k++){
        selectedPanels[k].classList.add('panel_'+i);
        selectedPanels[k].classList.remove('selectedPanel');
      }
    }
    openPanelMobile();
    var boxes=document.querySelectorAll('.box_'+i+'.boxMobile');
    for(var j=0;j<boxes.length;j++){
      setPanelSelect(boxes[j].getBoundingClientRect().top,boxes[j].getBoundingClientRect().top+boxes[j].getBoundingClientRect().height,boxes[j]);
      var selectedPanels=document.querySelectorAll('.selectedPanel.panelMobile');
      for(var k=0;k<selectedPanels.length;k++){
        selectedPanels[k].classList.add('panel_'+i);
        selectedPanels[k].classList.remove('selectedPanel');
      }
    }
    //changeLayerFunc(i);
  }
  //Editショートカットの付与
  var boxes=document.querySelectorAll('.box');
  for(i=0;i<boxes.length;i++){
    boxes[i].addEventListener('dblclick',enabledEdit,false);
    boxes[i].addEventListener('dblclick',editElementSelect,false);
  }
  device_name="boxPC";
  device_name_panel="panelPC";
  document.getElementById('menuMode').innerHTML="スマホ版へ";
  openPanelPC();
}

function openPanelPC(){
  device_name="boxPC";
  device_name_panel="panelPC";
  var boxPC=document.querySelectorAll('.boxPC');
  var boxMobile=document.querySelectorAll('.boxMobile');
  var panelPC=document.querySelectorAll('.panelPC');
  var panelMobile=document.querySelectorAll('.panelMobile');
  for(var i=0;i<boxPC.length;i++){
    boxPC[i].style.display="block";
  }
  for(var i=0;i<boxMobile.length;i++){
    boxMobile[i].style.display="none";
  }
  for(var i=0;i<panelPC.length;i++){
    panelPC[i].style.display="block";
  }
  for(var i=0;i<panelMobile.length;i++){
    panelMobile[i].style.display="none";
  }
  document.getElementById('target').style.width="1040px";
  document.body.style.width="1460px";
}

function openPanelMobile(){
  device_name="boxMobile";
  device_name_panel="panelMobile";
  var boxPC=document.querySelectorAll('.boxPC');
  var boxMobile=document.querySelectorAll('.boxMobile');
  var panelPC=document.querySelectorAll('.panelPC');
  var panelMobile=document.querySelectorAll('.panelMobile');
  for(var i=0;i<boxPC.length;i++){
    boxPC[i].style.display="none";
  }
  for(var i=0;i<boxMobile.length;i++){
    boxMobile[i].style.display="block";
  }
  for(var i=0;i<panelPC.length;i++){
    panelPC[i].style.display="none";
  }
  for(var i=0;i<panelMobile.length;i++){
    panelMobile[i].style.display="block";
  }
  document.getElementById('target').style.width="360px";
  document.body.style.width="780px";
}
