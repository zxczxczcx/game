// pages/indexs/indexs.js
//获取应用实例
const app = getApp()

const xcx_url = app.globalData.xcx_url;
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
    nextMargin: 0,

    page:1,
    pagenum:10
  },
  getshoplist:function(){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this=this
    //发送网络请求
    wx.request({
      url: xcx_url+'/detail',
      data:{
        page:_this.data.pagenum
      },
      success:function(b){
        // console.log(b.data.data.goods)
        _this.setData({
          goods:b.data.data.goods,
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
      // console.log(112233)
      this.data.page++;    //递增 +1
      this.getGoodsList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**跳转事件 */
  shop_page:function(s){
    let _this = this 
    // console.log(s)
    //发起网络请求
    wx.navigateTo({
      url: '/pages/shoppage/shoppage?goods_id='+s.currentTarget.id,
    })
  },

  /**获取商品数据  ----上拉 */
  getGoodsList:function(){
    let _this=this
    //发送网络请求
    wx.request({
      url: xcx_url+'/detail',
      data:{
        page:_this.data.pagenum,
        pagesize:_this.data.page
      },
      header:{'content-type': 'application/json'},
      success:function(res){
        
        let new_goods = _this.data.goods.concat(res.data.data.goods)
        _this.setData({
          // goods:b.data.data.goods,
          goods:new_goods
        })
      }
    })
  }
    
    

  
})