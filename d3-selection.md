## 选择元素

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
> > 1. 传入 CSS 选择器
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
> > 1. 传入 CSS 选择器
> > 2. function (d, i, nodes) {}，其中 d 代表当前数据，i 代表当前索引，nodes 代表当前已经被选择的元素集。this 代表当前元素对应的真实 DOM 节点。该函数必须具有返回值，返回值可以是一个元素，如果不存在匹配元素，则返回 null
>
> 描述: 在所有已经被选择的元素下，选择选择器匹配的第一个子元素。如果没有元素匹配选择器，则该对应的父元素分组为null；如果入参为 undefined 和 null，那么返回的 selection 下的每一个分组(分组的意义详见注解)都为 null；如果当前元素有数据，那么所有的匹配子元素都会继承该数据
>
> 返回值: Selection
>
> 注：返回结果会根据所有已经被选择的元素进行分组，每个被选择元素为一组。若某个被选择元素下存在匹配选择器的子节点，则该分组包含该节点；否则，若某个被选择元素下不存在任何匹配选择器的子节点，则该分组为 null

--- 
#### selection.filter | Function

> 入参: selector， 有两种形式：
> > 1. CSS 选择器，用于筛选当前选择集中匹配选择器的元素创建选择集
> > 2. function (d, i) {}，其中 d 代表当前的数据，i 代表当前索引。若该函数返回 true，则代表当前元素被保留；否则，代表当前元素被丢弃。
>
> 描述: 对当前选择集中包含的节点进行筛选
>
> 返回值: Selection

#### selection.merge | Function

> 入参: 同上
>
> 描述: 在当前选择集(调用者，即selection)下，选取选择器匹配的第一个后代元素创建选择集
>
> 返回值: Selection

#### d3.matcher | Function

> 入参: selector
>
> 描述: 在当前选择集(调用者，即selection)下，选取选择器匹配的第一个后代元素创建选择集
>
> 返回值: Selection

#### d3.selector | Function

> 入参: selector
>
> 描述: 在当前选择集(调用者，即selection)下，选取选择器匹配的第一个后代元素创建选择集
>
> 返回值: Selection

#### d3.selectorAll | Function

> 入参: selector
>
> 描述: 在当前选择集(调用者，即selection)下，选取选择器匹配的第一个后代元素创建选择集
>
> 返回值: Selection

#### d3.window | Function

> 入参: selector
>
> 描述: 在当前选择集(调用者，即selection)下，选取选择器匹配的第一个后代元素创建选择集
>
> 返回值: Selection

#### d3.style | Function

> 入参: selector
>
> 描述: 在当前选择集(调用者，即selection)下，选取选择器匹配的第一个后代元素创建选择集
>
> 返回值: Selection