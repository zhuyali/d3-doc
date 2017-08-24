### 选择元素
    
#### d3.selection | Function

> 入参: 无 
>
> 描述: 选择根元素，即 document.documentElement
>
> 返回值: Selection
>
> 注: 该函数可用于检测一个对象是否是一个 Selection 实例: object instanceof d3.selection，或者用于在 d3.selection 的原型上进行扩展

#### d3.selectAll | Function

> 入参: selector，有两种形式：
> > 1. 传入 CSS 选择器，类型为字符串。d3 支持所有的 CSS 选择器(类选择器，标签选择器，ID 选择器，属性选择器，通配选择器以及组合选择器)
> > 2. 传入节点，这可以与 jQuery 等第三方库合作使用。同时，这在你已经有一个节点的引用时是十分有用的，比如
> > ```
> > //将所有链接的字体颜色改为红色
> > d3.selectAll(document.links).style("color", "red");
> > ```
>
> 描述: 选择选择器匹配的所有元素，如果没有匹配，或者入参为 undefined 和 null，则返回一个空的 selection
>
> 返回值: Selection

#### d3.select | Function

> 入参: selector，有两种形式：
> > 1. 传入 CSS 选择器，类型为字符串。d3 支持所有的 CSS 选择器(类选择器，标签选择器，ID 选择器，属性选择器，通配选择器以及组合选择器)
> > 2. 传入节点，这可以与 jQuery 等第三方库合作使用。同时，这在你已经有一个节点的引用时是十分有用的，比如
> > ```
> > //将所有被点击的段落的字体颜色改为红色
> > d3.selectAll("p").on("click", function() {
> >   d3.select(this).style("color", "red");
> > });
> > ```
>
> 描述: 选择选择器匹配的第一个元素，如果没有，则返回一个空的 selection
>
> 返回值: Selection

#### selection.selectAll | Function

> 入参: selector，有两种形式：
> > 1. CSS 选择器
> > 2. function (d, i, nodes) {}，其中 d 代表当前数据，i 代表当前索引，nodes 代表当前已经被选择的元素集。this 代表当前元素对应的真实 DOM 节点。该函数必须具有返回值，返回值可以是一个元素数组(或伪数组)，如果不存在匹配元素，则返回空数组
>
> 描述: 在所有已经被选择的元素下，选择选择器匹配的所有子元素。如果没有元素匹配选择器，则该对应的父元素分组为空的 NodeList；如果入参为 undefined 和 null，那么返回的 selection 下的每一个分组(分组的意义详见注解)都为空的 NodeList；如果当前元素有数据，匹配子元素并不继承该数据，而是需要通过 selection.data 进行进一步操作
>
> 返回值: Selection
>
> 注：返回结果会根据所有已经被选择的元素进行分组，每个被选择元素为一组。若某个被选择元素下存在匹配选择器的子节点，则该分组具有包含该节点的节点集；否则，若某个被选择元素下不存在任何匹配选择器的子节点，则该分组为空的 NodeList

#### selection.select | Function

> 入参: selector，有两种形式：
> > 1. CSS 选择器
> > 2. function (d, i, nodes) {}，其中 d 代表当前数据，i 代表当前索引，nodes 代表当前已经被选择的元素集。this 代表当前元素对应的真实 DOM 节点。该函数必须具有返回值，返回值可以是一个元素，如果不存在匹配元素，则返回 null
>
> 描述: 在所有已经被选择的元素下，选择选择器匹配的第一个子元素。如果没有元素匹配选择器，则该对应的父元素分组为null；如果入参为 undefined 和 null，那么返回的 selection 下的每一个分组(分组的意义详见注解)都为 null；如果当前元素有数据，那么所有的匹配子元素都会继承该数据
>
> 返回值: Selection
>
> 注：返回结果会根据所有已经被选择的元素进行分组，每个被选择元素为一组。若某个被选择元素下存在匹配选择器的子节点，则该分组包含该节点；否则，若某个被选择元素下不存在任何匹配选择器的子节点，则该分组为 null
 
