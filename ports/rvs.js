/* Revstore port
 */

window.PortRevstore={}

;(function(exports){"use strict"

exports.init=init

function init(persistence,o,args){var revstore_root
  o.history=history
  o.cd=cd
  o.cat=cat
  o.ls=ls
  o.mv=mv
  o.ln=ln
  o.rm=rm
  o.put=put
  revstore_root=o.revstore_root=args[0]
  o.PWD=args[0]
  o.update=update
  o.persist=persist
  o.resolve=resolve_relative
  o.parse_history=parse_history
  persistence.read("path",function(e,x){o.PWD=x||revstore_root;update()})
  function update(){
    o.event('identify','rvs: '+o.PWD)}
  function persist(){
    persistence.write("path",o.PWD)}
  function history(path,out){
    xhr('GET',resolve(o.PWD,path||'')+'?history',null,function(x){var a,i,l,ts,ret
      a=JSON.parse(x.responseText)
      ts=0
      ret=[]
      for(i=0,l=a.length;i<l;i++){
        if(typeof a[i]=='string'){
          ret.push('as: '+a[i]);continue}
        ts+=a[i]
        ret.push(ts)}
      out(ret)})}
  function cd(path){
    return o.PWD=resolve(o.PWD,path)}
  function cat(path,out){
    xhr('GET',resolve(o.PWD,path),null,function(x){out(x.responseText)})}
  function ls(path,out){
    xhr('GET',resolve(o.PWD,path||'')+'?text',null,function(x){out(x.responseText.split('\n'))})}
  function mv(from,to,out){
    xhr({method:'MOVE'
        ,headers:{Destination:reroot(resolve(o.PWD,to))}},resolve(o.PWD,from),null,
      function(x){
        out(x.responseText)})}
  function ln(target,link_location,out){
    xhr({method:'POST',headers:{'X-Link-With':reroot(resolve(o.PWD,target))}}
       ,resolve(o.PWD,link_location)
       ,null
       ,function(x){out(x.responseText)})}
  function rm(path,out){
    xhr('DELETE',resolve(o.PWD,path),null,function(x){
      out(x.responseText)})}
  function put(data,path,out){
    xhr('PUT',resolve(o.PWD,path),data,function(x){out(x.responseText+' '+x.status)})}
/* old GET verb using rvs as fetch-to-storage proxy
"get_rvs":{"desc":"Store the result of a GET request to a remote server in the revision store"
       ,"args":["remote http URL","local relative path to store result"]
       ,"env-in":["PWD"]
       ,"f":"function(cmd){xhr({method:'POST',headers:{'X-Request-From':cmd.args[0]}},cmd.args[1],null,function(x){cmd.out(x.responseText)})}"}
,
*/
  function reroot(path){
    if(path.slice(0,o.revstore_root.length)==revstore_root)return path.slice(revstore_root.length-1)
    return path}
  function resolve_relative(path){
    return resolve(o.PWD,path)}
  function parse_history(s){var a,ret=[],ts=0,path='',i,l
    a=JSON.parse(s)
    for(i=0,l=a.length;i<l;i++){
      if(typeof a[i]=='number'){ts+=a[i];ret.push({path:path,ts:ts})}
      else path=a[i]}
    return ret}
}

})(PortRevstore);
