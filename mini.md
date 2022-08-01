<!-- mini打包器 -->
1. 初始化参数
    1. 从配置文件和shell命令中 读取、合并 参数

0. 开始编译
    1. 使用配置参数初始化 compiler 对象
    0. 挂载插件
    0. 依据配置文件，找到 entry 入口模块
0. 编译模块
    1. 配置文件中的 Loader，从 entry 开始编译所有模块
    0. 找到所有以来文件/模块
0. 完成编译
    1. 产出编译的数据（对象、数组、json ……）
0. 输出资源
    1. 组装 chunk
    0. 将 chunk 转换为文件添加至输出列表
0. 写入磁盘
    1. 确定输出内容
    0. 路径 + 写入 + 缓存


发布订阅 - tapable
```js
// 发布
compiler.hooks.run.tap('runPlugin',()=> {})

// 订阅
this.hooks.run.call()
```