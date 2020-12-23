function ajax(ajaxObj){  
    // console.log(objToStr(ajaxObj.data)+'------ajax');
    var xhr = new XMLHttpRequest();
    if(ajaxObj.type=="get"){
        xhr.open(ajaxObj.type,ajaxObj.url+ajaxObj.port+ajaxObj.path+'?'+objToStr(ajaxObj.data),true);
        xhr.send();
    }else if(ajaxObj.type=="post"){
        xhr.open(ajaxObj.type,ajaxObj.url+ajaxObj.port+ajaxObj.path,true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(objToStr(ajaxObj.data));
        console.log(ajaxObj.data);
    }
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            var r = xhr.responseText;
            ajaxObj.success(r);
        }else{
            xhr.onerror=function(err){
            ajaxObj.error(err);
            }
        } 
    }
}
function objToStr(obj){
    var arr = [];
    for(var i in obj){
        arr.push(i+'='+obj[i]);
    }
    return arr.join('&')
}