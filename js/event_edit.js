function setCancel(){
  var select_box=document.getElementById('select_box');
  if(select_box){
    setPanelSelect(select_box.getBoundingClientRect().top,select_box.getBoundingClientRect().top+select_box.getBoundingClientRect().height,select_box);
    var selectedPanels=document.querySelectorAll('.selectedPanel');
    for(var i=0;i<selectedPanels.length;i++){
      if(selectedPanels[i].classList.contains(panel_layer)){
        selectedPanels[i].classList.remove(panel_layer);
      }
      selectedPanels[i].classList.remove('selectedPanel');
    }
    select_box.remove();
  }
  disabledCreate();
  document.getElementById('popupWindowText').style.display="none";
  document.getElementById('popupWindowImg').style.display="none";
  document.getElementById('popupWindowMovie').style.display="none";
  document.getElementById('popupWindowPDF').style.display="none";
  topMsg("");
}



function editElementSelect(event){
  //重複禁止
  if(document.getElementById('select_box')){
    closeTextBox();
    closeImgBox();
    closeMovieBox();
    closePDFBox();
  }
  this.setAttribute('id','select_box');
  var select_box=document.getElementById('select_box');
  var textBox=document.querySelectorAll('#select_box .textBox');
  var imgBox=document.querySelectorAll('#select_box .imgBox');
  var movieBox=document.querySelectorAll('#select_box .movieBox');
  var pdfBox=document.querySelectorAll('#select_box .pdfBox');
  if(textBox.length===1){
    setTextContent();
    document.getElementById('popupWindowTextContentContent').focus();
  }else if(imgBox.length===1){
    setImgContent();
  }else if(movieBox.length===1){
    setMovieContent();
  }else if(pdfBox.length===1){
    setPDFContent();
  }else{
    select_box.removeAttribute('id');
  }
}


//テキストの編集関数
function setTextContent(){
  var select_box=document.getElementById('select_box');
  if(select_box){
    var textBox=document.querySelectorAll('#select_box .textBox');
    if(textBox.length!=0){
      textBox=textBox[0];
      var textContent=textBox.innerHTML;
    }else{
      textBox=document.createElement('div');
      textBox.classList.add('textBox');
      select_box.appendChild(textBox);
      var textContent="";
      textBox.style.backgroundColor="rgba(255,255,255,1.0)";
      textBox.style.color="rgba(0,0,0,1.0)";
      textBox.style.fontSize="20px";
      textBox.style.padding="0px";
      textBox.style.border="0px solid black";
      textBox.style.textAlign="left";
      textBox.style.borderRadius="0px";
      document.getElementById('popupWindowTextContentContent').value="";
      textBox.classList.add('font_2');
    }
    setTextBackColor();
    setTextFontColor();
    setTextFontSize();
    setTextFontSpace();
    setTextFontFamily();
    setTextPlace();
    setTextLink();
    setTextBorder();
    setTextOutlineRadius();
    openTextBox(select_box,textBox,textContent);
    if(menuEvent==="create"){
      select_box.addEventListener('dblclick',enabledEdit,false);
      select_box.addEventListener('dblclick',editElementSelect,false);
      enabledEdit();
    }
  }
}

//画像の編集関数
function setImgContent(){
  var select_box=document.getElementById('select_box');
  if(select_box){
    var imgBox=document.querySelectorAll('#select_box .imgBox');
    if(imgBox.length!=0){
      imgBox=imgBox[0];
    }else{
      imgBox=document.createElement('img');
      imgBox.classList.add('imgBox');
      select_box.appendChild(imgBox);
      document.getElementById('popupWindowImgCode').value="";
      document.getElementById('popupWindowImgFile').value="";
    }
    setImgCode();
    setImgPlace();
    setImgLR();
    setImgTB();
    setImgLink();
    openImgBox();
    if(menuEvent==="create"){
      select_box.addEventListener('dblclick',enabledEdit,false);
      select_box.addEventListener('dblclick',editElementSelect,false);
      enabledEdit();
    }
  }
}


//動画の編集関数
function setMovieContent(){
  var select_box=document.getElementById('select_box');
  if(select_box){
    var movieBox=document.querySelectorAll('#select_box .movieBox');
    if(movieBox.length!=0){
      movieBox=movieBox[0];
    }else{
      movieBox=document.createElement('video');
      movieBox.classList.add('movieBox');
      select_box.appendChild(movieBox);
      movieBox.autoplay=false;
      movieBox.muted=true;
      movieBox.controls=false;
      movieBox.loop=true;
      document.getElementById('popupWindowMovieCode').value="";
      document.getElementById('popupWindowMovieFile').value="";
    }
    setMovieCode();
    setMoviePlace();
    setMovieLR();
    setMovieTB();
    setMoviePlay();
    openMovieBox();
    if(menuEvent==="create"){
      select_box.addEventListener('dblclick',enabledEdit,false);
      select_box.addEventListener('dblclick',editElementSelect,false);
      enabledEdit();
    }
  }
}


