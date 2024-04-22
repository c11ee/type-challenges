// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>];

interface Todo1 {
  title: string;
  description: string;
  completed: boolean;
  meta: {
    author: string;
  };
}

// ============= Your Code Here =============
type MyReadonly<T> = {
  // `readonly` 使属性变为只读
  readonly [K in keyof T]: T[K];
};
