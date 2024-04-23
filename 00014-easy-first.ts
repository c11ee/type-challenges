// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
  Expect<Equal<First<number[]>, number>>
];

type errors = [
  // @ts-expect-error
  First<"notArray">,
  // @ts-expect-error
  First<{ 0: "arrayLike" }>
];

// ============= Your Code Here =============
/**
 * 实现一个First<T>泛型，它接受一个数组T并返回它的第一个元素的类型。
 * 
 * 判断是否为空数组如果是 返回 `never` 永远不存在值
 */
type First<T extends any[]> = T extends [] ? never : T[0];