#### selection.filter | Function

> 入参: selector， 有两种形式：
> > 1. CSS 选择器，用于筛选当前选择集中匹配选择器的元素创建选择集
> > 2. function (d, i, nodes) {}，其中 d 代表当前数据，i 代表当前索引，nodes 代表当前已经被选择的元素集。this 代表当前元素对应的真实 DOM 节点。若该函数返回 true，则代表当前元素被保留；否则，代表当前元素被丢弃
>
> 描述: 对当前选择集中包含的节点进行筛选
>
> 返回值: Selection

#### selection.merge | Function

> 入参: other selection
>
> 描述: 将当前选择集与其他选择集进行合并，返回的选择集与当前选择集具有相同的 parents 和相同数量的分组。对于当前选择集中缺失的分组，会从其他选择集中选择填充入对应的元素。该方法通常用于合并 enter 和 update 选择集
>
> 返回值: Selection
>
> 注: 如果当前选择集和其他选择集在相同的索引位置上都存在非空元素，那么会保留当前选择集在该索引位置上的元素，忽略其他选择集在该索引位置上的元素

#### d3.matcher | Function

> 入参: selector，CSS 选择器
>
> 描述: 对于给定的入参 selector，返回一个函数 - 若 this 元素与该选择器匹配，则返回 true；否则，返回 false。该方法通常用于在 selection.filter 函数中使用，比如
> > ```
> > var div = selection.filter("div");
> > 等价于
> > var div = selection.filter(d3.matcher("div"));
> > ```
>
> 返回值: Function

#### d3.selector | Function

> 入参: selector，CSS 选择器
>
> 描述: 对于给定的入参 selector，返回一个函数 - 该函数返回 this 元素的第一个与选择器匹配的后代。该方法通常用于在 selection.select 函数中使用，比如
> > ```
> > var div = selection.select("div");
> > 等价于
> > var div = selection.select(d3.selector("div"));
> > ```
>
> 返回值: Function

#### d3.selectorAll | Function

> 入参: selector，CSS 选择器
>
> 描述: 对于给定的入参 selector，返回一个函数 - 该函数返回 this 元素的所有与选择器匹配的后代。该方法通常用于在 selection.selectAll 函数中使用，比如
> > ```
> > var div = selection.selectAll("div");
> > 等价于
> > var div = selection.selectAll(d3.selectAll("div"));
> > ```
>
> 返回值: Function

#### d3.window | Function

> 入参: node，node 可能的取值有三种
> > 1. node 是节点，则返回所属的文档关联的 window 对象
> > 2. node 是文档，则返回该文档关联的 window 对象
> > 3. node 是 window 对象，则直接返回 node
>
> 描述: 返回 node 所属的 window 对象
>
> 返回值: window

#### d3.style | Function

> 入参: (node, name)，其中 node 为节点，name 是字符串
>
> 描述: 返回特定 node 节点，特定名称的 CSS 属性值。如果该属性是内联样式，则直接返回属性值；否则，返回属性的计算值(computed value)
>
> 返回值: String

### 修改元素

#### selection.attr | Function

> 入参: (name[, value])，其中 value 有两种形式
> > 1. value 是一个常量，那么所有被选择的元素的对应属性值都会被赋值为相同的 value 值
> > 2. value 是一个函数，形式为 function (d, i, nodes) {}，其中 d 代表当前数据，i 代表当前索引，nodes 代表当前已经被选择的元素集。this 代表当前元素对应的真实 DOM 节点。此时，函数的返回值会作为当前元素的属性值，如果函数返回 null，则意味着移除该属性
>
> 描述: 如果没有指定value，则会返回选择集中第一个非空元素的对应属性值。如果指定了 value ，那么会将所有已被选择的元素的对应属性值设置为 value 并且返回当前选择集
> 
> 返回值: 如果未指定 value，则返回字符串；否则，返回 Selection
>
> 注: 这里的 name 属性可能带有命名空间前缀，例如 xlink:href 就代表 XLink 命名空间中的 href 属性

