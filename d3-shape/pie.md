pie 生成器并不直接生成图形，而是计算出一组能够代表圆形或环形的数据，这些数据可以传入 arc 生成器

#### d3.pie | Function

> 入参: 无
>
> 描述: 创建一个 pie 生成器
>
> 返回值: *pie*

#### *pie* | Function  --arguments 待验证

> 入参: (data[, arguments…])，其中 data 为数组，arguments 的作用暂时未知
>
> 描述: 根据给定的数组，生成一组带有角度信息的对象数组，与给定数组的元素个数一致。在返回的对象数组中，每个对象都包含如下的属性
> - ```data``` - 对应于给定数组中的每个元素
> - ```value``` - 当前弧段对应的数值
> - ```index``` - 索引
> - ```startAngle``` - 当前弧段的开始角度
> - ```endAngle``` - 当前弧段的结束角度
> - ```padAngle``` - 当前弧段的间隔角度
>
> 示例如下，将一个数值数组传给 pie 生成器
> ```
> var data = [1, 1, 2, 3, 5, 8, 13, 21];
> var arcs = d3.pie()(data);
> ```
> 最终生成的数组中每个对象都包含上述属性
> ```
> [
>   {"data":  1, "value":  1, "index": 6, "startAngle": 6.050474740247008, "endAngle": 6.166830023713296, "padAngle": 0},
>   {"data":  1, "value":  1, "index": 7, "startAngle": 6.166830023713296, "endAngle": 6.283185307179584, "padAngle": 0},
>   {"data":  2, "value":  2, "index": 5, "startAngle": 5.817764173314431, "endAngle": 6.050474740247008, "padAngle": 0},
>   {"data":  3, "value":  3, "index": 4, "startAngle": 5.468698322915565, "endAngle": 5.817764173314431, "padAngle": 0},
>   {"data":  5, "value":  5, "index": 3, "startAngle": 4.886921905584122, "endAngle": 5.468698322915565, "padAngle": 0},
>   {"data":  8, "value":  8, "index": 2, "startAngle": 3.956079637853813, "endAngle": 4.886921905584122, "padAngle": 0},
>   {"data": 13, "value": 13, "index": 1, "startAngle": 2.443460952792061, "endAngle": 3.956079637853813, "padAngle": 0},
>   {"data": 21, "value": 21, "index": 0, "startAngle": 0.000000000000000, "endAngle": 2.443460952792061, "padAngle": 0}
> ]
> ```
>
> 返回值: 无
>
> 注: 在上述的例子中，生成的对象数组顺序与传入的数组顺序是完全一致的。但是排序方法是降序的，即先绘制最后一条数据，value 值为 21 的数据会在角度 0 的地方(12 点钟方向)开始绘制

#### *pie*.value | Function

> 入参: [value]，有两种形式
> > 1. Number
> > 2. function (d, i, data) {}，其中 d 代表当前的数组元素，i 代表当前索引，data 代表当前的数组。
>
> 描述: 设置或获取值访问器。如果指定了 value，则设置当前弧段的值访问器为 value，并且返回 pie 生成器。如果没有指定 value，则返回当前的值访问器，默认为
> ```
> function value(d) {
>   return d;
> }
> ```
> 当 pie 生成器被调用时，传入的数组中的每个元素默认都会调用一次 value 用于设置值访问器。由上面默认的值访问器可以看出，默认情况下，该值访问器假定传入的数组为数值数组，或者是可以通过 valueOf 转化成数值的数组。当我们传入的数组不是纯粹的数值数组时，使用默认的值访问器所生成的各个弧段的 value 值为 NaN，这时候就需要我们手动设置值访问器来达到我们的目的。如下
> ```
> var data = [
>   {"number":  4, "name": "Locke"},
>   {"number":  8, "name": "Reyes"},
>   {"number": 15, "name": "Ford"},
>   {"number": 16, "name": "Jarrah"},
>   {"number": 23, "name": "Shephard"},
>   {"number": 42, "name": "Kwon"}
> ];

> var arcs = d3.pie()
>     .value(function(d) { return d.number; })
>     (data);
> ```
> 我们也可以使用如下的方式来设置每个弧段的 value 值
> ```
> var arcs = d3.pie()(data.map(function(d) { return d.number; }));
> ```
> 但是这种方式会使得各个弧段的 data 值也变成 d.number 而不是我们传入的对象。由此，就可以彰显出```*pie*.value```的意义了：它允许我们通过传入对象来携带更多的信息，比如设置颜色或文本标签等
>
> 返回值: Function(但是根据有无传参，返回的函数意义是不同的(pie 生成器或值访问器))

