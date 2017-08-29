弧形生成器可以用来生成圆形或者环形。如果结束角度和开始角度之间相差 2π 以上，会生成一个完整的圆形或环形；如果结束角度和开始角度之间相差不到 2π，则会生成一个扇形或扇环。生成的弧形圆心总是处在坐标 (0,0) 的位置，如果要变换位置，需要使用 transform。

#### d3.arc | Function

> 入参: 无 
>
> 描述: 创建一个 arc 生成器
>
> 返回值: *arc*

#### *arc* | Function

> 入参: arguments...，比如一个包含半径和角度的参数如下
> ```
> var arc = d3.arc();
> arc({
>   innerRadius: 0,
>   outerRadius: 100,
>   startAngle: 0,
>   endAngle: Math.PI / 2
> }); //运行结果: "M0,-100A100,100,0,0,1,100,0L0,0Z"
> ```
> 以上方式与以下方式是等价的
> ```
> var arc = d3.arc()
>     .innerRadius(0)
>     .outerRadius(100)
>     .startAngle(0)
>     .endAngle(Math.PI / 2);
> arc(); //运行结果: "M0,-100A100,100,0,0,1,100,0L0,0Z"
> ```
> 但是在该方式下，如果 arc 生成器指定了 context，那么运行 arc() 无返回值，这是因为该弧段会被渲染到指定的上下文中，假设渲染到某个指定的 path 上下文， ```var path = d3.path(); arc.context(path);```，此时在渲染时，设置属性 ```d = path.toString()``` 即可
>
> 描述: 根据给定的参数构建一个弧形。
>
> 返回值: 无

#### *arc*.centroid | Function

> 入参: arguments...，与 *arc* 方法的参数一致
>
> 描述: 根据给定的参数，计算圆弧的中心点。计算方法为：角度偏移为 (startAngle + endAngle) / 2，距离内部半径距离为 (innerRadius + outerRadius) / 2。如下两图
>
> <img src="https://raw.githubusercontent.com/d3/d3-shape/master/img/centroid-circular-sector.png" style="width: 200px!important; height: 200px!important"/>
> <img src="https://raw.githubusercontent.com/d3/d3-shape/master/img/centroid-annular-sector.png" style="width: 200px!important; height: 200px!important"/>
>
> 返回值: Array

#### *arc*.innerRadius | Function

> 入参: [radius]，可以为两种形式: ```Number```或```Function```
>
> 描述: 如果指定了 radius(半径)，设置内部半径为 radius，并且返回 arc 生成器。如果没有指定 radius，则返回当前的内部半径存取器，默认为
> ```
> function innerRadius(d) {
>   return d.innerRadius;
> }
> ```
>
> 返回值: Function(但是根据有无传参，返回的函数意义是不同的(arc 生成器或内部半径存取器))
>
> 注: 如果外部半径比内部半径小，那么会内外半径会互换。负值则视为 0

#### *arc*.outerRadius | Function

> 入参: [radius]，可以为两种形式: ```Number```或```Function```
>
> 描述: 如果指定了 radius(半径)，设置外部半径为 radius，并且返回 arc 生成器。如果没有指定 radius，则返回当前的外部半径存取器，默认为
> ```
> function outerRadius(d) {
>   return d.outerRadius;
> }
> ```
>
> 返回值: Function(但是根据有无传参，返回的函数意义是不同的(arc 生成器或外部半径存取器))
>
> 注: 如果外部半径比内部半径小，那么会内外半径会互换。负值则视为 0

#### *arc*.cornerRadius | Function

