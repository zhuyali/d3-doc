力导向图基于 Velocity Verlet 实现了物理粒子之间的作用力的仿真。在可视化领域中，仿真经常被用于实现网络结构和层次结构，也可以使用仿真进行碰撞检测。使用该模块时，首先为指定的一组节点创建一个仿真，仿真可以监视力的相互作用过程中的一些状态，然后指定力学模型，力学模型有很多种，比如碰撞作用力、连接作用力等。

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

#### *simulation*.nodes | Function

> 入参: [nodes]
>
> 描述: 如果指定了 nodes 数组，则根据传入的 nodes 数组初始化仿真节点的初始化位置和速度；如果没有指定 nodes 数组，则根据传入 ```d3.forceSimulation```的 nodes 数组进行初始化。若都没有传入 nodes 数组，则默认为空数组。经过该函数后，会对节点数据进行一个数据改造，每个节点会添加以下属性：
>
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
> 其中
>
> 返回值: 无

#### *simulation*.alpha | Function

> 入参: [alpha]
>
> 描述: 设置或获取当前仿真的 alpha 值，区间为[0,1]， 默认为 1
>
> 返回值: 如果指定了 alpha，则返回 *simulation*；否则返回 alpha
>
> 注：alpha 是动画的冷却系数，运动过程中会不断减小，直到小于 alphaMin，仿真停止

#### *simulation*.alphaMin | Function

> 入参: [min]
>
> 描述: 设置或获取最小的 alpha 值，区间为[0,1]，默认为 0.001
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
> 描述: 设置或获取 alpha 的目标值，区间为[0,1]， 默认为 0
>
> 返回值: 如果指定了 target，则返回 *simulation*；否则返回 target

#### *simulation*.velocityDecay | Function

> 入参: [decay]
>
> 描述: 设置或获取速度衰减系数，相当于摩擦力。区间为[0,1], 默认为0.4。在每次 tick 之后，节点的速度都会等于当前速度乘以1 - velocityDecay，和 alpha 衰减类似，速度衰减越慢最终的效果越好，但是如果速度衰减过慢，可能会导致震荡
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
>
> 描述: 
>
> 返回值: 无