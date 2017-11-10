力导向图基于 Velocity Verlet 实现了物理粒子之间的作用力的仿真。在可视化领域中，仿真经常被用于实现网络结构和层次结构，也可以使用仿真进行碰撞检测。使用该模块时，首先为指定的一组节点创建一个仿真，仿真可以监视力的相互作用过程中的一些状态，然后指定力学模型，力学模型有很多种，比如碰撞作用力、连接作用力等

## Simulation

#### d3.forceSimulation | Function

> 入参: [nodes]，是一个对象数组。nodes 为可选参数，若没有指定，则默认为空数组
>
> 描述: 为指定的节点数组创建一个仿真，由于还未指定力学模型，因而该仿真没有作用力。得到的仿真会自动开始，同时触发 tick 事件，事件的触发次数由 ⌈log(alphaMin) / log(1 - alphaDecay)⌉ 计算得出，默认情况下为 300 次
>
> 返回值: *simulation*

#### *simulation*.restart | Function

> 入参: 无
>
> 描述: 重启仿真内部的计时器(tick)
>
> 返回值: 无

#### *simulation*.stop | Function

> 入参: 无
>
> 描述: 停止仿真内部的计时器，如果仿真已经停止，则什么都不做
>
> 返回值: 无

#### *simulation*.tick | Function

> 入参: 无
>
> 描述: 通过 (alphaTarget - alpha) × alphaDecay 来调整仿真当前的 alpha 值(根据公式可以推导出默认情况下第 n 次 tick 时 alpha 的值为 (1 - alphaDecay) ^ n)，然后将这个新 alpha 值传给当前的力学模型来调整布局。每个节点的速度是通过当前 velocity(速度) * velocityDecay(速度衰减)来计算的，最后通过节点当前位置和速度计算出节点的下一个位置
>
> 返回值: 无
>
> 注: 该方法不会触发 tick 事件。每次仿真的 tick 事件的触发次数由 ⌈log(alphaMin) / log(1 - alphaDecay)⌉ 计算得出，默认参数情况下为300次

#### *simulation*.nodes | Function --待补充

