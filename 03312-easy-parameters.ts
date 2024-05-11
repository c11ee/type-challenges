// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

const foo = (arg1: string, arg2: number): void => {};
const bar = (arg1: boolean, arg2: { a: "A" }): void => {};
const baz = (): void => {};
const p = new Promise<number>((resolve) => {
  resolve(1);
});

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: "A" }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>,
  Expect<Equal<ReturnType<typeof foo>, void>>,
  Expect<Equal<PromiseType<typeof p>, number>>
];

// ============= Your Code Here =============

/**
 * `infer` 关键字是在条件类型表达式中推断类型的一种方式.
 * 它可以在你需要根据给定的条件从类型中提取某些部分时使用.
 */

/**
 * 返回函数参数
 */
type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

/**
 * 返回函数的返回类型
 */
type ReturnType<T> = T extends (...args: any) => infer R ? R : any;

/**
 * 返回 Promise 解析值的类型
 */

type PromiseType<T> = T extends Promise<infer U> ? U : T;