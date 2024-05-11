// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<
    Equal<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Kars">, true>
  >,
  Expect<
    Equal<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">, false>
  >,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: "A" }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: "A" }], { readonly a: "A" }>, false>>,
  Expect<Equal<Includes<[{ readonly a: "A" }], { a: "A" }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>
];
// ============= Your Code Here =============

/**
 * TypeScript 的高级类型功能
 * 展示了如何使用 条件类型, 映射类型, 类型推断和递归类型来实现复杂的类型操作
 *
 * 条件类型: T extends X ? 1 : 2
 *
 * 映射类型: 根据旧类型创建一个新的类型
 *
 * 类型推断: `infer` 关键字用于从数组类型 `T` 中推断出元素类型 `P` 和剩余元素类型 `Rest`
 */

/**
 * 判断两个类型是否相等
 * @description
 * 接收两个类型参数 `X` 和 `Y`, 然后返回一个条件类型.
 * 这个条件类型检查 `X` 和 `Y` 是否相等.
 * 它通过比较两个函数类型来实现.
 * 这两个函数类型都接受一个类型参数 `T`, 然后返回一个条件类型.
 * 第一个函数检查 `T` 是否可以赋值给 `X`, 第二个函数检查 `T` 是否可以赋值给 `Y`.
 * 如果这两个函数类型是兼容的, 那么 `Equals<X, Y>` 就是 `true`, 否则就是 `false`
 *
 * [github](https://github.com/microsoft/TypeScript/issues/27024)
 */
type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

/**
 * 这里定义了一个名为 `Includes` 的类型, 它接受两个类型参数 `T` 和 `U`.
 * `T` 必须是只读数组类型, `U` 可以是任何类型. 这个类型检查数组 `T` 是否包含元素 `U`. 它通过递归地检查数组的每一个元素来实现.
 *
 * 如果 `T` 可以赋值给 `[infer P, ...infer Rest]` 那么 `T` 就是一个非空数组, 它的第一个元素是 `P`, 剩余的是 `Rest`.
 * 然后我们检查 `P` 是否等于 `U`, 如果等于, 那么 `Includes<T, U>` 就是 `true`, 否则我们递归地检查 `Rest` 是否包含 `U`.
 *
 * 如果 `T` 不能赋值给 `[infer P, ...infer Rest]`, 那么 `T` 就是一个空数组, 它不包含任何元素, 所以 `Includes<T, U>` 是 `false`.
 */
type Includes<T extends readonly any[], U> = T extends [infer P, ...infer Rest]
  ? Equals<P, U> extends true
    ? true
    : Includes<Rest, U>
  : false;

/**
 *  在 TypeScript 中, 当我们说一个类型 `A` 是否可以 `extends` 另一个类型 `B` 时,
 *  我们不是在说某一个具体的实例 (或值) 是否可以赋值, 而是在说类型 `A` 自身是否可以兼容或赋值给类型 `B`.
 *
 *  `A` 和 `B` 都是泛型函数类型. 这意味着它们都可以接受任何类型的参数 `T` 并返回一个结果.
 *  在这种情况下，当我们说 `A extends B`, 我们实际上是在比较这两种类型的结构，而不是比较它们的实例或值.
 *
 *  因此，即使你在使用这些类型时没有明确地传入一个类型参数 (如 `T`), TypeScript 仍然可以根据这些类型的结果来判断它们是否兼容.
 *  这就是为什么 `A extends B` 在这种情况下可以工作的原因.
 */
type A = <T>() => T extends 3 ? 1 : 2;
type B = <T>() => T extends 5 ? 1 : 2;
type C = A extends B ? true : false; 
