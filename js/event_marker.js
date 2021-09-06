function setMarker(event){
  var selectPanel=this;
  if(this.classList.contains('markedPanel')){
    if(this.style.backgroundColor==="red"){
      this.style.backgroundColor="orange";
    }else if(this.style.backgroundColor==="orange"){
      this.style.backgroundColor="yellow";
    }else if(this.style.backgroundColor==="yellow"){
      this.style.backgroundColor="lightgreen";
    }else if(this.style.backgroundColor==="lightgreen"){
      this.style.backgroundColor="";
      this.classList.remove('markedPanel');
    }
  }else{
    this.classList.add('markedPanel');
    this.style.backgroundColor="red";
  }
}
