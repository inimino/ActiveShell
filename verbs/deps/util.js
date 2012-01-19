/* Various debugging utilities and convenience functions */

function dir(o){var a=[],p;for(p in o){a.push(p)}return a.sort().join('\n')}

function test_pp(){
 var a=[],f=function(x){a.push(x)},circular=[],o
 circular[0]=circular 
 f(pp(['foo','bar',42]))
 o=[{str:'foo',x:'bar\n"baz"\nquux'},{str:'baz',y:['xyzzy','quux','foo'],z:undefined,zz:null,f:f,foo:[true,false],circular:circular}]
 o[1].self=o[1]
 f(pp([o]))
 return a.join('\n\n')}

function pp(o,depth){return pp_r(o,'',depth==undefined?32:depth)}

function pp_r(o,ss,d){var a=[],p
 if(!d)return '…'
 if(o===undefined)return 'undefined'
 if(o===null)return 'null'
 switch(typeof o){
 case 'boolean':return o.toString()
 case 'string':return pp_quote(o)
 case 'number':return o.toString()
 case 'function':return o.toString().replace(/\s+/g,'').replace(/(.{32}).+/,'$1…')}
 if(o.constructor==Array){
  o.forEach(function(e,i){
   a.push(pp_r(o[i],' '+ss,d-1))})
  return '['+a.join('\n'+ss+',')+']'}
 if(o.constructor==Date)return o.toString()
 for(p in o) if(o.hasOwnProperty(p))
  a.push(p+':'+pp_r(o[p],(',:'+p).replace(/./g,' ')+ss,d-1))
 return '{'+a.join('\n'+ss+',')+'}'}

pp=pp_smart

// pp_smart outputs sharp variables (like Mozilla), (optionally) re-orders object properties so that the largest ones come at the end (which makes reading deeply nested objects much easier), and tries to produce much more compact output by compressing properties and array members onto the same line when possible up to some specified line length (by default 80 chars)

// x, n_rows, n_cols
function pp_smart(x,opts){var parents=[],refs=[,]
 opts=opts||{}
 default_('rows',Infinity)
 default_('cols',72)
 default_('show_f',function(f){return (''+f).replace(/\s+/g,' ').replace(/(.{32}).{16,}/,'$1…')})
 default_('reorder',true)
 default_('string_escape',false)
 default_('string_limit',64)
 default_('hide',[])
 parents=[]
 return go(x,"")
 function default_(k,v){if(opts[k]===undefined)opts[k]=v}
 function lines(s){return s.split('\n').length}
 function go(x,ss){var i,l,a=[],sub,cols,p,defer=[]
  if(x===undefined)return 'undefined'
  if(x===null)return 'null'
  switch(typeof x){
   case 'string':return pp_quote(x,opts).replace(/\n/g,'\n '+ss)
   case 'boolean':
   case 'number':return ''+x
   case 'function':return opts.show_f(x)}
  if(x.constructor==Date)return x.toString()
  if(x instanceof RegExp)return '/'+x.source+'/'+(x.global?'g':'')+(x.ignorecase?'i':'')+(x.multiline?'m':'')
  cols=opts.cols-ss.length
  if((i=parents.lastIndexOf(x))>-1)refs.push(parents[i])
  if((i=refs.lastIndexOf(x))>-1)return '#'+i+'#'
  if(x.constructor==Array||Array.isArray&&Array.isArray(x)){
   parents.push(x)
   for(i=0,l=x.length;i<l;i++){
    sub=(go(x[i],' '+ss))
    if(a.length) sub=','+sub
    if(sub.indexOf('\n')>-1){
     if(a.length) a.push('\n'+ss)
     a.push(sub)}
    else{
     if(cols-sub.length < 0){a.push('\n'+ss);cols=opts.cols-ss.length}
     a.push(sub)
     cols-=sub.length}}
   parents.pop()
   return ((i=refs.lastIndexOf(x))>-1?'#'+i+'=':'')
        + '['+a.join('')+']'}
  parents.push(x)
  for(p in x) if(Object.prototype.hasOwnProperty.call(x,p)){
   if(opts.hide.indexOf(p)>-1)sub=p+':<hidden>'
   else sub=p+':'+go(x[p],(',:'+p).replace(/./g,' ')+ss)
   if(sub.indexOf('\n')>-1){
    if(opts.reorder)defer.push(sub)
    else{
     if(a.length)sub=','+sub
     if(a.length) a.push('\n'+ss)
     a.push(sub)}}
   else{
    if(a.length)sub=','+sub
    if(cols-sub.length<0 && a.length){a.push('\n'+ss);cols=opts.cols-ss.length}
    a.push(sub)
    cols-=sub.length}}
  defer.sort(function(a,b){var la=lines(a),lb=lines(b); return la==lb?0:la>lb?1:-1})
  for(i=0,l=defer.length;i<l;i++){
   if(a.length) a.push('\n'+ss+',')
   a.push(defer[i])}
  parents.pop()
  return ((i=refs.lastIndexOf(x))>-1?'#'+i+'=':'')
       + '{'+a.join('')+'}'}}

