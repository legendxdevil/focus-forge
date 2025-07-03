import{r as n}from"./index-BHH3vtVR.js";function u(e,r){const[s,c]=n.useState(()=>{try{const t=window.localStorage.getItem(e);return t?JSON.parse(t):r}catch(t){return console.log(t),r}});return[s,t=>{try{const o=t instanceof Function?t(s):t;c(o),window.localStorage.setItem(e,JSON.stringify(o))}catch(o){console.log(o)}}]}export{u};
//# sourceMappingURL=useLocalStorage-B05wL-kv.js.map
