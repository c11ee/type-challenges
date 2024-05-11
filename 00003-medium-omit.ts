// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, "description">>>,
  Expect<Equal<Expected2, MyOmit<Todo, "description" | "completed">>>
];

// @ts-expect-error
type error = MyOmit<Todo, "description" | "invalid">;

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
  completed: boolean;
}

interface Expected2 {
  title: string;
}

// ============= Your Code Here =============

/**
 * 实现删除指定对象属性
 *
 * @description
 * `T` -> 操作的类型
 * `K` -> 想从 `T` 中删除的属性的名称
 *
 * `MyOmit` 类型中的主体部分是一个映射类型, 它对 `T` 的所有属性进行映射.
 * 在这个映射类型中, `[P in keyof T as P extends K ? never : P]: T[P]` 是关键的部分.
 *    - `P in keyof T`: 这是一个遍历 `T` 所有属性的语句, `P` 是当前遍历到的属性名.
 *    - `P extends K ? never : P`: 这是一个条件类型, 如果 `P` 是 `K` 的子类型(也就是说, `P` 是 `K` 中的一个属性名)
 *      那么类型是 `never`, 否则类型就是 `P`. 这是因为我们想从 `T` 中删除 `K` 中的属性, 所以当 `P` 是 `K` 中的一个属性名时,
 *      我们就将其映射为 `never`.
 *    - `T[P]`: 这是 `T` 中 `P` 属性的类型.
 *
 * 因此, `[P in keyof T as P extends K ? never : P]` 的含义是: 对于 `T` 的每一个属性 `P`, 如果 `P` 是 `K` 中的一个属性名,
 * 那么我们就将其映射为 `never`, 否则我们将其映射为 `P`. 这样, 我们就从 `T` 中删除了 `K` 中的所有属性.
 *
 * 最后, `MyOmit` 类型的结果是一个新的类型, 它包含了 `T` 中除 `K` 之外的所有属性.
 */
type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

/**
 * 使用 `Pick`, `Exclude` 实现
 * `Pick`    -> 根据指定 `联合类型` 在T 中返回新对象类型   
 * `Exclude` -> 剔除指定 `联合类型`, 返回新的 `联合类型`
 */
type MyOmit2<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