//PDFの編集関数
function setPDFContent(){
  var select_box=document.getElementById('select_box');
  if(select_box){
    var pdfBox=document.querySelectorAll('#select_box .pdfBox');
    if(pdfBox.length!=0){
      pdfBox=pdfBox[0];
    }else{
      pdfBox="<embed src='' class='pdfBox' type='application/pdf'>";
      select_box.innerHTML=pdfBox;
      var cover_box=document.createElement('div');
      cover_box.classList.add('cover_box');
      select_box.appendChild(cover_box);
      document.getElementById('popupWindowPDFCode').value="";
      document.getElementById('popupWindowPDFFile').value="";
    }
    setPDFCode();
    openPDFBox();
    if(menuEvent==="create"){
      select_box.addEventListener('dblclick',enabledEdit,false);
      select_box.addEventListener('dblclick',editElementSelect,false);
      enabledEdit();
    }
  }
}

//textareaとboxの入れ替え
function openTextBox(select_box,textBox,textContent){
  document.getElementById('popupWindowText').style.display="block";
  var textContainer=document.getElementById('popupWindowTextContentContent');
  textContainer.style.display="block";
  //textareaの座標
  textContainer.style.left=select_box.style.left;
  textContainer.style.top=select_box.style.top;
  textContainer.style.width=(parseInt(select_box.style.width)-(parseInt(textBox.style.padding)*2)-(parseInt(textBox.style.border)*2))+"px";
  textContainer.style.height=(parseInt(select_box.style.height)-(parseInt(textBox.style.padding)*2)-(parseInt(textBox.style.border)*2))+"px";
  //textareaのプロパティ
  textContainer.style.backgroundColor=textBox.style.backgroundColor;
  textContainer.style.color=textBox.style.color;
  textContainer.style.fontSize=textBox.style.fontSize;
  textContainer.style.padding=textBox.style.padding;
  textContainer.style.textAlign=textBox.style.textAlign;
  textContainer.style.border=textBox.style.border;
  textContainer.style.borderRadius=textBox.style.borderRadius;
  select_box.style.display="none";
  textContainer.value=textReplaceIn(textContent);
  textContainer.focus();
}

function closeTextBox(){
  document.getElementById('popupWindowText').style.display="none";
  var textContainer=document.getElementById('popupWindowTextContentContent');
  var select_box=document.getElementById('select_box');
  textContainer.style.display="none";
  if(select_box){
    select_box.style.display="block";
    select_box.removeAttribute('id');
  }
}

function openImgBox(){
  document.getElementById('popupWindowImg').style.display="block";
}

function closeImgBox(){
  document.getElementById('popupWindowImg').style.display="none";
  var select_box=document.getElementById('select_box');
  if(select_box){
    select_box.removeAttribute('id');
  }
}

function openMovieBox(){
  document.getElementById('popupWindowMovie').style.display="block";
}

function closeMovieBox(){
  document.getElementById('popupWindowMovie').style.display="none";
  var select_box=document.getElementById('select_box');
  if(select_box){
    select_box.removeAttribute('id');
  }
}

function openPDFBox(){
  document.getElementById('popupWindowPDF').style.display="block";
}

function closePDFBox(){
  document.getElementById('popupWindowPDF').style.display="none";
  var select_box=document.getElementById('select_box');
  if(select_box){
    select_box.removeAttribute('id');
  }
}

function changeTextContent(){
  var select_box=document.getElementById('select_box');
  if(select_box){
    var textBox=document.querySelectorAll('#select_box .textBox');
    if(textBox.length!=0){
      textBox=textBox[0];
      textBox.innerHTML=textReplaceOut(document.getElementById('popupWindowTextContentContent').value);
    }
  }
}

//背景色の変更
function changeTextBackColor(){
  var select_box=document.getElementById('select_box');
  var textContainer=document.getElementById('popupWindowTextContentContent');
  if(select_box){
    var textBox=document.querySelectorAll('#select_box .textBox');
    if(textBox.length!=0){
      textBox=textBox[0];
      var textDetailBackColor_R=document.getElementById('popupWindowTextDetailBackColor_R').value;
      var textDetailBackColor_G=document.getElementById('popupWindowTextDetailBackColor_G').value;
      var textDetailBackColor_B=document.getElementById('popupWindowTextDetailBackColor_B').value;
      var textDetailBackColor_A=document.getElementById('popupWindowTextDetailBackColor_A').value;
      //背景色
      if(isNaN(textDetailBackColor_R) || textDetailBackColor_R<0 || textDetailBackColor_R>255 || textDetailBackColor_R==="")textDetailBackColor_R=255;
      if(isNaN(textDetailBackColor_G) || textDetailBackColor_G<0 || textDetailBackColor_G>255 || textDetailBackColor_G==="")textDetailBackColor_G=255;
      if(isNaN(textDetailBackColor_B) || textDetailBackColor_B<0 || textDetailBackColor_B>255 || textDetailBackColor_B==="")textDetailBackColor_B=255;
      if(isNaN(textDetailBackColor_A) || textDetailBackColor_A<0 || textDetailBackColor_A>1.0 || textDetailBackColor_A==="")textDetailBackColor_A=1.0;
      textBox.style.backgroundColor="rgba("+textDetailBackColor_R+","+textDetailBackColor_G+","+textDetailBackColor_B+","+textDetailBackColor_A+")";
      textContainer.style.backgroundColor="rgba("+textDetailBackColor_R+","+textDetailBackColor_G+","+textDetailBackColor_B+","+textDetailBackColor_A+")";
    }
  }
}

