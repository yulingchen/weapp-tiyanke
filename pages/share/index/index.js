Page({
  data:{
    list:[
      {
        id:1,
        img:[
          'https://img.grouplus.com/admin-files/20456/poster_image/20170622091332850.jpg-proportionw480',
          'https://img.grouplus.com/admin-files/20456/poster_image/20170622091332850.jpg-proportionw480',
          'https://img.grouplus.com/admin-files/20456/poster_image/20170622091332850.jpg-proportionw480'
        ]
      }
    ]
  },
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