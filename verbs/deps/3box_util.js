/* copied from f_confParser.js */
function parse3boxConf(s){var
 ls=s.split('\n'),a=[],b=[],c=[],d=[],e=[],ws
 ls.forEach(function(l){
  ws=l.split(/ +/)
  switch(ws.shift()){
   case 'Files:': a=a.concat(ws); break
   case 'Feedbacks:': b=b.concat(ws); break
   case 'Output:': c.push(ws); break
   case 'HTML:': d.push(ws); break
   case 'TAL:': e.push(ws); break}})
 return {files:a,feedbacks:b,outputs:c,html:d,tal:e}}