//文字色の変更
function changeTextFontColor(){
  var select_box=document.getElementById('select_box');
  var textContainer=document.getElementById('popupWindowTextContentContent');
  if(select_box){
    var textBox=document.querySelectorAll('#select_box .textBox');
    if(textBox.length!=0){
      textBox=textBox[0];
      var textDetailFontColor_R=document.getElementById('popupWindowTextDetailFontColor_R').value;
      var textDetailFontColor_G=document.getElementById('popupWindowTextDetailFontColor_G').value;
      var textDetailFontColor_B=document.getElementById('popupWindowTextDetailFontColor_B').value;
      var textDetailFontColor_A=document.getElementById('popupWindowTextDetailFontColor_A').value;
      //文字色
      if(isNaN(textDetailFontColor_R) || textDetailFontColor_R<0 || textDetailFontColor_R>255 || textDetailFontColor_R==="")textDetailFontColor_R=255;
      if(isNaN(textDetailFontColor_G) || textDetailFontColor_G<0 || textDetailFontColor_G>255 || textDetailFontColor_G==="")textDetailFontColor_G=255;
      if(isNaN(textDetailFontColor_B) || textDetailFontColor_B<0 || textDetailFontColor_B>255 || textDetailFontColor_B==="")textDetailFontColor_B=255;
      if(isNaN(textDetailFontColor_A) || textDetailFontColor_A<0 || textDetailFontColor_A>1.0 || textDetailFontColor_A==="")textDetailFontColor_A=1.0;
      textBox.style.color="rgba("+textDetailFontColor_R+","+textDetailFontColor_G+","+textDetailFontColor_B+","+textDetailFontColor_A+")";
      textContainer.style.color="rgba("+textDetailFontColor_R+","+textDetailFontColor_G+","+textDetailFontColor_B+","+textDetailFontColor_A+")";
    }
  }
}

//文字の大きさ
function changeTextFontSize(){
  var select_box=document.getElementById('select_box');
  var textContainer=document.getElementById('popupWindowTextContentContent');
  if(select_box){
    var textBox=document.querySelectorAll('#select_box .textBox');
    if(textBox.length!=0){
      textBox=textBox[0];
      var textDetailFontSize=document.getElementById('popupWindowTextDetailFontSize').value;
      if(isNaN(textDetailFontSize) || textDetailFontSize<1 || textDetailFontSize=="")textDetailFontSize="20";
      textBox.style.fontSize=textDetailFontSize+"px";
      textContainer.style.fontSize=textDetailFontSize+"px";
    }
  }
}

//余白の大きさ
function changeTextFontSpace(){
  var select_box=document.getElementById('select_box');
  var textContainer=document.getElementById('popupWindowTextContentContent');
  if(select_box){
    var textBox=document.querySelectorAll('#select_box .textBox');
    if(textBox.length!=0){
      textBox=textBox[0];
      var textDetailFontSpace=document.getElementById('popupWindowTextDetailFontSpace').value;
      if(isNaN(textDetailFontSpace) || textDetailFontSpace<0 || textDetailFontSpace=="")textDetailFontSpace="0";
      textBox.style.padding=textDetailFontSpace+"px";
      textContainer.style.padding=textDetailFontSpace+"px";
      textBox.style.width=(parseInt(select_box.style.width)-(parseInt(textBox.style.padding)*2)-(parseInt(textBox.style.border)*2))+"px";
      textBox.style.height=(parseInt(select_box.style.height)-(parseInt(textBox.style.padding)*2)-(parseInt(textBox.style.border)*2))+"px";
      textContainer.style.width=(parseInt(select_box.style.width)-(parseInt(textBox.style.padding)*2)-(parseInt(textBox.style.border)*2))+"px";
      textContainer.style.height=(parseInt(select_box.style.height)-(parseInt(textBox.style.padding)*2)-(parseInt(textBox.style.border)*2))+"px";
    }
  }
}

//枠線の太さ
function changeTextBorder(){
  var select_box=document.getElementById('select_box');
  var textContainer=document.getElementById('popupWindowTextContentContent');
  if(select_box){
    var textBox=document.querySelectorAll('#select_box .textBox');
    if(textBox.length!=0){
      textBox=textBox[0];
      var textDetailBorder=document.getElementById('popupWindowTextDetailBorder').value;
      if(isNaN(textDetailBorder) || textDetailBorder<0 || textDetailBorder=="")textDetailBorder="0px solid rgb(0,0,0)";
      var textDetailBorderColor_R=document.getElementById('popupWindowTextDetailBorderColor_R').value;
      var textDetailBorderColor_G=document.getElementById('popupWindowTextDetailBorderColor_G').value;
      var textDetailBorderColor_B=document.getElementById('popupWindowTextDetailBorderColor_B').value;
      //枠線の色
      if(isNaN(textDetailBorderColor_R) || textDetailBorderColor_R<0 || textDetailBorderColor_R>255 || textDetailBorderColor_R==="")textDetailBorderColor_R=0;
      if(isNaN(textDetailBorderColor_G) || textDetailBorderColor_G<0 || textDetailBorderColor_G>255 || textDetailBorderColor_G==="")textDetailBorderColor_G=0;
      if(isNaN(textDetailBorderColor_B) || textDetailBorderColor_B<0 || textDetailBorderColor_B>255 || textDetailBorderColor_B==="")textDetailBorderColor_B=0;
      textBox.style.border=textDetailBorder+"px solid rgb("+textDetailBorderColor_R+","+textDetailBorderColor_G+","+textDetailBorderColor_B+")";
      textContainer.style.border=textDetailBorder+"px solid rgb("+textDetailBorderColor_R+","+textDetailBorderColor_G+","+textDetailBorderColor_B+")";
      textBox.style.width=(parseInt(select_box.style.width)-(parseInt(textBox.style.padding)*2)-(parseInt(textBox.style.border)*2))+"px";
      textBox.style.height=(parseInt(select_box.style.height)-(parseInt(textBox.style.padding)*2)-(parseInt(textBox.style.border)*2))+"px";
      textContainer.style.width=(parseInt(select_box.style.width)-(parseInt(textBox.style.padding)*2)-(parseInt(textBox.style.border)*2))+"px";
      textContainer.style.height=(parseInt(select_box.style.height)-(parseInt(textBox.style.padding)*2)-(parseInt(textBox.style.border)*2))+"px";
    }
  }
}

