Page({
  onLoad: function () {
    console.log('onLoad')
    
  },
  gotoDetails(e){
    let data = e.target.dataset
    wx.navigateTo({
      url: '../details/index',
    })
  },
  publishShare(){
    wx.navigateTo({
      url: '../add/index',
    })
  },
})