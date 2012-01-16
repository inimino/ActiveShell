/* Fake filesystem port
 */

window.PortFake={}

;(function(exports){

exports.init=init

function init(persistence,o){var obj
  obj={insert:insert
      ,update:update
      ,populate:populate
      ,serialize:serialize
      ,setprop:setprop
      ,remove:remove
      ,persist:persist
      }
  extend(o,obj)
  obj=o
  persistence.read('listing',function(err,data){obj.data=data||{};update()})
  return o
  function insert(a,b){
    obj.data[a]=b}
  function populate(str){var o
    o=JSON.parse(str)
    obj.data=o}
  function serialize(){
    return JSON.stringify(obj.data)}
  function setprop(path,prop,val){
    obj.data[path][prop]=val}
  function remove(path){var x
    x=obj.data[path]
    delete obj.data[path]
    return x}
  function update(){
    obj.event('identify',JSON.stringify(obj.data))}
  function persist(){
    persistence.write('listing',obj.data)}
  }

})(PortFake);
