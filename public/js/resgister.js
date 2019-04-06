
//刷新or取消
// document.getElementById('i77').onclick = function(){
//     //reload() 方法用于重新加载当前文档。
//     location.reload();
// }
// document.getElementById('i222').onclick = function(){
//     location.reload();
// }

//用户名验证
function checkname(){ 
    var div = document.getElementById("div1"); 
    div.innerHTML = ""; 
    var name1 = document.tijiao.text1.value; 
    if (name1 == "") { 
    div.innerHTML = "用户名不能为空！"; 
    document.tijiao.text1.focus(); 
    return false; 
} 
    if (name1.length < 4 || name1.length > 16) { 
    div.innerHTML = "长度4-16个字符"; 
    document.tijiao.text1.select(); 
    return false; 
} 
    var charname1 = name1.toLowerCase(); 
    for (var i = 0; i < name1.length; i++) { 
        //获取charname1中的第i个字符
    var charname = charname1.charAt(i); 
    if (!(charname >= 0 && charname <= 9) && (!(charname >= 'a' && charname <= 'z')) && (charname != '_')) { 
        div.innerHTML = "用户名包含非法字符"; 
        document.form1.text1.select(); 
        return false; 
    } 
} 
    return true;
}

//密码验证
function checkpassword(){ 
    var div = document.getElementById("div2"); 
    div.innerHTML = ""; 
    var password = document.tijiao.text2.value; 
    if (password == "") { 
    div.innerHTML = "密码不能为空"; 
    document.tijao.text2.focus(); 
    return false; 
} 
    if (password.length < 4 || password.length > 16) { 
    div.innerHTML = "密码长度为4-16位"; 
    document.tijiao.text2.select(); 
    return false; 
    } 
    return true; 
}

function checkrepassword(){ 
    var div = document.getElementById("div3"); 
    div.innerHTML = ""; 
    var password = document.tijiao.text2.value; 
    var repass = document.tijiao.text3.value; 
    if (repass == "") { 
        div.innerHTML = "密码不能为空"; 
        document.tijiao.text3.focus(); 
    return false; 
} 
    if (password != repass) { 
        div.innerHTML = "密码不一致"; 
        document.tijiao.text3.select(); 
    return false; 
} 
    return true; 
}
//邮箱验证
function checkEmail(){ 
    var div = document.getElementById("div4"); 
    div.innerHTML = ""; 
    var email = document.tijiao.text5.value; 
    var sw = email.indexOf("@", 0); 
    var sw1 = email.indexOf(".", 0); 
    var tt = sw1 - sw; 
    if (email.length == 0) { 
        div.innerHTML = "邮箱不能为空"; 
        document.tijiao.text5.focus(); 
    return false; 
    } 

    if (email.indexOf("@", 0) == -1) { 
        div.innerHTML = "必须包含@符号"; 
        document.tijiao.text5.select(); 
    return false; 
    } 

    if (email.indexOf(".", 0) == -1) { 
        div.innerHTML = "必须包含.符号"; 
        document.tijiao.text5.select(); 
    return false; 
    } 

    if (tt == 1) { 
        div.innerHTML = "@和.不能一起"; 
        document.tijiao.text5.select(); 
    return false; 
    }

    if (sw > sw1) { 
        div.innerHTML  = "@符号必须在.之前"; 
        document.tijiao.text5.select(); 
    return false; 
    } 
    else { 
    return true; 
    }
    return ture; 
}

function check(){ 
    if (checkname() && checkpassword() && checkrepassword() && checkEmail()) { 
    return true; 
    } 
    else { 
     return false; 
    } 
} 
