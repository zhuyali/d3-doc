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
>
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
>
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



----
selection.order - reorders elements in the document to match the selection.
selection.raise - reorders each element as the last child of its parent.
selection.lower - reorders each element as the first child of its parent.
d3.creator - create an element by name.