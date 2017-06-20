// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/main.css'
import './assets/js/api.js'
import './assets/js/index.js'
import './assets/js/address.js'
import './assets/js/fastclick'
import md5 from 'blueimp-md5'

console.log(1)
FastClick.attach(document.body);
Vue.config.productionTip = false;
let dpr = window.devicePixelRatio;
let bodyd = document.body;
bodyd.setAttribute('data-dpr',dpr);
let width = bodyd.offsetWidth;
let baseNum = width/360*12+'px';
document.getElementById('html').style.fontSize = baseNum;
document.getElementById('html').style.height = (window.screen.height-20)+'px';
var head = document.getElementById('head')
var style = document.createElement('style')
var styleCss=document.createTextNode(".content{height:"+(window.screen.height-20)+'px'+"}");
style.appendChild(styleCss)
head.appendChild(style)
// console.log(document.getElementById('head').appendChild())
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
Vue.use(MintUi)
Vue.use(md5)