#### *pie*.sort | Function

> 入参: [compare]，形式为 ```function(a, b) {}```，返回值为数字。其中 a 和 b 的数据结构与 ```*pie*``` 方法传入的 data 数组的每个元素的数据结构一致。如果 a 要在 b 前面，则该函数要返回一个小于 0 的数字；如果 a 要在 b 后面，则该函数要返回一个大于 0 的数字；如果该函数返回 0，则无所谓 a 和 b 的顺序。比如，根据数据的名称属性进行排序
> ```
> pie.sort(function(a, b) { return a.name.localeCompare(b.name); });
> ```
>
> 描述: 设置或获取数据比较器。如果指定了 compare，则设置数据的比较器为 compare，并且返回 pie 生成器；如果没有指定 compare，则返回当前的数据比较器，默认为 null。
>
> 返回值: Function(但是根据有无传参，返回的函数意义是不同的(pie 生成器或数据比较器))
>
> 注: 排序并不会影响生成的弧段数组的顺序，生成的数组顺序仍然与传入的 data 数组的顺序保持一致。排序仅仅影响每个弧段的索引(index)，开始角度(startAngle)和结束角度(endAngle)

#### *pie*.sortValues | Function

> 入参: [compare]，形式为 ```function(a, b) {}```，返回值为数字。其中 a 和 b 的数据结构与值访问器```*pie*.value```返回的数据结构一致，而不是数组元素的数据结构。如果 a 要在 b 前面，则该函数要返回一个小于 0 的数字；如果 a 要在 b 后面，则该函数要返回一个大于 0 的数字；如果该函数返回 0，则无所谓 a 和 b 的顺序。例如，根据 value 值进行升序排序
> ```
> pie.sortValues(function(a, b) { return a - b; });
> ```
> 描述: 设置或获取值比较器。如果指定了 compare，则设置值比较器为 compare，并且返回 pie 生成器；如果没有指定 compare，则返回当前的值比较器，默认为降序，函数实现为
> ```
> function compare(a, b) {
>   return b - a;
> }
> ```
> 如果数据比较器和值比较器都为 null，那么生成的数组顺序及其索引的顺序都与传入的 data 数组顺序保持一致，并且生成的数组的开始角度和结束角度都是从索引为 0 的位置依次叠加的。否则，生成的数组索引顺序优先根据数据比较器进行排序。当给值比较器赋值时，会自动将数据比较器置为 null
>
> 返回值: Function(但是根据有无传参，返回的函数意义是不同的(pie 生成器或数据比较器))
>
> 注: 排序并不会影响生成的弧段数组的顺序，生成的数组顺序仍然与传入的 data 数组的顺序保持一致。排序仅仅影响每个弧段的索引(index)，开始角度(startAngle)和结束角度(endAngle)

#### *pie*.startAngle | Function

> 入参: [angle]，可以为两种形式: ```Number```或```Function```
>
> 描述: 设置或获取 pie 的开始角度访问器(这里的开始角度指的是 pie 总体的开始角度，也就是第一个弧形的开始角度)。如果指定了 angle，则设置 pie 的总体的开始角度访问器为 angle，然后返回 pie 生成器；如果没有指定 angle，则返回当前的开始角度访问器，默认为
> ```
> function startAngle() {
>   return 0;
> }
> ```
>
> 返回值: Function(但是根据有无传参，返回的函数意义是不同的(pie 生成器或开始角度访问器))

#### *pie*.endAngle | Function

> 入参: [angle]，可以为两种形式: ```Number```或```Function```
>
> 描述: 设置或获取 pie 的结束角度访问器(这里的结束角度指的是 pie 总体的结束角度，也就是最后一个弧形的结束角度)。如果指定了 angle，则设置 pie 的总体的结束角度访问器为 angle，然后返回 pie 生成器；如果没有指定 angle，则返回当前的结束角度访问器，默认为
> ```
> function endAngle() {
>   return 2 * Math.PI;
> }
> ```
>
> 返回值: Function(但是根据有无传参，返回的函数意义是不同的(pie 生成器或结束角度访问器))

#### *pie*.padAngle | Function

> 入参: [angle]，可以为两种形式: ```Number```或```Function```
>
> 描述: 设置或获取 pie 的间隔角度访问器。如果指定了 angle，则设置间隔角度访问器为 angle，然后返回 pie 生成器；如果没有指定 angle，则返回当前的间隔角度访问器，默认为
> ```
> function padAngle() {
>   return 0;
> }
> ```
>
> 返回值: Function(但是根据有无传参，返回的函数意义是不同的(pie 生成器或间隔角度访问器))