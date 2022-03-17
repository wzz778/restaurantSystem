var food=document.getElementById("food");
var fteam=document.getElementsByClassName("food_main")[0];
var fpagenumber=document.getElementById("fpage_number");
var fteamb=document.getElementsByClassName("food_b")[0];
var fteamf=document.getElementsByClassName("food_fade");
var fpage=fteamb.getElementsByTagName("input")[0];
var fa=fteamb.getElementsByTagName("a");
var fade=document.getElementsByClassName("fade");
var foodadd=document.getElementById("food_addf");
var registermain=document.getElementById("register_main");
var fooddelete=document.getElementById("food_delete");
var fteamall=document.getElementsByName("food_all")[0];
var fteama=document.getElementsByName("food_a");
var foodrevise=document.getElementById("food_revise_b");
fade[2].onclick=()=>{
    fteamf[0].style.top="-500px";
}
fade[3].onclick=()=>{
    fteamf[1].style.top="-500px";
}
foodadd.onclick=()=>{
    fteamf[0].style.top="20vh";
}
function fooddeletef(){
    let choose=confirm("你确定删除选中菜品的信息?");
    let fteamd=document.getElementsByClassName("food_delete");
    if (choose) {
        for(let i in fteama){
            if(fteama[i].checked){
                let id=fteamd[i].parentNode.parentNode.children[6].innerHTML;
                $.post('http://118.195.129.130:3000/food/del',{"_id":id},
                function(date){
                    fchangepage();
                })
            }
        }
        alert("删除成功");
    }
}
fooddelete.onmousemove=function(){
    let c=false;
    for(let i in fteama){
        if(fteama[i].checked){
            c=true;
        }
    }
    if(!c){
        fooddelete.style.cursor="not-allowed";
        fooddelete.onclick=()=>{
            alert("请勾选你要删除的对象！");
        };
    }else{
        fooddelete.style.cursor="pointer";
        fooddelete.onclick=fooddeletef;
    }
}
function fr(){
    let fteamr=document.getElementsByClassName("food_revise");
    let fteamd=document.getElementsByClassName("food_delete");
    let ftri=document.getElementsByClassName("food_reivse_input");
    let fts=document.getElementsByName("food_type");
    for(let n in fteamd){
        fteamd[n].onclick=function(){
            let us=fteamd[n].parentNode.parentNode.children[1].innerHTML;
            let choose=confirm("你是否确定删除" + us + "的信息?");
            let id=fteamd[n].parentNode.parentNode.children[6].innerHTML;
            if (choose == true) {
                $.post('http://118.195.129.130:3000/food/del',{"_id":id},
                function(date){
                    alert(date.msg);
                    fchangepage();
                })
            }
        }
    }
    for(let n in fteamr){
        fteamr[n].onclick=function(){
            fteamf[1].style.top="20vh";
            let name=fteamd[n].parentNode.parentNode.children[1].innerHTML;
            let typeid=fteamd[n].parentNode.parentNode.children[2].innerHTML;
            let typeidn;
            if(typeid=="面"){
                typeidn=0;
            }
            else if(typeid=="米"){
                typeidn=1;
            }
            else if(typeid=="饮品"){
                typeidn=2;
            }
            else if(typeid=="水果"){
                typeidn=3;
            }
            let price=fteamd[n].parentNode.parentNode.children[3].innerHTML;
            let desc=fteamd[n].parentNode.parentNode.children[4].innerHTML;
            let typename=fteamd[n].parentNode.parentNode.children[5].innerHTML;
            let id=fteamd[n].parentNode.parentNode.children[6].innerHTML;
            ftri[0].value=name;
            ftri[1].value=price;
            ftri[2].value=desc;
            ftri[3].value=typename;
            fts[typeidn].checked=true;
            foodrevise.onclick=function(){
                let ftri=document.getElementsByClassName("food_reivse_input");
                let fts=document.getElementsByName("food_type");
                let typeidn;
                for(let n=0;n<4;n++){
                    if(fts[n].checked){
                        typeidn=n;
                    }
                }
                const choose=confirm("你是否确定修改该菜品的信息?");
                if (choose == true) {
                    $.post('http://118.195.129.130:3000/food/update',{"_id":id,"name":ftri[0].value,"price":ftri[1].value,"desc":ftri[2].value,"typename":ftri[3].value,"typeid":typeidn},
                    function(date){
                        alert(date.msg);
                        fchangepage();
                    })
                }
            }
        }
    }
}