//枠線の丸み
function changeTextOutlineRadius(){
  var select_box=document.getElementById('select_box');
  var textContainer=document.getElementById('popupWindowTextContentContent');
  if(select_box){
    var textBox=document.querySelectorAll('#select_box .textBox');
    if(textBox.length!=0){
      textBox=textBox[0];
      var textDetailOutlineRadius=document.getElementById('popupWindowTextDetailOutlineRadius').value;
      if(isNaN(textDetailOutlineRadius) || textDetailOutlineRadius<1 || textDetailOutlineRadius=="")textDetailOutlineRadius="0";
      textBox.style.borderRadius=textDetailOutlineRadius+"px";
      textContainer.style.borderRadius=textDetailOutlineRadius+"px";
    }
  }
}

//フォント
function changeTextFontFamily(){
  var select_box=document.getElementById('select_box');
  var textContainer=document.getElementById('popupWindowTextContentContent');
  if(select_box){
    var textBox=document.querySelectorAll('#select_box .textBox');
    if(textBox.length!=0){
      textBox=textBox[0];
      var fontFamily=document.getElementById('popupWindowTextDetailFontFamily');
      var fontFamilyKinds=fontFamily.getElementsByTagName('option');
      for(var i=0;i<fontFamilyKinds.length;i++){
        if(fontFamilyKinds[i].selected){
          if(!textBox.classList.contains(fontFamilyKinds[i].value)){
            textBox.classList.add(fontFamilyKinds[i].value);
          }
          if(!textContainer.classList.contains(fontFamilyKinds[i].value)){
            textContainer.classList.add(fontFamilyKinds[i].value);
          }
        }else{
          if(textBox.classList.contains(fontFamilyKinds[i].value)){
            textBox.classList.remove(fontFamilyKinds[i].value);
          }
          if(textContainer.classList.contains(fontFamilyKinds[i].value)){
            textContainer.classList.remove(fontFamilyKinds[i].value);
          }
        }
      }
    }
  }
}

//文字位置
function changeTextPlace(){
  var select_box=document.getElementById('select_box');
  var textContainer=document.getElementById('popupWindowTextContentContent');
  if(select_box){
    var textBox=document.querySelectorAll('#select_box .textBox');
    if(textBox.length!=0){
      textBox=textBox[0];
      var textDetailPlace=document.getElementsByName('popupWindowTextDetailPlace');
      for(var i=0;i<textDetailPlace.length;i++){
        if(textDetailPlace[i].checked){
          textBox.style.textAlign=textDetailPlace[i].value;
          textContainer.style.textAlign=textDetailPlace[i].value;
        }
      }
    }
  }
}

//リンク
function changeTextLink(){
  var select_box=document.getElementById('select_box');
  var textContainer=document.getElementById('popupWindowTextContentContent');
  if(select_box){
    var textBox=document.querySelectorAll('#select_box .textBox');
    if(textBox.length!=0){
      textBox=textBox[0];
      var textDetailLink=document.getElementById('popupWindowTextDetailLink').value;
      var textBoxLink=document.querySelectorAll('#select_box a');
      if(textDetailLink.length!=0 && textBoxLink.length==0){
        /*aタグがなく、URLが入っている*/
        textBoxLink=document.createElement('a');
        textBoxLink.href=textDetailLink;
        textBoxLink.target="_blank";
        textBoxLink.appendChild(textBox);
        select_box.appendChild(textBoxLink);
      }else if(textDetailLink.length==0 && textBoxLink.length!=0){
        /*aタグがあって、URLがない*/
        select_box.appendChild(textBox);
        textBoxLink[0].remove();
      }else if(textDetailLink.length!=0 && textBoxLink.length!=0){
        /*aタグもあってURLもある*/
        textBoxLink[0].href=textDetailLink;
        textBoxLink[0].target="_blank";
      }
    }
  }
}

//画像のリアルタイム処理
function changeImgFile(){
  var select_box=document.getElementById('select_box');
  if(select_box){
    var imgBox=document.querySelectorAll('#select_box .imgBox');
    if(imgBox.length!=0){
      imgBox=imgBox[0];
      var imgFile=document.getElementById('popupWindowImgFile').files;
      if(imgFile.length!=0){
        var reader=new FileReader();
        reader.onload=(function(theFile){
          return function(e){
            imgBox.src=e.target.result;
          }
        })(imgFile[0]);
        reader.readAsDataURL(imgFile[0]);
      }else{
        imgBox.src=document.getElementById('popupWindowImgCode').value;
      }
    }
  }
}

