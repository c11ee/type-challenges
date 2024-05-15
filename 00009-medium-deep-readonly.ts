// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<DeepReadonly<X1>, Expected1>>,
  Expect<Equal<DeepReadonly<X2>, Expected2>>
];

type X1 = {
  a: () => 22;
  b: string;
  c: {
    d: boolean;
    e: {
      g: {
        h: {
          i: true;
          j: "string";
        };
        k: "hello";
      };
      l: [
        "hi",
        {
          m: ["hey"];
        }
      ];
    };
  };
};

type X2 = { a: string } | { b: number };

type Expected1 = {
  readonly a: () => 22;
  readonly b: string;
  readonly c: {
    readonly d: boolean;
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true;
          readonly j: "string";
        };
        readonly k: "hello";
      };
      readonly l: readonly [
        "hi",
        {
          readonly m: readonly ["hey"];
        }
      ];
    };
  };
};

type Expected2 = { readonly a: string } | { readonly b: number };

// ============= Your Code Here =============
/**
 * 这段代码定义了一个 `DeepReadonly` 类型, 它将一个给定类型 `T` 转换为一个深度只读 (readonly) 的类型
 *
 * 1. `DeepReadonly<T>`: 这是一个泛型类型, 表示要转换为深度只读的类型.
 *
 * 2. `readonly [K in keyof T]`: 这部分使用了 TS 的映射类型, 遍历了类型 `T` 的所有属性 `K`, 并将它们都标记为只读.
 *
 * 3. `T[K] extends Record<any, any>`: 这部分判断属性 `T[K]` 是否是一个对象 (Record<any, any> 是指任意键值对的对象).
 *
 * 4. `? T[K] extends Function ? T[K] : DeepReadonly<T[K]>`: 这是一个条件表达式, 用于判断属性 `T[K]` 是不是函数.
 *    如果是函数, 则保持不变 (`T[K]`), 否则递归地将其转换为深度只读 `DeepReadonly<T[K]>`
 * 
 * 
 */
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends Record<any, any>
    ? T[K] extends Function
      ? T[K]
      : DeepReadonly<T[K]>
    : T[K];
};