#### selection.classed | Function

> 入参: (name[, value])，其中 value 有两种形式
> > 1. value 是一个常量，如果 value 值等价于 true，那么所有已经被选择的元素都会添加类 name；否则，如果 value 值等价于 false，那么所有已经被选择的元素都会移除类 name
> > 2. value 是一个函数，形式为 function (d, i, nodes) {}，其中 d 代表当前数据，i 代表当前索引，nodes 代表当前已经被选择的元素集。this 代表当前元素对应的真实 DOM 节点。此时，函数的返回值决定是当前元素是移除类还是添加类，如果函数返回为 true，则添加；否则，则移除
>
> 描述: 如果没有指定 value，则返回选择集中第一个非空元素的 class 是否包含有特定 name，如果包含，则返回 true；否则返回 false。如果指定了 value，那么会添加或移除所有已被选择元素的对应的 class
>
> 返回值: 如果未指定 value，则返回布尔值；否则，返回 Selection
>
> 注: 这里的 name 是一个以空格作为分隔符的字符串，可以包含多个 class name，比如
> ```
> selection.classed("foo bar", true);
> ```

#### selection.style | Function

> 入参: (name[, value[, priority]])，其中 value 有两种形式
> > 1. value 是一个常量，那么所有被选择的元素的对应 name 的 CSS 样式都会被赋值为相同的 value 值
> > 2. value 是一个函数，形式为 function (d, i, nodes) {}，其中 d 代表当前数据，i 代表当前索引，nodes 代表当前已经被选择的元素集。this 代表当前元素对应的真实 DOM 节点。此时，函数的返回值会作为当前元素特定 name 的 CSS 样式值，如果函数返回为 null，则意味着移除该 CSS 样式
>
> 描述: 如果没有指定 value，则返回选择集中第一个非空元素的特定 name 的样式值。如果该样式是内联样式，则直接返回属性值；否则，返回属性的计算值(computed value)。如果指定了 value，那么会给所有已选择元素的特定 name 的 CSS 样式设置 value 值
>
> 返回值: 如果未指定 value，则返回字符串；否则，返回 Selection
>
> 注: priority 是可选的，它的取值可以为 null 或者字符串 important

#### selection.property | Function

> 入参: (name[, value])，其中 value 有两种形式
> > 1. value 是一个常量，那么所有被选择的元素的对应属性值都会被赋值为相同的 value 值
> > 2. value 是一个函数，形式为 function (d, i, nodes) {}，其中 d 代表当前数据，i 代表当前索引，nodes 代表当前已经被选择的元素集。this 代表当前元素对应的真实 DOM 节点。此时，函数的返回值会作为当前元素的属性值，如果函数返回 null，则意味着移除该属性
>
> 描述: 如果没有指定 value，则会返回选择集中第一个非空元素的对应属性值。如果指定了 value ，那么会将所有已被选择的元素的对应属性值设置为 value 并且返回当前选择集
> 
> 返回值: 如果未指定 value，则返回字符串；否则，返回 Selection
>
> 注: 一些 HTML 元素具有特殊的属性，这些属性使用 attribute 或 style 都无法寻址，例如多选框的 checked 属性，此时可以考虑使用 property 来进行操作

#### selection.text | Function

> 入参: [value]，有两种形式
> > 1. value 是一个常量，那么所有被选择的元素的 textContent 都会被赋值为相同的 value 值
> > 2. value 是一个函数，形式为 function (d, i, nodes) {}，其中 d 代表当前数据，i 代表当前索引，nodes 代表当前已经被选择的元素集。this 代表当前元素对应的真实 DOM 节点。此时，函数的返回值会作为当前元素的 textContent，如果函数返回 null，则将 textContent 置空
>
> 描述: 如果没有指定 value，则会返回选择集中第一个非空元素的 textContent。如果指定了 value ，那么会将所有已被选择的元素的 textContent 设置为 value 并且返回当前选择集
> 
> 返回值: 如果未指定 value，则返回字符串；否则，返回 Selection

