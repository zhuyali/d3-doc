d3-path 的主要作用是用来绘制路径，这里的路径涵盖的范围很广泛，比如简单的线段，弧线以及各种形状等等

#### d3.path | Function

**入参**: 无 

**描述**: 创建一个 path

**返回值**: *path*

#### *path*.moveTo | Function

**入参**: (x, y)

**描述**: 定义路径的起始点。可以想象一下在现实中作画时，下笔的位置就对应于这里的参数 x 和 y

**返回值**: 无

#### *path*.closePath | Function

**入参**: 无

**描述**: 闭合当前的路径。从当前点直接连一条直线到起始点

**返回值**: 无

#### *path*.lineTo | Function

**入参**: (x, y)

**描述**: 在当前点与指定点(x, y)之间连接一条直线

**返回值**: 无

#### *path*.quadraticCurveTo | Function

**入参**: (cpx, cpy, x, y)

**描述**: 在当前点与指定点(x, y)之间绘制一条二次贝塞尔曲线，以 (cpx, cpy) 作为控制点

**返回值**: 无

#### *path*.bezierCurveTo | Function

**入参**: (cpx1, cpy1, cpx2, cpy2, x, y)

**描述**: 在当前点与指定点(x, y)之间绘制一条三次贝塞尔曲线，以 (cpx1, cpy1) 作为控制点1，(cpx2, cpy2) 作为控制点2

**返回值**: 无

#### *path*.arcTo | Function

**入参**: (x1, y1, x2, y2, radius) 

**描述**: 创建一个圆弧。圆弧半径为 radius，两个控制点为 (x1, y1) 和 (x2, y2)，该圆弧的起始位置与当前点和 (x1, y1) 的连线相切，结束位置与 (x1, y1) 和 (x2, y2) 的连线相切。如果当前点与第一个切点不相同，那么会用一条直线连接当前点和第一个切点

**返回值**: 无

#### *path*.arc | Function

**入参**: (x, y, radius, startAngle, endAngle[, anticlockwise])

**描述**: 创建一个圆弧。该圆弧的圆心位于 (x, y)，半径为 radius，开始角度为 startAngle，结束角度为 endAngle(计算单位是弧度)，还有一个可选的参数 anticlockwise 为画弧度的方向，默认为 false，代表顺时针方向；true 代表逆时针方向。如果当前点与圆弧的起始点不相同，那么会用一条直线连接当前点和圆弧的起始点

**返回值**: 无

#### *path*.rect | Function

**入参**: (x, y, w, h)

**描述**: 创建一个矩形。该矩形的四个点分别为 (x, y), (x + w, y), (x + w, y + h), (x, y + h)

**返回值**: 无

#### *path*.toString | Function

**入参**: 无

**描述**: 返回 path 对象的路径信息字符串，该字符串可以作为 path 元素 d 属性的值

**返回值**: String