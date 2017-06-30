Page({
  data:{
    tabIndex: 1,
    list:[1,2],
    newsList:[1,2,3],
  },
  onLoad: function (e) {
    console.log('onLoad')
    wx.setNavigationBarTitle({
      title: e.title
    })
  },
  tabChange(e){
    let type = e.target.dataset.type
    if(type===this.data.tabIndex){
      return 
    }
    this.setData({
      tabIndex: type
    })
  },
})