var getmessage=document.getElementsByClassName("get_message")[0];
var myPopup=document.getElementById("myPopup");
var head=document.getElementsByClassName("head")[0];
var message=document.getElementsByClassName("getmessage");
var mrinput=document.getElementsByClassName("mr_input");
var sex=document.getElementsByName("sex");
var endland=document.getElementById("end_land");
var begin=document.getElementById("begin");
var sex;
var phone;
var id;
var control;
{  if(sessionStorage.getItem('age')==null){
        alert("请先登录您的管理账号！");
        window.location.assign("land.html");
    }
    getmessage.innerHTML=sessionStorage.getItem('us');
    begin.innerHTML=sessionStorage.getItem('us')+",欢迎使用餐厅程序!";
    message[0].innerHTML=sessionStorage.getItem('us');
    if(sessionStorage.getItem('sex')==0){
        message[1].innerHTML="男";
        sex[0].checked=true;
    }else{
        message[1].innerHTML="女";
        sex[1].checked=true;
    }
    message[2].innerHTML=sessionStorage.getItem('age');
    message[3].innerHTML=sessionStorage.getItem('phone');
    message[4].innerHTML=sessionStorage.getItem('_id');
    mrinput[0].value=sessionStorage.getItem('us');
    mrinput[1].value=sessionStorage.getItem('age');
    mrinput[2].value=sessionStorage.getItem('phone');
    mrinput[3].value=sessionStorage.getItem('_id');
    land.style.display="none";
    getmessage.style.display="block";
}
//获取登录人的个人信息
getmessage.onmouseover=()=>{
    myPopup.style.opacity="0.8";
}
getmessage.onmouseout=()=>{
    myPopup.style.opacity="0";
}
$("#mr_b").click(function(){
    let sexn=0;
    if(sex[0].checked==true){
        sexn=0;
    }else{
        sexn=1;
    }
    $.post('http://118.195.129.130:3000/user/mod',{"us":mrinput[0].value,"age":mrinput[1].value,"phone":mrinput[2].value,"_id":mrinput[3].value,"sex":sexn},
    function(date){
        alert(date.msg);
        if(date.msg=="修改成功"){
            $.post('http://118.195.129.130:3000/user/inquire',{"_id":mrinput[3].value},
            function(date){
            message[0].innerHTML=date.data[0].us;
            if(date.data[0].sex==0){
                message[1].innerHTML="男";
                sex[0].checked=true;
            }else{
                message[1].innerHTML="女";
                sex[1].checked=true;
            }
            message[2].innerHTML=date.data[0].age;
            message[3].innerHTML=date.data[0].phone;
            message[4].innerHTML=date.data[0]._id;
            })
        }
    })
});
//修改登录用户的个人信息;
endland.onclick=()=>{
    var choose=confirm("你确定退出当前用户？");
    if(choose){
        window.location.assign("land.html");
    }
}