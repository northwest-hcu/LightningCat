function deleteElementSelect(){
  //選択状態の選択
  if(this.classList.contains('delete_box')){
    this.classList.remove('delete_box');
    this.style.border="0px";
    this.style.width=(parseInt(this.style.width)+4)+"px";
    this.style.height=(parseInt(this.style.height)+4)+"px";
  }else{
    this.classList.add('delete_box');
    this.style.border="2px dashed red";
    this.style.width=(parseInt(this.style.width)-4)+"px";
    this.style.height=(parseInt(this.style.height)-4)+"px";
  }
  //ウインドウの表示状態
  var popupWindow=document.getElementById('popupWindowPermission');
  var delete_box_list=document.querySelectorAll('.delete_box');
  if(delete_box_list.length>0){
    popupWindowPermissionOpen("削除する要素を選択してください");
  }else{
    popupWindow.style.display="none";
  }
}

function deleteTriger(){
  var delete_box_list=document.querySelectorAll('.delete_box');
  var popupWindow=document.getElementById('popupWindowPermission');
  for(var i=0;i<delete_box_list.length;i++){
    delete_box_list[i].setAttribute('id','select_box');
    setCancel();
  }
  popupWindow.style.display="none";
  disabledDelete();
}
