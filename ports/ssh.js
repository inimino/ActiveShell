/* SSH port
 */

window.PortSSH={}

;(function(exports){

exports.init=function init(persistence,o,args){var ssh_gw_uri,ssh_host,ssh_user,ssh_keyid

ssh_gw_uri=args[0]
o.keygen=keygen
o.keylist=keylist
o.connect=connect
o.exec=exec

persistence.read('auth',read_auth)

function read_auth(e,s){var a
  if(e||!s)return
  a=JSON.parse(s)
  ssh_host=a.host
  ssh_user=a.user
  ssh_keyid=a.keyid
  identify()}

identify()

function keygen(out){var req
  req={action:"keygen"}
  gw_send(req,out)}

function keylist(out){var req
  req={action:"keylist"}
  gw_send(req,out)}

function connect(user,host,keyid,out){var auth
  ssh_host=host
  ssh_user=user
  ssh_keyid=keyid
  auth={user:user,host:host,keyid:keyid}
  persistence.write('auth',JSON.stringify(auth))
  out(identify())}

function exec(command,out){var req
  req={action:"exec"}
  req.command=command
  add_auth_props(req)
  gw_send(req,out)}

function add_auth_props(o){
  o.host=ssh_host
  o.user=ssh_user
  o.keyid=ssh_keyid
  return o}

function gw_send(req,out){
  xhr('POST',ssh_gw_uri,JSON.stringify(req),function(x){out(x.responseText)})}

function identify(){var idstr
  idstr=ssh_gw_uri+' '+ssh_user+'@'+ssh_host+' '+ssh_keyid
  o.event('identify','ssh: '+idstr)
  return idstr}

}

})(PortSSH);
