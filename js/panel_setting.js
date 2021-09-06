/* -----パネル要素作成----- */
/* tl=左上端 , num=パネルの番号 */
function setPanels(tl_x,tl_y,num_y,className){
  //パネルの要素を作成
  var newPanel=document.createElement("div");
  //targetの子要素に挿入
  document.getElementById("target").appendChild(newPanel);
  //パネルをクラス設定
  newPanel.classList.add("panel");
  newPanel.classList.add(className);
  newPanel.style.left=tl_x+"px";
  newPanel.style.top=tl_y+"px";
  newPanel.classList.add('label_'+num_y);
}
/* -----パネル要素作成----- */
/* -----パネル準備----- 200*63*/
for(var i=0;i<300;i++){
  for(var j=0;j<52;j++){
    setPanels(j*20,i*20,i,"panelPC");
  }
}
for(var i=0;i<300;i++){
  for(var j=0;j<39;j++){
    setPanels(j*20,i*20,i,"panelMobile");
  }
}
/* -----パネル準備----- */