#### selection.html | Function

> 入参: [value]，有两种形式
> > 1. value 是一个常量，那么所有被选择的元素的 innerHTML 都会被赋值为相同的 value 值
> > 2. value 是一个函数，形式为 function (d, i, nodes) {}，其中 d 代表当前数据，i 代表当前索引，nodes 代表当前已经被选择的元素集。this 代表当前元素对应的真实 DOM 节点。此时，函数的返回值会作为当前元素的 innerHTML，如果函数返回 null，则将 innerHTML 置空
>
> 描述: 如果没有指定 value，则会返回选择集中第一个非空元素的 innerHTML。如果指定了 value ，那么会将所有已被选择的元素的 innerHTML 设置为 value 并且返回当前选择集
> 
> 返回值: 如果未指定 value，则返回字符串；否则，返回 Selection

#### selection.append | Function

> 入参: type，有两种形式
> > 1. 标签名字符串，比如 div，circle 等
> > 2. function (d, i, nodes) {}，其中 d 代表当前数据，i 代表当前索引，nodes 代表当前已经被选择的元素集。this 代表当前元素对应的真实 DOM 节点。该函数返回一个需要被添加的元素，这个元素可以是一个新的元素，也可以是已经存在的元素
>
> 描述: 向所有已经被选择的元素添加子元素或兄弟元素，新增的元素还将继承当前选择集的数据。如果当前选择集是 enter 选择集，则 append 操作的行为是添加兄弟元素；如果当前选择集是非 enter 选择集，则 append 操作的行为是添加子元素
> 
> 返回值: 包含被添加元素的 Selection
>
> 注: 这里的 type 可能带有命名空间前缀，例如 svg:text 就代表 SVG 命名空间中的 text 标签

#### selection.insert | Function

> 入参: (type[, before])
> > 其中 type 有两种形式
> > 1. 标签名字符串，比如 div，circle 等
> > 2. function (d, i, nodes) {}，其中 d 代表当前数据，i 代表当前索引，nodes 代表当前已经被选择的元素集。this 代表当前元素对应的真实 DOM 节点。该函数返回一个需要被插入的元素，这个元素可以是一个新的元素，也可以是已经存在的元素
> > 
> > 其中 before 有两种形式
> > 1. CSS 选择器，类型为字符串，比如 :first-child，div 等
> > 2. function (d, i, nodes) {}，其中 d 代表当前数据，i 代表当前索引，nodes 代表当前已经被选择的元素集。this 代表当前元素对应的真实 DOM 节点。该函数返回一个当前选择集中的子节点，用于在该子节点前进行元素的插入
>
> 描述: 向所有已经被选择的元素添加子元素。如果指定了 before 参数，那么被添加的子元素会位于 before 指定的元素前面；如果没有指定 before 参数，则 before 默认为 null
> 
> 返回值: 包含被添加元素的 Selection
>
> 注: 这里的 type 可能带有命名空间前缀，例如 svg:text 就代表 SVG 命名空间中的 text 标签

#### selection.remove | Function

> 入参: 无
>
> 描述: 从文档中移除所有已经被选择的元素
> 
> 返回值: 被移除的 Selection

#### selection.sort | Function

> 入参: [compare 函数]，默认是 ascending 函数。compare 函数有两个参数(数据参数 a 和 b)，并且返回任一正的、负的或零值。如果返回为正，则带有数据 a 的元素在带有数据 b 的元素之后；反之，如果返回为负，则 a 在 b 之前；如果返回为零，a 和 b 的顺序随机
>
> 描述: 对当前选择集进行排序，并且返回，由于排序是依照数据来进行的，因而 sort 只能对带有数据的元素进行排序
> 
> 返回值: 经过排序的 Selection
>
> 注：需要注意的是，这种排序方式并不保证是稳定排序，但它与浏览器内置的数据排序方法具有相同的行为

#### selection.order | Function