> 入参: [nodes]
>
> 描述: 如果指定了 nodes 数组，则根据传入的 nodes 数组初始化仿真节点的初始化位置和速度；如果没有指定 nodes 数组，则根据传入 ```d3.forceSimulation```的 nodes 数组进行初始化。若都没有传入 nodes 数组，则默认为空数组。经过该函数后，会对节点数据进行一个数据改造，每个节点会添加以下属性：
> > ```index``` - 节点的索引
> >
> > ```x``` - 节点当前的 x 位置
> >
> > ```y``` - 节点当前的 y 位置
> >
> > ```vx``` - 节点当前的 x 速度
> >
> > ```vy``` - 节点当前的 y 速度
>
> 在仿真的过程中，x，y，vx 和 vy 可能随时都在变化。如果 vx 或 vy 为 NaN，那么速度会变为(0, 0)；如果 x 或 y 为 NaN，那么位置会根据 [phyllotaxis arrangement](https://bl.ocks.org/mbostock/11478058) 进行初始化
>
> 若要将节点固定到指定位置，需要设置一下两个参数:
> > ```fx``` - 节点的固定 x 位置
> >
> > ```fy``` - 节点的固定 y 位置
>
> 在每次 tick 事件结束后，节点会回到 (fx, fy) 位置，同时节点的 vx 和 vy 都被重置为 0。如果要移除节点的 fx 和 fy 属性，将其赋值为 null 即可
>
> 返回值: 无

#### *simulation*.alpha | Function

> 入参: [alpha]
>
> 描述: 设置或获取当前仿真的 alpha 值，区间为[0, 1]， 默认为 1
>
> 返回值: 如果指定了 alpha，则返回 *simulation*；否则返回 alpha
>
> 注：alpha 是动画的冷却系数，运动过程中会不断减小，直到小于 alphaMin，仿真停止

#### *simulation*.alphaMin | Function

> 入参: [min]
>
> 描述: 设置或获取最小的 alpha 值，区间为[0, 1]，默认为 0.001
>
> 返回值: 如果指定了 min，则返回 *simulation*；否则返回 min

#### *simulation*.alphaDecay | Function

> 入参: [decay]
>
> 描述: 设置或获取衰减系数。默认为0.0228，是由公式 1 - pow(0.001, 1 / 300) 得到的，其中 0.001 是默认的 alphaMin，1 是默认的 alpha，300 是默认的 tick 次数。从这个公式可以看出，衰减系数用来决定从当前 alpha 值到 alphaTarget 值的过渡快慢。衰减系数越大，仿真的过程越短，当然效果会越差。衰减系数越小，则仿真过程越长，最终的效果也就越好。衰减系数为 0 时，仿真会永远运行，alpha 值不变
>
> 返回值: 如果指定了 decay，则返回 *simulation*；否则返回 decay

#### *simulation*.alphaTarget | Function

> 入参: [target]
>
> 描述: 设置或获取 alpha 的目标值，区间为[0, 1]， 默认为 0
>
> 返回值: 如果指定了 target，则返回 *simulation*；否则返回 target

#### *simulation*.velocityDecay | Function

> 入参: [decay]
>
> 描述: 设置或获取速度衰减系数，相当于摩擦力。区间为[0, 1], 默认为 0.4。在每次 tick 之后，节点的速度都会等于当前速度乘以1 - velocityDecay，和 alpha 衰减类似，速度衰减越慢最终的效果越好，但是如果速度衰减过慢，可能会导致震荡
>
> 返回值: 如果指定了 decay，则返回 *simulation*；否则返回 decay

#### *simulation*.force | Function

> 入参: (name[, force])
>
> 描述: 设置或获取力的作用。默认情况下，仿真中的节点是没有力的作用的，需要通过这个方法为仿真系统设置力的作用。力有很多种，需要根据实际情况指定，比如在对图布局进行仿真时，可以设置如下几种力:
> ```
> var simulation = d3.forceSimulation(nodes)
>   .force("charge", d3.forceManyBody())	  //节点间的作用力
>   .force("link", d3.forceLink(links))	    //连线作用力
>   .force("center", d3.forceCenter());	    //重力，布局有一个参考位置，不会跑偏
> ```
>
> 返回值: 如果指定了 force，则返回 *simulation*；否则返回 force

#### *simulation*.find | Function

> 入参: (x, y[, radius])
>
> 描述: 返回距离(x, y)最接近的节点。当指定搜索半径 radius 时，则在指定的半径区域内寻找，若没有找到节点，则返回undefined；若没有指定搜索半径，则默认搜索半径为无穷大
>
> 返回值: 返回一个节点对象，对象结构与调用 ```*simulation*.nodes()``` 得到的对象结构一样

#### *simulation*.on | Function

> 入参: (typenames, [listener])
> > 其中 typenames 是一个字符串，多个 typename 中间使用空格分隔。typename 的表现形式主要有两种
> > 1. 事件类型，必须是如下三种类型之一：
> > ```
> > tick - 每次 tick 时调用
> > end - 仿真结束时调用，即当 alpha < alphaMin 时
> > ```
> > 2. 事件类型.事件名称，其中事件类型同上，事件名称用来标识该事件，它们中间使用'.'间隔，该形式通常用于给相同类型的事件增加多个不同的监听器
>
> 描述: 向当前仿真添加或移除事件监听器。如果没有指定 listener，则返回第一个符合特定 typename 的监听器；否则，给对应的 typename 增加事件监听器
>
> 返回值: 如果指定了 listener，返回 *simulation*；否则，返回 Function
>
> 注: tick 事件不会由 ```simulation.tick()``` 触发，只能通过 ```d3.forceSimulation```或```simulation.restart``` 触发

## Force
在 d3 中提供了向心力、连接力等作用力可以供用户自行调用。当然，d3 也容许用户自定义作用力来满足定制化的需求，比如想要所有的节点都朝向⟨0,0⟩运动，则可以定义如下:
```
function force(alpha) {
  for (var i = 0, n = nodes.length, node, k = alpha * 0.1; i < n; ++i) {
    node = nodes[i];
    node.vx -= node.x * k;
    node.vy -= node.y * k;
  }
}
```

#### *force* | Function --待补充

#### *force*.initialize | Function --待补充

### Centering
向心力可以使得节点布局围绕某个中心(x, y)，使得所有节点保持在视中心的位置

#### d3.forceCenter | Function

> 入参: [x[, y]]
>
> 描述: 根据指定的(x, y)坐标创建一个向心力。如果没有指定 x 和 y，则默认以(0, 0)坐标创建向心力
>
> 返回值: *center*

#### *center*.x | Function

> 入参: [x]
>
> 描述: 设置或获取向心力的 x 坐标，默认为 0
>
> 返回值: 如果指定了 x，则返回 *center*；否则，返回向心力的 x 坐标

#### *center*.y | Function

> 入参: [y]
>
> 描述: 设置或获取向心力的 y 坐标，默认为 0
>
> 返回值: 如果指定了 y，则返回 *center*；否则，返回向心力的 y 坐标

### Collision
碰撞力将所有的节点看做一个圆而不是点，圆与圆之间不会相互重叠。假设有两个节点 a 和 b，则它们的最短距离是 radius(a) + radius(b)

#### d3.forceCollide | Function

> 入参: [radius]
>
> 描述: 根据指定的半径创建一个碰撞力。如果没有指定半径，则默认为 1
>
> 返回值: *collide*

#### *collide*.radius | Function

> 入参: [radius]，有两种形式
> > 1. 数值
> > 2. function (node, index, nodes) {}，其中 node 为节点，index 为索引，nodes 为节点数组
>
> 描述: 设置或获取节点的碰撞半径。如果指定了 radius，则为每个节点设置其碰撞半径；否则，返回当前的碰撞半径函数，默认为以下函数
> ```
> function radius() {
>   return 1;
> }
> ```
>
> 返回值: 如果指定了 radius，则返回 *collide*；否则，返回碰撞半径函数

#### *collide*.strength | Function

> 入参: [strength]
>
> 描述: 设置或获取碰撞力的强度，区间为[0, 1]，默认为 0.7
>
> 返回值: 如果指定了 strength，则返回 *collide*；否则，返回碰撞力的强度值
>
> 注: 对于每个节点来说，下一个 tick 的节点位置都是可以确定的(通过(x + vx,y + vy))，那么这些节点能否重叠也是可以确定的，因而引入碰撞力的强度来改变节点的速度，以使得它们不会相互重叠，并且最终到达一个稳定的状态

#### *collide*.iterations | Function

> 入参: [iterations]
>
> 描述: 设置或获取迭代次数，默认为 1
>
> 返回值: 如果指定了 iterations，则返回 *collide*；否则，返回碰撞力的迭代次数
>
> 注: 迭代次数越多最终的布局效果越好，但是计算复杂度更高；迭代次数越低，则计算复杂度越小，最终的效果越差

### Links
连接力根据节点与节点之间的连接距离来决定节点的布局，力的强度与节点之间的距离成正比

#### d3.forceLink | Function

> 入参: [links]
>
> 描述: 在给定的 links 上创建连接力，如果没有指定 links，则默认为空数组
>
> 返回值: *link*

#### *link*.links | Function

> 入参: [links]
>
> 描述: 设置或获取连接力的 links 数组。每个 link 都是包含如下属性的对象:
> > ```
> > source - link 的源节点
> > target - link 的目标节点
> > index - 索引
> > ```
> 为方便起见，link 的源节点和目标节点可以由一个数字或者字符串指定而不是一个节点对象，可以参照 ```link.id``` 来决定用什么来表示源节点和目标节点。当进行 ```force.initialize(nodes)```时，这里的源节点和目标节点会被替换成相应的节点对象
>
> 返回值: 如果指定了 links，则返回 *link*；否则，返回 links 数组

#### *link*.id | Function

> 入参: [id]，id 为 Function，形式为 function (node, index, nodes) {}，其中 node 为节点，index 为索引，nodes 为节点数组
>
> 描述: 设置或获取节点的 id 访问器(id 访问器用来标识 link 中源节点和目标节点的查找方式)。如果指定了 id，则为节点设置 id 访问器；否则，返回当前的 id 访问器函数，默认为以下函数
> ```
> function id(d) {
>   return d.index;   //默认的 id 访问器为节点的索引
> }
> ```
> 当连接力初始化时，会为每个节点调用一次 id 访问器函数
>
> 返回值: 如果指定了 id，则返回 *link*；否则，返回 id 访问器函数

#### *link*.distance | Function

> 入参: [distance]，有两种形式
> > 1. 数值
> > 2. function (link, index, links) {}，其中 link 为当前连接，index 为索引，links 为连接数组
>
> 描述: 设置或获取距离访问器。如果指定了 distance，则为连接设置距离访问器；否则，返回当前的距离访问器，默认为以下函数
> ```
> function distance() {
>   return 30;
> }
> ```
> 距离访问器会被每个 link 所调用，因而可以为不同的 link 设置不同的距离
>
> 返回值: 如果指定了 distance，则返回 *link*；否则，返回距离访问器

#### *link*.strength | Function

> 入参: [strength]，有两种形式
> > 1. 数值
> > 2. function (link, index, links) {}，其中 link 为当前连接，index 为索引，links 为连接数组
>
> 描述: 设置或获取强度访问器。如果指定了 strength，则为连接设置强度访问器；否则，返回当前的强度访问器，默认为以下函数
> ```
> function strength(link) {
>   return 1 / Math.min(count(link.source), count(link.target));
> }
> ```
> 其中 count(node) 函数计算了 node 节点的度。强度访问器会被每个 link 所调用，因而可以为不同的 link 设置不同的强度
>
> 返回值: 如果指定了 strength，则返回 *link*；否则，返回强度访问器

#### *link*.iterations | Function

> 入参: [iterations]
>
> 描述: 设置或获取迭代次数，默认为 1
>
> 返回值: 如果指定了 iterations，则返回 *link*；否则，返回连接力的迭代次数
>
> 注: 迭代次数越多最终的布局效果越好，但是计算复杂度更高；迭代次数越低，则计算复杂度越小，最终的效果越差

### Many-Body
Many-Body 作用力应用在所有节点的相互作用之中，与连接力只影响源节点与目标节点两个节点不同，该作用力的影响是全局的：每个节点都对所有的其它节点有影响，即使它们不连通。可以用 Many-Body 来模仿重力和电荷力，当强度(strength)为正时，模拟重力；当强度为负时，模拟电荷力

#### d3.forceManyBody | Function

> 入参: 无
>
> 描述: 创建一个 manyBody 作用力
>
> 返回值: *manyBody*

#### *manyBody*.strength | Function

> 入参: [strength]，有两种形式
> > 1. 数值，可以为正，也可以为负
> > 2. function (node, index, nodes) {}，其中 node 为节点，index 为索引，nodes 为节点数组
>
> 描述: 设置或获取力的强度访问器，如果指定了 strength，则设置力的强度访问器；否则，返回当前的强度访问器，默认为以下函数
> ```
> function strength() {
>   return -30;
> }
> ```
> 当强度为正时，节点之间会相互吸引，类似于重力；当强度为负时，节点之间会相互排斥，类似于电荷力
>
> 返回值: 如果指定了 strength，则返回 *manyBody*；否则，返回力的强度访问器

#### *manyBody*.theta | Function

> 入参: [theta]
>
> 描述: 设置或获取 theta 参数，该参数默认为 0.9
>
> 返回值: 如果指定了 theta，则返回 *manyBody*；否则，返回 theta 参数

#### *manyBody*.distanceMin | Function

> 入参: [distance]
>
> 描述: 设置或获取节点间的最小距离，该参数默认为 1
>
> 返回值: 如果指定了 distance，则返回 *manyBody*；否则，返回最小距离

#### *manyBody*.distanceMax | Function

> 入参: [distance]
>
> 描述: 设置或获取节点间的最大距离，该参数默认为无穷大
>
> 返回值: 如果指定了 distance，则返回 *manyBody*；否则，返回最大距离

### Positioning
位置力以特定的强度推动节点沿着给定的维度(x 方向或 y 方向)向着目标位置移动。力的强度与目标位置与当前位置的一维距离成正比

#### d3.forceX | Function

> 入参: [x]
>
> 描述: 在 x 维度上给定的 x 位置上创建位置力，如果没有指定 x，则默认为 0
>
> 返回值: *x*

#### *x*.strength | Function

> 入参: [strength]，有两种形式
> > 1. 数值，范围为 [0, 1]
> > 2. function (node, index, nodes) {}，其中 node 为节点，index 为索引，nodes 为节点数组
>
> 描述: 设置或获取位置力的强度访问器，如果指定了 strength，则设置位置力的强度访问器；否则，返回当前的强度访问器，默认为以下函数
> ```
> function strength() {
>   return 0.1;
> }
> ```
> strength 决定了节点在 x 方向上的速度增量：(x - targerNode.x) × strength，这个值越大，节点的位置会越快地向目标位置过渡。强度访问器会被每个 node 所调用
>
> 返回值: 如果指定了 strength，则返回 *x*；否则，返回位置力的强度访问器

#### *x*.x | Function

> 入参: [x]，有两种形式
> > 1. 数值
> > 2. function (node, index, nodes) {}，其中 node 为节点，index 为索引，nodes 为节点数组
>
> 描述: 设置或获取位置力的 x 坐标访问器。如果指定了 x，则设置位置力的 x 坐标访问器；否则，返回当前的 x 坐标访问器，默认为以下函数
> ```
> function x() {
>   return 0;
> }
> ```
> 强度访问器会被每个 node 所调用
>
> 返回值: 如果指定了 x，则返回 *x*；否则，返回位置力的 x 坐标访问器

#### d3.forceY | Function

> 入参: [y]
>
> 描述: 在 y 维度上给定的 y 位置上创建位置力，如果没有指定 y，则默认为 0
>
> 返回值: *y*

#### *y*.strength | Function

> 入参: [strength]，有两种形式
> > 1. 数值，范围为 [0, 1]
> > 2. function (node, index, nodes) {}，其中 node 为节点，index 为索引，nodes 为节点数组
>
> 描述: 设置或获取位置力的强度访问器，如果指定了 strength，则设置位置力的强度访问器；否则，返回当前的强度访问器，默认为以下函数
> ```
> function strength() {
>   return 0.1;
> }
> ```
> strength 决定了节点在 y 方向上的速度增量：(y - targerNode.y) × strength，这个值越大，节点的位置会越快地向目标位置过渡。强度访问器会被每个 node 所调用
>
> 返回值: 如果指定了 strength，则返回 *y*；否则，返回位置力的强度访问器

#### *y*.y | Function

> 入参: [y]，有两种形式
> > 1. 数值
> > 2. function (node, index, nodes) {}，其中 node 为节点，index 为索引，nodes 为节点数组
>
> 描述: 设置或获取位置力的 y 坐标访问器。如果指定了 y，则设置位置力的 y 坐标访问器；否则，返回当前的 y 坐标访问器，默认为以下函数
> ```
> function y() {
>   return 0;
> }
> ```
> 强度访问器会被每个 node 所调用
>
> 返回值: 如果指定了 y，则返回 *y*；否则，返回位置力的 y 坐标访问器

#### d3.forceRadial | Function

> 入参: (radius[, x][, y])
>
> 描述: 以 (x, y) 为圆心，创建了一个指向以 radius 为半径的圆的位置力。如果(x, y)没有指定，则默认为(0, 0)
>
> 返回值: *radial*

#### *radial*.strength | Function

> 入参: [strength]，有两种形式
> > 1. 数值，范围为 [0, 1]
> > 2. function (node, index, nodes) {}，其中 node 为节点，index 为索引，nodes 为节点数组
>
> 描述: 设置或获取位置力的强度访问器，如果指定了 strength，则设置位置力的强度访问器；否则，返回当前的强度访问器，默认为以下函数
> ```
> function strength() {
>   return 0.1;
> }
> ```
> strength 决定了节点在 x 和 y 方向上的速度增量，这个值越大，节点的位置会越快地向目标位置过渡。强度访问器会被每个 node 所调用
>
> 返回值: 如果指定了 strength，则返回 *radial*；否则，返回位置力的强度访问器

#### *radial*.radius | Function

> 入参: [radius]，有两种形式
> > 1. 数值
> > 2. function (node, index, nodes) {}，其中 node 为节点，index 为索引，nodes 为节点数组
>
> 描述: 设置或获取位置力的半径访问器。如果指定了 radius，则设置位置力的半径访问器；否则，返回当前的半径访问器。半径访问器会被每个 node 所调用
>
> 返回值: 如果指定了 radius，则返回 *radius*；否则，返回位置力的半径访问器

#### *radial*.x | Function

> 入参: [x]
>
> 描述: 设置或者获取该位置力的 x 坐标
>
> 返回值: 如果指定了 x，则返回 *radius*；否则，返回 x 坐标

#### *radial*.y | Function

> 入参: [y]
>
> 描述: 设置或者获取该位置力的 y 坐标
>
> 返回值: 如果指定了 y，则返回 *radius*；否则，返回 y 坐标