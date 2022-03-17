$("#register").click(function(){
    let input=document.getElementsByClassName("registerinput");
    $.post('http://118.195.129.130:3000/user/reg',{"us":input[0].value,"ps":input[1].value,"mail":input[2].value,"code":input[3].value},
    function(date){
        alert(date.msg);
    })
});
//注册请求
$("#passcode").click(()=>{
    let mail=document.getElementById("register_mail").value;
    $.post('http://118.195.129.130:3000/user/getMailCode',{"mail":mail},
    function(date){
        alert(date.msg);
    })
});
//发送验证码请求