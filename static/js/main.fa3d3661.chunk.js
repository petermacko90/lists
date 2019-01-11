(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{20:function(e,t,n){e.exports=n(45)},29:function(e,t,n){},31:function(e,t,n){},33:function(e,t,n){},35:function(e,t,n){},37:function(e,t,n){},39:function(e,t,n){},41:function(e,t,n){},45:function(e,t,n){"use strict";n.r(t);var i=n(0),o=n.n(i),s=n(15),a=n.n(s),r=n(8),c=n(9),l=n(18),d=n(19),u=n(1),m={lists:[],currentList:null},h={items:[],currentItems:[]},p=function(){try{var e=localStorage.getItem("state");if(null===e)return;return JSON.parse(e,function(e,t){return"modified"===e?new Date(t):t})}catch(t){return}},f=function(e){return!e.replace(/\s+/g,"")};function w(e,t,n){var i;return function(){var o=this,s=arguments,a=n&&!i;clearTimeout(i),i=setTimeout(function(){i=null,n||e.apply(o,s)},t),a&&e.apply(o,s)}}var b=p(),y=Object(c.c)({listsReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case"FETCH_LISTS":return Object(u.a)({},e,{lists:t.payload});case"SET_CURRENT_LIST":return Object(u.a)({},e,{currentList:t.payload});case"EDIT_LIST":var n=e.lists.map(function(e){return e.id===t.payload.id?Object(u.a)({},e,t.payload):e});return Object(u.a)({},e,{lists:n,currentList:Object(u.a)({},e.currentList,t.payload)});case"DELETE_LIST":return Object(u.a)({},e,{lists:e.lists.filter(function(e){return e.id!==t.payload}),currentList:null});case"ADD_LIST_WITH_ID":var i={id:t.payload.nextId,title:t.payload.title,modified:t.payload.modified};return Object(u.a)({},e,{lists:e.lists.concat(i),currentList:i});default:return e}},itemsReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case"FETCH_ITEMS":return Object(u.a)({},e,{items:t.payload});case"SET_CURRENT_ITEMS":return Object(u.a)({},e,{currentItems:e.items.filter(function(e){return e.list_id===t.payload})});case"DELETE_ITEM":return Object(u.a)({},e,{items:e.items.filter(function(e){return e.id!==t.payload}),currentItems:e.currentItems.filter(function(e){return e.id!==t.payload})});case"TOGGLE_ITEM":var n=e.items.map(function(e){return e.id!==t.payload.itemId?e:Object(u.a)({},e,e.checked=!t.payload.checked)}),i=e.currentItems.map(function(e){return e.id!==t.payload.itemId?e:Object(u.a)({},e,e.checked=!t.payload.checked)});return Object(u.a)({},e,{currentItems:i,items:n});case"ADD_ITEM_WITH_ID":var o={list_id:t.payload.listId,id:t.payload.nextId,name:t.payload.name,checked:!1};return Object(u.a)({},e,{items:e.items.concat(o),currentItems:e.currentItems.concat(o)});case"ADD_LIST_WITH_ID":return Object(u.a)({},e,{currentItems:[]});case"DELETE_LIST":return Object(u.a)({},e,{items:e.items.filter(function(e){return e.list_id!==t.payload}),currentItems:e.currentItems.filter(function(e){return e.list_id!==t.payload})});default:return e}}}),E=Object(c.d)(y,b,Object(c.a)(function(e){return function(t){return function(n){if("ADD_ITEM"===n.type){var i=e.getState().itemsReducer.items.reduce(function(e,t){return e.id>t.id?e.id:t.id},0);e.dispatch({type:"ADD_ITEM_WITH_ID",payload:{listId:n.payload.listId,name:n.payload.name,nextId:i+1}})}if("ADD_LIST"===n.type){var o=e.getState().listsReducer.lists.reduce(function(e,t){return e.id>t.id?e.id:t.id},0);e.dispatch({type:"ADD_LIST_WITH_ID",payload:{title:n.payload.title,nextId:o+1,modified:n.payload.modified}})}t(n)}}},d.a,l.logger));E.subscribe(w(function(){!function(e){try{var t=JSON.stringify(e);localStorage.setItem("state",t)}catch(n){console.log("localStorage saveState error: "+n)}}({listsReducer:{lists:E.getState().listsReducer.lists},itemsReducer:{items:E.getState().itemsReducer.items}})},1e3));var g=E,T=(n(29),n(3)),I=n(4),L=n(6),v=n(5),k=n(7),C=(n(31),function(e){var t=e.showAddList;return o.a.createElement("nav",{className:"bg-yellow shadow-2 mb2"},o.a.createElement("img",{src:"list32.png",alt:"logo",className:"ma3 v-mid"}),o.a.createElement("button",{type:"button",onClick:t,className:"b--none ml2 bg-transparent b pointer v-mid add-list"},o.a.createElement("span",{className:"f2"},"+"),o.a.createElement("span",{className:"f3 dn di-ns"}," Add list")))}),S=(n(33),function(e){var t=e.list,n=e.items,i=e.onClickList,s=e.onEnterList;return o.a.createElement("div",{className:"pa2 ma3 bg-yellow pointer shadow-3 noselect list",tabIndex:"0",onClick:i(t,t.id),onKeyPress:s(t,t.id)},o.a.createElement("h3",{className:"f3-l f4-m f5 truncate"},t.title),o.a.createElement("p",null,t.modified.toLocaleDateString()),o.a.createElement("p",{className:"truncate pb1"},n.slice(0,5).map(function(e){return o.a.createElement("span",{key:e.id},"- ",e.name," ")})))}),A=(n(35),function(e){function t(){var e,n;Object(T.a)(this,t);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return(n=Object(L.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(o)))).onClickList=function(e,t){return function(){n.handleSelectList(e,t)}},n.onEnterList=function(e,t){return function(i){"Enter"===i.key&&n.handleSelectList(e,t)}},n.handleSelectList=function(e,t){n.props.onSetCurrentList(e),n.props.onSetCurrentItems(t),n.props.scrollToCurrentList()},n}return Object(k.a)(t,e),Object(I.a)(t,[{key:"componentDidMount",value:function(){this.props.onRequestLists(),this.props.onRequestItems()}},{key:"render",value:function(){var e=this,t=this.props,n=t.lists,s=t.items,a=t.isShowLists,r=t.showLists,c=t.hideLists,l=[],d=[];return n.forEach(function(t){s.forEach(function(e){t.id===e.list_id&&(d=d.concat(e))}),l=l.concat(o.a.createElement(S,{key:t.id,list:t,items:d,onClickList:e.onClickList,onEnterList:e.onEnterList})),d=[]}),o.a.createElement("div",{className:"fl w-25-l w-third-m w-100"},a?o.a.createElement("button",{type:"button",onClick:c,className:"bg-yellow b--none pointer pv1 ml3 mv1 toggle-lists"},"Hide lists \u25b2"):o.a.createElement("button",{type:"button",onClick:r,className:"bg-yellow b--none pointer pv1 ml3 mv1 toggle-lists"},"Show lists \u25bc"),o.a.createElement("div",{className:"lists ".concat(a?"":"dn")},l.length>0?o.a.createElement(i.Fragment,null,l,o.a.createElement("hr",{className:"dn-ns moon-gray"})):o.a.createElement("div",{className:"ml3"},o.a.createElement("p",null,"No lists found"),o.a.createElement("button",{type:"button",onClick:this.props.showAddList,className:"white b--none ph4 pv3 b pointer bg-green hover-bg-dark-green"},"Add list"))))}}]),t}(i.Component)),N=Object(r.b)(function(e){return{lists:e.listsReducer.lists,items:e.itemsReducer.items}},function(e){return{onRequestLists:function(){return e(function(e){e({type:"FETCH_LISTS",payload:void 0===p()?[]:p().listsReducer.lists})})},onRequestItems:function(){return e(function(e){e({type:"FETCH_ITEMS",payload:void 0===p()?[]:p().itemsReducer.items})})},onSetCurrentList:function(t){return e(function(e){return{type:"SET_CURRENT_LIST",payload:e}}(t))},onSetCurrentItems:function(t){return e({type:"SET_CURRENT_ITEMS",payload:t})}}})(A),O=function(e){var t=e.id,n=e.listId,i=e.name,s=e.checked,a=e.checkAction,r=e.onClickItem,c=e.onClickDelete,l=e.setTextToCopy;return o.a.createElement("div",{className:"actions-content w4 shadow-3"},o.a.createElement("button",{type:"button",onClick:r(n,t,s),className:"w-100 pointer",title:a},a),o.a.createElement("button",{type:"button",onClick:c(n,t),className:"w-100 pointer",title:"Delete item"},"Delete item"),o.a.createElement("button",{type:"button",onClick:l(i),className:"w-100 pointer",title:"Copy to clipboard"},"Copy name"))},D=(n(37),function(e){function t(){var e;return Object(T.a)(this,t),(e=Object(L.a)(this,Object(v.a)(t).call(this))).onBlur=function(){e.timeOutId=setTimeout(function(){e.setState({isActionsOpen:!1})})},e.onFocus=function(){return clearTimeout(e.timeOutId)},e.onClickToggleActions=function(){e.handleToggleActions()},e.onKeyPressToggleActions=function(t){"Enter"===t.key&&e.handleToggleActions()},e.state={isActionsOpen:!1},e.timeoutId=null,e}return Object(k.a)(t,e),Object(I.a)(t,[{key:"handleToggleActions",value:function(){this.setState({isActionsOpen:!this.state.isActionsOpen})}},{key:"render",value:function(){var e=this.props,t=e.listId,n=e.onClickItem,i=e.onKeyPressItem,s=e.onClickDelete,a=e.setTextToCopy,r=this.props.item,c=r.id,l=r.checked,d=r.name,u=this.state.isActionsOpen,m=l?"Uncheck":"Check";return o.a.createElement("li",{className:"flex justify-between relative noselect"+(l?" checked":"")},o.a.createElement("div",{className:"pv3 w-100 pointer",tabIndex:"0",title:m,onClick:n(t,c,l),onKeyPress:i(t,c,l)},o.a.createElement("span",{className:"check dib tc b"},l&&o.a.createElement(o.a.Fragment,null,"\u2714")),o.a.createElement("span",{className:"dib pl1",style:{wordBreak:"break-all"}},d)),o.a.createElement("div",{className:"actions-dropdown hover-bg-red tc pointer",tabIndex:"0",title:"Actions",onBlur:this.onBlur,onFocus:this.onFocus,onClick:this.onClickToggleActions,onKeyUp:this.onKeyPressToggleActions},o.a.createElement("span",{className:"dots"}),u&&o.a.createElement(O,{id:c,listId:t,name:d,checked:l,checkAction:m,onClickItem:n,onClickDelete:s,setTextToCopy:a})))}}]),t}(i.Component)),j=function(e){var t=e.listId,n=e.newItemName,i=e.onSetNewItemName,s=e.onClickAddItem,a=e.onKeyPressAddItem;return o.a.createElement("div",{className:"mt3"},o.a.createElement("input",{type:"text",value:n,onChange:i,onKeyPress:a(t,n),placeholder:"Item name",maxLength:"100",className:"pa3 b--none w-100 w-70-m w-auto-l"}),o.a.createElement("button",{type:"button",onClick:s(t,n),className:"white b--none ph4 pv3 mt3 mt0-ns b pointer bg-green hover-bg-dark-green w-30-m w-auto-l"},"Add"))},_=(n(39),function(e){var t=e.show,n=e.text;return o.a.createElement("div",{className:"w5 fixed z-3 pa3 tc bg-green truncate shadow-3 toast"+(t?" show":"")},n)}),x=(n(41),function(e){function t(){var e;return Object(T.a)(this,t),(e=Object(L.a)(this,Object(v.a)(t).call(this))).setTextToCopy=function(t){return function(){e.setState({textToCopy:t},function(){e.copyText.current.select(),document.execCommand("copy"),e.showNotification("Copied: "+t)})}},e.showNotification=function(t){e.setState({notification:{show:!0,text:t}}),setTimeout(function(){var t=Object(u.a)({},e.state.notification,{show:!1});e.setState({notification:t})},3e3)},e.focusEditTitle=function(){e.editTitle.current.focus()},e.hideEditTitle=function(){e.setState({isEditTitle:!1,newListTitle:""})},e.showEditTitle=function(){e.setState({isEditTitle:!0,newListTitle:e.props.list.title},function(){return e.focusEditTitle()})},e.onChangeListTitle=function(t){e.setState({newListTitle:t.target.value})},e.onClickEditTitle=function(t,n){return function(){e.handleEditTitle(t,n)}},e.onKeyPressEditTitle=function(t,n){return function(i){"Enter"===i.key&&e.handleEditTitle(t,n)}},e.handleEditTitle=function(t,n){f(n)||(e.props.onEditList(t,n,new Date),e.hideEditTitle())},e.handleDeleteList=function(t){return function(){window.confirm("Are you sure you want to delete this list?")&&(e.props.onDeleteList(t),e.hideEditTitle(),e.setState({newItemName:""}),e.props.showLists())}},e.onClickItem=function(t,n,i){return function(){e.handleToggleItem(t,n,i)}},e.onKeyPressItem=function(t,n,i){return function(o){"Enter"===o.key&&e.handleToggleItem(t,n,i)}},e.handleToggleItem=function(t,n,i){e.props.onToggleItem(n,i),e.props.onEditList(t,e.props.list.title,new Date)},e.handleDeleteItem=function(t,n){return function(){window.confirm("Are you sure you want to delete this item?")&&(e.props.onDeleteItem(n),e.props.onEditList(t,e.props.list.title,new Date))}},e.onClickAddItem=function(t,n){return function(){e.handleAddItem(t,n)}},e.onKeyPressAddItem=function(t,n){return function(i){"Enter"===i.key&&e.handleAddItem(t,n)}},e.handleAddItem=function(t,n){f(n)||(e.props.onAddItem(t,n),e.props.onEditList(t,e.props.list.title,new Date),e.setState({newItemName:""}))},e.onChangeNewItemName=function(t){e.setState({newItemName:t.target.value})},e.editTitle=o.a.createRef(),e.copyText=o.a.createRef(),e.state={isEditTitle:!1,newListTitle:"",newItemName:"",textToCopy:"",notification:{show:!1,text:""}},e}return Object(k.a)(t,e),Object(I.a)(t,[{key:"componentDidUpdate",value:function(e){e.list||this.props.list||this.props.list.id===e.list.id||this.hideEditTitle()}},{key:"render",value:function(){var e=this,t=this.props,n=t.list,s=t.items,a=this.state,r=a.isEditTitle,c=a.newListTitle,l=a.newItemName,d=a.textToCopy,u=this.state.notification,m=u.show,h=u.text;return n?o.a.createElement("div",{className:"fl w-75-l w-two-thirds-m w-100 pa3"},o.a.createElement(_,{show:m,text:h}),o.a.createElement("button",{type:"button",onClick:this.handleDeleteList(n.id),className:"white b--none ph4 pv3 b pointer bg-red hover-bg-dark-red"},"Delete list"),r?o.a.createElement(i.Fragment,null,o.a.createElement("button",{type:"button",onClick:this.onClickEditTitle(n.id,c),className:"white b--none ph4 pv3 b pointer bg-green hover-bg-dark-green"},"Save title"),o.a.createElement("button",{type:"button",onClick:this.hideEditTitle,className:"white b--none ph4 pv3 b pointer bg-blue hover-bg-dark-blue"},"Don't save title")):o.a.createElement("button",{type:"button",onClick:this.showEditTitle,className:"white b--none ph4 pv3 b pointer bg-blue hover-bg-dark-blue"},"Edit title"),r?o.a.createElement("input",{type:"text",value:c,onChange:this.onChangeListTitle,onKeyPress:this.onKeyPressEditTitle(n.id,c),placeholder:"List title",className:"pa3 b--none mv4 db",maxLength:"50",ref:this.editTitle}):o.a.createElement("h2",{className:"f2 mv4 list-title"},n.title),o.a.createElement("p",null,n.modified.toLocaleDateString()),o.a.createElement("ul",{className:"ma0 pa0 list"},s.length>0?s.map(function(t){return o.a.createElement(D,{key:t.id,item:t,listId:n.id,onClickItem:e.onClickItem,onKeyPressItem:e.onKeyPressItem,onClickDelete:e.handleDeleteItem,setTextToCopy:e.setTextToCopy})}):o.a.createElement("p",null,"No items")),o.a.createElement("input",{type:"text",readOnly:!0,value:d,ref:this.copyText,className:"copy-text",tabIndex:"-1"}),o.a.createElement(j,{listId:n.id,newItemName:l,onSetNewItemName:this.onChangeNewItemName,onClickAddItem:this.onClickAddItem,onKeyPressAddItem:this.onKeyPressAddItem})):null}}]),t}(i.Component)),R=Object(r.b)(function(e){return{list:e.listsReducer.currentList,items:e.itemsReducer.currentItems}},function(e){return{onEditList:function(t,n,i){return e(function(e,t,n){return{type:"EDIT_LIST",payload:{id:e,title:t,modified:n}}}(t,n,i))},onDeleteList:function(t){return e(function(e){return{type:"DELETE_LIST",payload:e}}(t))},onDeleteItem:function(t){return e(function(e){return{type:"DELETE_ITEM",payload:e}}(t))},onToggleItem:function(t,n){return e(function(e,t){return{type:"TOGGLE_ITEM",payload:{itemId:e,checked:t}}}(t,n))},onAddItem:function(t,n){return e(function(e,t){return{type:"ADD_ITEM",payload:{listId:e,name:t}}}(t,n))}}})(x),W=function(e){function t(){var e;return Object(T.a)(this,t),(e=Object(L.a)(this,Object(v.a)(t).call(this))).onChangeNewListTitle=function(t){e.setState({newListTitle:t.target.value})},e.onClickAddList=function(t){return function(){e.handleAddList(t)}},e.onKeyPressAddList=function(t){return function(n){"Enter"===n.key&&e.handleAddList(t)}},e.handleAddList=function(t){f(t)||(e.props.scrollToCurrentList(),e.props.onAddList(t),e.setState({newListTitle:""}))},e.state={newListTitle:""},e}return Object(k.a)(t,e),Object(I.a)(t,[{key:"render",value:function(){var e=this.state.newListTitle;return o.a.createElement("div",{className:"fl w-75-l w-two-thirds-m w-100 pa3"},o.a.createElement("h2",null,"Add list"),o.a.createElement("input",{type:"text",value:e,onChange:this.onChangeNewListTitle,onKeyPress:this.onKeyPressAddList(e),placeholder:"List title",className:"pa3 b--none w-100 w-auto-ns",maxLength:"50",autoFocus:!0}),o.a.createElement("button",{type:"button",onClick:this.onClickAddList(e),className:"white b--none ph4 pv3 b pointer bg-green hover-bg-dark-green"},"Add"))}}]),t}(i.Component),P=Object(r.b)(null,function(e){return{onAddList:function(t){return e(function(e){return{type:"ADD_LIST",payload:{title:e,modified:new Date}}}(t))}}})(W),K=function(){return o.a.createElement("footer",{className:"ma3 tc",style:{clear:"both"}},"Icons made by ",o.a.createElement("a",{href:"https://www.flaticon.com/authors/smashicons",title:"Smashicons"},"Smashicons")," from ",o.a.createElement("a",{href:"https://www.flaticon.com/",title:"Flaticon"},"www.flaticon.com")," is licensed by ",o.a.createElement("a",{href:"http://creativecommons.org/licenses/by/3.0/",title:"Creative Commons BY 3.0",target:"_blank",rel:"noopener noreferrer"},"CC 3.0 BY"))},M=function(e){function t(){var e;return Object(T.a)(this,t),(e=Object(L.a)(this,Object(v.a)(t).call(this))).onWindowResize=function(){var t=window.innerWidth;t!==e.state.windowWidth&&(e.setState({windowWidth:t}),t>=480&&e.showLists())},e.showAddList=function(){e.setState({isShowAddList:!0}),e.state.windowWidth<480&&e.hideLists()},e.hideAddList=function(){return e.setState({isShowAddList:!1})},e.scrollToCurrentList=function(){e.state.windowWidth<480&&e.hideLists(),e.hideAddList()},e.showLists=function(){return e.setState({isShowLists:!0})},e.hideLists=function(){return e.setState({isShowLists:!1})},e.state={isShowLists:!0,isShowAddList:!1,windowWidth:0},e}return Object(k.a)(t,e),Object(I.a)(t,[{key:"componentDidMount",value:function(){window.addEventListener("resize",w(this.onWindowResize,250)),this.onWindowResize()}},{key:"render",value:function(){var e=this.state,t=e.isShowLists,n=e.isShowAddList;return o.a.createElement(i.Fragment,null,o.a.createElement(C,{showAddList:this.showAddList}),o.a.createElement("main",null,o.a.createElement(N,{isShowLists:t,showLists:this.showLists,hideLists:this.hideLists,scrollToCurrentList:this.scrollToCurrentList,showAddList:this.showAddList}),n?o.a.createElement(P,{scrollToCurrentList:this.scrollToCurrentList}):o.a.createElement(R,{showLists:this.showLists})),o.a.createElement(K,null),this.state.windowWidth<480&&o.a.createElement("div",{onClick:this.showAddList,title:"Add list",className:"w3 h3 br-100 fixed z-1 bottom-1 right-1 bg-green hover-bg-dark-green pointer shadow-3"},o.a.createElement("div",{className:"f2 b tc white lh-copy"},"+")))}}]),t}(i.Component),F=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function H(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See http://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}n(43);a.a.render(o.a.createElement(r.a,{store:g},o.a.createElement(M,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/lists",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/lists","/service-worker.js");F?(function(e,t){fetch(e).then(function(n){var i=n.headers.get("content-type");404===n.status||null!=i&&-1===i.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):H(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit http://bit.ly/CRA-PWA")})):H(t,e)})}}()}},[[20,2,1]]]);
//# sourceMappingURL=main.fa3d3661.chunk.js.map