//画像のリンクのリアルタイム処理
function changeImgLink(){
  var select_box=document.getElementById('select_box');
  if(select_box){
    var imgBox=document.querySelectorAll('#select_box .imgBox');
    if(imgBox.length!=0){
      imgBox=imgBox[0];
      var imgLink=document.getElementById('popupWindowImgLink').value;
      var imgBoxLink=document.querySelectorAll('#select_box a');
      if(imgLink.length!=0 && imgBoxLink.length==0){
        imgBoxLink=document.createElement('a');
        imgBoxLink.href=imgLink;
        imgBoxLink.target="_blank";
        imgBoxLink.appendChild(imgBox);
        select_box.appendChild(imgBoxLink);
      }else if(imgLink.length==0 && imgBoxLink.length!=0){
        select_box.appendChild(imgBox);
        imgBoxLink.remove();
      }else if(imgLink.length!=0 && imgBoxLink.length!=0){
        imgBoxLink.href=imgLink;
        imgBoxLink.target="_blank";
      }
    }
  }
}

//画像の位置のリアルタイム処理
function changeImgPlace(){
  var select_box=document.getElementById('select_box');
  if(select_box){
    var imgBox=document.querySelectorAll('#select_box .imgBox');
    var imgPlace=document.getElementsByName('popupWindowImgPlace');
    if(imgBox.length!=0){
      imgBox=imgBox[0];
      if(imgBox.classList.contains('setAuto')){
        imgBox.classList.remove('setAuto');
      }
      if(imgBox.classList.contains('setWidth')){
        imgBox.classList.remove('setWidth');
      }
      if(imgBox.classList.contains('setHeight')){
        imgBox.classList.remove('setHeight');
      }
      if(imgPlace[0].checked){
        imgBox.classList.add('setAuto');
      }else if(imgPlace[1].checked){
        imgBox.classList.add('setWidth');
      }else if(imgPlace[2].checked){
        imgBox.classList.add('setHeight');
      }else{
        imgBox.classList.add('setAuto');
      }
    }
  }
}


//画像の横位置のリアルタイム処理
function changeImgLR(){
  var select_box=document.getElementById('select_box');
  if(select_box){
    var imgBox=document.querySelectorAll('#select_box .imgBox');
    var imgLR=document.getElementsByName('popupWindowImgLR');
    if(imgBox.length!=0){
      imgBox=imgBox[0];
      if(imgBox.classList.contains('setLeft')){
        imgBox.classList.remove('setLeft');
      }
      if(imgBox.classList.contains('setCenter')){
        imgBox.classList.remove('setCenter');
      }
      if(imgBox.classList.contains('setRight')){
        imgBox.classList.remove('setRight');
      }
      if(imgLR[0].checked){
        imgBox.classList.add('setLeft');
      }else if(imgLR[1].checked){
        imgBox.classList.add('setCenter');
      }else if(imgLR[2].checked){
        imgBox.classList.add('setRight');
      }else{
        imgBox.classList.add('setCenter');
      }
    }
  }
}


//画像の縦位置のリアルタイム処理
function changeImgTB(){
  var select_box=document.getElementById('select_box');
  if(select_box){
    var imgBox=document.querySelectorAll('#select_box .imgBox');
    var imgTB=document.getElementsByName('popupWindowImgTB');
    if(imgBox.length!=0){
      imgBox=imgBox[0];
      if(imgBox.classList.contains('setTop')){
        imgBox.classList.remove('setTop');
      }
      if(imgBox.classList.contains('setMiddle')){
        imgBox.classList.remove('setMiddle');
      }
      if(imgBox.classList.contains('setBottom')){
        imgBox.classList.remove('setBottom');
      }
      if(imgTB[0].checked){
        imgBox.classList.add('setTop');
      }else if(imgTB[1].checked){
        imgBox.classList.add('setMiddle');
      }else if(imgTB[2].checked){
        imgBox.classList.add('setBottom');
      }else{
        imgBox.classList.add('setMiddle');
      }
    }
  }
}


//画像のリアルタイム処理
function changeMovieFile(){
  var select_box=document.getElementById('select_box');
  if(select_box){
    var movieBox=document.querySelectorAll('#select_box .movieBox');
    if(movieBox.length!=0){
      movieBox=movieBox[0];
      var movieFile=document.getElementById('popupWindowMovieFile').files;
      if(movieFile.length!=0){
        var reader=new FileReader();
        reader.onload=(function(theFile){
          return function(e){
            movieBox.src=e.target.result;
            movieBox.pause();
          }
        })(movieFile[0]);
        reader.readAsDataURL(movieFile[0]);
      }else{
        movieBox.src=document.getElementById('popupWindowImgCode').value;
      }
    }
  }
}


//動画の位置のリアルタイム処理
function changeMoviePlace(){
  var select_box=document.getElementById('select_box');
  if(select_box){
    var movieBox=document.querySelectorAll('#select_box .movieBox');
    var moviePlace=document.getElementsByName('popupWindowMoviePlace');
    if(movieBox.length!=0){
      movieBox=movieBox[0];
      if(movieBox.classList.contains('setWidth')){
        movieBox.classList.remove('setWidth');
      }
      if(movieBox.classList.contains('setHeight')){
        movieBox.classList.remove('setHeight');
      }
      if(moviePlace[0].checked){
        movieBox.classList.add('setWidth');
      }else if(moviePlace[1].checked){
        movieBox.classList.add('setHeight');
      }else{
        movieBox.classList.add('setWidth');
      }
    }
  }
}


