// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
const tupleNumber = [1, 2, 3, 4] as const
const sym1 = Symbol(1)
const sym2 = Symbol(2)
const tupleSymbol = [sym1, sym2] as const
const tupleMix = [1, '2', 3, '4', sym1] as const

type cases = [
  Expect<Equal<TupleToObject<typeof tuple>, { tesla: 'tesla'; 'model 3': 'model 3'; 'model X': 'model X'; 'model Y': 'model Y' }>>,
  Expect<Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>>,
  Expect<Equal<TupleToObject<typeof tupleSymbol>, { [sym1]: typeof sym1; [sym2]: typeof sym2 }>>,
  Expect<Equal<TupleToObject<typeof tupleMix>, { 1: 1; '2': '2'; 3: 3; '4': '4'; [sym1]: typeof sym1 }>>,
]

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>


// ============= Your Code Here =============
/**
 * 将一个元组类型转换为对象类型，这个对象类型的键/值和元组中的元素对象
 * 
 * @description
 *    1. `T extends readonly any[]`: 这里的 `T` 是一个泛型参数, 它被约束为只读元组类型.
 *       `readonly any[]` 表示 any 类型的只读数组(元组是一种特殊的数组).
 * 
 *    2. `[P in T[number]]: P;`: 这是一个索引签名, 它遍历 `T` 中的每个元素. 
 *       `T[number]` 表示 `T` 的所有数字键 (对于元组/数组, 这就是所有的索引). 
 *       `P` 是索引类型查询的结果, 它取得是元组中的每个元素类型. 
 *       然后 `[P in T[number]]: P` 创建一个对象, 该对象的键和值与元组中的元素 一一 对应.
 */
type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]: P;
}