> 入参: 无
>
> 描述: 对于所有已经被选择的元素，按照选择集中的顺序重新插入到文档中
> 
> 返回值: 与原始选择集相同的 Selection

#### selection.raise | Function

> 入参: 无
>
> 描述: 对于所有已经被选择的元素，重新插入到对应的父元素，每次插入时都作为父元素的最后一个子元素，相当于
> > ```
> > selection.each(function(){
> >   this.parentNode.appendChild(this);
> > });
> > ```
> 
> 返回值: 与重新插入后的元素顺序相同的 Selection

#### selection.lower | Function

> 入参: 无
>
> 描述: 对于所有已经被选择的元素，重新插入到对应的父元素，每次插入时都作为父元素的第一个子元素，相当于
> > ```
> > selection.each(function(){
> >   this.parentNode.insertBefore(this,this.parentNode.firstChild);
> > });
> > ```
> 
> 返回值: 与重新插入后的元素顺序相同的 Selection

#### d3.creator | Function

> 入参: name，标签名字符串，比如 div，circle 等
>
> 描述: 对于给定的 name，返回一个函数，该函数的返回值是一个根据 name 创建好的元素。该方法通常用于在 selection.append 和 selection.insert 函数中使用，比如
> > ```
> > selection.append("div");
> > 等价于
> > selection.append(d3.creator("div"));
> > ```
> 
> 返回值: Function

#### selection.data | Function

> 入参: [data[, key]]
> > 其中 data 有两种形式
> > 1. 数组，可以包含任意类型的数据
> > 2. function (d, i, nodes) {}，其中 d 代表当前数据，i 代表当前索引，nodes 代表当前已经被选择的元素集。this 代表当前元素对应的真实 DOM 节点。该函数必须返回一个数组
> > 
> > 其中 key 是一个函数: function (d, i) {}
> >
> > d 代表当前数据，i 代表当前索引。默认情况下，data 数组中的第一个数据元素会与第一个被选择的元素绑定，第二个数据元素会与第二个被选择的元素绑定，以此类推。key 方法的存在打破了这种规律，指定了数据元素和 DOM 元素的绑定关系。在不指定 key 函数时，数据元素和元素默认按照索引进行对应，当指定 key 函数后，索引根据 key 函数的返回值而定，即 key 函数会影响节点的索引，当索引改变时，不会自动触发排序，如果需要进行排序，需要手动调用 sort 或 order 函数。key 函数在过程中会被调用两次：一次是由选择集中的元素发起调用，此时 this 是真实的 DOM 节点；一次是 data 数组，此时的 this 是 data 数组。这两次调用返回的数据会进行比较，具有相同返回值的一个元素和一个数据元素会进行数据绑定，然后在最终返回的选择集中加入该元素，该元素在最终选择集中的位置根据其索引的顺序而定。以下是一个使用 key 函数的例子
> > ```
> > var data = [
> >   {name: "Locke", number: 4},
> >   {name: "Reyes", number: 8},
> >   {name: "Ford", number: 15},
> >   {name: "Jarrah", number: 16},
> >   {name: "Shephard", number: 31},
> >   {name: "Kwon", number: 34}
> > ];
> > d3.selectAll("div")
> >   //如果之前已经绑定过数据，则 d 是存在的，以 d.name 做索引；否则，以 this.id 做索引
> >   .data(data, function(d) { return d ? d.name : this.id; })
> >     .text(function(d) { return d.number; });
> > ```
>
> 描述: 给所有已经被选择的元素绑定数据，返回一个 update 集：成功绑定数据的元素集。同时，由于数据元素和元素个数不一定一致，所以在返回的选择集上还会有 enter 和 exit 操作，详见 selection.enter 和 selection.exit。数据成功绑定后，会存储在 __data__ 属性中。如果没有指定 data，则返回一个数组，数组中依次为当前选择集中的元素绑定的数据
> 
> 返回值: 成功绑定数据的 Selection，并且带有 enter 和 exit 操作

#### selection.enter | Function

