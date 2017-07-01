Page({
  data: {
    skills:[
      {
        name: '安卓App测试',
        icon:'android',
        locked: true
      },
      {
        name: '苹果App测试',
        icon:'iphone',
        locked: true
      }
    ]
  },

  gotoUnlock(e){
    let data = e.currentTarget.dataset;
    wx.showToast({ title: '敬请期待' })
  },

  onLoad: function (options) {
    var self = this;

    (function getSkill(){
      wx.request({
        url: 'https://m.tiyanke.com/experience/skill/info', 
        method: 'POST',
        data:{
          wxappSessionId: wx.getStorageSync('wxappSessionId')
        },
        success: function(res) {
          if(res.statusCode==401){
            app.login(getSkill)
            return;
          }

          var skillInfo = res.data.data;
          var skills;

          if(skillInfo.model){
            if(skillInfo.system.toLowerCase().indexOf('android')>-1){
              skills = self.data.skills.map(skill=>{
                if(skill.name=='安卓App测试'){
                  skill.locked=false
                }
                return skill
              })
            }

            if(skillInfo.system.toLowerCase().indexOf('ios')>-1){
              skills = self.data.skills.map(skill=>{
                if(skill.name=='苹果App测试'){
                  skill.locked=false
                }
                return skill
              })
            }
          }

          self.setData({
            skills: skills
          })
        }
      })
    })()
  }
})