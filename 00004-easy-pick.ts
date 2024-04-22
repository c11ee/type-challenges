// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, "title">>>,
  Expect<Equal<Expected2, MyPick<Todo, "title" | "completed">>>,
  // @ts-expect-error
  MyPick<Todo, "title" | "completed" | "invalid">
];

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
}

interface Expected2 {
  title: string;
  completed: boolean;
}

// ============= Your Code Here =============

/**
 * 这段代码是 TypeScript 中的泛型类型定义，用于从一个类型 `T` 中选择一组属性
 * 这些属性的键是另一个类型 `K` 的键的并集。
 *
 * 1. `type MyPick<T, K extends keyof T> = { ... }`：这是一个类型别名定义，
 * 定义了一个泛型类型 `Pick`，接受两个类型参数 `T` 和 `K`.
 * `T` 是要选择属性的类型，
 * `K` 是属性键的集合类型 （集合: 'title' | 'completed'）
 *
 * 2. `[P in K]`：这是一个映射类型，它遍历类型 `K` 的键，并为每个键创建一个属性。
 *
 * 3. `: T[P]`：这部分表示属性的值的类型应该与类型 `T` 中对应属性的值类型相同。
 * 通过 `T[P]` 我们可以从类型 T 中获取属性 `P` 的类型.
 */
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};