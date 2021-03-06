/**
 * Created by ma on 2017/5/27.
 */

window.onload = function () {
  // var content = document.querySelector('.content')
  // content.style.height = window.screen.height+'px'
  apiready = function () {
    api.setStatusBarStyle({
      style: "light" //”dark  light
    });
    var systemVersion = api.systemVersion;
    console.log(systemVersion)
    if (parseFloat(systemVersion) < 4.3) {
      api.alert({title: '提示', msg: 'Android系统版本为:' + systemVersion + ',请用更Android4.3以上系统使用此软件'})
    }

    var mkeyTime = new Date().getTime();
    api.addEventListener({
      name: 'keyback'
    }, function (ret) {
      if (ret) {

        var  arr = ['index','myShop'];
        if(arr.indexOf(window.page)!==-1) {
          if ((new Date().getTime() - mkeyTime) > 2000) {
            mkeyTime = new Date().getTime();
            api.toast({
              msg: '再按一次退出程序',
              duration: 2000,
              location: 'bottom'
            });
          } else {
            api.closeWidget();
          }
        }else if(window.page==='imageClip'){
            let FNImageClip = api.require('FNImageClip');
            FNImageClip.close();
        } else{
          history.go(-1)
        }
      }
    });
  };
}
