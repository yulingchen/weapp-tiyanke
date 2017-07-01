Page({
  data:{
    list: [
      {
        id: 1,
        status: "已报名"
      },
      {
        id: 2,
        status: "体验中",
      },
      {
        id: 3,
        status: "已结束",
      }
    ],
  },
  onLoad: function () {
    console.log('onLoad')
  }
})