> 入参: 无
>
> 描述: 在 selection.data 操作后调用该方法。当数据元素个数大于元素个数时，调用该方法会返回缺失的元素集，所以通常调用该方法的目的就是为了创建缺失的元素，比如根据数组创建 div 元素
> > ```
> > var div = d3.select("body")
> >   .selectAll("div")
> >  .data([4, 8, 15, 16, 23, 42])
> >   .enter().append("div")
> >     .text(function(d) { return d; });
> > ```
> 假设 body 最初是空的，运行上述代码后，结果如下
> > ```
> > <div>4</div>
> > <div>8</div>
> > <div>15</div>
> > <div>16</div>
> > <div>23</div>
> > <div>42</div>
> > ```
> 
> 返回值: 缺失的 Selection

#### selection.exit | Function

> 入参: 无
>
> 描述: 在 selection.data 操作后调用该方法。当数据元素个数小于元素个数时，调用该方法会返回多余的元素集，所以通常调用该方法的目的就是为了删除缺失的元素，比如根据数组删除多余的 div 元素
> > 前提条件：已经存在包含数据 4, 8, 15, 16, 23, 42 的 div 元素
> >
> > 对 div 重新绑定数据：
> > ```
> > div = div.data([1, 2, 4, 8, 16, 32], function(d) { return d; }); 这里使用了 key 方法，选择出 [1, 2, 4, 8, 16, 32] 和 [4, 8, 15, 16, 23, 42] 的交集元素，即带有数据 4, 8, 16 的元素加入 update 集
> > ```
> > 之前的元素不存在 [1, 2, 32]，则作为 enter 集：
> > ```
> > div.enter().append("div").text(function(d) { return d; });
> > ```
> > 之前的 [15, 23, 42] 没有出现在新的数据中，则作为 exit 集：
> > ```
> > div.exit().remove();
> > ```
> 经过上述一系列代码的运行，结果如下
> > ```
> > <div>1</div>
> > <div>2</div>
> > <div>4</div>
> > <div>8</div>
> > <div>16</div>
> > <div>32</div>
> > ```
>
> 返回值: 多余的 Selection

#### selection.datum | Function

> 入参: [value]，有两种形式
> > 1. value 是一个变量，所有已经被选择的元素都会绑定该 value 数据
> > 2. value 是一个函数，形式为 function (d, i, nodes) {}，其中 d 代表当前数据，i 代表当前索引，nodes 代表当前已经被选择的元素集。this 代表当前元素对应的真实 DOM 节点。此时，函数的返回值会与当前元素进行数据绑定，如果返回 null，则表示删除当前元素所绑定的数据
>
> 描述: 如果没有指定 value，则会返回选择集中第一个非空元素绑定的数据。如果指定了 value ，那么会给所有已被选择的元素进行数据绑定
>
> 返回值: 进行完数据绑定的 Selection，即在原始 selection 的基础上变化了 __data__ 属性(可能是添加，减少或修改了 __data__ 属性)
>
> 注：该方法与 selection.data 完全不同，相较于 selection.data 来说，该方法不关心数据元素和 DOM 元素之间的关系，而只关注于数据绑定

### 事件处理

#### selection.on | Function

