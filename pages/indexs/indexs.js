// pages/indexs/indexs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: [
        '/img/nursing-banner.jpg', '/img/draw-banner.jpg', '/img/discount-banner.jpg'
       ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this=this
    //发送网络请求
    wx.request({
      url: 'http://www.weixin.com/detail',
      success:function(b){
        console.log(b.data)
        _this.setData({
          goods:b.data
        })
      }
    })
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
  shop_page:function(s){
    let _this = this 
    console.log(s)
    //发起网络请求
   wx.navigateTo({
     url: '/pages/shoppage/shoppage?goods_id='+s.currentTarget.id,
   })
   
      }
    

  
})