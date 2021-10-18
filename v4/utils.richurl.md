<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [utils](./utils.md) &gt; [RichUrl](./utils.richurl.md)

## RichUrl class

富链接，同普通链接相比，富链接可包含一些描述信息。

结构描述：

```text
rich://{"url":"***","desc":"***"}

```

<b>Signature:</b>

```typescript
export declare class RichUrl 
```

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [build(url, desc)](./utils.richurl.build.md) | <code>static</code> | 创建富链接。 |
|  [check(value)](./utils.richurl.check.md) | <code>static</code> | 检查是否是富链接。 |
|  [fromFile(file)](./utils.richurl.fromfile.md) | <code>static</code> | 将文件转换为文件富链接。 |
|  [parse(richUrl)](./utils.richurl.parse.md) | <code>static</code> | 解析富链接。非富链接的会直接将其值作为 url 返回。 |
|  [toFile(richUrl)](./utils.richurl.tofile.md) | <code>static</code> | 将文件富链接转换为文件和普通链接。 |
|  [transform(data, callback)](./utils.richurl.transform.md) | <code>static</code> | 转换数据中的富链接。 |
|  [transformFile(data, callback)](./utils.richurl.transformfile.md) | <code>static</code> | 转换数据中的文件富链接。 |
