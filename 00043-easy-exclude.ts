// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>,
]


// ============= Your Code Here =============

/**
 * 这段代码定义了一个类型别名 `MyExclude<T, U>`, 
 * 它接受两个类型参数 `T` 和 `U`.
 * 在 TypeScript 中, `T extends U ? never : T` 是一种条件类型
 * 意思是如果类型 `T` 能赋值给类型 `U`, 
 * 那么返回 `never` 类型 (表示排除)
 * 否则返回 `T`     类型 (表示保留)
 * 
 * 当我们使用 `MyExclude<T, U>` 时, 
 * 它会根据 `T` 能否赋值给 `U` 来决定最终的类型. 
 * 如果 `T` 能赋值给 `U`, 则 `MyExclude<T, U>` 返回 `never` 类型
 * 否则返回 `T` 类型. 
 * 这样, 我们就可以利用 `MyExclude<T, U>` 来排除某些类型，只保留符合条件的类型. 
 */
type MyExclude<T, U> = T extends U ? never : T
