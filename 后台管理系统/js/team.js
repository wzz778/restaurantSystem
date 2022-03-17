var team=document.getElementsByClassName("team_main")[0];
var pagenumber=document.getElementById("page_number");
var teamb=document.getElementsByClassName("team_b")[0];
var teamf=document.getElementsByClassName("team_fade");
var fade=document.getElementsByClassName("fade");
var teamadd=document.getElementById("team_add");
var registermain=document.getElementById("register_main");
var teamdelete=document.getElementById("team_delete");
var teamall=document.getElementsByName("team_all")[0];
var teama=document.getElementsByName("team_a");
var teamrevise=document.getElementById("team_revise_b");
fade[0].onclick=()=>{
    teamf[0].style.top="-500px";
}
fade[1].onclick=()=>{
    teamf[1].style.top="-500px";
}
teamadd.onclick=()=>{
    teamf[0].style.top="20vh";
}
function teamdeletef(){
    let choose=confirm("你确定删除选中人的信息?");
    let teamd=document.getElementsByClassName("team_delete");
    if (choose) {
        for(let i in teama){
            if(teama[i].checked){
                var id=teamd[i].parentNode.parentNode.children[5].innerHTML;
                $.post('http://118.195.129.130:3000/users/del_users',{"_id":id},
                function(date){
                    changepage();
                })
            }
        }
        alert("删除成功");
    }
}
//批量删除
teamdelete.onmousemove=function(){
    let c=false;
    for(let i in teama){
        if(teama[i].checked){
            c=true;
        }
    }
    if(!c){
        teamdelete.style.cursor="not-allowed";
        teamdelete.onclick=()=>{
            alert("请勾选你要删除的对象！");
        };
    }else{
        teamdelete.style.cursor="pointer";
        teamdelete.onclick=teamdeletef;
    }
}
//空选删除处理
function r(){
    let teamr=document.getElementsByClassName("team_revise");
    let teamd=document.getElementsByClassName("team_delete");
    let tri=document.getElementsByClassName("team_reivse_input");
    let ts=document.getElementsByName("team_sex");
    for(let n in teamd){
        teamd[n].onclick=function(){
            let us=teamd[n].parentNode.parentNode.children[1].innerHTML;
            let choose=confirm("你是否确定删除" + us + "的信息?");
            let id=teamd[n].parentNode.parentNode.children[5].innerHTML;
            if (choose == true) {
                $.post('http://118.195.129.130:3000/users/del_users',{"_id":id},
                function(date){
                    alert(date.msg);
                    changepage();
                })
            }
        }
    }
    for(let n in teamr){
        teamr[n].onclick=function(){
            teamf[1].style.top="20vh";
            let us=teamd[n].parentNode.parentNode.children[1].innerHTML;
            let sexn=teamd[n].parentNode.parentNode.children[2].innerHTML;
            let sex=sexn=="男"?0:1;
            let age=teamd[n].parentNode.parentNode.children[3].innerHTML;
            let id=teamd[n].parentNode.parentNode.children[5].innerHTML;
            tri[0].value=us;
            tri[1].value=age;
            if(sex==0){
                ts[0].checked=true;
            }else{
                ts[1].checked=true;
            }
            teamrevise.onclick=function(){
                let tri=document.getElementsByClassName("team_reivse_input");
                let ts=document.getElementsByName("team_sex");
                let sex=ts[0].checked==true?0:1;
                var choose=confirm("你是否确定修改该成员的信息?");
                if (choose == true) {
                    $.post('http://118.195.129.130:3000/users/update_users',{"_id":id,"us":tri[0].value,"age":tri[1].value,"sex":sex},
                    function(date){
                        alert(date.msg);
                        changepage();
                    })
                }
            }
        }
    }
}
//遍历每个用户的单个删除与信息修改
var a=teamb.getElementsByTagName("a");
var page=teamb.getElementsByTagName("input")[0];
function changepage(){
    let p=page.value;
    a[1].innerHTML=p;
    $.get('http://118.195.129.130:3000/users/allpage_users',{"Null":0},
        function(date){
       var pagen=parseInt(date.pages/10)+1;
       if(p>pagen||p<=0&&p!=""){
        alert("请输入合理的页数！");
        }
        pagenumber.innerHTML="总共有"+date.pages+"位用户,总共"+pagen+"页";
        a[0].onclick=()=>{
            let n=parseInt(a[1].innerHTML);
            if(n>0&&n<pagen){
            a[1].innerHTML=n+1;
            page.value=a[1].innerHTML;
            changepage();
            }
        }
    })
    //获取用户数与总页数；
    $.post('http://118.195.129.130:3000/users/getInfoByPage_users',{"page":p,"per_page":10},
    function(date){
        team.innerHTML="<tr class='tmt'><th class='ms'><input type='checkbox' onchange='s()' name='team_all' value='all'></th>"+
        "<th class='ms'>用户名</th>"+
        "<th class='ms'>性别</th>"+
        "<th class='ms'>年龄</th>"+
        "<th class='ml'>电话</th>"+
        "<th class='ml'  style='display: none;'>操作码</th>"+
        "<th class='ml'>操作</td></tr>";
        for(let n=0;n<date.data.length;n++){
            let sex;
            if(date.data[n].sex==0){
                sex="男";
            }else{
                sex="女";
            }
            team.innerHTML+="<tr><td class='ms'><input type='checkbox' name='team_a' value='all'></td>"+
            "<td class='ms'>"+date.data[n].us+"</td>"+
            "<td class='ms'>"+sex+"</td>"+
            "<td class='ms'>"+date.data[n].age+"</td>"+
            "<td class='ml'>"+date.data[n].phone+"</td>"+
            "<td class='ml'  style='display: none;'>"+date.data[n]._id+"</td>"+
            "<td class='ml'><a class='mr team_revise' href='javascript:;'><i class='fa fa-pencil-square-o' aria-hidden='true'></i>修改</a>"+
            "<a class='md team_delete' href='javascript:;'><i class='fa fa-minus-square-o' aria-hidden='true'></i>删除</a></td></tr>";
            let ms=document.getElementsByClassName("ms");
            let ml=document.getElementsByClassName("ml");
            for(let i in ms){
                if(ms[i].innerHTML=="null"||ms[i].innerHTML=="undefined"){
                    ms[i].innerHTML=" ";
                }
            }
            for(let i in ml){
                if(ml[i].innerHTML=="null"||ml[i].innerHTML=="undefined"){
                    ml[i].innerHTML=" ";
                }
            }
        }
        //获取一页的用户信息
        r();
    })
}
changepage();
a[2].onclick=()=>{
    let n=parseInt(a[1].innerHTML);
    if(n>1&&n<11){
    a[1].innerHTML-=1;
    page.value=a[1].innerHTML;
    changepage();
    }
}
$("#add_number").click(function(){
    let input=document.getElementsByClassName("registerinput");
    $.post('http://118.195.129.130:3000/user/reg',{"us":input[0].value,"ps":input[1].value,"mail":input[2].value,"code":input[3].value},
    function(date){
        if(date.msg=="注册成功"){
            alert("添加成功!");
            for(let n in input){
                input[n].value="";
            }
            changepage();
        }
    })
});
//添加新用户
$("#passcode_number").click(()=>{
    let mail=document.getElementsByClassName("registerinput")[2].value;
    $.post('http://118.195.129.130:3000/user/getMailCode',{"mail":mail},
    function(date){
        alert(date.msg);
    })
});
//获取验证码
function s(){
    const teamall=document.getElementsByName("team_all")[0];
    if(teamall.checked){
        for(let n=0;n<teama.length;n++){
            teama[n].checked=true;
        }
    }
    else if(teamall.checked==false){
        for(let n=0;n<teama.length;n++){
            teama[n].checked=false;
        }
    }
}
//实现全选功能
function teamfind(){
    let name=document.getElementsByClassName("team_find_input")[0].value;
    $.post('http://118.195.129.130:3000/users/getInfoByKw_users',{"kw":name},
        function(date){
            team.innerHTML="<tr class='tmt'><th class='ms'><input type='checkbox' onchange='s()' name='team_all' value='all'></th>"+
        "<th class='ms'>用户名</th>"+
        "<th class='ms'>性别</th>"+
        "<th class='ms'>年龄</th>"+
        "<th class='ml'>电话</th>"+
        "<th class='ml'  style='display: none;'>操作码</th>"+
        "<th class='ml'>操作</td></tr>";
        for(let n=0;n<date.data.length;n++){
            let sex;
            if(date.data[n].sex==0){
                sex="男";
            }else{
                sex="女";
            }
            team.innerHTML+="<tr><td class='ms'><input type='checkbox' name='team_a' value='all'></td>"+
            "<td class='ms'>"+date.data[n].us+"</td>"+
            "<td class='ms'>"+sex+"</td>"+
            "<td class='ms'>"+date.data[n].age+"</td>"+
            "<td class='ml'>"+date.data[n].phone+"</td>"+
            "<td class='ml'  style='display: none;'>"+date.data[n]._id+"</td>"+
            "<td class='ml'><a class='mr team_revise' href='javascript:;'><i class='fa fa-pencil-square-o' aria-hidden='true'></i>修改</a>"+
            "<a class='md team_delete' href='javascript:;'><i class='fa fa-minus-square-o' aria-hidden='true'></i>删除</a></td></tr>";
        }
        r();
        })
}
//查找页面栏目
