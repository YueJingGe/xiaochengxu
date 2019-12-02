# xiaochengxu
小程序

## 简介

- 代码构成

  JSON 配置 + WXML 模板 + WXSS 样式 + js 交互

- 微信客户端和小程序的关系

  微信客户端是小程序的宿主环境

- 几个线程

  两个。渲染层(WebView) + 逻辑层(JsCore)

- 通信模型

  渲染层(WebView) + 逻辑层(JsCore) ——> 微信客户端(中转) ==> 第三方服务器

## 发布上线

预览-> 上传代码 -> 提交审核 -> 发布

https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/release.html#%E5%8F%91%E5%B8%83%E4%B8%8A%E7%BA%BF

## 自定义组件

- 小程序组件复用

方案：采用定义组件

https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html

组件之间的传值与通信

https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/events.html

应用：https://developers.weixin.qq.com/community/develop/doc/0006e8c236cd10d499b6217a351c09

### 组件间通信

### 组件的生命周期

- created
  组件实例被创建时触发
- attached
  组件初始化完毕，进入页面节点树之后触发。进行各种初始化行为
- detached
  组件离开页面节点树后被触发

## 请求

- 事先设置通讯域名
  小程序后台 > 开发 > 开发设置 > 服务器域名
- wx.request HTTPS 请求
- wx.uploadFile 上传文件
- wx.downloadFile 下载文件
- wx.connectSocket WebSocket 通信

## CSS

- 伪类 占位符文本样式

```css
::-webkit-input-placeholder {
  /* WebKit browsers 表示表单元素的占位符文本 WebKit 和 Blink */
  color: #adb3bf;
  font-size: 16px;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ 表示自定义占位符文本的外观 Firefox 19+ */
  color: #adb3bf;
  font-size: 16px;
}

:-ms-input-placeholder {
  /* Internet Explorer 10+ 表示表单元素的占位符文本，IE 10+ */
  color: #adb3bf;
  font-size: 16px;
}
```

- rpx 单位

根据屏幕的宽度进行自适应。

规定屏幕的宽度是 750rpx，在 iPhone6 上，屏幕的宽度是 375px，共有 750 个物理像素，则：750rpx = 375px = 750 物理像素，1rpx = 0.5px = 1 物理像素；1px = 2rpx = 2 物理像素；

- wx.navigateTo

进行页面跳转

```js
to_details: function(event) {
  wx.navigateTo({
    url: '/pages/user/person/person',
  })
},
```

## json

## js

- onLaunch 小程序启动之后 触发

- onLoad 页面渲染后 执行

- wx.createSelectorQuery 获取节点信息
- wx.navigateTo
- wx.showToast
- wx.getLocation 地理位置
- wx.scanCode 微信扫一扫
- wx.authorize 授权
- wx.login 登录

- getCurrentPages 获取当前页面栈
- onReachBottom 上拉
- onPullDownRefresh 下拉

## html

- bindtap
- bindchange
- bindinput
- wx:for
- wx:if

- picker
- swiper
  - block
- rich-text 富文本

## 组件功能

- 登录
- 退出登录

```JS
outlogin: function(event) {
  wx.showModal({
    title: '提示',
    content: '是否要退出登录',
    success(res) {
      if (res.confirm) {
        // 清空本地存储
        wx.setStorageSync(app.globalData.access_token, '')
        // 重新跳转到登录页面
        wx.reLaunch({
          url: '/pages/login/login',
        })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
},
```

- 登录流程

  绑定过账号之后退出进入如何判断已经绑定过账号了。难点：此时没有用户信息

  js_code -> openid -> userInfo
  第一步：wx.login() 方法为当前用户生成一个临时的登录凭证，有效期只有 5 分钟
  第二步：获取 openid 和 session_key。

  - openid
    在公众平台里，用来标识每个用户在订阅号、服务号、小程序这三种不同应用的唯一标识，每个用户在每个应用的 openid 都是不一致的。
  - session_key
    保证当前用户会话操作的有效性，维护小程序用户的登录态，

    服务器端通过 https://api.weixin.qq.com/sns/jscode2session 接口获取到 session_key

  - wx.checkSession()
    校验当前 session_key 是否已经过期，如果已经过期，让用户重新登录

- 分享功能

```jsx
<button class="button_share" open-type="share">
  <image src="https://wtbl-img.oss-cn-hangzhou.aliyuncs.com/academy%20/share_2x.png "></image>
  <text>分享</text>
</button>
```

- 小程序 回到顶部功能

  ```js
  // 滚动到顶部
  backTop: function () {
    // 控制滚动
    wx.pageScrollTo({
      scrollTop: 0
    });
    this.setData({
      page: 1
    });
  },
  ```

  https://www.cnblogs.com/wesky/p/9067069.html

  > 注意：滚动到顶部之后有些数据需要初始化，比如：当前页码

