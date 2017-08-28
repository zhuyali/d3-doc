brush 是一个通过鼠标手势来选择一个一维或二维区域的交互操作，比如通过点击并拖拽鼠标就可以选择一个区域。brush 操作通常用于选择离散的元素，比如一个散点图中的某些点。

d3-brush 的实现是基于 SVG 的鼠标或触摸事件。在刷选区域里进行点击和拖拽，可以平移刷选区域；点击并拖拽刷选区域的边缘可以改变区域的大小；在刷选区域外点击并拖拽可以创建一个新的刷选区域；在刷选区域里按下 META(⌘) 键，可以移除当前所在的刷选区域；在刷选时，按下 ALT(⌥) 键可以以刷选起始点为中心进行刷选；当按下 SPACE 键时，仅允许移动变换。

#### d3.brush | Function

> 入参: 无 
>
> 描述: 创建一个二维的 brush
>
> 返回值: *brush*

#### d3.brushX | Function

> 入参: 无 
>
> 描述: 创建一个一维的 x 方向的 brush
>
> 返回值: *brush*

#### d3.brushY | Function

> 入参: 无 
>
> 描述: 创建一个一维的 y 方向的 brush
>
> 返回值: *brush*

#### *brush* | Function

> 入参: group
>
> 描述: 为指定的 group 应用 brush，group 必须是一个 selection 或 SVG G 元素。一般会使用 selection.call 来代替该方法来完成相同的功能，例如
> ```
> svg.append("g")
>   .attr("class", "brush")
>   .call(d3.brush().on("brush", brushed));
> ```
> 上述代码指明了可以在该 G 元素上使用 brush，并且还定义了 brush 的事件监听器。所有的 brush 事件(start, brush, end)都指定了 .brush 作为事件名称，因而可以通过 .brush 来移除其事件监听器，如下
> ```
> group.on(".brush", null);
> ```
> 当我们刷选完毕后，会产生一个刷选区域，d3 内部的实现机制是创建一个 SVG 元素来显示选中的区域，因而可以自定义选中区域的样式，二维的刷选区域的 brush 元素结构如下
> ```
> <g class="brush" fill="none" pointer-events="all" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
>   <rect class="overlay" pointer-events="all" cursor="crosshair" x="0" y="0" width="960" height="500"></rect>
>   <rect class="selection" cursor="move" fill="#777" fill-opacity="0.3" stroke="#fff" shape-rendering="crispEdges" x="112" y="194" width="182" height="83"></rect>
>   <rect class="handle handle--n" cursor="ns-resize" x="107" y="189" width="192" height="10"></rect>
>   <rect class="handle handle--e" cursor="ew-resize" x="289" y="189" width="10" height="93"></rect>
>   <rect class="handle handle--s" cursor="ns-resize" x="107" y="272" width="192" height="10"></rect>
>   <rect class="handle handle--w" cursor="ew-resize" x="107" y="189" width="10" height="93"></rect>
>   <rect class="handle handle--nw" cursor="nwse-resize" x="107" y="189" width="10" height="10"></rect>
>   <rect class="handle handle--ne" cursor="nesw-resize" x="289" y="189" width="10" height="10"></rect>
>   <rect class="handle handle--se" cursor="nwse-resize" x="289" y="272" width="10" height="10"></rect>
>   <rect class="handle handle--sw" cursor="nesw-resize" x="107" y="272" width="10" height="10"></rect>
> </g>
> ```
> 其中 overlay 矩形来表示 brush 的可刷选范围(大于或等于当前实际选中的范围)，由 brush.extent 来定义；selection 矩形是当前的刷选区域；handle 矩形用来表示四个边框和四个角落，当鼠标接近区域边缘的时候可以移动，实际上就是鼠标移动到了这些矩形上。
>
> 返回值: 无

#### *brush*.move | Function

> 入参: (group, selection)，其中 selection 有两种形式
> > 1. 数值类型的数组
> > 2. function (d, i) {}，其中 d 代表当前数据，i 代表当前索引，nodes 代表当前已经被选择的元素集。this 代表当前元素对应的真实 DOM 节点。该函数返回值为一个数值类型的数组
>
> 描述: 为指定的 group 设置选中范围，在此之前应确保 group 是可被刷选的。group 必须是一个选择集或是一个 SVG G 元素的过渡(transition)。seletion 的数组维度由 brush 的维度来决定。如果是一维的，那么对于 x-brush 来说，selection 由 [x0, x1] 定义；对于 y-brush 来说，selection 由 [y0, y1] 来定义。如果是二维的，selection 由 [[x0, y0],[x1, y1]] 来定义
>
> 返回值: 无

