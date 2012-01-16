function cEl(tn){return document.createElement(tn)}
function byId(id){return document.getElementById(id)}
function cTN(s){return document.createTextNode(s)}
function byClass(cls){return Array.prototype.slice.call(document.body.getElementsByClassName(cls))}
function removeEl(el){if(el&&el.parentNode)el.parentNode.removeChild(el)}
function replaceEl(old,_new){old.parentNode.replaceChild(_new,old)}
//function removeEl(el){el.parentNode.removeChild(el)}
function emptyEl(el){var el_p,el_sib
 el_p=el.parentNode;el_sib=el.nextSibling
 el_p.removeChild(el) // DOM reflows can make clearing an element slow in older browsers so we remove from the DOM first
 while(el.firstChild)el.removeChild(el.firstChild)
 el_p.insertBefore(el,el_sib)}

function handleTextChange(el,f,ms){var timeout
 el.onclick=el.onmouseup=el.onkeyup=handler
 function handler(){
  if(timeout){clearTimeout(timeout);timeout=null}
  timeout=setTimeout(function(){f(el.value)},ms)}}

function xhr(method,uri,body,callback){var headers,p
  // instead of a method string, the first argument can be an object with method and headers properties
  if(typeof method==='object'){headers=method.headers;method=method.method}
  var x=new XMLHttpRequest()
  x.onreadystatechange=function(){if (x.readyState==4){callback(x)}}
  x.open(method,uri,true)
  if(headers) for(p in headers){x.setRequestHeader(p,headers[p])}
  x.send(body)}

function GET_all(uris,cb){var pending,results
 pending=uris.length
 results=[]
 if(!pending){cb(results)}
 uris.forEach(function(uri,i,a){xhr('GET',uri,null,function(x){
  results[i]=x
  if(!--pending)cb(results)})})}

function boundingRect(el){
 if(el.getBoundingClientRect)return el.getBoundingClientRect() // newer browsers have this
 throw new Error('boundingRect unimplemented')
 return {/*...*/}}

function addClass(el,_class){var x // Safari does not like "class" as an identifier
 x=el.className
 if(x.match(RegExp('\\b'+_class+'\\b')))return
 if(x=='')return el.className=_class
 el.className=x+' '+_class}

function removeClass(el,_class){var x,y
 x=el.className
 if(x==_class)return el.className=''
 y=x.replace(RegExp('\\b'+_class+'\\b'),'')
 if(y!=x)el.className=y}

function parseQueryString(s){
 if(s[0]=='?')s=s.slice(1)
 return s.split('&').map(function(s){var pos
  if((pos=s.indexOf('='))<0)return {value:decodeURIComponent(s)}
  return {key:decodeURIComponent(s.slice(0,pos)),value:decodeURIComponent(s.slice(pos+1))}})}

// XXX: these functions don't belong in this file

// unlike POSIX, this dirname() always returns a result that ends with slash
function dirname(path){var components
 components=path.split('/')
 if(components[components.length-1]=="") components.pop()
 return components.slice(0,-1).join('/')+'/'}

// path segments, trailing slashes preserved, empty segments dropped
// '/foo/bar/' -> ['/','foo/','bar/']
// '../foo//bar' -> ['../','foo/','bar']
function path_segments(path){var ret=[]
 path.split('/').forEach(function(s,i,a){if(s||!i)ret.push(s+(i<a.length-1?'/':''))})
 return ret}

function resolve(base,path){var bsegs,psegs,bseg,pseg
 if(path.charAt(0)=='/')return path
 bsegs=path_segments(base)
 psegs=path_segments(path)
 // if the base is not a directory (...actually that should never happen) then remove the file component
 if((bseg=bsegs.pop()).slice(-1)=='/')bsegs.push(bseg)
 while(pseg=psegs.shift()){
  if(pseg=='.'||pseg=='./')continue
  if(pseg=='../'||pseg=='..'){bsegs.pop();if(!bsegs.length)bsegs.push('/')}
  else bsegs.push(pseg)}
 return bsegs.join('')}
