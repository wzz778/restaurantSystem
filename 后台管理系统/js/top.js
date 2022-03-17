//实现功能页面的转换效果
var land=document.getElementsByClassName("top_land")[0];
// var main=document.getElementsByClassName("main");
var fade=document.getElementsByClassName("fade")[0];
var column=document.getElementsByClassName("column_a");
var functions=document.getElementsByClassName("functions");
var getmessage=document.getElementsByClassName("get_message")[0];
var me=document.getElementById("me");
var begin=document.getElementById("begin");
column[0].style.backgroundColor="#388df5";
for(let i=0;i<column.length;i++){
    column[i].onclick=function(){
        functions[i].style.display="block";
        functions[i].classList.add("fades");
        column[i].style.backgroundColor="#388df5";
        for(let n=0;n<column.length;n++){
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
    for(let n=0;n<column.length;n++){
        if(n!=1){
            functions[n].style.display="none";
            functions[n].classList.remove("fades");
            column[n].style.backgroundColor="#5380b8";
        }
    }
}