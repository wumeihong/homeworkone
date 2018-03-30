吴美红

1 该项目是的主要涉及的是react react-redux react-dom mock react-saga redux redux-saga
2 应用的插件有 react-lazyload react-toast-mobile prop-types
3 封装的组件有goodsComp(商品列表) cartItem(购物车) dialog(弹出框) swiper(轮播图) 以及路由组件
4 操作数据的时候主要用到了redux redux-saga
5 该项目的跟路由是index
6 一级路由有:index(跟路由) loggin(登录) registers(注册) detail(详情页) setting(设置页)
7 在index下面存放了二级路由,分别是home,catagory,cart,mine,search,result

8 在home路由中,引用了swiper组件 和goodsComp组件,
 在展示商品列表的时候,当商品的channel_id>9的时候,就要提醒顾客，已经到底了,
 否则,判断如果页面的高度-(滚动条滚动的距离顶部的高度+滚动条的滚动的高度)<50的话,那就要继续加载其他的商品,
 当点击该商品的时候,利用了一个小技巧,冒泡的原理!
 如果点击商品图片或者标题,就会跳转到该商品的详情页,同时加载图片的时候,使用了懒加载
 当点击购物车的时候，则会将该商品添加到购物车页面,在该处也用了token字段,要判断有没有已经登录的用户,如果有就直接将该商品信息添加到cart_info.json中,提示用户添加购物车成功;并且渲染到购物车视图
 没有的话,就提示还未登录,请登录!成功之后,添加数据成功并且渲染到购物车页面,并且商品信息以及当前的用户信息存在cart_info.json下面

9 在catagory(分类)路由中,进行了简单的排版,并且封装了一个mock数据,并且mock数据里面含有id这个属性,点击左边  的时候按钮的时候,拿到当前的index,并且index+1,通过index+1与右边的mock数据里的id比较,如果index+1==id,就  拿到对应的数据

在cart路由中,引用了cartItem组件,在购物车里面添加了authorization属性,表示限制,如果没有已经登录的用户,则无法进入该页面,即token,就要跳到登录页面登录,登录成功后,定位到之前的页面,在购物车页面当点击添加商品的时候,商品信息添加到cart_info.json里面,并且实时更新购物车页面的视图

在mine路由中，利用mock数据生成一个数据渲染在热门推荐下面,
当点击地址管理的时候,跳到deliveryList(收获地址)的路由,
当点击添加地址的时候,跳到consignee页面，在这个页面中进行添加信息,
如果该页面没有东西的时候,当点击保存的时候,会弹出信息,提醒用户信息不能不空,
并且当input框内容为空的时候,这是后prop-types就会起作用,有一个警告,input不能为空
反之则将所有的信息以数组的形式存到delivery.json中,然后在consignee页面拿到delivery.json文件,
并且渲染到页面;
并且在mine路由中,增加了authorization这个属性,意为限制，当点击该页面的时候，如果没有登录过的状态,则跳到登录页面重新登录,当点击设置的按钮的时候,会跳转到setting路由,在设置的路由中,引用dialog组件,当点击退出登录的时候,显示弹出框,点击确认则返回首页,点击取消则还是留在当前的页面,在设置页面点击设置的按钮,则返回到我的页面

在登录路由页面,如果没有账号密码,点击注册,跳转到注册路由,然后注册账号,当注册成功之后,提示用户注册成功,并且将用户信息添加到user.json中
再在注册页面点击登录按钮跳转到注册路由,并且登录上,提醒用户登录成功并且跳转到主页面



