#### d3.drag | Function

> 入参: 无 
>
> 描述: 创建一个拖拽操作
>
> 返回值: *drag*，既是一个对象，也是一个函数，往往通过 selection.call 来将其应用到指定的选择集上

#### *drag* | Function

> 入参: selection
>
> 描述: 为指定的选择集应用 drag。一般会使用 selection.call 来代替该方法来完成相同的功能，例如
> ```
> d3.selectAll(".node").call(d3.drag().on("start", started));
> ```
> 上述代码指明了可以在所有 class 为 node 的元素上使用 drag，并且还定义了 drag start 的事件监听器。所有的 drag 事件(start, drag, end)都指定了 .drag 作为事件名称，因而可以通过 .drag 来移除其事件监听器，如下
> ```
> selection.on(".drag", null);
> ```
>
> 返回值: 无

#### *drag*.container | Function

#### *drag*.filter | Function

> 入参: [filter]，filter 为 Function
>
> 描述: 如果指定了 filter，则设置该 drag 的过滤器；否则，返回当前 drag 的过滤器函数，默认为以下函数
> ```
> function filter() {
>   return !event.button;
> }
> ```
> 如果 filter 函数返回 falsey(false 的等价值，比如 null, 0, NaN 等)，则不触发 drag 操作。因此，filter 可以用来过滤 drag 的触发条件。上述的默认 filter 函数过滤了鼠标右键点击的操作，即当点击鼠标右键时，不触发 drag 操作，这是因为点击鼠标右键往往有其它用途，例如弹出菜单栏等
>
> 返回值: 如果指定了 filter，返回 *drag*；否则，返回 Function

#### *drag*.subject | Function

#### *drag*.clickDistance | Function

#### *drag*.on | Function

> 入参: (typenames[, listener])
> > 其中 typenames 是一个字符串，多个 typename 中间使用空格分隔。typename 的表现形式主要有两种
> > 1. 事件类型，必须是如下三种类型之一：
> > ```
> > start - 开始拖拽，比如鼠标按下时
> > drag - 拖拽中，比如鼠标移动时
> > end - 拖拽结束，比如鼠标抬起时
> > ```
> > 2. 事件类型.事件名称，其中事件类型同上，事件名称用来标识该事件，它们中间使用'.'间隔，该形式通常用于给相同类型的事件增加多个不同的监听器 
> >
> > 其中 listener 是一个函数: function (d, i) {}
> >
> > d 代表当前数据，i 代表当前索引。this 代表当前元素对应的真实 DOM 节点。如果已注册过特定 typename 的监听器，那么多次注册会将原来的监听器覆盖。如果想要移除特定 typename 的监听器，传入 listener 为 null 即可
>
> 描述: 向当前 drag 添加或移除事件监听器。如果没有指定 listener，则返回第一个符合特定 typename 的监听器；否则，给对应的 typename 增加事件监听器
>
> 返回值: 如果指定了 listener，返回 *drag*；否则，返回 Function

#### d3.dragDisable | Function

> 入参: window
>
> 描述: 阻止窗口上的原生拖拽和文本选择事件
>
> 返回值: 无

#### d3.dragEnable | Function

> 入参: (window[, noclick])
>
> 描述: 启用窗口上的原生拖拽和文本选择事件，取消 d3.dragDisable 的影响。如果 noclick 为 true，那么紧跟(0ms)在 mouseup 事件后面的点击事件无效
>
> 返回值: 无

### drag 事件

当 drag 监听器被调用时，d3.event 被设置为当前的 drag 事件，该 event 对象包括以下的属性或方法
- target - 相关的 drag 行为，比如 filter, container, clickDistance 等
- type - 本次 drag 的类型，有三种情况：start, drag 或 end
- subject - 由 drag.subject 定义
- x - subject 的新 x 坐标
- y - subject 的新 y 坐标
- dx - 相对上个拖拽事件的 x 偏移
- dy - 相对上个拖拽事件的 y 偏移
- identifier - 字符串"mouse"或触摸的标识符数字(touch identifier)
- active - 当前活跃的拖拽事件数量
- sourceEvent - 底层输入事件，比如 mousemove 或 touchmove