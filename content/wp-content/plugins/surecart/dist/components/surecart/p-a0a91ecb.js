let n=[],t=[];function o(r){return n.filter((n=>n.name===r))[0]}function r(r,e){!function(r){n=n.filter((n=>n.name!==r))}(r),n.push({name:r,resolver:e.resolver,mutator:e.mutator}),t.map((n=>{n.library===r&&n.redraw()}))}window.ceRegisterIconLibrary=r;export{o as g,r};