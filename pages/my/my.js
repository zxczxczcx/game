// pages/my/my.js
//获取应用实例
const app = getApp()

const xcx_url = app.globalData.xcx_url;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   *  获取当前用户信息
   * @param {*} 
   */
  /* onGotUserInfo: function (e) {          获取当前用户的信息 
    // console.log(e.detail.errMsg)
     // console.log(e.detail.userInfo)
   console.log(e.detail.rawData)
  },*/
  userInfo:function(e){
    // console.log(e)
    //获取用户信息
    let user = e.detail.userInfo
    //获取token
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: xcx_url+'/login',
            data: {
              code: res.code,
              user: user
            },
            success:function(res){
              wx.setStorage({
                data: res.data.data.token,
                key: 'token',
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

 
 


})