//動画の横位置のリアルタイム処理
function changeMovieLR(){
  var select_box=document.getElementById('select_box');
  if(select_box){
    var movieBox=document.querySelectorAll('#select_box .movieBox');
    var movieLR=document.getElementsByName('popupWindowMovieLR');
    if(movieBox.length!=0){
      movieBox=movieBox[0];
      if(movieBox.classList.contains('setLeft')){
        movieBox.classList.remove('setLeft');
      }
      if(movieBox.classList.contains('setCenter')){
        movieBox.classList.remove('setCenter');
      }
      if(movieBox.classList.contains('setRight')){
        movieBox.classList.remove('setRight');
      }
      if(movieLR[0].checked){
        movieBox.classList.add('setLeft');
      }else if(movieLR[1].checked){
        movieBox.classList.add('setCenter');
      }else if(movieLR[2].checked){
        movieBox.classList.add('setRight');
      }else{
        movieBox.classList.add('setCenter');
      }
    }
  }
}


//動画の縦位置のリアルタイム処理
function changeMovieTB(){
  var select_box=document.getElementById('select_box');
  if(select_box){
    var movieBox=document.querySelectorAll('#select_box .movieBox');
    var movieTB=document.getElementsByName('popupWindowMovieTB');
    if(movieBox.length!=0){
      movieBox=movieBox[0];
      if(movieBox.classList.contains('setTop')){
        movieBox.classList.remove('setTop');
      }
      if(movieBox.classList.contains('setMiddle')){
        movieBox.classList.remove('setMiddle');
      }
      if(movieBox.classList.contains('setBottom')){
        movieBox.classList.remove('setBottom');
      }
      if(movieTB[0].checked){
        movieBox.classList.add('setTop');
      }else if(movieTB[1].checked){
        movieBox.classList.add('setMiddle');
      }else if(movieTB[2].checked){
        movieBox.classList.add('setBottom');
      }else{
        movieBox.classList.add('setMiddle');
      }
    }
  }
}


//動画の再生形式
function changeMoviePlay(){
  var select_box=document.getElementById('select_box');
  if(select_box){
    var movieBox=document.querySelectorAll('#select_box .movieBox');
    var moviePlay=document.getElementsByName('popupWindowMoviePlay');
    if(movieBox.length!=0){
      movieBox=movieBox[0];
      if(moviePlay[0].checked){
        moviePlay="auto";
      }else if(moviePlay[1].checked){
        moviePlay="manual";
      }else{
        moviePlay="auto";
      }
      if(moviePlay==="auto"){
        movieBox.autoplay=true;
        movieBox.loop=true;
        movieBox.muted=true;
        movieBox.controls=false;
      }else if(moviePlay==="manual"){
        movieBox.autoplay=false;
        movieBox.loop=false;
        movieBox.muted=false;
        movieBox.controls=true;
      }
    }
  }
}


//PDFのリアルタイム処理
function changePDFFile(){
  var select_box=document.getElementById('select_box');
  if(select_box){
    var pdfBox=document.querySelectorAll('#select_box .pdfBox');
    if(pdfBox.length!=0){
      pdfBox=pdfBox[0];
      var pdfFile=document.getElementById('popupWindowPDFFile').files;
      if(pdfFile.length!=0){
        var reader=new FileReader();
        reader.onload=(function(theFile){
          return function(e){
            pdfBox.src=e.target.result;
          }
        })(pdfFile[0]);
        reader.readAsDataURL(pdfFile[0]);
      }else{
        pdfBox.src=document.getElementById('popupWindowPDFCode').value;
      }
    }
  }
}


//テキストのHTMLから表示コード
function textReplaceIn(str){
  str=strReplace(str,'<br>','\n');
  str=strReplace(str,'&lt;','<');
  str=strReplace(str,'&gt;','>');
  str=strReplace(str,'&#39;','\'');
  str=strReplace(str,'&quot;','\"');
  str=strReplace(str,'&amp;','&');
  return str;
}

//テキストの表示からHTMLコード
function textReplaceOut(str){
  str=strReplace(str,'&','&amp;');
  str=strReplace(str,'<','&lt;');
  str=strReplace(str,'>','&gt;');
  str=strReplace(str,'\'','&#39;');
  str=strReplace(str,'\"','&quot;');
  str=strReplace(str,'\n','<br>');
  return str;
}

//背景色の初期化
function setTextBackColor(){
  var textBox=document.querySelectorAll('#select_box .textBox');
  if(textBox.length!=0){
    textBox=textBox[0];
    document.getElementById('popupWindowTextDetailBackColor_R').value=RGBAtoR(textBox.style.backgroundColor,'white');
    document.getElementById('popupWindowTextDetailBackColor_G').value=RGBAtoG(textBox.style.backgroundColor,'white');
    document.getElementById('popupWindowTextDetailBackColor_B').value=RGBAtoB(textBox.style.backgroundColor,'white');
    document.getElementById('popupWindowTextDetailBackColor_A').value=RGBAtoA(textBox.style.backgroundColor);
  }
}


//文字色の初期化
function setTextFontColor(){
  var textBox=document.querySelectorAll('#select_box .textBox');
  if(textBox.length!=0){
    textBox=textBox[0];
    document.getElementById('popupWindowTextDetailFontColor_R').value=RGBAtoR(textBox.style.color,'black');
    document.getElementById('popupWindowTextDetailFontColor_G').value=RGBAtoG(textBox.style.color,'black');
    document.getElementById('popupWindowTextDetailFontColor_B').value=RGBAtoB(textBox.style.color,'black');
    document.getElementById('popupWindowTextDetailFontColor_A').value=RGBAtoA(textBox.style.color);
  }
}


