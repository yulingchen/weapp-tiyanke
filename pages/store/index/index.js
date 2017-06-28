Page({
  data:{
    items:[1,2,3,4,5,6,7,8,9,10]
  },
  onLoad: function () {
    console.log('onLoad')
  },
  getMoreData:function(){
    console.log('get more');
  },
   gotoDetail: function (e) {
    wx.navigateTo({
      url: '../detail/index?title=' + e.target.dataset.title,
    })
  },
})