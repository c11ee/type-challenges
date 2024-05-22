// ============= Test Cases =============
import type { Alike, Expect } from "./test-utils";

declare const a: Chainable;

const result1 = a
  .option("foo", 123)
  .option("bar", { value: "Hello World" })
  .option("name", "type-challenges")
  .get();

const result2 = a
  .option("name", "another name")
  // @ts-expect-error
  .option("name", "last name")
  .get();

const result3 = a
  .option("name", "another name")
  // @ts-expect-error
  .option("name", 123)
  .get();

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>
];

type Expected1 = {
  foo: number;
  bar: {
    value: string;
  };
  name: string;
};

type Expected2 = {
  name: string;
};

type Expected3 = {
  name: number;
};

// ============= Your Code Here =============
/**
 *代码概述
 * 该代码定义了一个 TypeScript 类型 `Chainable`, 用于实现一个链式 API
 * 可以通过 `option` 方法添加键值对并扩展对象的类型，
 * 最后通过 `get` 方法获取最终的对象
 *
 * 类型定义
 * 1. 泛型 `T`
 * `Chainable<T>` 是一个泛型类型，默认类型参数 `T` 为一个空对象 `{}`.
 * 这个泛型 `T` 表示当前对象的类型, 它在 `option` 方法调用会被扩展
 *
 * 2. `option` 方法
 *  - `option` 是一个泛型方法，接受两个参数: `key` 和 `value`.
 *  - `<K extends string, V>`: `K` 是一个字符串类型, 表示键; `V` 是任意类型, 表示值.
 *  - `key: K extends keyof T ? never : K`: 这是一个条件类型,
 *     用于确保 `key` 不能是已经存在于 `T` 中的键. 如果 `K` 是 `T` 的键, 则返回`never`
 *     即使传递该键会导致类型错误.
 *  - `value: V`: 表示键 `K` 对应的值, 类型为 `V`.
 *  -  返回类型为 `Chainble<Omit<T, K> & Record<K,V>>`:
 *     - `Omit<T, K>`: 从当前对象类型 `T` 中删除键 `K` 及其对应的值.
 *     - `Record<K, V>`: 创建一个新对象类型, 包含键 `K` 和对应的值类型 `V`
 *     - `Omit<T, K> & Record<K, V>`: 将上述两部分合并，生成新的对象类型,
 *        其中键 `K` 的类型被更新为 `V`. 先删除再添加每次都是最新的类型.
 * 3. `get` 方法
 *  - `get` 是一个方法, 返回当前对象的类型 `T`
 *  - `get: ()=> T`: 该方法没有参数，返回类型 `T` 
 */
type Chainable<T = {}> = {
  option: <K extends string, V>(
    key: K extends keyof T ? never : K,
    value: V
  ) => Chainable<Omit<T, K> & Record<K, V>>;
  get: () => T;
};
