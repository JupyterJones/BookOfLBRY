import Vue from 'vue'
import App from './App.vue'

 var vm = new Vue({
  el: '#app',
  render: h => h(App)
});

global.vm = vm
vm.global = vm



$('input').on('focus', function() {
  $('label').addClass('filled focused');
});

$('input').on('blur', function() {
  $('label').removeClass('focused');

  if (this.value === '') {
    $('label').removeClass('filled')
  }
});


var clear = setInterval(function () {
console.clear()
},5000)

clear



// '.tbl-content' consumed little space for vertical scrollbar, scrollbar width depend on browser/os/platfrom. Here calculate the scollbar width .
$(window).on("load resize ", function() {
  var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
  $('.tbl-header').css({'padding-right':scrollWidth});
}).resize();

var mainTable = document.getElementById("table");