> 入参: (typenames[, listener[, capture]])
> > 其中 typenames 是一个字符串。它的表现形式主要有两种
> > 1. 事件类型，例如 click，mouseover 或 submit 等，支持的事件类型可以参考 DOM event type
> > 2. 事件类型.事件名称，其中事件类型同上，事件名称用来标识该事件，它们中间使用'.'间隔，该形式通常用于给相同类型的事件增加多个不同的监听器
> >
> > 同时，如果要给多个事件注册相同的监听器，则可以将不同的 typename 通过空格分隔来实现，比如```input change``` 或 ```click.foo click.bar``` 
> >
> > 其中 listener 是一个函数: function (d, i, nodes) {}
> >
> > d 代表当前数据，i 代表当前索引，nodes 代表当前已经被选择的元素集。this 代表当前元素对应的真实 DOM 节点。当在已被选择的元素上触发指定事件后，对应的 listener 会被调用，如果想在 listener 中访问当前事件，通过 d3.event 来进行访问。当在相同元素上注册多个事件监听时，如果该元素上的 typename 已经存在，那么多次注册会覆盖掉原先的监听器。如果想要移除监听器，则传入 listener 为 null 即可：如果要移除特定事件名称的监听器，则指定 typename 为特定的事件名称，listener 为 null 即可；如果要移除所有不带事件名称的 typename 上的监听器，则指定 typename 为 . 即可
> >
> > 其中 capture 是一个布尔值，默认是 false
> >
> > capture 标识符指定事件的捕获方式。当为 false 时，事件从内到外冒泡捕获；反正，从外到内捕获
>
> 描述: 向所有已被选择的元素添加或移除事件监听器。如果没有指定 listener，则返回选择集中第一个非空元素对应于当前 typename 的监听器；否则，给对应的 typename 增加事件监听器
>
> 返回值: 如果未指定 listener，则返回 Function；否则，返回 Selection

#### selection.dispatch | Function

> 入参: (type[, parameters])
> > 其中 type 是一个事件类型字符串，例如 click，mouseover 或 submit 等，支持的事件类型可以参考 DOM event type
> >
> > 其中 parameters 可以指定事件的一些属性，它的表现形式有两种
> > 1. 对象: 可以指定事件的 bubbles, cancelable, detail 属性
> > ``` bubbles ``` true 代表该事件可以冒泡
> > ``` cancelable ``` true 与执行 event.preventDefault 效果相同
> > ``` detail ``` 自定义数据
> > 2. 函数: function (d, i, nodes) {}，其中 d 代表当前数据，i 代表当前索引，nodes 代表当前已经被选择的元素集。this 代表当前元素对应的真实 DOM 节点。这个函数必须返回对象类型
>
> 描述: 触发所有当前已被选择元素的特定类型的事件，并且可以携带入指定事件的一些属性
>
> 返回值: Selection

#### d3.event | Attribute

> 当前的 event。这个属性在事件发生时被设置，并在事件回调结束后被重置。可以通过 d3.event 来访问一些标准的事件对象属性，比如 event.pageX，event.pageY 等，还可以访问一些标准的事件对象方法，比如 event.preventDefault()

#### d3.customEvent | Function

> 入参: (event, listener[, that[, arguments]])
>
> 描述: 使用特定的 that 上下文和指定的参数 arguments 调用 listener。在调用期间，d3.event 会被设置为指定的 event 对象；在调用结束后，d3.event 会被重置为之前的值
>
> 返回值: 取决于 listener 的返回值

#### d3.mouse | Function

> 入参: container
>
> 描述: 返回当前事件相对于 container 的 x 和 y 坐标(前提是 d3.event 必须是存在的)，container 可以为 HTML 元素或 SVG 元素，比如 G 元素或者 SVG 元素
>
> 返回值: [x, y]

#### d3.touch | Function

> 入参: (container[, touches], identifier)
>
> 描述: 返回当前标识符为 identifier 的触摸事件相对于 container 的 x 和 y 坐标(前提是 d3.event 必须是存在的)，container 可以为 HTML 元素或 SVG 元素，比如 G 元素或者 SVG 元素。当未指定 touches 时，touches 默认为当前事件的 changedTouches 属性。如果以 identifier 作为标识符的事件不包含在 touches 中，则返回 null 
>
> 返回值: [x, y] 或 null

#### d3.touches | Function

> 入参: (container[, touches])
>
> 描述: 返回当前事触摸件相对于 container 的触摸 x 和触摸 y 坐标(前提是 d3.event 必须是存在的)，container 可以为 HTML 元素或 SVG 元素，比如 G 元素或者 SVG 元素，由于触摸可能是多点的，因而返回值为一个二维数组。当未指定 touches 时，touches 默认为当前事件的 touches 属性
>
> 返回值: [[x1, y1], [x2, y2], ...]

### 控制流