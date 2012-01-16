/** 3box_verb:tocsv
    desc:"Create a CSV string from an array of arrays"
    args:["records:[[String]]"]
    f:to_csv

    3box_verb:parsecsv
    desc:"Parse a csv file into an array of arrays"
    args:["csv:String"]
    f:parse_csv

 N.B. nothing interprets these comments (just an idea)
 */
function to_csv(records){
 return records.map(function(fields){
  return fields.map(function(field){var quote=false
   field=field.replace(/[",\r\n]/g,function(m){quote=true;return m[0]=='"'?'""':m[0]})
   return quote?'"'+field+'"':field
   }).join(',')+'\r\n'}).join('')}

/*

CSV ← EmptyLine* (EOF / Record (LB+ Record)* EmptyLine*)

EmptyLine ← LB
LB ← CR LF? / LF
CR ← [U+000D]
LF ← [U+000A]

Record ← (Field/NullField &",") ("," (Field/NullField))*

EOF ← ![^]

Comma ← ","

Field ← DQuote ( TextData / Comma / CR / LF / DDQuote )* DQuote
      / TextData

NullField ← ""

DQuote ← ["]

DDQuote ← DQuote DQuote

TextData ← [^ U+000A U+000D " , ]+

Parser below generated from grammar above by http://boshi.inimino.org/3box/PanPG/build/demo.html

*/

CSV.names=['','CSV','EmptyLine','LB','CR','LF','Record','EOF','Comma','Field','NullField','DQuote','DDQuote','TextData','_']
function CSV(out){var eof=false,s='',l=0,S=57344,T,M,F,D,R,tbl=[],x,pos=0,offset=0,buf=[],bufs=[],states=[],posns=[],c,equiv,ds,dp,failed=0,emp=0,emps=[];
equiv=rle_dec([10,0,1,1,2,0,1,2,20,0,1,3,9,0,1,4,55251,0,2048,5,8192,0])
function rle_dec(a){var r=[],i,l,n,x,ll;for(i=0,l=a.length;i<l;i+=2){n=a[i];x=a[i+1];r.length=ll=r.length+n;for(;n;n--)r[ll-n]=x}return r}
T=[,61440,131072,135168,,,172032,125446,,221184,303104,,274432,289798,307200,65536,11439,73728,31919,81920,27823,93190,97286,98304,15535,106496,15535,27823,118784,11439,126976,,15535,142342,143360,19631,151552,23727,80,23727,,,176128,40111,184320,44207,192512,,203782,204800,,212992,40111,44207,228358,229376,48303,237568,241664,56495,36015,19631,23727,52399,48303,56495,,48303,48303,,290816,,299008,,80,7343,315392,]
M=[,78,78,78,78,78,78,78,78,78,78,78,78,78,78,69632,65536,78,78,78,86016,114688,93190,110592,102400,78,106496,78,78,118784,78,79,78,78,78,147456,78,78,78,78,,,196608,78,78,191238,78,78,78,203782,208896,78,78,78,78,78,233472,262144,237568,78,78,78,78,78,78,78,,278528,78,,78,294912,78,299008,78,311296,78,79]
F=rle_dec([1,,15,79,1,78,1,79,1,80902,3,79,1,78,3,79,1,78,2,79,1,78,1,79,1,78,2,79,1,159744,2,79,1,155648,2,79,2,,1,79,1,183302,5,79,1,78,2,79,1,217088,2,79,1,266240,2,79,1,78,1,245760,1,249856,1,253952,1,258048,3,79,1,,2,79,1,,3,79,1,78,3,79,1,78])
D=function(a,i,l,b){for(i=0,l=a.length,b=[];i<l;i++)b[i]=a[i]&&revive(a[i]);return b}([,,,,[[[[2]]]],[[[[1]]]],,,[[[[4]]]],,,[[[[3]]]],,,,,,,,,,,,,,,,,,,,[[[[0,1,2,3,4]]]],,,,,,,,,,,,,,,,[[[[4]]]],,,[[[[4]]]],,,,,,,,,,,,,,,,,,,,,[[[[0]]]],,[[[[0]]]],,,,[[[[0,1,2,3,4]]]]])
function revive(x){var i,l,state,j,l2,all=[],t,ts;if(!x)return;for(i=0,l=x.length;i<l;i++){state=x[i];ts=[];for(j=0,l2=state.length;j<l2;j++){t=state[j];if(t[1]==l) ts.push([t[0],true]);else ts.push([t[0],t[1]==undefined?i+1:t[1]])}all.push(ts)}return dfa(all)
 function dfa(ss){var i,l_ss,st,l_s,t,l_t,a,d=[],j,k,l;for(i=0,l_ss=ss.length;i<l_ss;i++){st=ss[i];a=[];for(j=0,l_s=st.length;j<l_s;j++){t=st[j];for(k=0,l_t=t[0].length;k<l_t;k++){a[t[0][k]]=t[1]===true?l_ss:t[1]}}for(j=0,l=a.length;j<l;j++)if(a[j]==undefined)a[j]=l_ss+1;d[i]=a}
  return function _dfa(st,i){var eq,pr;while(st<l_ss){eq=equiv[s.charCodeAt(i++)];st=d[pr=st][eq]}if(eq==undefined&&i>=s.length){ds=pr;dp=i-1;return}ds=0;dp=undefined;if(st==l_ss){pos=i;return true}return false}}}
if(typeof out=='string'){s=out;out=[];x=CSV(function(m,x,y){if(m=='fail')out=[false,x,y,s];if(m=='tree segment')out=out.concat(x)});x('chunk',s);x('eof');return out[0]===false?out:[true,{names:CSV.names,tree:out,input:s}]}
return function(m,x){if(failed){out('fail',pos,'parse already failed');return}
switch(m){
case 'chunk':s+=x;l=s.length;while(tbl.length<l+1)tbl.push([]);mainloop();break
case 'eof':eof=true;mainloop();break
default:throw new Error('unhandled message: '+m)}}
//mainloop
function mainloop(){for(;;){
if(dp==undefined&&(S>83||S<80))
t_block:{
if(S&4/*pushpos*/)posns.push(pos)
if(S&2/*t_bufferout*/){bufs.push(buf);buf=[]}
if(S&8/*t_emitstate*/){emps.push(emp);emp=pos;buf.push(S>>>12)}
if(S&1/*cache*/&&(x=tbl[pos-offset][S])!=undefined){if(x){R=true;pos=x[0];buf=x[1];if(emp<x[2])emp=x[2]}else{R=false}}
}
if(R==undefined){
if(D[S>>>12]){R=D[S>>>12](ds||0,dp||pos);if(R==undefined){if(eof){ds=dp=undefined;R=false}else{out('ready');return}}}
else{states.push(S);S=T[S>>>12]}
if(S==80){R=true;S=states.pop()}}
while(R!=undefined){
if(S==57344){(R?emit:fail)();return}if(R){
if(S&1/*cache*/){tbl[posns[posns.length-1]][S]=[pos,buf,emp];buf=buf.slice()}
if(S&8/*t_emitstate*/){if(pos!=emp&&emp!=posns[posns.length-1]){buf.push(-1,pos-emp)}emp=emps.pop();if(emp!=posns[posns.length-1]){buf=[-1,posns[posns.length-1]-emp].concat(buf)}}
if(S&16/*m_emitstate*/)buf.push(S>>>12)
if(S&32/*m_emitclose*/)buf.push(-2)
if(S&128/*m_emitlength*/)buf.push(pos-posns[posns.length-1])
if(S&8/*t_emitstate*/){emp=pos}
if(S&256/*m_resetpos*/)pos=posns[posns.length-1]
if(S&4/*pushpos*/)posns.pop()
if(S&512/*m_tossbuf*/)buf=bufs.pop()
if(S&1024/*m_emitbuf*/){buf=bufs.pop().concat(buf);}
if(!bufs.length&&buf.length>64)emit()
S=M[S>>>12]}
else{
if(S&1/*cache*/)tbl[posns[posns.length-1]][S]=false
if(S&4/*pushpos*/)pos=posns.pop()
if(S&2048/*f_tossbuf*/)buf=bufs.pop()
if(S&8/*t_emitstate*/){emp=emps.pop()}
if(emp>pos){emp=pos}
S=F[S>>>12]}
if(S==78){R=true;S=states.pop()}else if(S==79){R=false;S=states.pop()}else R=undefined;}}}
function emit(){var x=bufs.length?bufs[0]:buf;if(x.length){out('tree segment',x);if(bufs.length)bufs[0]=[];else buf=[]}}
function fail(s){out('fail',pos,s);failed=1}}


function parse_csv(s){var cbs
 cbs=
 {CSV:  function(m,cn){return cn}
 ,Record: function(m,cn){return cn}
 ,Field: function(m,cn){return cn.join('')}
 ,NullField: function(m,cn){return ''}
 ,TextData:function(m,cn){return m.text()}
 ,Comma:function(m,cn){return ','}
 ,DDQuote:function(m,cn){return '"'}
 }
 return PanPG_util.treeWalker(cbs,CSV(s))}