function pp_quote(s,opts){opts=opts||{}
 if(opts.string_escape) s=s.replace(/\\/g,'\\\\').replace(/\n/g,'\\n')
 if(opts.string_limit && s.length>opts.string_limit)s=s.slice(0,opts.string_limit)+'…'
 if(s.indexOf("'")==-1)return "'"+s+"'"
 return '"'+s.replace(/"/g,'\\"')+'"'}

/*

// version for IRC bot
// returns output on a single line, and adds E4X support

function pp(o,depth){return pp_r(o,depth==undefined?8:depth)}

function pp_r(o,d){var a=[],p
 if(!d)return '...'
 if(o===undefined)return 'undefined'
 if(o===null)return 'null'
 switch(typeof o){
 case 'boolean':return o.toString()
 case 'string':return '"'+o.replace(/\n/g,'\\n').replace(/"/g,'\\"')+'"'
 case 'number':return o.toString()
 case 'xml':return o.toXMLString()}
 if(o instanceof RegExp)return '/'+o.source+'/'
 if(typeof o=='function')return o.toString().replace(/\s+/g,' ').replace(/(.{32}).+/,'$1…')
 if(o.constructor==Array){
  o.forEach(function(e,i){
   a.push(pp_r(o[i],d-1))})
  return '['+a.join(',')+']'}
 if(o.constructor==Date){
  return o.toString()}
 for(p in o) if(Object.prototype.hasOwnProperty.call(o,p))
  a.push(p+':'+pp_r(o[p],d-1))
 return '{'+a.join(',')+'}'}

/*
*/

function quote_string_single(s){
 return "'"
      + s.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/'/g,"\\'")
      + "'"}

function quote_string_double(s){
 return '"'
      + s.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/"/g,'\\"')
      + '"'}

(function(){
 function create(){
  function log(o){var x,s=''
   if(arguments.length>1){o=[].concat(Array.prototype.slice.call(arguments))}
   if(log.timing){x=+new Date;s=x-(log.time||x)+'ms\n';log.time=x}
   log.log.push(s+(typeof o=='string'?o:pp(o)));return o}
  log.log=[]
  log.get=function(n){return '\n\n'+log.log.slice(n?-n:0).join('\n\n')}
  log.count=function(){return log.log.length}
  log.clear=function(){log.log=[]}
  log.limit=function(n){if(log.log.length>n)log.log=log.log.slice(-n)}
  return log}
 log=create()
 log.create=create})()

var log

function deepEq(x,y){var p
 if(x===y)return true
 if(typeof x!='object'
 || typeof y!='object')return false
 for(p in x)if(!deepEq(x[p],y[p]))return false
 for(p in y)if(!(p in x))return false
 return true}

function extend(a,b){
 for(var p in b)if(Object.prototype.hasOwnProperty.call(b,p))a[p]=b[p]
 return arguments.length==2?a:extend.apply(null,[a].concat(Array.prototype.slice.call(arguments,2)))}

function event_interface(){var handlers
  handlers={}
  return {on:on
         ,event:event
         }
  function on(e,cb){(handlers[e]=handlers[e]||[]).push(cb)}
  function event(e,a1,a2){var args=[].slice.call(arguments,1);(handlers[e]||[]).forEach(function(cb){cb.apply(null,args)})}}