//文字サイズの初期化
function setTextFontSize(){
  var textBox=document.querySelectorAll('#select_box .textBox');
  var textFontSize=document.getElementById('popupWindowTextDetailFontSize');
  if(textBox.length!=0){
    textBox=textBox[0];
    textFontSize.value=strReplace(textBox.style.fontSize,'px','');
    if(textFontSize.value==="" || isNaN(textFontSize.value)){
      textFontSize.value="20";
    }
  }
}


//余白の初期化
function setTextFontSpace(){
  var textBox=document.querySelectorAll('#select_box .textBox');
  var textFontSpace=document.getElementById('popupWindowTextDetailFontSpace');
  if(textBox.length!=0){
    textBox=textBox[0];
    textFontSpace.value=strReplace(textBox.style.padding,'px','');
    if(textFontSpace.value==="" || isNaN(textFontSpace.value)){
      textFontSpace.value="0";
    }
  }
}

//枠線の初期化
function setTextBorder(){
  var textBox=document.querySelectorAll('#select_box .textBox');
  var textBorder=document.getElementById('popupWindowTextDetailBorder');
  if(textBox.length!=0){
    textBox=textBox[0];
    textBorder.value=parseBordertoSize(textBox.style.border);
    if(textBorder.value==="" || isNaN(textBorder.value)){
      textBorder.value="0";
    }
    document.getElementById('popupWindowTextDetailBorderColor_R').value=RGBAtoR(parseBordertoColor(textBox.style.border),'black');
    document.getElementById('popupWindowTextDetailBorderColor_G').value=RGBAtoG(parseBordertoColor(textBox.style.border),'black');
    document.getElementById('popupWindowTextDetailBorderColor_B').value=RGBAtoB(parseBordertoColor(textBox.style.border),'black');
  }
}

//枠線の丸みの初期化
function setTextOutlineRadius(){
  var textBox=document.querySelectorAll('#select_box .textBox');
  var textOutlineRadius=document.getElementById('popupWindowTextDetailOutlineRadius');
  if(textBox.length!=0){
    textBox=textBox[0];
    textOutlineRadius.value=strReplace(textBox.style.borderRadius,'px','');
    if(textOutlineRadius.value==="" || isNaN(textOutlineRadius.value)){
      textOutlineRadius.value="0";
    }
  }
}

//文字フォント
function setTextFontFamily(){
  var textBox=document.querySelectorAll('#select_box .textBox');
  var textFontSpace=document.getElementById('popupWindowTextDetailFontSpace');
  if(textBox.length!=0){
    textBox=textBox[0];
    var fontFamily=document.getElementById('popupWindowTextDetailFontFamily');
    var textContainer=document.getElementById('popupWindowTextContentContent');
    var fontFamilyKinds=fontFamily.getElementsByTagName('option');
    for(var i=0;i<fontFamilyKinds.length;i++){
      if(textBox.classList.contains(fontFamilyKinds[i].value)){
        if(!textContainer.classList.contains(fontFamilyKinds[i].value)){
          textContainer.classList.add(fontFamilyKinds[i].value);
        }
        fontFamilyKinds[i].selected=true;
      }else{
        if(textContainer.classList.contains(fontFamilyKinds[i].value)){
          textContainer.classList.remove(fontFamilyKinds[i].value);
        }
        fontFamilyKinds[i].selected=false;
      }
    }
  }
}

//文字位置の初期化
function setTextPlace(){
  var textBox=document.querySelectorAll('#select_box .textBox');
  if(textBox.length!=0){
    textBox=textBox[0];
    var textDetailPlace=document.getElementsByName('popupWindowTextDetailPlace');
    for(var i=0;i<textDetailPlace.length;i++){
      textDetailPlace[i].checked=false;
    }
    if(textBox.style.textAlign==="left"){
      textDetailPlace[0].checked=true;
    }else if(textBox.style.textAlign==="center"){
      textDetailPlace[1].checked=true;
    }else if(textBox.style.textAlign==="right"){
      textDetailPlace[2].checked=true;
    }else{
      textDetailPlace[0].checked=true;
    }
  }
}


//文字リンクの初期化
function setTextLink(){
  var textBox=document.querySelectorAll('#select_box .textBox');
  if(textBox.length!=0){
    var textLink=document.querySelectorAll('#select_box a');
    if(textLink.length!=0){
      document.getElementById('popupWindowTextDetailLink').value=textLink[0].href;
    }else{
      document.getElementById('popupWindowTextDetailLink').value="";
    }
  }
}


//画像のコード初期化
function setImgCode(){
  var imgBox=document.querySelectorAll('#select_box .imgBox');
  if(imgBox.length!=0){
    document.getElementById('popupWindowImgCode').value=imgBox.src;
  }
}

//画像のリンクの初期化
function setImgLink(){
  var imgBox=document.querySelectorAll('#select_box .imgBox');
  if(imgBox.length!=0){
    var imgLink=document.querySelectorAll('#select_box a');
    if(imgLink.length!=0){
      imgLink=imgLink[0];
      document.getElementById('popupWindowImgLink').value=imgLink.href;
    }else{
      document.getElementById('popupWindowImgLink').value="";
    }
  }
}