- 极点日历功能

考勤记录

- 上拉加载更多
- 进出场动画
- tab 切换
- 选择器
  - 时间选择
  - 下拉选择
- 轮播图
- 视频播放
  - 课程列表
- 富文本展示
- 不明白场景值的使用

## 问题 FAQ

- wx.showToast() 在真机中闪烁一下消失；在安卓中不显示

问题描述：

在真实的业务场景下，请求接口需要调用 wx.showLoading(),接口请求结束调用 wx.hideLoading()。如果需要给用户提示错误信息，调用 wx.showToast(),在模拟器上没事，但是在真机上会出现提示信息闪烁一下，然后消失。

原因：

小程序的内部处理 wx.showLoading() 和 wx.showToast() 调用的是同一个框，都受 wx.hideToast() 或者 wx.hideLoading() 的影响。
比如在真机上你的代码顺序为 wx.showLoading() =>wx.hideLoading() => wx.showToast() ;但是实际你看到的现象是 wx.showLoading() => wx.showToast() =>wx.hideLoading()，受到最后的 wx.hideLoading() 影响，toast 框闪烁一下就消失；

解决：

```js
wx.showLoading();
wx.hideLoading();
setTimeout(() => {
  wx.showToast({
    title: "提示的错误术语",
    icon: "none"
  });
  setTimeout(() => {
    wx.hideToast();
  }, 2000);
}, 0);
// 看到代码就明白了，其实就是把 wx.showToast() 放到事件队列的队尾去执行
```

- 微信小程序-下拉松开弹不回去顶部留一段空白

wx.stopPullDownRefresh();

- 小程序路由传递对象参数

```js
encodeURIComponent(JSON.stringify(info));
JSON.parse(decodeURIComponent(options.info));
```

- 小程序解析富文本
  - 转义特殊字符
  - 图片过大

```js
function escapeHtml(str) {
  var arrEntities = { lt: "<", gt: ">", nbsp: " ", amp: "&", quot: '"' };
  return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function(all, t) {
    return arrEntities[t];
  });
}

function formatImgForRichText(str) {
  return str.replace(/\<img/gi, '<img class="rich-img" ');
}

function formatRichText(richText) {
  if (!richText) return richText;
  let res = "";
  res = escapeHtml(richText);
  res = formatImgForRichText(res);
  return res;
}
```

```css
/* 统一处理富文本图片样式 */
rich-text .rich-img {
  max-width: 100%;
  height: auto;
}
```

- 如何展示出关闭按钮，关闭当前页面，返回上一页面

- 微信小程序 textarea 的内容随着屏幕上下移动的问题

设置 textarea fixed="true" 即可

https://blog.csdn.net/kerryqpw/article/details/78902235

- 输入框被软键盘顶上去的问题

给输入框设置：adjust-position="{{false}}"

https://blog.csdn.net/weixin_43631810/article/details/86663614

- 小程序下载文件

```js
wx.downloadFile({
  url: "https://example.com/audio/123", //仅为示例，并非真实的资源
  success(res) {
    // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
    if (res.statusCode === 200) {
      wx.playVoice({
        filePath: res.tempFilePath
      });
    }
  }
});
```

- 解决小程序分享的页面无法返回首页的问题

方案一：

点击分享，携带参数进入首页，首页根据参数进行判断，跳转到具体的详情页

https://www.jianshu.com/p/9cff248066c8

方案二：

点击分享，携带参数 isShare 进入详情页，详情页根据是否是 isShare 的，决定显示返回首页的悬浮按钮

https://blog.csdn.net/qq_40236722/article/details/90372148

- 为什么小程序不需要下载

小程序是基于 BS 结构的，这种结构相对于 CS 结构来说，不需要下载安装包来升级客户端，

微信相当于起到了浏览器的作用，小程序放在远端微信的服务器里面

我们需要使用小程序的时候，直接在微信里发出请求，远端服务器再提供服务。

所以，我们在使用小程序的时候，只需要点击目标小程序，让小程序与远端主机进行信息交互，交互成功后，我们就能使用小程序啦

- 微信扫码进入小程序

  - 解析扫码进入的参数

    ```js
    // 格式化此种形式的字符串 "id=543&uid=7075"
    function formatQuery(str) {
      console.log(str);
      let obj = {};
      let arr = str.split("&");
      console.log(arr);
      arr.map(item => {
        let array = item.split("=");
        console.log(array);
        obj[array[0]] = array[1];
      });
      return obj;
    }

    function formatRouteQuery(query) {
      if (query.scene) {
        return formatQuery(decodeURIComponent(query.scene));
      }
      return query;
    }
    ```

- 小程序-根据不同的条件展示不同的 tabbar

- 微信的 wxml 中使用自定义函数的方法

- 小程序如何弹出页面

- 微信小程序 iOS 切换 tab 视频会出现偏移
