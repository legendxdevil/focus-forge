import{c as i,r,a as N,j as e}from"./index-BfIscEty.js";import{u as D}from"./useLocalStorage-ZCgbiFyn.js";/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=i("Pause",[["rect",{width:"4",height:"16",x:"6",y:"4",key:"iffhe4"}],["rect",{width:"4",height:"16",x:"14",y:"4",key:"sjin7j"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=i("Play",[["polygon",{points:"5 3 19 12 5 21 5 3",key:"191637"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=i("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=i("Target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=i("Timer",[["line",{x1:"10",x2:"14",y1:"2",y2:"2",key:"14vaq8"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11",key:"17fdiu"}],["circle",{cx:"12",cy:"14",r:"8",key:"1e1u0o"}]]),F=()=>{const[s,R]=D("pomodoroSettings",{workDuration:25,breakDuration:5,longBreakDuration:15,sessionsBeforeLongBreak:4}),[o,b]=r.useState("pomodoro"),[l,n]=r.useState(!1),[d,m]=r.useState(0),[c,g]=r.useState(!0),f=r.useCallback(()=>{switch(o){case"pomodoro":return c?s.workDuration*60:d%s.sessionsBeforeLongBreak===0?s.longBreakDuration*60:s.breakDuration*60;case"stopwatch":case"focus":return 0;default:return s.workDuration*60}},[o,c,d,s]),[h,k]=r.useState(f()),j=r.useMemo(()=>[{name:"pomodoro",icon:N},{name:"stopwatch",icon:P},{name:"focus",icon:I}],[]);r.useEffect(()=>{let t=null;return l&&(t=setInterval(()=>{l&&k(u=>{if(u<=0){if(o==="pomodoro"){const x=d+1,p=!c,T=p?s.workDuration*60:x%s.sessionsBeforeLongBreak===0?s.longBreakDuration*60:s.breakDuration*60;return m(x),g(p),n(!1),T}return n(!1),0}return u-1})},1e3)),()=>{t&&clearInterval(t)}},[l,o,d,c,s]);const v=r.useCallback(()=>{const t=f();k(t),n(!1),o==="pomodoro"&&(g(!0),m(0))},[o,f]),w=r.useCallback(t=>{b(t),n(!1),m(0),g(!0);const a=o==="pomodoro"?s.workDuration*60:0;k(a)},[o,s]),S=r.useCallback(()=>{n(t=>!t)},[]),y=t=>{const a=Math.floor(t/3600),u=Math.floor(t%3600/60),x=t%60;return`${a>0?`${a.toString().padStart(2,"0")}:`:""}${u.toString().padStart(2,"0")}:${x.toString().padStart(2,"0")}`},C=()=>{switch(o){case"pomodoro":return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"text-6xl font-bold mb-6 text-focus-accent",children:y(h)}),e.jsx("div",{className:"text-lg mb-4 text-gray-600 dark:text-gray-300",children:c?"Work Session":"Break Time"})]});case"stopwatch":return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"text-6xl font-bold mb-6 text-focus-accent",children:y(h)}),e.jsx("div",{className:"text-lg mb-4 text-gray-600 dark:text-gray-300",children:"Stopwatch"})]});case"focus":return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"text-6xl font-bold mb-6 text-focus-accent",children:y(h)}),e.jsx("div",{className:"text-lg mb-4 text-gray-600 dark:text-gray-300",children:"Focus Mode"})]});default:return null}};return e.jsxs("div",{className:"container mx-auto px-4 py-8 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center",children:[e.jsx("h1",{className:"text-3xl font-bold mb-6 text-focus-primary dark:text-white",children:"Productivity Tracker"}),e.jsx("div",{className:"flex space-x-4 mb-6",children:j.map(({name:t,icon:a})=>e.jsxs("button",{onClick:()=>w(t),className:`px-4 py-2 rounded-full flex items-center ${o===t?"bg-focus-accent text-white":"bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`,children:[e.jsx(a,{size:20,className:"mr-2"}),t.charAt(0).toUpperCase()+t.slice(1)]},t))}),e.jsxs("div",{className:"bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center",children:[C(),e.jsxs("div",{className:"flex justify-center space-x-4",children:[e.jsx("button",{onClick:S,className:"bg-focus-accent text-white p-3 rounded-full hover:bg-opacity-90",children:l?e.jsx(M,{size:24}):e.jsx(B,{size:24})}),e.jsx("button",{onClick:v,className:"bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 p-3 rounded-full hover:bg-opacity-90",children:e.jsx(L,{size:24})})]})]})]})};export{F as default};
//# sourceMappingURL=Pomodoro-C0XxgoJL.js.map