//画像の位置の初期化
function setImgPlace(){
  var imgBox=document.querySelectorAll('#select_box .imgBox');
  if(imgBox.length!=0){
    imgBox=imgBox[0];
    var imgPlace=document.getElementsByName('popupWindowImgPlace');
    for(var i=0;i<imgPlace.length;i++){
      imgPlace[i].checked=false;
    }
    if(imgBox.classList.contains('setAuto')){
      imgPlace[0].checked=true;
    }else if(imgBox.classList.contains('setWidth')){
      imgPlace[1].checked=true;
    }else if(imgBox.classList.contains('setHeight')){
      imgPlace[2].checked=true;
    }else{
      imgPlace[0].checked=true;
      imgBox.classList.add('setAuto');
    }
  }
}


//画像の左右配置の初期化
function setImgLR(){
  var imgBox=document.querySelectorAll('#select_box .imgBox');
  if(imgBox.length!=0){
    imgBox=imgBox[0];
    var imgLR=document.getElementsByName('popupWindowImgLR');
    for(var i=0;i<imgLR.length;i++){
      imgLR[i].checked=false;
    }
    if(imgBox.classList.contains('setLeft')){
      imgLR[0].checked=true;
    }else if(imgBox.classList.contains('setCenter')){
      imgLR[1].checked=true;
    }else if(imgBox.classList.contains('setRight')){
      imgLR[2].checked=true;
    }else{
      imgLR[1].checked=true;
      imgBox.classList.add('setCenter');
    }
  }
}


//画像の上下配置の初期化
function setImgTB(){
  var imgBox=document.querySelectorAll('#select_box .imgBox');
  if(imgBox.length!=0){
    imgBox=imgBox[0];
    var imgTB=document.getElementsByName('popupWindowImgTB');
    for(var i=0;i<imgTB.length;i++){
      imgTB[i].checked=false;
    }
    if(imgBox.classList.contains('setTop')){
      imgTB[0].checked=true;
    }else if(imgBox.classList.contains('setMiddle')){
      imgTB[1].checked=true;
    }else if(imgBox.classList.contains('setBottom')){
      imgTB[2].checked=true;
    }else{
      imgTB[1].checked=true;
      imgBox.classList.add('setMiddle');
    }
  }
}



//動画のコード初期化
function setMovieCode(){
  var movieBox=document.querySelectorAll('#select_box .movieBox');
  if(movieBox.length!=0){
    document.getElementById('popupWindowMovieCode').value=movieBox.src;
  }
}


//動画の位置の初期化
function setMoviePlace(){
  var movieBox=document.querySelectorAll('#select_box .movieBox');
  if(movieBox.length!=0){
    movieBox=movieBox[0];
    var moviePlace=document.getElementsByName('popupWindowMoviePlace');
    for(var i=0;i<moviePlace.length;i++){
      moviePlace[i].checked=false;
    }
    if(movieBox.classList.contains('setWidth')){
      moviePlace[0].checked=true;
    }else if(movieBox.classList.contains('setHeight')){
      moviePlace[1].checked=true;
    }else{
      moviePlace[0].checked=true;
      movieBox.classList.add('setWidth');
    }
  }
}


//動画の左右配置の初期化
function setMovieLR(){
  var movieBox=document.querySelectorAll('#select_box .movieBox');
  if(movieBox.length!=0){
    movieBox=movieBox[0];
    var movieLR=document.getElementsByName('popupWindowMovieLR');
    for(var i=0;i<movieLR.length;i++){
      movieLR[i].checked=false;
    }
    if(movieBox.classList.contains('setLeft')){
      movieLR[0].checked=true;
    }else if(movieBox.classList.contains('setCenter')){
      movieLR[1].checked=true;
    }else if(movieBox.classList.contains('setRight')){
      movieLR[2].checked=true;
    }else{
      movieLR[1].checked=true;
      movieBox.classList.add('setCenter');
    }
  }
}


//動画の上下配置の初期化
function setMovieTB(){
  var movieBox=document.querySelectorAll('#select_box .movieBox');
  if(movieBox.length!=0){
    movieBox=movieBox[0];
    var movieTB=document.getElementsByName('popupWindowMovieTB');
    for(var i=0;i<movieTB.length;i++){
      movieTB[i].checked=false;
    }
    if(movieBox.classList.contains('setTop')){
      movieTB[0].checked=true;
    }else if(movieBox.classList.contains('setMiddle')){
      movieTB[1].checked=true;
    }else if(movieBox.classList.contains('setBottom')){
      movieTB[2].checked=true;
    }else{
      movieTB[1].checked=true;
      movieBox.classList.add('setMiddle');
    }
  }
}


//動画の再生形式
function setMoviePlay(){
  var movieBox=document.querySelectorAll('#select_box .movieBox');
  if(movieBox.length!=0){
    movieBox=movieBox[0];
    var moviePlay=document.getElementsByName('popupWindowMoviePlay');
    for(var i=0;i<moviePlay.length;i++){
      moviePlay[i].checked=false;
    }
    if(!movieBox.controls){
      moviePlay[0].checked=true;
    }else if(movieBox.controls){
      moviePlay[1].checked=true;
    }
    movieBox.playsinline=true;
    movieBox.setAttribute('webkit-playsinline','webkit-playsinline');
    movieBox.allowInlineMediaPlayback=true;
  }
}


//PDFのコード初期化
function setPDFCode(){
  var pdfBox=document.querySelectorAll('#select_box .pdfBox');
  if(pdfBox.length!=0){
    document.getElementById('popupWindowPDFCode').value=pdfBox.src;
  }
}
