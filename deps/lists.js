function foldl1(f,a){var x,i,l
 x=a[0]
 for(i=1,l=a.length;i<l;i++)x=f(x,a[i])
 return x}

function foldl(f,a,x){var i,l
 for(i=0,l=a.length;i<l;i++)x=f(x,a[i])
 return x}

// [[a]] → [a]
function concat(as){var i,l,a=[]
 for(i=0,l=as.length;i<l;i++)
  a.push.apply(a,as[i])
 return a}

function uniq(a){
 return a.filter(function(e,i,a){return !i||e!==a[i-1]})}

function max(a){
 return foldl(f,a,-Infinity)
 function f(a,b){return Math.max(a,b)}}

function min(a){
 return foldl(f,a,Infinity)
 function f(a,b){return Math.min(a,b)}}

function sum(a){
 return foldl(f,a,0)
 function f(a,b){return a+b}}

function product(a){
 return foldl(f,a,1)
 function f(a,b){return a*b}}

// String → Object → a
function access(prop){return function(o){return o[prop]}}

/* [[name,value]] → Object */
function objectFromList(a){var o={}
 a.forEach(function(e){
  o[e[0]]=e[1]})
 return o}

/* [a], [b] → [[a,b]] */
function zip(a,b){var r=[],i,l
 l=Math.min(a.length,b.length)
 for(i=0;i<l;i++) r.push([a[i],b[i]])
 return r}

/* [a] → a */
function last(a){return a[a.length-1]}

function fst(a){return a[0]}
function snd(a){return a[1]}