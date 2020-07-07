//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    src: null,
  },
  // 事件处理函数——拍照
  takePhoto() {
    const ctx = wx.createCameraContext();
    ctx.takePhoto({
      quality: "high",
      success: (res) => {
        this.setData({
          src: res.tempImagePath,
        });
      },
    });
  },
  error(e) {
    console.log(e.detail);
  },
  onLoad: function () {},
});
