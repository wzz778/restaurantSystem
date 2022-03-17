var toregister=document.getElementById("to_register");
var landmain=document.getElementById("land_main");
var codemain=document.getElementById("land_code_main");
var main=document.getElementsByClassName("main")[0];
var toland=document.getElementsByClassName("to_land");
var tocode=document.getElementById("to_code");
var registermain=document.getElementById("register_main");
var passwordinput=document.getElementById("land_password");
let land=document.getElementById("land");
toregister.onclick=()=>{
    landmain.style.display="none";
    registermain.style.display="block";
    codemain.style.display="none";
    main.style.height="330px";
}
tocode.onclick=()=>{
    codemain.style.display="block";
    registermain.style.display="none";
    landmain.style.display="none";
    main.style.height="250px";
}
toland[1].onclick=()=>{
    registermain.style.display="none";
    landmain.style.display="block";
    codemain.style.display="none";
    main.style.height="250px";
}
toland[0].onclick=()=>{
    registermain.style.display="none";
    landmain.style.display="block";
    codemain.style.display="none";
    main.style.height="250px";
}
function landf(){
    let id=document.getElementById("land_id").value;
    let password=document.getElementById("land_password").value;
    $.post('http://118.195.129.130:3000/user/login',{"us":id,"ps":password},
    function(date){
        alert(date.msg);
        if(date.msg=="登录成功"){
            sessionStorage.setItem("us",date.data[0].us);
            sessionStorage.setItem("age",date.data[0].age);
            sessionStorage.setItem("phone",date.data[0].phone);
            sessionStorage.setItem("_id",date.data[0]._id);
            sessionStorage.setItem("sex",date.data[0].sex);
            window.location.assign("main.html");
        }
    })
}
//登录栏目
land.onclick=landf;
passwordinput.addEventListener("keyup",function(event){
    if(event.keyCode==13){
        landf();
      }
  });