function fchangepage(){
    let p=fpage.value;
    fa[1].innerHTML=p;
    $.get('http://118.195.129.130:3000/food/allpage',{"Null":0},
        function(date){
        let pagen=parseInt(date.pages/10)+1;
        if(p>pagen||p<=0&&p!=""){
            alert("请输入合理的页数！");
        }
        fpagenumber.innerHTML="总共有"+date.pages+"个菜品，总共"+pagen+"页"; 
        fa[0].onclick=()=>{
            var n=parseInt(fa[1].innerHTML);
            if(n>0&&n<pagen){
            fa[1].innerHTML=n+1;
            fpage.value=fa[1].innerHTML;
            fchangepage();
            }
        }
    })
    $.post('http://118.195.129.130:3000/food/getInfoByPage',{"page":p,"per_page":10},
    function(date){
        fteam.innerHTML="<tr class='ftmt'><th class='fms'><input type='checkbox' onchange='ss()' name='food_all' value='all'></th>"+
        "<th class='fms'>菜名</th>"+
        "<th class='fms'>菜类型</th>"+
        "<th class='fms'>价格</th>"+
        "<th class='fml'>描述</th>"+
        "<th class='fms'>类型名称</th>"+
        "<th class='fml'  style='display: none;'>操作码</th>"+
        "<th class='fml'>操作</td></tr>";
        for(let n=0;n<date.data.length;n++){
            let typeid;
            if(date.data[n].typeid==0){
                typeid="面";
            }
            else if(date.data[n].typeid==1){
                typeid="米";
            }
            else if(date.data[n].typeid==2){
                typeid="饮品";
            }
            else{
                typeid="水果";
            }
            fteam.innerHTML+="<tr><td class='fms'><input type='checkbox' name='food_a' value='all'></td>"+
            "<td class='fms'>"+date.data[n].name+"</td>"+
            "<td class='fms'>"+typeid+"</td>"+
            "<td class='fms'>"+date.data[n].price+"</td>"+
            "<td class='fml'>"+date.data[n].desc+"</td>"+
            "<td class='fms'>"+date.data[n].typename+"</td>"+
            "<td class='fml'  style='display: none;'>"+date.data[n]._id+"</td>"+
            "<td class='fml'><a class='mr food_revise' href='javascript:;'><i class='fa fa-pencil-square-o' aria-hidden='true'></i>修改</a>"+
            "<a class='fmd food_delete' href='javascript:;'><i class='fa fa-minus-square-o' aria-hidden='true'></i>删除</a></td></tr>";
            let ms=document.getElementsByClassName("fms");
            let ml=document.getElementsByClassName("fml");
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
        fr();
    })
}
fchangepage();
fa[2].onclick=()=>{
    var n=parseInt(fa[1].innerHTML);
    if(n>1&&n<21){
    fa[1].innerHTML-=1;
    fpage.value=fa[1].innerHTML;
    fchangepage();
    }
}
$("#food_add_b").click(function(){
    var input=document.getElementsByClassName("food_add_input");
    let typeid;
    var fas=document.getElementsByClassName("food_add_type");
    for(let n=0;n<4;n++){
        if(fas[n].checked){
            typeid=n;
        }
    }
    $.post('http://118.195.129.130:3000/food/add',{"name":input[0].value,"price":input[1].value,"desc":input[2].value,"typename":input[3].value,"typeid":typeid},
    function(date){
        alert(date.msg);
        if(date.msg=="添加成功"){
            for(let n in input){
                input[n].value="";
            }
            fchangepage();
        }
    })
});
function ss(){
    var foodall=document.getElementsByName("food_all")[0];
    if(foodall.checked){
        for(let n in fteama){
            fteama[n].checked=true;
        }
    }
    else if(foodall.checked==false){
        for(let n in fteama){
            fteama[n].checked=false;
        }
    }
}
function foodfind(){
    let name=document.getElementsByClassName("food_find_input")[0].value;
    $.post('http://118.195.129.130:3000/food/getInfoByKw',{"kw":name},
        function(date){
            fteam.innerHTML="<tr class='ftmt'><th class='fms'><input type='checkbox' onchange='ss()' name='food_all' value='all'></th>"+
            "<th class='fms'>菜名</th>"+
            "<th class='fms'>菜类型</th>"+
            "<th class='fms'>价格</th>"+
            "<th class='fml'>描述</th>"+
            "<th class='fms'>类型名称</th>"+
            "<th class='fml'  style='display: none;'>操作码</th>"+
            "<th class='fml'>操作</td></tr>";
            for(let n=0;n<date.data.length;n++){
                let typeid;
                if(date.data[n].typeid==0){
                    typeid="面";
                }
                else if(date.data[n].typeid==1){
                    typeid="米";
                }
                else if(date.data[n].typeid==2){
                    typeid="饮品";
                }
                else{
                    typeid="水果";
                }
                fteam.innerHTML+="<tr><td class='fms'><input type='checkbox' name='food_a' value='all'></td>"+
                "<td class='fms'>"+date.data[n].name+"</td>"+
                "<td class='fms'>"+typeid+"</td>"+
                "<td class='fms'>"+date.data[n].price+"</td>"+
                "<td class='fml'>"+date.data[n].desc+"</td>"+
                "<td class='fms'>"+date.data[n].typename+"</td>"+
                "<td class='fml'  style='display: none;'>"+date.data[n]._id+"</td>"+
                "<td class='fml'><a class='mr food_revise' href='javascript:;'><i class='fa fa-pencil-square-o' aria-hidden='true'></i>修改</a>"+
                "<a class='fmd food_delete' href='javascript:;'><i class='fa fa-minus-square-o' aria-hidden='true'></i>删除</a></td></tr>";
        }
        fr();
    })
}