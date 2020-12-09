
function ajax(method,url,isSync,data){
    var result
  var xhr =new XMLHttpRequest()
      if(method=='post'){
        xhr.open(method,url,isSync)
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')
        xhr.send(data)
      }
      result=listen(xhr)
      return (result)
}
function listen(xhr){
    xhr.onreadystatechange=()=>{
        if(xhr.readyState==4 && xhr.status==200){
            return (xhr.responseText)
        }
    }
}