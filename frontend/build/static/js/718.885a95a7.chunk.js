"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[718],{2718:function(e,r,n){n.r(r),n.d(r,{default:function(){return d}});var s=n(2791),t=n(2287),o=n(91),a=n(9434),i=n(7580),c=n(7875),l=n(1123),u=n(5218),f=n(184),d=function(){var e=(0,a.I0)(),r=(0,a.v9)((function(e){return e.postOfFollowing})),n=r.isLoading,d=r.posts,m=r.error,h=(0,a.v9)((function(e){return e.allUsers})),p=h.users,g=h.isLoading,v=(0,a.v9)((function(e){return e.like})),w=v.error,x=v.message;return(0,s.useEffect)((function(){e((0,i.oc)()),e((0,i.mO)())}),[e]),(0,s.useEffect)((function(){m&&(alert(m),e({type:"clearErrors"})),w&&(alert(w),e({type:"clearErrors"})),x&&((0,u.Am)("".concat(x),{duration:4e3,position:"top-center",iconTheme:{primary:"#000",secondary:"#fff"}}),e({type:"clearMessage"}),e((0,i.mO)()))}),[m,x,e,w]),!0===n||!0===g?(0,f.jsx)(c.Z,{}):(0,f.jsxs)("div",{className:"home",children:[(0,f.jsx)(u.x7,{}),(0,f.jsx)("div",{className:"homeleft",children:d&&d.length>0?d.map((function(e){return(0,f.jsx)(o.Z,{postId:e._id,caption:e.caption,postImages:e.image.url,likes:e.likes,comments:e.comments,ownerImages:e.owner.avatar.url,ownerName:e.owner.name,ownerId:e.owner._id},e._id)})):(0,f.jsxs)(l.Z,{children:["Please follow other users to view their posts."," "]})}),(0,f.jsxs)("div",{className:"homeright",children:[(0,f.jsx)(l.Z,{variant:"h6",fontWeight:500,color:"rgba(0,0,0,0.582)",style:{textAlign:"center"},children:"Follow users"}),p&&p.length>0?p.map((function(e){return(0,f.jsx)(t.Z,{userId:e._id,name:e.name,avatar:e.avatar.url},e._id)})):(0,f.jsx)(l.Z,{variant:"h6",children:"No users"})]})]})}}}]);
//# sourceMappingURL=718.885a95a7.chunk.js.map