!function(){function e(e){return e&&e.__esModule?e.default:e}var r={};var t=function(e){var t=r[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t};(function(e){for(var t=Object.keys(e),a=0;a<t.length;a++)r[t[a]]=e[t[a]]})(JSON.parse('{"dcea7d2d2b578f03":"about.6543b1b6.js","ed6b2351dd9073bd":"carlos.e341bd3f.glb","a662f250760e7b3b":"pablo.03aac676.glb","3ba69576bf22d71e":"rosma.bf981bac.glb"}'));var a,n=null;var d,l=function(){return n||(n=function(){try{throw new Error}catch(r){var e=(""+r.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);if(e)return(""+e[0]).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/,"$1")+"/"}return"/"}()),n},o=t;function i(e){if(""===e)return".";var r="/"===e[e.length-1]?e.slice(0,e.length-1):e,t=r.lastIndexOf("/");return-1===t?".":r.slice(0,t)}function u(e,r){if(e===r)return"";var t=e.split("/");"."===t[0]&&t.shift();var a,n,d=r.split("/");for("."===d[0]&&d.shift(),a=0;(a<d.length||a<t.length)&&null==n;a++)t[a]!==d[a]&&(n=a);var l=[];for(a=0;a<t.length-n;a++)l.push("..");return d.length>n&&l.push.apply(l,d.slice(n)),l.join("/")}(d=function(e,r){return u(i(o(e)),o(r))})._dirname=i,d._relative=u,a=l()+d("dcea7d2d2b578f03","ed6b2351dd9073bd");var b;b=l()+d("dcea7d2d2b578f03","a662f250760e7b3b");var f;function c(e,r,t){var a=document.getElementById(e);a&&(a.exposure=t,a.src=r)}f=l()+d("dcea7d2d2b578f03","3ba69576bf22d71e"),c("carlos",e(a),.5),c("pablo",e(b),.5),c("rosma",e(f),.5),new Glide("#carousel",{type:"carousel",perView:5,autoplay:1e3,breakpoints:{600:{perView:2},800:{perView:4},1e3:{perView:5}}}).mount(),new Glide("#carousel2",{type:"carousel",perView:5,autoplay:1e3,breakpoints:{600:{perView:2},800:{perView:4},1e3:{perView:5}}}).mount()}();
//# sourceMappingURL=about.6543b1b6.js.map