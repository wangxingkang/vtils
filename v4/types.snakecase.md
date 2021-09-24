<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [types](./types.md) &gt; [SnakeCase](./types.snakecase.md)

## SnakeCase type

Convert a string literal to snake-case.

This can be useful when, for example, converting a camel-cased object property to a snake-cased SQL column name.

<b>Signature:</b>

```typescript
export declare type SnakeCase<Value> = DelimiterCase<Value, '_'>;
```
<b>References:</b> [DelimiterCase](./types.delimitercase.md)

## Example

\`\`\` import {<!-- -->SnakeCase<!-- -->} from 'type-fest';

// Simple

const someVariable: SnakeCase<!-- -->&lt;<!-- -->'fooBar'<!-- -->&gt; = 'foo\_bar';

// Advanced

type SnakeCasedProperties<T> = { \[K in keyof T as SnakeCase<K>\]: T\[K\] }<!-- -->;

interface ModelProps { isHappy: boolean; fullFamilyName: string; foo: number; }

const dbResult: SnakeCasedProperties<ModelProps> = { 'is\_happy': true, 'full\_family\_name': 'Carla Smith', foo: 123 }<!-- -->; \`\`\`

 Template Literals
