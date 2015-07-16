var expira=new Date();
expira = expira.getTime() + 86400000;
//reiniciar();
eliminarBloqueado();
isbloqueado();
function getCookie(name){
    var cname = name + "=";               
    var dc = document.cookie;             
    if (dc.length > 0) {              
        begin = dc.indexOf(cname);       
        if (begin != -1) {           
            begin += cname.length;       
            end = dc.indexOf(";", begin);
            if (end == -1) end = dc.length;
                return unescape(dc.substring(begin, end));
        } 
    }
    return null;
}


function eliminarBloqueado(){
        var hr = new XMLHttpRequest();
        var fechabloqueado;
        var fechaactual=new Date();
        var nuevalista = {};
        hr.open("GET", "json/lista.json", true);
        hr.setRequestHeader("Content-type", "application/json", true);
        hr.send();
        hr.onreadystatechange = function() {
        if(hr.readyState == 4 && hr.status == 200) {
            var data = JSON.parse(hr.responseText);
            for(var obj in data){
                if(fechaactual.getTime() >= data[obj].periodo){
                    data.splice(obj,1);
                }
            }
            var nuevojson = JSON.stringify(data);
            document.cookie ='jsonarchivo='+nuevojson+';';
            guardar();
        }   
        }

}



function setCookie(name, value, expires, path, domain, secure) {
    document.cookie = name + "=" + escape(value) + 
    ((expires == null) ? "" : "; expires=" + expires.toGMTString()) +
    ((path == null) ? "" : "; path=" + path) +
    ((domain == null) ? "" : "; domain=" + domain) +
    ((secure == null) ? "" : "; secure");
}

function contador(){
    var contador=getCookie( "intentos" );
    ++contador;
    setCookie( "intentos", contador );
    return contador;
}

function reiniciar(){
    setCookie("intentos", 0 );
}

function myIP() {
    if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
    else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

    xmlhttp.open("GET","http://api.hostip.info/get_html.php",false);
    xmlhttp.send();

    hostipInfo = xmlhttp.responseText.split("\n");

    for (i=0; hostipInfo.length >= i; i++) {
        ipAddress = hostipInfo[i].split(":");
        if ( ipAddress[0] == "IP" ) return ipAddress[1];
    }

    return false;
}

function isbloqueado(){
    var aux;
    var results = document.getElementById("results");
    var hr = new XMLHttpRequest();
    hr.open("GET", "json/lista.json", true);
    hr.setRequestHeader("Content-type", "application/json", true);
    hr.send();
    var ip = myIP();
    hr.onreadystatechange = function() {
        if(hr.readyState == 4 && hr.status == 200) {
            var data = JSON.parse(hr.responseText);
            for(var obj in data){
                if(ip == data[obj].ip){
                   location="http://www.google.com"
                }
            }
        }  
    }
}

function guardar(){
    document.getElementById('iframe').src="index.php";
    return false;
}

function validar(){
    var aux;
    var results = document.getElementById("results");
    var hr = new XMLHttpRequest();
    if(contador() == 5){
        hr.open("GET", "json/lista.json", true);
        hr.setRequestHeader("Content-type", "application/json", true);
        hr.send();
        hr.onreadystatechange = function() {
        if(hr.readyState == 4 && hr.status == 200) {
            var data = JSON.parse(hr.responseText);
            data.push({ip: myIP(), periodo: expira});
            var nuevojson = JSON.stringify(data);
            document.cookie ='jsonarchivo='+nuevojson+';';
            guardar();
            location="http://www.google.com" 
        }   
        }
    }else{

    }
}