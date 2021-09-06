function changeBackColor(){
  var backColor_R=document.getElementById('popupWindowOtherDetailBackColor_R').value;
  var backColor_G=document.getElementById('popupWindowOtherDetailBackColor_G').value;
  var backColor_B=document.getElementById('popupWindowOtherDetailBackColor_B').value;
  //背景色
  if(isNaN(backColor_R) || backColor_R<0 || backColor_R>255 || backColor_R==="")backColor_R=255;
  if(isNaN(backColor_G) || backColor_G<0 || backColor_G>255 || backColor_G==="")backColor_G=255;
  if(isNaN(backColor_B) || backColor_B<0 || backColor_B>255 || backColor_B==="")backColor_B=255;
  document.body.style.backgroundColor="rgb("+backColor_R+","+backColor_G+","+backColor_B+")";
  document.getElementById('popupWindowOtherDetailBackColor_R').value=backColor_R;
  document.getElementById('popupWindowOtherDetailBackColor_G').value=backColor_G;
  document.getElementById('popupWindowOtherDetailBackColor_B').value=backColor_B;
  document.getElementById('backColorData').innerHTML=document.body.style.backgroundColor;
}

function setBackColor(){
  document.body.style.backgroundColor=document.getElementById('backColorData').innerHTML;
  document.getElementById('popupWindowOtherDetailBackColor_R').value=RGBAtoR(document.body.style.backgroundColor,'white');
  document.getElementById('popupWindowOtherDetailBackColor_G').value=RGBAtoG(document.body.style.backgroundColor,'white');
  document.getElementById('popupWindowOtherDetailBackColor_B').value=RGBAtoB(document.body.style.backgroundColor,'white');
}

function setFileName(){
  insertFile=document.getElementById('insertFile').files;
  if(insertFile.length!=0){
    insertFile=insertFile[0];
    var fileName=strReplace(insertFile.name,".html","");
    document.getElementById('fileName').value=fileName;
  }
}

document.getElementById('insertFile').addEventListener('change',setFileName,false);
