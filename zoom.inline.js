"use strict";(()=>{function _(i){document.documentElement.dispatchEvent(new window.CustomEvent("tactiq-message",{detail:i}))}function E(i,...d){console.log(`[Tactiq] ${i}`,...d)}(function(){let i=!1,d=(t,s)=>s,p=[];function b(t){let s=t.tqLastAction,n=s.payload??s;switch(s.type){case"UPDATE_MESSAGE":{r(n.userId,n.previousDisplayName),document.documentElement.dispatchEvent(new window.CustomEvent("tactiq-message",{detail:{type:"speech",messages:[{deviceId:n.userId,deviceName:n.previousDisplayName,messageId:`${n.srcMsgID}/${n.userId}`,messageVersion:Date.now(),text:n.message}]}}));break}case"SET_NEW_L_T_MESSAGE":{let a=n;for(let e of Object.values(a.collection))r(e.user.zoomID,e.user.displayName),document.documentElement.dispatchEvent(new window.CustomEvent("tactiq-message",{detail:{type:"speech",messages:[{deviceId:e.user.zoomID,deviceName:e.user.displayName,messageId:`${e.msgId}/${e.user.zoomID}`,messageVersion:Date.now(),text:e.text,zoomLanguage:e.language}]}}));break}case"SET_NEW_L_T_STATE":{let a=n;if(!("selectedTranscriptionLanguage"in a))break;document.documentElement.dispatchEvent(new window.CustomEvent("tactiq-message",{detail:{type:"zoom-language-changed",payload:{zoomLanguageId:a.selectedTranscriptionLanguage}}}));break}case"SET_SELF_CHAT_ID":{let{msgID:a,userId:e}=n,c=t.chat.meetingChat.find(({senderId:l})=>l===e);if(!c)break;let o=c.chatMsgs.find(l=>l.msgId===a);if(!o)break;m(e,o,t.attendeesList.attendeesList);break}case"UPDATE_NEW_MEETING_CHAT":{p=n.newMeetingChat;break}case"SET_SELF_NEW_CHAT_ID":{let{msgID:a,userId:e}=n,c=p.find(o=>o.msgId===a);if(!c)break;m(e,{msgId:a,text:c.content.text},t.attendeesList.attendeesList),console.log(e,c,t.attendeesList.attendeesList);break}case"JOIN_MEETING_SUCCESS":{document.documentElement.dispatchEvent(new window.CustomEvent("tactiq-message",{detail:{type:"zoom-ready"}}));break}case"RECORD_MEETING_SUCCESS":{document.documentElement.dispatchEvent(new window.CustomEvent("tactiq-message",{detail:{type:"created-recording"}}));break}case"SET_MEETING_TOPIC":{document.documentElement.dispatchEvent(new window.CustomEvent("tactiq-message",{detail:{type:"title-updated",title:n.meetingTopic}}));break}default:i&&_({type:"debug",data:JSON.stringify(s)})}}function f(t,s){switch(s.type){case"UPDATE_MEETING_CHAT":{let n=s.payload,a=[];n.forEach(e=>{let c=t.chat.meetingChat.find(({senderId:o})=>o===e.senderId);if(!c){a.push({userId:e.senderId,messages:e.chatMsgs});return}c.chatMsgs.length!==e.chatMsgs.length&&a.push({userId:e.senderId,messages:e.chatMsgs.slice(c.chatMsgs.length-1)})}),a.forEach(({userId:e,messages:c})=>{c.forEach(o=>{m(e,o,t.attendeesList.attendeesList)})});break}}}let y=[],r=(t,s)=>{y.indexOf(t)===-1&&(y.push(t),document.documentElement.dispatchEvent(new window.CustomEvent("tactiq-message",{detail:{type:"deviceinfo",deviceId:t,deviceName:s}})))},m=(t,s,n)=>{let{msgId:a,text:e}=s;if(!a)return;let c=n.find(o=>o.userId===t);c&&(r(t,c.displayName),document.documentElement.dispatchEvent(new window.CustomEvent("tactiq-message",{detail:{type:"speech",messages:[{type:"chat",deviceId:t,messageId:a,messageVersion:0,text:e}]}})))},I=Redux.createStore;Redux.createStore=function(t,...s){let n=I.call(this,(...a)=>{try{let[e,c]=a;f(e,c)}catch{}return t(...a)},...s);return window._tq_store=n,n.subscribe(()=>{try{b(n.getState())}catch{}}),n};let w=Redux.combineReducers;Redux.combineReducers=function(){let[t]=arguments;return t.tqLastAction=d,w.apply(this,[t])},document.documentElement.addEventListener("tactiq-rtc",async t=>{let s=t.detail;switch(s.type){case"debug":!i&&s.enabled?E("Debug mode enabled"):i&&!s.enabled&&E("Debug mode disabled"),i=s.enabled;break;default:console.debug(s);break}});let u=document.createElement("meta");u.setAttribute("id","tactiq-rtc"),u.setAttribute("name","tactiq-rtc"),(document.head||document.documentElement).prepend(u);let g=document.createElement("link");g.setAttribute("href","https://fonts.googleapis.com/css?family=Rubik:400,600,700&display=swap"),g.setAttribute("rel","stylesheet"),(document.head||document.documentElement).append(g);let h=Object.getOwnPropertyDescriptor(window,"innerWidth")?.get;window.__defineGetter__("innerWidth",function(){let t=h&&h();return document.body.classList.contains("tactiq-sidebar-on")?t-320:t})})();})();
