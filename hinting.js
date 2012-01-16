// hint :: partial command → hints object

// partial command:
// - verb (zero, one, or more)
// - args (zero or more)
// - ports (zero or more)
// Each verb, arg, or port, is parsed as a token in the command, and the parser may know that the token is incomplete (e.g. unclosed quoted string)
// The UI may also pass cursor position and editing history.

// hints object:
// - error conditions
// - command effect hints
// - completion suggestions
// - deletion / occlusion hints

function hint(partial,context,cb){var errors,effects,completions,deletions,verb
  errors=['fake error condition']
  effects=[]
  completions=[]//{type:"arg",token:0,completion:"abc"}]
  deletions=[{type:"verb",token:0}]
  if(partial.verbs.length) verb=context.verbs[partial.verbs[partial.verbs.length-1]]
  if(verb){
    if(!verb.desc)alert('verb without description')
    effects.push(verb.desc)
    if((partial.ports||[]).length<(verb.ports||[]).length){
      completions.push({type:"port"})}
    completions.push(verb.args.join('; '))
    }
  cb({errors:errors
     ,effects:effects
     ,completions:completions
     ,deletions:deletions})}