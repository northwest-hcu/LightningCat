function changeDevice(){
  eventRemove();
  menuEvent="mode";
  var boxPC=document.querySelectorAll('.boxPC');
  var boxMobile=document.querySelectorAll('.boxMobile');
  var panelPC=document.querySelectorAll('.panelPC');
  var panelMobile=document.querySelectorAll('.panelMobile');
  var menuName=document.getElementById('menuMode');
  var target=document.getElementById('target');
  if(device_name==="boxPC"){
    device_name="boxMobile";
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
    menuName.innerHTML="PC版へ";
    target.style.width="780px";
    document.body.style.width="1200px";
  }else if(device_name==="boxMobile"){
    device_name="boxPC";
    for(var i=0;i<boxMobile.length;i++){
      boxMobile[i].style.display="none";
    }
    for(var i=0;i<boxPC.length;i++){
      boxPC[i].style.display="block";
    }
    for(var i=0;i<panelMobile.length;i++){
      panelMobile[i].style.display="none";
    }
    for(var i=0;i<panelPC.length;i++){
      panelPC[i].style.display="block";
    }
    menuName.innerHTML="スマホ版へ";
    target.style.width="1040px";
    document.body.style.width="1460px";
  }else{
    device_name="boxPC";
    for(var i=0;i<boxMobile.length;i++){
      boxMobile[i].style.display="none";
    }
    for(var i=0;i<boxPC.length;i++){
      boxPC[i].style.display="block";
    }
    for(var i=0;i<panelMobile.length;i++){
      panelMobile[i].style.display="none";
    }
    for(var i=0;i<panelPC.length;i++){
      panelPC[i].style.display="block";
    }
    menuName.innerHTML="スマホ版へ";
    target.style.width="1040px";
    document.body.style.width="1460px";
  }
  if(device_name_panel==="panelPC"){
    device_name_panel="panelMobile";
  }else if(device_name_panel==="panelMobile"){
    device_name_panel="panelPC";
  }else{
    device_name_panel="panelPC";
  }
  enabledLayer();
  changeLayerFunc(strReplace(panel_layer,'panel_',''));
}
