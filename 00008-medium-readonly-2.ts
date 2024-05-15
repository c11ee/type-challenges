// ============= Test Cases =============
import type { Alike, Expect } from "./test-utils";

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, "title" | "description">, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, "title" | "description">, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, "description">, Expected>>
];

// @ts-expect-error
type error = MyReadonly2<Todo1, "title" | "invalid">;

interface Todo1 {
  title: string;
  description?: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  description?: string;
  completed: boolean;
}

interface Expected {
  readonly title: string;
  readonly description?: string;
  completed: boolean;
}

// ============= Your Code Here =============

/**
 * 首先, `MyReadonly2<T, K extends keyof T = keyof T>`  定义了一个泛型类型 `MyReadonly`
 * 它接受两个类型参数 `T` 和 `K`. `T` 是一个任意类型, `K` 是 `T` 的属性名的子级.
 * 如果没有明确提供 `K`, 那么 `K` 的默认值是 `T` 的所有属性名
 *
 * 然后 `MyReadonly2` 的类型定义是 `Omit<T, K> & Readonly<Pick<T, K>>` 这是一个交叉类型 , 表示一个值必须同时满足
 *
 * `Omit<T, K>` 是一个新的类型, 它只有 `T` 的所有属性, 除了 `K` 中指定的属性. 换句话说, `Omit<T, K>` 是 `T` 去掉 `K`中属性的结果
 *
 * `Pick<T, K>` 是一个新的类型, 它只有 `T` 和 `K` 指定的属性. 然后 `Readonly<Pick<T, K>>` 是将 `Pick<T, K>` 中的所有属性设置为只读
 *
 * 因此, `Omut<T, K> & Readonly<Pick<T, K>>` 的结果是一个新的类型, 它有 `T` 的所有属性, 但是 `K` 中指定的属性被设置为只读
 * 
 * 总的来说, `MyReadonly2<T, K>` 的作用就是将 `T` 中 `K` 指定的属性设置为只读, 其他属性保持不变.
 * 
 */
type MyReadonly2<T, K extends keyof T = keyof T> = Omit<T, K> &
  Readonly<Pick<T, K>>;
