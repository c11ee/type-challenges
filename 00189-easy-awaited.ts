// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<Promise<string | number>>;
type Z1 = Promise<Promise<Promise<string | boolean>>>;
type T = { then: (onfulfilled: (arg: number) => any) => any };

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>
];

// ============= Your Code Here =============

/**
 * 用于获取一个异步操作的最终结果类型.
 * 
 * 1. `T extends PromiseLike<infer R>`: 这里使用了 TypeScript 中
 * 的泛型条件类型, 表示如果 `T` 是 `PromiseLike` 类型的, 那么就提取出
 * `PromiseLike` 的类型参数, 赋值给 `R`.
 * 
 * 2. `R extends PromiseLike<infer K>`: 接着检查 `R` 是否也是 
 * `PromiseLike` 类型的, 如果是, 就提取出 `PromiseLike` 的类型参
 * 数, 赋值给 `K`.
 * 
 * 3. `MyAwaited<K>`: 如果 `R` 是 `PromiseLike` 类型的, 那么递归调
 * 用 `MyAwaited`, 传入 `K`, 继续处理内部的嵌套 `PromiseLike`,
 * 直到最终获取到一个非 `PromiseLike` 的类型.
 * 
 * 4. `:R`: 如果 `R` 不是 `PromiseLike` 类型的, 那么直接返回 `R`.
 * 
 * 5. `: T`: 如果最终的 `T` 不是 `PromiseLike` 类型的, 直接返回 `T`.
 */
type MyAwaited<T> = T extends PromiseLike<infer R>
  ? R extends PromiseLike<infer K>
    ? MyAwaited<K>
    : R
  : T;
