/* AWS port
 * all messages are proxied by the awsrpc module which must be installed and configured on the server
 */

window.PortAWS={}

;(function(exports){

exports.init=init

function init(persistence,port_obj,args){var o,server_has_credentials,aws_access_key_id,aws_secret_access_key
o=port_obj
identify()
server_has_credentials=false
o.awsrpc_path=args[0]
o.set_access_id=set_access_id
o.set_secret_access_key=set_secret_access_key
o.list_verified_email_addresses=list_verified_email_addresses
o.request=request
function set_access_id(id){
  aws_access_key_id=id
  identify()}
function set_secret_access_key(key){
  aws_secret_access_key=key
  identify()}
function list_verified_email_addresses(out){
  request('ListVerifiedEmailAddresses',{},out)}

function request(action,query,cb){var body,req
  //authenticate(after_auth)
  after_auth()
  function after_auth(){
    req={method:'request'
        ,access_key_id:aws_access_key_id
        ,secret_access_key:aws_secret_access_key
        ,args:[action,query]
        }
    awsrpc_send(req,cb)}}

function awsrpc_send(req,cb){
  body=JSON.stringify(req)
  xhr('POST',o.awsrpc_path,body,function(x){cb(x.responseText)})}//XXX TODO: handle errors

function authenticate(cb){
  if(server_has_credentials)return setTimeout(cb,0)
  if(!aws_access_key_id||!aws_secret_access_key){alert('access key id or secret key not set');return}
  awsrpc_send({method:'setCredentials',args:[aws_access_key_id,aws_secret_access_key]},function(resp){if(resp!="Accepted")return alert('Error submitting authentication credentials to server');server_has_credentials=true;cb()})
  }

function identify(){
  o.event('identify','AWS: '
   +(aws_access_key_id
      ?aws_secret_access_key
         ?'access key id '+aws_access_key_id
         :aws_access_key_id+' (no secret access key set (use setsecretaccesskey))'
      :'no access id (use setaccesskeyid)'))}

}

})(PortAWS);
