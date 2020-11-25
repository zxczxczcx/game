// pages/cart/cart.js
const app = getApp()

const xcx_url = app.globalData.xcx_url;
Page({

 /**
   * 页面的初始数据
   */
  data:{
    carts: [
      {
        cid:1008,
        title:'小米Note2 全网通 标准版 4GB内存 64GB ROM 亮黑色',
        image:'http://m.360buyimg.com/babel/s390x390_jfs/t3544/28/568416609/135582/af801e4f/580f1296N69590b3b.jpg!q50.jpg.webp',
        num:'1',
        price:'2799',
        sum:'2799',
        selected:true
      },
  ],
    minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled']
  },
    bindMinus: function(e) {
      var index = parseInt(e.currentTarget.dataset.index);//得到下标
      var num = this.data.carts[index].num;
      // 如果只有1件了，就不允许再减了
      if (num > 1) {
         num --;
      }
      // 只有大于一件的时候，才能normal状态，否则disable状态
      var minusStatus = num <= 1 ? 'disabled' : 'normal';
      // 购物车数据
      var carts = this.data.carts;
      carts[index].num = num;
      // 按钮可用状态
      var minusStatuses = this.data.minusStatuses;
      minusStatuses[index] = minusStatus;
      // 将数值与状态写回
      this.setData({
        carts: carts,
        minusStatuses: minusStatuses
      });
      this.sum()
  },
  bindPlus: function(e) {
    var index = parseInt(e.currentTarget.dataset.index);
    
    var num = this.data.carts[index].num;
    // 自增
    num ++;
    
    // 只有大于一件的m时候，才能normal状态，否则disable状态
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 购物车数据
    var carts = this.data.carts;
    carts[index].num = num;
    // 按钮可用状态
    var minusStatuses = this.data.minusStatuses;
    minusStatuses[index] = minusStatus;
     console.log(minusStatuses[index])
    // 将数值与状态写回
    this.setData({
      carts: carts,
      minusStatuses: minusStatuses
    });
    this.sum()
  },
  bindCheckbox: function(e) {
    //绑定点击事件，将checkbox样式改变为选中与非选中
    //拿到下标值，以在carts作遍历指示用
    var index = parseInt(e.currentTarget.dataset.index);
    //原始的icon状态
    var selected = this.data.carts[index].selected;
    var carts = this.data.carts;
    // 对勾选状态取反
    carts[index].selected = !selected;
    // 写回经点击修改后的数组
    this.setData({
     carts: carts
    });
    this.sum()
  },
   bindSelectAll: function(e) { 
   // 环境中目前已选状态 
   var selectedAllStatus = this.data.selectedAllStatus;
    // 取反操作 
    selectedAllStatus = !selectedAllStatus; 
    // 购物车数据，关键是处理selected值 
    var carts = this.data.carts; 
    // 遍历 
    for (var i = 0; i < carts.length; i++) { 
        carts[i].selected = selectedAllStatus;
       } 
       this.setData({ 
        selectedAllStatus: selectedAllStatus,
         carts: carts 
      }); 
       this.sum()
   },
   bindCheckout: function(e) {
      // 初始化toastStr字符串
      var toastStr = 'cid:';
      // 遍历取出已勾选的cid
      for (var i = 0; i < this.data.carts.length; i++) {
        if (this.data.carts[i].selected) {
          toastStr += this.data.carts[i].cid;
          toastStr += ' ';
        }
      }
      //存回data
      this.setData({
        toastHidden: false,
        toastStr: toastStr
      });
    },
    bindToastChange: function(e) {
      this.setData({
        toastHidden: true
      });
  },
  //总价
  sum: function(e) {
    var carts = this.data.carts;
    // 计算总金额
    var total = 0;
    for (var i = 0; i < carts.length; i++) {
      if (carts[i].selected) {
      total += carts[i].num * carts[i].price;
      }
    }
    // 写回经点击修改后的数组
    this.setData({
    carts: carts,
    total: '￥' + (total).toFixed(2)
    });
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    let token = wx.getStorageSync('token');
    //发送请求
    wx.request({
      url: xcx_url+'/GetCart',
      data:{
        token:token
      },
      success:function(res){
        console.log(res)
        _this.setData({
          data: res.data
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

  }
})