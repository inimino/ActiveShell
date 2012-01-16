/* HTTP port for same-origin and CORS requests (pure XHR without a server proxy)
 */

window.PortHTTP={}

;(function(exports){

exports.init=init

function init(persistence,obj){
  extend(obj,
    {request:request
    })

  setTimeout(identify,0)

  function request(method,uri,body,cb){
    xhr(method,uri,body,cb)}

  function identify(){
    obj.event('identify','HTTP')}

  }

})(PortHTTP);