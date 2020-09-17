<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [types](./types.md) &gt; [Defined](./types.defined.md)

## Defined type

去除类型 T 中的 undefined。

<b>Signature:</b>

```typescript
declare type Defined<T> = Exclude<T, undefined>;
```

## Example


```typescript
type X = string | undefined
type Y = Defined<X> // => string

```
