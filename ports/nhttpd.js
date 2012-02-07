// nhttpd configuration port

window.PortNHTTPD={}

;(function(exports){

exports.init=function init(persistence,o,args){var nhttpd_conf_path,dispatch_path,read,write

read=persistence.read
write=persistence.write
nhttpd_conf_path=args[0]
o.devmode=devmode
o.dispatch_ls=dispatch_ls
o.dispatch_cd=dispatch_cd
o.dispatch_insert_before=dispatch_insert_before
o.dispatch_update=dispatch_update
if(!o)throw new Error('missing path argument')
identify()
read('dispatch_path',function(e,s){
  dispatch_path=e?'':s
  identify()})

function devmode(devmode_path){
  }

function dispatch_ls(out){
  xhr('GET',current_path(),null,function(x){out(x.responseText)})
  }

function dispatch_cd(path,out){
  dispatch_path=path[0]=='/'?path.slice(1):dispatch_path+path // XXX horrid
  write('dispatch_path',dispatch_path)
  identify()
  out(dispatch_path)}

function dispatch_insert_before(matchtype,matchtok,value,ref,out){
  req={before:ref
      ,value:[matchtype,matchtok,value]}
  conf_dispatch_POST(req,out)}

function dispatch_update(placement,ref,value,out){
  req={value:value}
  if(ref===undefined)ref=true
  req[placement]=ref
  conf_dispatch_POST(req,out)}

function conf_dispatch_POST(obj,out){var uri
  uri=current_path()
  xhr({method:'POST',headers:{"Content-Type":"application/json"}},uri,JSON.stringify(obj),function(x){
    out(x.status+'\n'+x.responseText)})}

function current_path(){return nhttpd_conf_path+"dispatch/"+dispatch_path}

function identify(){
  o.event('identify','nhttpd: '+current_path())}

}

})(PortNHTTPD);