> 入参: [radius]，可以为两种形式: ```Number```或```Function```
>
> 描述: 如果指定了 radius(半径)，设置边角半径为 radius，并且返回 arc 生成器。如果没有指定 radius，则返回当前的边角半径存取器，默认为
> ```
> function cornerRadius() {
>   return 0;
> }
> ```
> 如果边角半径大于 0，那么弧形的边角呈现出的弯曲角度是以该半径画圆而产生的。如下两图，左图为扇形拼成的圆形，每个扇形有两个边角；右图为扇环拼成的圆环，每个扇环有四个边角
>
> <img src="https://raw.githubusercontent.com/d3/d3-shape/master/img/rounded-circular-sector.png" style="width: 200px!important; height: 200px!important"/>
> <img src="https://raw.githubusercontent.com/d3/d3-shape/master/img/rounded-annular-sector.png" style="width: 200px!important; height: 200px!important"/>
>
> 返回值: Function(但是根据有无传参，返回的函数意义是不同的(arc 生成器或外部半径存取器))
>
> 注: 边角半径 <= (外部半径 - 内部半径) / 2

#### *arc*.startAngle | Function

> 入参: [angle]，可以为两种形式: ```Number```或```Function```
>
> 描述: 如果指定了 angle(角度)，设置开始角度为 angle，并且返回 arc 生成器。如果没有指定 angle，则返回当前的开始角度存取器，默认为
> ```
> function startAngle(d) {
>   return d.startAngle;
> }
> ```
>
> 返回值: Function(但是根据有无传参，返回的函数意义是不同的(arc 生成器或开始角度存取器))
>
> 注: 角度是以弧度制来定义的，0 对应于 12 点钟的方向，顺时针计算。如果 |endAngle - startAngle| ≥ 2π，则会生成一个完整的圆形或圆弧

#### *arc*.endAngle | Function

> 入参: [angle]，可以为两种形式: ```Number```或```Function```
>
> 描述: 如果指定了 angle(角度)，设置结束角度为 angle，并且返回 arc 生成器。如果没有指定 angle，则返回当前的结束角度存取器，默认为
> ```
> function endAngle(d) {
>   return d.endAngle;
> }
> ```
>
> 返回值: Function(但是根据有无传参，返回的函数意义是不同的(arc 生成器或结束角度存取器))
>
> 注: 角度是以弧度制来定义的，0 对应于 12 点钟的方向，顺时针计算。如果 |endAngle - startAngle| ≥ 2π，则会生成一个完整的圆形或圆弧

#### *arc*.padAngle | Function

> 入参: [angle]，可以为两种形式: ```Number```或```Function```
>
> 描述: 如果指定了 angle(角度)，设置间隔角度(padding angle)为 angle，并且返回 arc 生成器。如果没有指定 angle，则返回当前的间隔角度存取器，默认为
> ```
> function endAngle(d) {
>   return d && d.padAngle
> }
> ```
> padAngle 和 padRadius 是配合使用的，padAngle * padRadius 定义了相邻的两个弧形之间的距离，该距离会在弧形的开始位置和结束位置减去。当弧形是一个完整的圆形或圆环时，则忽视该距离
>
> 返回值: Function(但是根据有无传参，返回的函数意义是不同的(arc 生成器或间隔角度存取器))
>
> 注: 在计算间隔时，会尽量保持弧段之间的平行。当需要设置弧段间隔时，推荐的最小内部半径为 outerRadius * padAngle / sin(θ)，θ 是最小弧段的角度跨度

#### *arc*.padRadius | Function

> 入参: [radius]，可以为两种形式: ```Number```或```Function```
>
> 描述: 如果指定了 radius(半径)，设置间隔半径为 radius，并且返回 arc 生成器。如果没有指定 radius，则返回当前的间隔半径存取器，默认为 null。但是在计算中，如果未指定 padRadius 而只指定了 padAngle 时，padRadius 的值默认为  sqrt(innerRadius * innerRadius + outerRadius * outerRadius)
>
> 返回值: Function(但是根据有无传参，返回的函数意义是不同的(arc 生成器或外部半径存取器))
>
> 注: 如果外部半径比内部半径小，那么会内外半径会互换。负值则视为 0

#### *arc*.context | Function

> 入参: [context]，context 必须是 *path*
>
> 描述: 如果指定了 context，设置该 arc 的上下文为 context，并且返回 arc 生成器。如果没有指定 context，则返回当前的上下文，默认为 null。
>
> 返回值: 如果指定 context，返回 Function；否则，返回 Object