#### *brush*.extent | Function

> 入参: [extent]，有两种形式
> > 1. [[x0, y0], [x1, y1]]，[x0, y0] 代表左上角坐标，[x1, y1]表示右下角坐标
> > 2. function (d, i) {}，其中 d 代表当前数据，i 代表当前索引。this 代表当前元素对应的真实 DOM 节点。该函数返回值为一个数值类型的数组
>
> 描述: 如果指定了 extent，则定义可刷选的范围；否则，返回当前 brush 的 extent 的存取器，默认为以下函数
> ```
> function extent() {
>   var svg = this.ownerSVGElement || this;
>   return [[0, 0], [svg.width.baseVal.value, svg.height.baseVal.value]];
> }
> ```
> 该存取器实际上为一个函数，执行该函数即可获取到该 brush 的 extent。可以从上述代码看出，默认的 extent 依赖于祖先 SVG 元素的宽高
>
> 返回值: 如果指定了 extent，返回 *brush*；否则，返回 Function

#### *brush*.filter | Function

> 入参: [filter]，filter 为 Function
>
> 描述: 如果指定了 filter，则设置该 brush 的过滤器；否则，返回当前 brush 的过滤器函数，默认为以下函数
> ```
> function filter() {
>   return !event.button;
> }
> ```
> 如果 filter 函数返回 falsey(false 的等价值，比如 null, 0, NaN 等)，则不触发 brush 操作。因此，filter 可以用来过滤 brush 的触发条件。上述的默认 filter 函数过滤了鼠标右键点击的操作，即当点击鼠标右键时，不触发 brush 操作，这是因为点击鼠标右键往往有其它用途，例如弹出菜单栏等
>
> 返回值: 如果指定了 filter，返回 *brush*；否则，返回 Function

#### *brush*.handleSize | Function

> 入参: [size]，size 为 Number
>
> 描述: 如果指定了 size，则设置该 brush 的 handle(handle 矩形用来表示四个边框和四个角落) 的大小；否则，返回当前 brush 的 handle 的大小，默认为 6
>
> 返回值: 如果指定了 size，返回 *brush*；否则，返回 Number
>
> 注: 该方法必须在应用一个 brush 到选择集之前调用，并且在调用之后，对之前的 brush 没有影响


#### *brush*.on | Function

> 入参: (typenames[, listener])
> > 其中 typenames 是一个字符串，多个 typename 中间使用空格分隔。typename 的表现形式主要有两种
> > 1. 事件类型，必须是如下三种类型之一：
> > ```
> > start - 开始 brush 操作，比如鼠标按下时
> > brush - 开始拖拽选择 brush 区域，比如鼠标移动时
> > end - 拖拽选取结束时，比如鼠标抬起时
> > ```
> > 2. 事件类型.事件名称，其中事件类型同上，事件名称用来标识该事件，它们中间使用'.'间隔，该形式通常用于给相同类型的事件增加多个不同的监听器 
> >
> > 其中 listener 是一个函数: function (d, i) {}
> >
> > d 代表当前数据，i 代表当前索引。this 代表当前元素对应的真实 DOM 节点。如果已注册过特定 typename 的监听器，那么多次注册会将原来的监听器覆盖。如果想要移除特定 typename 的监听器，传入 listener 为 null 即可
>
> 描述: 向当前 brush 添加或移除事件监听器。如果没有指定 listener，则返回第一个符合特定 typename 的监听器；否则，给对应的 typename 增加事件监听器
>
> 返回值: 如果指定了 listener，返回 *brush*；否则，返回 Function

#### d3.brushSelection | Function

> 入参: node，类型为 Node
>
> 描述: 返回指定节点的 brush 选择。如果给定的 node 没有定义 brush 操作，则返回 null。此外，对于二维 brush，返回 [[x0, y0], [x1, y1]] 这种形式；对于一维 x-brush，返回 [x0, x1] 这种形式；对于一维 y-brush，返回 [y0, y1] 这种形式
>
> 返回值: null 或 数值类型的数组

### brush 事件

当 brush 监听器被调用时，d3.event 被设置为当前的 brush 事件，该 event 对象包括以下的属性或方法
- target - 相关的 brush 行为，比如 filter, extent, handleSize 等
- type - 本次 brush 的类型，有三种情况：start, brush 或 end
- selection - 本次 brush 的 brushSelection，可以参考 d3.brushSelection
- sourceEvent - 底层输入事件，比如 mousemove 或 touchmove