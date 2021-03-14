var cnt=document.getElementById("count"); 
var water=document.getElementById("water");
var percent=cnt.innerText;
var interval;

interval=setInterval(function(){ 
    let level = Math.round(moisture*10)/10;
    cnt.innerHTML = level; 
    water.style.transform='translate(0'+','+((100-level)-percent)+'%)';
    if(percent==100){
      clearInterval(interval);
    }
  },60);