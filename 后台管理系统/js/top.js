//实现功能页面的转换效果
var land=document.getElementsByClassName("top_land")[0];
// var main=document.getElementsByClassName("main");
var fade=document.getElementsByClassName("fade")[0];
var column=document.getElementsByClassName("column_a");
var columnm=document.getElementsByClassName("column")[0];
var functionm=document.getElementsByClassName("function")[0];
var functions=document.getElementsByClassName("functions");
var getmessage=document.getElementsByClassName("get_message")[0];
var me=document.getElementById("me");
var begin=document.getElementById("begin");
var smaller=document.getElementById("smaller");
let span=document.getElementsByClassName("column_span");
var open=true;
smaller.onclick=()=>{
    if(open){
        columnm.style.width="4%";
        functionm.style.width="96%";
        functionm.style.paddingLeft="4%";
        for(let i of span){
            i.style.display="none";
        }
        open=false;
    }
    else{
        columnm.style.width="15%";
        functionm.style.width="85%";
        functionm.style.paddingLeft="15%";
        for(let i of span){
            i.style.display="block";
        }
        open=true;
    }
}
column[0].style.backgroundColor="#388df5";
for(let i in column){
    column[i].onclick=function(){
        functions[i].style.display="block";
        functions[i].classList.add("fades");
        column[i].style.backgroundColor="#388df5";
        for(let n in column){
            if(n!=i){
                column[n].style.backgroundColor="#5380b8";
                functions[n].style.display="none";
                functions[n].classList.remove("fades");
            }
        }
    }
}
getmessage.onclick=function(){
    functions[1].style.display="block";
    functions[1].classList.add("fades");
    column[1].style.backgroundColor="#388df5";
    for(let n in column){
        if(n!=1){
            functions[n].style.display="none";
            functions[n].classList.remove("fades");
            column[n].style.backgroundColor="#5380b8";
        }
    }
}