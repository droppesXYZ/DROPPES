
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Protocol
 * 
 */
export type Protocol = $Result.DefaultSelection<Prisma.$ProtocolPayload>
/**
 * Model Investment
 * 
 */
export type Investment = $Result.DefaultSelection<Prisma.$InvestmentPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model TwitterCache
 * 
 */
export type TwitterCache = $Result.DefaultSelection<Prisma.$TwitterCachePayload>
/**
 * Model AffiliateCode
 * 
 */
export type AffiliateCode = $Result.DefaultSelection<Prisma.$AffiliateCodePayload>
/**
 * Model AffiliateUsage
 * 
 */
export type AffiliateUsage = $Result.DefaultSelection<Prisma.$AffiliateUsagePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const InvestmentType: {
  DEPOSIT: 'DEPOSIT',
  WITHDRAW: 'WITHDRAW'
};

export type InvestmentType = (typeof InvestmentType)[keyof typeof InvestmentType]


export const PaymentPlan: {
  MONTHLY: 'MONTHLY',
  QUARTERLY: 'QUARTERLY',
  SEMI_ANNUAL: 'SEMI_ANNUAL'
};

export type PaymentPlan = (typeof PaymentPlan)[keyof typeof PaymentPlan]


export const PaymentStatus: {
  PENDING: 'PENDING',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED',
  EXPIRED: 'EXPIRED'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]

}

export type InvestmentType = $Enums.InvestmentType

export const InvestmentType: typeof $Enums.InvestmentType

export type PaymentPlan = $Enums.PaymentPlan

export const PaymentPlan: typeof $Enums.PaymentPlan

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.protocol`: Exposes CRUD operations for the **Protocol** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Protocols
    * const protocols = await prisma.protocol.findMany()
    * ```
    */
  get protocol(): Prisma.ProtocolDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.investment`: Exposes CRUD operations for the **Investment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Investments
    * const investments = await prisma.investment.findMany()
    * ```
    */
  get investment(): Prisma.InvestmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.twitterCache`: Exposes CRUD operations for the **TwitterCache** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TwitterCaches
    * const twitterCaches = await prisma.twitterCache.findMany()
    * ```
    */
  get twitterCache(): Prisma.TwitterCacheDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.affiliateCode`: Exposes CRUD operations for the **AffiliateCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AffiliateCodes
    * const affiliateCodes = await prisma.affiliateCode.findMany()
    * ```
    */
  get affiliateCode(): Prisma.AffiliateCodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.affiliateUsage`: Exposes CRUD operations for the **AffiliateUsage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AffiliateUsages
    * const affiliateUsages = await prisma.affiliateUsage.findMany()
    * ```
    */
  get affiliateUsage(): Prisma.AffiliateUsageDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.10.1
   * Query Engine version: 9b628578b3b7cae625e8c927178f15a170e74a9c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Protocol: 'Protocol',
    Investment: 'Investment',
    Task: 'Task',
    Payment: 'Payment',
    TwitterCache: 'TwitterCache',
    AffiliateCode: 'AffiliateCode',
    AffiliateUsage: 'AffiliateUsage'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "protocol" | "investment" | "task" | "payment" | "twitterCache" | "affiliateCode" | "affiliateUsage"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Protocol: {
        payload: Prisma.$ProtocolPayload<ExtArgs>
        fields: Prisma.ProtocolFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProtocolFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProtocolPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProtocolFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProtocolPayload>
          }
          findFirst: {
            args: Prisma.ProtocolFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProtocolPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProtocolFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProtocolPayload>
          }
          findMany: {
            args: Prisma.ProtocolFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProtocolPayload>[]
          }
          create: {
            args: Prisma.ProtocolCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProtocolPayload>
          }
          createMany: {
            args: Prisma.ProtocolCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProtocolCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProtocolPayload>[]
          }
          delete: {
            args: Prisma.ProtocolDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProtocolPayload>
          }
          update: {
            args: Prisma.ProtocolUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProtocolPayload>
          }
          deleteMany: {
            args: Prisma.ProtocolDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProtocolUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProtocolUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProtocolPayload>[]
          }
          upsert: {
            args: Prisma.ProtocolUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProtocolPayload>
          }
          aggregate: {
            args: Prisma.ProtocolAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProtocol>
          }
          groupBy: {
            args: Prisma.ProtocolGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProtocolGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProtocolCountArgs<ExtArgs>
            result: $Utils.Optional<ProtocolCountAggregateOutputType> | number
          }
        }
      }
      Investment: {
        payload: Prisma.$InvestmentPayload<ExtArgs>
        fields: Prisma.InvestmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvestmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvestmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload>
          }
          findFirst: {
            args: Prisma.InvestmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvestmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload>
          }
          findMany: {
            args: Prisma.InvestmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload>[]
          }
          create: {
            args: Prisma.InvestmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload>
          }
          createMany: {
            args: Prisma.InvestmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvestmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload>[]
          }
          delete: {
            args: Prisma.InvestmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload>
          }
          update: {
            args: Prisma.InvestmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload>
          }
          deleteMany: {
            args: Prisma.InvestmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvestmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InvestmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload>[]
          }
          upsert: {
            args: Prisma.InvestmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvestmentPayload>
          }
          aggregate: {
            args: Prisma.InvestmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvestment>
          }
          groupBy: {
            args: Prisma.InvestmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvestmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvestmentCountArgs<ExtArgs>
            result: $Utils.Optional<InvestmentCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      TwitterCache: {
        payload: Prisma.$TwitterCachePayload<ExtArgs>
        fields: Prisma.TwitterCacheFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TwitterCacheFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwitterCachePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TwitterCacheFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwitterCachePayload>
          }
          findFirst: {
            args: Prisma.TwitterCacheFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwitterCachePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TwitterCacheFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwitterCachePayload>
          }
          findMany: {
            args: Prisma.TwitterCacheFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwitterCachePayload>[]
          }
          create: {
            args: Prisma.TwitterCacheCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwitterCachePayload>
          }
          createMany: {
            args: Prisma.TwitterCacheCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TwitterCacheCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwitterCachePayload>[]
          }
          delete: {
            args: Prisma.TwitterCacheDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwitterCachePayload>
          }
          update: {
            args: Prisma.TwitterCacheUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwitterCachePayload>
          }
          deleteMany: {
            args: Prisma.TwitterCacheDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TwitterCacheUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TwitterCacheUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwitterCachePayload>[]
          }
          upsert: {
            args: Prisma.TwitterCacheUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TwitterCachePayload>
          }
          aggregate: {
            args: Prisma.TwitterCacheAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTwitterCache>
          }
          groupBy: {
            args: Prisma.TwitterCacheGroupByArgs<ExtArgs>
            result: $Utils.Optional<TwitterCacheGroupByOutputType>[]
          }
          count: {
            args: Prisma.TwitterCacheCountArgs<ExtArgs>
            result: $Utils.Optional<TwitterCacheCountAggregateOutputType> | number
          }
        }
      }
      AffiliateCode: {
        payload: Prisma.$AffiliateCodePayload<ExtArgs>
        fields: Prisma.AffiliateCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AffiliateCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AffiliateCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateCodePayload>
          }
          findFirst: {
            args: Prisma.AffiliateCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AffiliateCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateCodePayload>
          }
          findMany: {
            args: Prisma.AffiliateCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateCodePayload>[]
          }
          create: {
            args: Prisma.AffiliateCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateCodePayload>
          }
          createMany: {
            args: Prisma.AffiliateCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AffiliateCodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateCodePayload>[]
          }
          delete: {
            args: Prisma.AffiliateCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateCodePayload>
          }
          update: {
            args: Prisma.AffiliateCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateCodePayload>
          }
          deleteMany: {
            args: Prisma.AffiliateCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AffiliateCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AffiliateCodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateCodePayload>[]
          }
          upsert: {
            args: Prisma.AffiliateCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateCodePayload>
          }
          aggregate: {
            args: Prisma.AffiliateCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAffiliateCode>
          }
          groupBy: {
            args: Prisma.AffiliateCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<AffiliateCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.AffiliateCodeCountArgs<ExtArgs>
            result: $Utils.Optional<AffiliateCodeCountAggregateOutputType> | number
          }
        }
      }
      AffiliateUsage: {
        payload: Prisma.$AffiliateUsagePayload<ExtArgs>
        fields: Prisma.AffiliateUsageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AffiliateUsageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateUsagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AffiliateUsageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateUsagePayload>
          }
          findFirst: {
            args: Prisma.AffiliateUsageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateUsagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AffiliateUsageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateUsagePayload>
          }
          findMany: {
            args: Prisma.AffiliateUsageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateUsagePayload>[]
          }
          create: {
            args: Prisma.AffiliateUsageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateUsagePayload>
          }
          createMany: {
            args: Prisma.AffiliateUsageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AffiliateUsageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateUsagePayload>[]
          }
          delete: {
            args: Prisma.AffiliateUsageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateUsagePayload>
          }
          update: {
            args: Prisma.AffiliateUsageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateUsagePayload>
          }
          deleteMany: {
            args: Prisma.AffiliateUsageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AffiliateUsageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AffiliateUsageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateUsagePayload>[]
          }
          upsert: {
            args: Prisma.AffiliateUsageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AffiliateUsagePayload>
          }
          aggregate: {
            args: Prisma.AffiliateUsageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAffiliateUsage>
          }
          groupBy: {
            args: Prisma.AffiliateUsageGroupByArgs<ExtArgs>
            result: $Utils.Optional<AffiliateUsageGroupByOutputType>[]
          }
          count: {
            args: Prisma.AffiliateUsageCountArgs<ExtArgs>
            result: $Utils.Optional<AffiliateUsageCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    protocol?: ProtocolOmit
    investment?: InvestmentOmit
    task?: TaskOmit
    payment?: PaymentOmit
    twitterCache?: TwitterCacheOmit
    affiliateCode?: AffiliateCodeOmit
    affiliateUsage?: AffiliateUsageOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    protocols: number
    tasks: number
    payments: number
    affiliateCodes: number
    affiliateUsages: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    protocols?: boolean | UserCountOutputTypeCountProtocolsArgs
    tasks?: boolean | UserCountOutputTypeCountTasksArgs
    payments?: boolean | UserCountOutputTypeCountPaymentsArgs
    affiliateCodes?: boolean | UserCountOutputTypeCountAffiliateCodesArgs
    affiliateUsages?: boolean | UserCountOutputTypeCountAffiliateUsagesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProtocolsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProtocolWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAffiliateCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AffiliateCodeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAffiliateUsagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AffiliateUsageWhereInput
  }


  /**
   * Count Type ProtocolCountOutputType
   */

  export type ProtocolCountOutputType = {
    investments: number
    tasks: number
  }

  export type ProtocolCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    investments?: boolean | ProtocolCountOutputTypeCountInvestmentsArgs
    tasks?: boolean | ProtocolCountOutputTypeCountTasksArgs
  }

  // Custom InputTypes
  /**
   * ProtocolCountOutputType without action
   */
  export type ProtocolCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProtocolCountOutputType
     */
    select?: ProtocolCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProtocolCountOutputType without action
   */
  export type ProtocolCountOutputTypeCountInvestmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvestmentWhereInput
  }

  /**
   * ProtocolCountOutputType without action
   */
  export type ProtocolCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }


  /**
   * Count Type AffiliateCodeCountOutputType
   */

  export type AffiliateCodeCountOutputType = {
    usages: number
  }

  export type AffiliateCodeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usages?: boolean | AffiliateCodeCountOutputTypeCountUsagesArgs
  }

  // Custom InputTypes
  /**
   * AffiliateCodeCountOutputType without action
   */
  export type AffiliateCodeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCodeCountOutputType
     */
    select?: AffiliateCodeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AffiliateCodeCountOutputType without action
   */
  export type AffiliateCodeCountOutputTypeCountUsagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AffiliateUsageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    isPremium: boolean | null
    premiumUntil: Date | null
    isAdmin: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    isPremium: boolean | null
    premiumUntil: Date | null
    isAdmin: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    isPremium: number
    premiumUntil: number
    isAdmin: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    isPremium?: true
    premiumUntil?: true
    isAdmin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    isPremium?: true
    premiumUntil?: true
    isAdmin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    isPremium?: true
    premiumUntil?: true
    isAdmin?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string | null
    isPremium: boolean
    premiumUntil: Date | null
    isAdmin: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    isPremium?: boolean
    premiumUntil?: boolean
    isAdmin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    protocols?: boolean | User$protocolsArgs<ExtArgs>
    tasks?: boolean | User$tasksArgs<ExtArgs>
    payments?: boolean | User$paymentsArgs<ExtArgs>
    affiliateCodes?: boolean | User$affiliateCodesArgs<ExtArgs>
    affiliateUsages?: boolean | User$affiliateUsagesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    isPremium?: boolean
    premiumUntil?: boolean
    isAdmin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    isPremium?: boolean
    premiumUntil?: boolean
    isAdmin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    isPremium?: boolean
    premiumUntil?: boolean
    isAdmin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "isPremium" | "premiumUntil" | "isAdmin" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    protocols?: boolean | User$protocolsArgs<ExtArgs>
    tasks?: boolean | User$tasksArgs<ExtArgs>
    payments?: boolean | User$paymentsArgs<ExtArgs>
    affiliateCodes?: boolean | User$affiliateCodesArgs<ExtArgs>
    affiliateUsages?: boolean | User$affiliateUsagesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      protocols: Prisma.$ProtocolPayload<ExtArgs>[]
      tasks: Prisma.$TaskPayload<ExtArgs>[]
      payments: Prisma.$PaymentPayload<ExtArgs>[]
      affiliateCodes: Prisma.$AffiliateCodePayload<ExtArgs>[]
      affiliateUsages: Prisma.$AffiliateUsagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string | null
      isPremium: boolean
      premiumUntil: Date | null
      isAdmin: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    protocols<T extends User$protocolsArgs<ExtArgs> = {}>(args?: Subset<T, User$protocolsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProtocolPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tasks<T extends User$tasksArgs<ExtArgs> = {}>(args?: Subset<T, User$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends User$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, User$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    affiliateCodes<T extends User$affiliateCodesArgs<ExtArgs> = {}>(args?: Subset<T, User$affiliateCodesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    affiliateUsages<T extends User$affiliateUsagesArgs<ExtArgs> = {}>(args?: Subset<T, User$affiliateUsagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateUsagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly isPremium: FieldRef<"User", 'Boolean'>
    readonly premiumUntil: FieldRef<"User", 'DateTime'>
    readonly isAdmin: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.protocols
   */
  export type User$protocolsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Protocol
     */
    omit?: ProtocolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProtocolInclude<ExtArgs> | null
    where?: ProtocolWhereInput
    orderBy?: ProtocolOrderByWithRelationInput | ProtocolOrderByWithRelationInput[]
    cursor?: ProtocolWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProtocolScalarFieldEnum | ProtocolScalarFieldEnum[]
  }

  /**
   * User.tasks
   */
  export type User$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * User.payments
   */
  export type User$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * User.affiliateCodes
   */
  export type User$affiliateCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCode
     */
    select?: AffiliateCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateCode
     */
    omit?: AffiliateCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateCodeInclude<ExtArgs> | null
    where?: AffiliateCodeWhereInput
    orderBy?: AffiliateCodeOrderByWithRelationInput | AffiliateCodeOrderByWithRelationInput[]
    cursor?: AffiliateCodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AffiliateCodeScalarFieldEnum | AffiliateCodeScalarFieldEnum[]
  }

  /**
   * User.affiliateUsages
   */
  export type User$affiliateUsagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateUsage
     */
    select?: AffiliateUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateUsage
     */
    omit?: AffiliateUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateUsageInclude<ExtArgs> | null
    where?: AffiliateUsageWhereInput
    orderBy?: AffiliateUsageOrderByWithRelationInput | AffiliateUsageOrderByWithRelationInput[]
    cursor?: AffiliateUsageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AffiliateUsageScalarFieldEnum | AffiliateUsageScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Protocol
   */

  export type AggregateProtocol = {
    _count: ProtocolCountAggregateOutputType | null
    _avg: ProtocolAvgAggregateOutputType | null
    _sum: ProtocolSumAggregateOutputType | null
    _min: ProtocolMinAggregateOutputType | null
    _max: ProtocolMaxAggregateOutputType | null
  }

  export type ProtocolAvgAggregateOutputType = {
    totalInvested: number | null
  }

  export type ProtocolSumAggregateOutputType = {
    totalInvested: number | null
  }

  export type ProtocolMinAggregateOutputType = {
    id: string | null
    name: string | null
    network: string | null
    officialUrl: string | null
    twitterHandle: string | null
    farmStartDate: Date | null
    dailyMissions: boolean | null
    logoUrl: string | null
    primaryColor: string | null
    totalInvested: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type ProtocolMaxAggregateOutputType = {
    id: string | null
    name: string | null
    network: string | null
    officialUrl: string | null
    twitterHandle: string | null
    farmStartDate: Date | null
    dailyMissions: boolean | null
    logoUrl: string | null
    primaryColor: string | null
    totalInvested: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type ProtocolCountAggregateOutputType = {
    id: number
    name: number
    network: number
    officialUrl: number
    twitterHandle: number
    farmStartDate: number
    dailyMissions: number
    logoUrl: number
    primaryColor: number
    totalInvested: number
    isActive: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type ProtocolAvgAggregateInputType = {
    totalInvested?: true
  }

  export type ProtocolSumAggregateInputType = {
    totalInvested?: true
  }

  export type ProtocolMinAggregateInputType = {
    id?: true
    name?: true
    network?: true
    officialUrl?: true
    twitterHandle?: true
    farmStartDate?: true
    dailyMissions?: true
    logoUrl?: true
    primaryColor?: true
    totalInvested?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type ProtocolMaxAggregateInputType = {
    id?: true
    name?: true
    network?: true
    officialUrl?: true
    twitterHandle?: true
    farmStartDate?: true
    dailyMissions?: true
    logoUrl?: true
    primaryColor?: true
    totalInvested?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type ProtocolCountAggregateInputType = {
    id?: true
    name?: true
    network?: true
    officialUrl?: true
    twitterHandle?: true
    farmStartDate?: true
    dailyMissions?: true
    logoUrl?: true
    primaryColor?: true
    totalInvested?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type ProtocolAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Protocol to aggregate.
     */
    where?: ProtocolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Protocols to fetch.
     */
    orderBy?: ProtocolOrderByWithRelationInput | ProtocolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProtocolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Protocols from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Protocols.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Protocols
    **/
    _count?: true | ProtocolCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProtocolAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProtocolSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProtocolMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProtocolMaxAggregateInputType
  }

  export type GetProtocolAggregateType<T extends ProtocolAggregateArgs> = {
        [P in keyof T & keyof AggregateProtocol]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProtocol[P]>
      : GetScalarType<T[P], AggregateProtocol[P]>
  }




  export type ProtocolGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProtocolWhereInput
    orderBy?: ProtocolOrderByWithAggregationInput | ProtocolOrderByWithAggregationInput[]
    by: ProtocolScalarFieldEnum[] | ProtocolScalarFieldEnum
    having?: ProtocolScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProtocolCountAggregateInputType | true
    _avg?: ProtocolAvgAggregateInputType
    _sum?: ProtocolSumAggregateInputType
    _min?: ProtocolMinAggregateInputType
    _max?: ProtocolMaxAggregateInputType
  }

  export type ProtocolGroupByOutputType = {
    id: string
    name: string
    network: string
    officialUrl: string
    twitterHandle: string | null
    farmStartDate: Date | null
    dailyMissions: boolean
    logoUrl: string | null
    primaryColor: string | null
    totalInvested: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: ProtocolCountAggregateOutputType | null
    _avg: ProtocolAvgAggregateOutputType | null
    _sum: ProtocolSumAggregateOutputType | null
    _min: ProtocolMinAggregateOutputType | null
    _max: ProtocolMaxAggregateOutputType | null
  }

  type GetProtocolGroupByPayload<T extends ProtocolGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProtocolGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProtocolGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProtocolGroupByOutputType[P]>
            : GetScalarType<T[P], ProtocolGroupByOutputType[P]>
        }
      >
    >


  export type ProtocolSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    network?: boolean
    officialUrl?: boolean
    twitterHandle?: boolean
    farmStartDate?: boolean
    dailyMissions?: boolean
    logoUrl?: boolean
    primaryColor?: boolean
    totalInvested?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    investments?: boolean | Protocol$investmentsArgs<ExtArgs>
    tasks?: boolean | Protocol$tasksArgs<ExtArgs>
    _count?: boolean | ProtocolCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["protocol"]>

  export type ProtocolSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    network?: boolean
    officialUrl?: boolean
    twitterHandle?: boolean
    farmStartDate?: boolean
    dailyMissions?: boolean
    logoUrl?: boolean
    primaryColor?: boolean
    totalInvested?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["protocol"]>

  export type ProtocolSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    network?: boolean
    officialUrl?: boolean
    twitterHandle?: boolean
    farmStartDate?: boolean
    dailyMissions?: boolean
    logoUrl?: boolean
    primaryColor?: boolean
    totalInvested?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["protocol"]>

  export type ProtocolSelectScalar = {
    id?: boolean
    name?: boolean
    network?: boolean
    officialUrl?: boolean
    twitterHandle?: boolean
    farmStartDate?: boolean
    dailyMissions?: boolean
    logoUrl?: boolean
    primaryColor?: boolean
    totalInvested?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type ProtocolOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "network" | "officialUrl" | "twitterHandle" | "farmStartDate" | "dailyMissions" | "logoUrl" | "primaryColor" | "totalInvested" | "isActive" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["protocol"]>
  export type ProtocolInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    investments?: boolean | Protocol$investmentsArgs<ExtArgs>
    tasks?: boolean | Protocol$tasksArgs<ExtArgs>
    _count?: boolean | ProtocolCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProtocolIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProtocolIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProtocolPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Protocol"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      investments: Prisma.$InvestmentPayload<ExtArgs>[]
      tasks: Prisma.$TaskPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      network: string
      officialUrl: string
      twitterHandle: string | null
      farmStartDate: Date | null
      dailyMissions: boolean
      logoUrl: string | null
      primaryColor: string | null
      totalInvested: number
      isActive: boolean
      createdAt: Date
      updatedAt: Date
      userId: string
    }, ExtArgs["result"]["protocol"]>
    composites: {}
  }

  type ProtocolGetPayload<S extends boolean | null | undefined | ProtocolDefaultArgs> = $Result.GetResult<Prisma.$ProtocolPayload, S>

  type ProtocolCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProtocolFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProtocolCountAggregateInputType | true
    }

  export interface ProtocolDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Protocol'], meta: { name: 'Protocol' } }
    /**
     * Find zero or one Protocol that matches the filter.
     * @param {ProtocolFindUniqueArgs} args - Arguments to find a Protocol
     * @example
     * // Get one Protocol
     * const protocol = await prisma.protocol.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProtocolFindUniqueArgs>(args: SelectSubset<T, ProtocolFindUniqueArgs<ExtArgs>>): Prisma__ProtocolClient<$Result.GetResult<Prisma.$ProtocolPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Protocol that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProtocolFindUniqueOrThrowArgs} args - Arguments to find a Protocol
     * @example
     * // Get one Protocol
     * const protocol = await prisma.protocol.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProtocolFindUniqueOrThrowArgs>(args: SelectSubset<T, ProtocolFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProtocolClient<$Result.GetResult<Prisma.$ProtocolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Protocol that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProtocolFindFirstArgs} args - Arguments to find a Protocol
     * @example
     * // Get one Protocol
     * const protocol = await prisma.protocol.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProtocolFindFirstArgs>(args?: SelectSubset<T, ProtocolFindFirstArgs<ExtArgs>>): Prisma__ProtocolClient<$Result.GetResult<Prisma.$ProtocolPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Protocol that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProtocolFindFirstOrThrowArgs} args - Arguments to find a Protocol
     * @example
     * // Get one Protocol
     * const protocol = await prisma.protocol.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProtocolFindFirstOrThrowArgs>(args?: SelectSubset<T, ProtocolFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProtocolClient<$Result.GetResult<Prisma.$ProtocolPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Protocols that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProtocolFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Protocols
     * const protocols = await prisma.protocol.findMany()
     * 
     * // Get first 10 Protocols
     * const protocols = await prisma.protocol.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const protocolWithIdOnly = await prisma.protocol.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProtocolFindManyArgs>(args?: SelectSubset<T, ProtocolFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProtocolPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Protocol.
     * @param {ProtocolCreateArgs} args - Arguments to create a Protocol.
     * @example
     * // Create one Protocol
     * const Protocol = await prisma.protocol.create({
     *   data: {
     *     // ... data to create a Protocol
     *   }
     * })
     * 
     */
    create<T extends ProtocolCreateArgs>(args: SelectSubset<T, ProtocolCreateArgs<ExtArgs>>): Prisma__ProtocolClient<$Result.GetResult<Prisma.$ProtocolPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Protocols.
     * @param {ProtocolCreateManyArgs} args - Arguments to create many Protocols.
     * @example
     * // Create many Protocols
     * const protocol = await prisma.protocol.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProtocolCreateManyArgs>(args?: SelectSubset<T, ProtocolCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Protocols and returns the data saved in the database.
     * @param {ProtocolCreateManyAndReturnArgs} args - Arguments to create many Protocols.
     * @example
     * // Create many Protocols
     * const protocol = await prisma.protocol.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Protocols and only return the `id`
     * const protocolWithIdOnly = await prisma.protocol.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProtocolCreateManyAndReturnArgs>(args?: SelectSubset<T, ProtocolCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProtocolPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Protocol.
     * @param {ProtocolDeleteArgs} args - Arguments to delete one Protocol.
     * @example
     * // Delete one Protocol
     * const Protocol = await prisma.protocol.delete({
     *   where: {
     *     // ... filter to delete one Protocol
     *   }
     * })
     * 
     */
    delete<T extends ProtocolDeleteArgs>(args: SelectSubset<T, ProtocolDeleteArgs<ExtArgs>>): Prisma__ProtocolClient<$Result.GetResult<Prisma.$ProtocolPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Protocol.
     * @param {ProtocolUpdateArgs} args - Arguments to update one Protocol.
     * @example
     * // Update one Protocol
     * const protocol = await prisma.protocol.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProtocolUpdateArgs>(args: SelectSubset<T, ProtocolUpdateArgs<ExtArgs>>): Prisma__ProtocolClient<$Result.GetResult<Prisma.$ProtocolPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Protocols.
     * @param {ProtocolDeleteManyArgs} args - Arguments to filter Protocols to delete.
     * @example
     * // Delete a few Protocols
     * const { count } = await prisma.protocol.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProtocolDeleteManyArgs>(args?: SelectSubset<T, ProtocolDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Protocols.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProtocolUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Protocols
     * const protocol = await prisma.protocol.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProtocolUpdateManyArgs>(args: SelectSubset<T, ProtocolUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Protocols and returns the data updated in the database.
     * @param {ProtocolUpdateManyAndReturnArgs} args - Arguments to update many Protocols.
     * @example
     * // Update many Protocols
     * const protocol = await prisma.protocol.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Protocols and only return the `id`
     * const protocolWithIdOnly = await prisma.protocol.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProtocolUpdateManyAndReturnArgs>(args: SelectSubset<T, ProtocolUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProtocolPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Protocol.
     * @param {ProtocolUpsertArgs} args - Arguments to update or create a Protocol.
     * @example
     * // Update or create a Protocol
     * const protocol = await prisma.protocol.upsert({
     *   create: {
     *     // ... data to create a Protocol
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Protocol we want to update
     *   }
     * })
     */
    upsert<T extends ProtocolUpsertArgs>(args: SelectSubset<T, ProtocolUpsertArgs<ExtArgs>>): Prisma__ProtocolClient<$Result.GetResult<Prisma.$ProtocolPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Protocols.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProtocolCountArgs} args - Arguments to filter Protocols to count.
     * @example
     * // Count the number of Protocols
     * const count = await prisma.protocol.count({
     *   where: {
     *     // ... the filter for the Protocols we want to count
     *   }
     * })
    **/
    count<T extends ProtocolCountArgs>(
      args?: Subset<T, ProtocolCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProtocolCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Protocol.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProtocolAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProtocolAggregateArgs>(args: Subset<T, ProtocolAggregateArgs>): Prisma.PrismaPromise<GetProtocolAggregateType<T>>

    /**
     * Group by Protocol.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProtocolGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProtocolGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProtocolGroupByArgs['orderBy'] }
        : { orderBy?: ProtocolGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProtocolGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProtocolGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Protocol model
   */
  readonly fields: ProtocolFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Protocol.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProtocolClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    investments<T extends Protocol$investmentsArgs<ExtArgs> = {}>(args?: Subset<T, Protocol$investmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tasks<T extends Protocol$tasksArgs<ExtArgs> = {}>(args?: Subset<T, Protocol$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Protocol model
   */
  interface ProtocolFieldRefs {
    readonly id: FieldRef<"Protocol", 'String'>
    readonly name: FieldRef<"Protocol", 'String'>
    readonly network: FieldRef<"Protocol", 'String'>
    readonly officialUrl: FieldRef<"Protocol", 'String'>
    readonly twitterHandle: FieldRef<"Protocol", 'String'>
    readonly farmStartDate: FieldRef<"Protocol", 'DateTime'>
    readonly dailyMissions: FieldRef<"Protocol", 'Boolean'>
    readonly logoUrl: FieldRef<"Protocol", 'String'>
    readonly primaryColor: FieldRef<"Protocol", 'String'>
    readonly totalInvested: FieldRef<"Protocol", 'Float'>
    readonly isActive: FieldRef<"Protocol", 'Boolean'>
    readonly createdAt: FieldRef<"Protocol", 'DateTime'>
    readonly updatedAt: FieldRef<"Protocol", 'DateTime'>
    readonly userId: FieldRef<"Protocol", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Protocol findUnique
   */
  export type ProtocolFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Protocol
     */
    omit?: ProtocolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProtocolInclude<ExtArgs> | null
    /**
     * Filter, which Protocol to fetch.
     */
    where: ProtocolWhereUniqueInput
  }

  /**
   * Protocol findUniqueOrThrow
   */
  export type ProtocolFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Protocol
     */
    omit?: ProtocolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProtocolInclude<ExtArgs> | null
    /**
     * Filter, which Protocol to fetch.
     */
    where: ProtocolWhereUniqueInput
  }

  /**
   * Protocol findFirst
   */
  export type ProtocolFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Protocol
     */
    omit?: ProtocolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProtocolInclude<ExtArgs> | null
    /**
     * Filter, which Protocol to fetch.
     */
    where?: ProtocolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Protocols to fetch.
     */
    orderBy?: ProtocolOrderByWithRelationInput | ProtocolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Protocols.
     */
    cursor?: ProtocolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Protocols from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Protocols.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Protocols.
     */
    distinct?: ProtocolScalarFieldEnum | ProtocolScalarFieldEnum[]
  }

  /**
   * Protocol findFirstOrThrow
   */
  export type ProtocolFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Protocol
     */
    omit?: ProtocolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProtocolInclude<ExtArgs> | null
    /**
     * Filter, which Protocol to fetch.
     */
    where?: ProtocolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Protocols to fetch.
     */
    orderBy?: ProtocolOrderByWithRelationInput | ProtocolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Protocols.
     */
    cursor?: ProtocolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Protocols from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Protocols.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Protocols.
     */
    distinct?: ProtocolScalarFieldEnum | ProtocolScalarFieldEnum[]
  }

  /**
   * Protocol findMany
   */
  export type ProtocolFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Protocol
     */
    omit?: ProtocolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProtocolInclude<ExtArgs> | null
    /**
     * Filter, which Protocols to fetch.
     */
    where?: ProtocolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Protocols to fetch.
     */
    orderBy?: ProtocolOrderByWithRelationInput | ProtocolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Protocols.
     */
    cursor?: ProtocolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Protocols from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Protocols.
     */
    skip?: number
    distinct?: ProtocolScalarFieldEnum | ProtocolScalarFieldEnum[]
  }

  /**
   * Protocol create
   */
  export type ProtocolCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Protocol
     */
    omit?: ProtocolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProtocolInclude<ExtArgs> | null
    /**
     * The data needed to create a Protocol.
     */
    data: XOR<ProtocolCreateInput, ProtocolUncheckedCreateInput>
  }

  /**
   * Protocol createMany
   */
  export type ProtocolCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Protocols.
     */
    data: ProtocolCreateManyInput | ProtocolCreateManyInput[]
  }

  /**
   * Protocol createManyAndReturn
   */
  export type ProtocolCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Protocol
     */
    omit?: ProtocolOmit<ExtArgs> | null
    /**
     * The data used to create many Protocols.
     */
    data: ProtocolCreateManyInput | ProtocolCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProtocolIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Protocol update
   */
  export type ProtocolUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Protocol
     */
    omit?: ProtocolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProtocolInclude<ExtArgs> | null
    /**
     * The data needed to update a Protocol.
     */
    data: XOR<ProtocolUpdateInput, ProtocolUncheckedUpdateInput>
    /**
     * Choose, which Protocol to update.
     */
    where: ProtocolWhereUniqueInput
  }

  /**
   * Protocol updateMany
   */
  export type ProtocolUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Protocols.
     */
    data: XOR<ProtocolUpdateManyMutationInput, ProtocolUncheckedUpdateManyInput>
    /**
     * Filter which Protocols to update
     */
    where?: ProtocolWhereInput
    /**
     * Limit how many Protocols to update.
     */
    limit?: number
  }

  /**
   * Protocol updateManyAndReturn
   */
  export type ProtocolUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Protocol
     */
    omit?: ProtocolOmit<ExtArgs> | null
    /**
     * The data used to update Protocols.
     */
    data: XOR<ProtocolUpdateManyMutationInput, ProtocolUncheckedUpdateManyInput>
    /**
     * Filter which Protocols to update
     */
    where?: ProtocolWhereInput
    /**
     * Limit how many Protocols to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProtocolIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Protocol upsert
   */
  export type ProtocolUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Protocol
     */
    omit?: ProtocolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProtocolInclude<ExtArgs> | null
    /**
     * The filter to search for the Protocol to update in case it exists.
     */
    where: ProtocolWhereUniqueInput
    /**
     * In case the Protocol found by the `where` argument doesn't exist, create a new Protocol with this data.
     */
    create: XOR<ProtocolCreateInput, ProtocolUncheckedCreateInput>
    /**
     * In case the Protocol was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProtocolUpdateInput, ProtocolUncheckedUpdateInput>
  }

  /**
   * Protocol delete
   */
  export type ProtocolDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Protocol
     */
    omit?: ProtocolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProtocolInclude<ExtArgs> | null
    /**
     * Filter which Protocol to delete.
     */
    where: ProtocolWhereUniqueInput
  }

  /**
   * Protocol deleteMany
   */
  export type ProtocolDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Protocols to delete
     */
    where?: ProtocolWhereInput
    /**
     * Limit how many Protocols to delete.
     */
    limit?: number
  }

  /**
   * Protocol.investments
   */
  export type Protocol$investmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    where?: InvestmentWhereInput
    orderBy?: InvestmentOrderByWithRelationInput | InvestmentOrderByWithRelationInput[]
    cursor?: InvestmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvestmentScalarFieldEnum | InvestmentScalarFieldEnum[]
  }

  /**
   * Protocol.tasks
   */
  export type Protocol$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Protocol without action
   */
  export type ProtocolDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Protocol
     */
    omit?: ProtocolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProtocolInclude<ExtArgs> | null
  }


  /**
   * Model Investment
   */

  export type AggregateInvestment = {
    _count: InvestmentCountAggregateOutputType | null
    _avg: InvestmentAvgAggregateOutputType | null
    _sum: InvestmentSumAggregateOutputType | null
    _min: InvestmentMinAggregateOutputType | null
    _max: InvestmentMaxAggregateOutputType | null
  }

  export type InvestmentAvgAggregateOutputType = {
    amount: number | null
  }

  export type InvestmentSumAggregateOutputType = {
    amount: number | null
  }

  export type InvestmentMinAggregateOutputType = {
    id: string | null
    amount: number | null
    type: $Enums.InvestmentType | null
    date: Date | null
    description: string | null
    createdAt: Date | null
    protocolId: string | null
  }

  export type InvestmentMaxAggregateOutputType = {
    id: string | null
    amount: number | null
    type: $Enums.InvestmentType | null
    date: Date | null
    description: string | null
    createdAt: Date | null
    protocolId: string | null
  }

  export type InvestmentCountAggregateOutputType = {
    id: number
    amount: number
    type: number
    date: number
    description: number
    createdAt: number
    protocolId: number
    _all: number
  }


  export type InvestmentAvgAggregateInputType = {
    amount?: true
  }

  export type InvestmentSumAggregateInputType = {
    amount?: true
  }

  export type InvestmentMinAggregateInputType = {
    id?: true
    amount?: true
    type?: true
    date?: true
    description?: true
    createdAt?: true
    protocolId?: true
  }

  export type InvestmentMaxAggregateInputType = {
    id?: true
    amount?: true
    type?: true
    date?: true
    description?: true
    createdAt?: true
    protocolId?: true
  }

  export type InvestmentCountAggregateInputType = {
    id?: true
    amount?: true
    type?: true
    date?: true
    description?: true
    createdAt?: true
    protocolId?: true
    _all?: true
  }

  export type InvestmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Investment to aggregate.
     */
    where?: InvestmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Investments to fetch.
     */
    orderBy?: InvestmentOrderByWithRelationInput | InvestmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvestmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Investments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Investments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Investments
    **/
    _count?: true | InvestmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvestmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvestmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvestmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvestmentMaxAggregateInputType
  }

  export type GetInvestmentAggregateType<T extends InvestmentAggregateArgs> = {
        [P in keyof T & keyof AggregateInvestment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvestment[P]>
      : GetScalarType<T[P], AggregateInvestment[P]>
  }




  export type InvestmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvestmentWhereInput
    orderBy?: InvestmentOrderByWithAggregationInput | InvestmentOrderByWithAggregationInput[]
    by: InvestmentScalarFieldEnum[] | InvestmentScalarFieldEnum
    having?: InvestmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvestmentCountAggregateInputType | true
    _avg?: InvestmentAvgAggregateInputType
    _sum?: InvestmentSumAggregateInputType
    _min?: InvestmentMinAggregateInputType
    _max?: InvestmentMaxAggregateInputType
  }

  export type InvestmentGroupByOutputType = {
    id: string
    amount: number
    type: $Enums.InvestmentType
    date: Date
    description: string | null
    createdAt: Date
    protocolId: string
    _count: InvestmentCountAggregateOutputType | null
    _avg: InvestmentAvgAggregateOutputType | null
    _sum: InvestmentSumAggregateOutputType | null
    _min: InvestmentMinAggregateOutputType | null
    _max: InvestmentMaxAggregateOutputType | null
  }

  type GetInvestmentGroupByPayload<T extends InvestmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvestmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvestmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvestmentGroupByOutputType[P]>
            : GetScalarType<T[P], InvestmentGroupByOutputType[P]>
        }
      >
    >


  export type InvestmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    type?: boolean
    date?: boolean
    description?: boolean
    createdAt?: boolean
    protocolId?: boolean
    protocol?: boolean | ProtocolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["investment"]>

  export type InvestmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    type?: boolean
    date?: boolean
    description?: boolean
    createdAt?: boolean
    protocolId?: boolean
    protocol?: boolean | ProtocolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["investment"]>

  export type InvestmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    type?: boolean
    date?: boolean
    description?: boolean
    createdAt?: boolean
    protocolId?: boolean
    protocol?: boolean | ProtocolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["investment"]>

  export type InvestmentSelectScalar = {
    id?: boolean
    amount?: boolean
    type?: boolean
    date?: boolean
    description?: boolean
    createdAt?: boolean
    protocolId?: boolean
  }

  export type InvestmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "amount" | "type" | "date" | "description" | "createdAt" | "protocolId", ExtArgs["result"]["investment"]>
  export type InvestmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    protocol?: boolean | ProtocolDefaultArgs<ExtArgs>
  }
  export type InvestmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    protocol?: boolean | ProtocolDefaultArgs<ExtArgs>
  }
  export type InvestmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    protocol?: boolean | ProtocolDefaultArgs<ExtArgs>
  }

  export type $InvestmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Investment"
    objects: {
      protocol: Prisma.$ProtocolPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      amount: number
      type: $Enums.InvestmentType
      date: Date
      description: string | null
      createdAt: Date
      protocolId: string
    }, ExtArgs["result"]["investment"]>
    composites: {}
  }

  type InvestmentGetPayload<S extends boolean | null | undefined | InvestmentDefaultArgs> = $Result.GetResult<Prisma.$InvestmentPayload, S>

  type InvestmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvestmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvestmentCountAggregateInputType | true
    }

  export interface InvestmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Investment'], meta: { name: 'Investment' } }
    /**
     * Find zero or one Investment that matches the filter.
     * @param {InvestmentFindUniqueArgs} args - Arguments to find a Investment
     * @example
     * // Get one Investment
     * const investment = await prisma.investment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvestmentFindUniqueArgs>(args: SelectSubset<T, InvestmentFindUniqueArgs<ExtArgs>>): Prisma__InvestmentClient<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Investment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvestmentFindUniqueOrThrowArgs} args - Arguments to find a Investment
     * @example
     * // Get one Investment
     * const investment = await prisma.investment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvestmentFindUniqueOrThrowArgs>(args: SelectSubset<T, InvestmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvestmentClient<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Investment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestmentFindFirstArgs} args - Arguments to find a Investment
     * @example
     * // Get one Investment
     * const investment = await prisma.investment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvestmentFindFirstArgs>(args?: SelectSubset<T, InvestmentFindFirstArgs<ExtArgs>>): Prisma__InvestmentClient<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Investment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestmentFindFirstOrThrowArgs} args - Arguments to find a Investment
     * @example
     * // Get one Investment
     * const investment = await prisma.investment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvestmentFindFirstOrThrowArgs>(args?: SelectSubset<T, InvestmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvestmentClient<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Investments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Investments
     * const investments = await prisma.investment.findMany()
     * 
     * // Get first 10 Investments
     * const investments = await prisma.investment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const investmentWithIdOnly = await prisma.investment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvestmentFindManyArgs>(args?: SelectSubset<T, InvestmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Investment.
     * @param {InvestmentCreateArgs} args - Arguments to create a Investment.
     * @example
     * // Create one Investment
     * const Investment = await prisma.investment.create({
     *   data: {
     *     // ... data to create a Investment
     *   }
     * })
     * 
     */
    create<T extends InvestmentCreateArgs>(args: SelectSubset<T, InvestmentCreateArgs<ExtArgs>>): Prisma__InvestmentClient<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Investments.
     * @param {InvestmentCreateManyArgs} args - Arguments to create many Investments.
     * @example
     * // Create many Investments
     * const investment = await prisma.investment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvestmentCreateManyArgs>(args?: SelectSubset<T, InvestmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Investments and returns the data saved in the database.
     * @param {InvestmentCreateManyAndReturnArgs} args - Arguments to create many Investments.
     * @example
     * // Create many Investments
     * const investment = await prisma.investment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Investments and only return the `id`
     * const investmentWithIdOnly = await prisma.investment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvestmentCreateManyAndReturnArgs>(args?: SelectSubset<T, InvestmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Investment.
     * @param {InvestmentDeleteArgs} args - Arguments to delete one Investment.
     * @example
     * // Delete one Investment
     * const Investment = await prisma.investment.delete({
     *   where: {
     *     // ... filter to delete one Investment
     *   }
     * })
     * 
     */
    delete<T extends InvestmentDeleteArgs>(args: SelectSubset<T, InvestmentDeleteArgs<ExtArgs>>): Prisma__InvestmentClient<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Investment.
     * @param {InvestmentUpdateArgs} args - Arguments to update one Investment.
     * @example
     * // Update one Investment
     * const investment = await prisma.investment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvestmentUpdateArgs>(args: SelectSubset<T, InvestmentUpdateArgs<ExtArgs>>): Prisma__InvestmentClient<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Investments.
     * @param {InvestmentDeleteManyArgs} args - Arguments to filter Investments to delete.
     * @example
     * // Delete a few Investments
     * const { count } = await prisma.investment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvestmentDeleteManyArgs>(args?: SelectSubset<T, InvestmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Investments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Investments
     * const investment = await prisma.investment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvestmentUpdateManyArgs>(args: SelectSubset<T, InvestmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Investments and returns the data updated in the database.
     * @param {InvestmentUpdateManyAndReturnArgs} args - Arguments to update many Investments.
     * @example
     * // Update many Investments
     * const investment = await prisma.investment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Investments and only return the `id`
     * const investmentWithIdOnly = await prisma.investment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InvestmentUpdateManyAndReturnArgs>(args: SelectSubset<T, InvestmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Investment.
     * @param {InvestmentUpsertArgs} args - Arguments to update or create a Investment.
     * @example
     * // Update or create a Investment
     * const investment = await prisma.investment.upsert({
     *   create: {
     *     // ... data to create a Investment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Investment we want to update
     *   }
     * })
     */
    upsert<T extends InvestmentUpsertArgs>(args: SelectSubset<T, InvestmentUpsertArgs<ExtArgs>>): Prisma__InvestmentClient<$Result.GetResult<Prisma.$InvestmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Investments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestmentCountArgs} args - Arguments to filter Investments to count.
     * @example
     * // Count the number of Investments
     * const count = await prisma.investment.count({
     *   where: {
     *     // ... the filter for the Investments we want to count
     *   }
     * })
    **/
    count<T extends InvestmentCountArgs>(
      args?: Subset<T, InvestmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvestmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Investment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvestmentAggregateArgs>(args: Subset<T, InvestmentAggregateArgs>): Prisma.PrismaPromise<GetInvestmentAggregateType<T>>

    /**
     * Group by Investment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvestmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvestmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvestmentGroupByArgs['orderBy'] }
        : { orderBy?: InvestmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvestmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvestmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Investment model
   */
  readonly fields: InvestmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Investment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvestmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    protocol<T extends ProtocolDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProtocolDefaultArgs<ExtArgs>>): Prisma__ProtocolClient<$Result.GetResult<Prisma.$ProtocolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Investment model
   */
  interface InvestmentFieldRefs {
    readonly id: FieldRef<"Investment", 'String'>
    readonly amount: FieldRef<"Investment", 'Float'>
    readonly type: FieldRef<"Investment", 'InvestmentType'>
    readonly date: FieldRef<"Investment", 'DateTime'>
    readonly description: FieldRef<"Investment", 'String'>
    readonly createdAt: FieldRef<"Investment", 'DateTime'>
    readonly protocolId: FieldRef<"Investment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Investment findUnique
   */
  export type InvestmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    /**
     * Filter, which Investment to fetch.
     */
    where: InvestmentWhereUniqueInput
  }

  /**
   * Investment findUniqueOrThrow
   */
  export type InvestmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    /**
     * Filter, which Investment to fetch.
     */
    where: InvestmentWhereUniqueInput
  }

  /**
   * Investment findFirst
   */
  export type InvestmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    /**
     * Filter, which Investment to fetch.
     */
    where?: InvestmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Investments to fetch.
     */
    orderBy?: InvestmentOrderByWithRelationInput | InvestmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Investments.
     */
    cursor?: InvestmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Investments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Investments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Investments.
     */
    distinct?: InvestmentScalarFieldEnum | InvestmentScalarFieldEnum[]
  }

  /**
   * Investment findFirstOrThrow
   */
  export type InvestmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    /**
     * Filter, which Investment to fetch.
     */
    where?: InvestmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Investments to fetch.
     */
    orderBy?: InvestmentOrderByWithRelationInput | InvestmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Investments.
     */
    cursor?: InvestmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Investments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Investments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Investments.
     */
    distinct?: InvestmentScalarFieldEnum | InvestmentScalarFieldEnum[]
  }

  /**
   * Investment findMany
   */
  export type InvestmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    /**
     * Filter, which Investments to fetch.
     */
    where?: InvestmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Investments to fetch.
     */
    orderBy?: InvestmentOrderByWithRelationInput | InvestmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Investments.
     */
    cursor?: InvestmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Investments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Investments.
     */
    skip?: number
    distinct?: InvestmentScalarFieldEnum | InvestmentScalarFieldEnum[]
  }

  /**
   * Investment create
   */
  export type InvestmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Investment.
     */
    data: XOR<InvestmentCreateInput, InvestmentUncheckedCreateInput>
  }

  /**
   * Investment createMany
   */
  export type InvestmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Investments.
     */
    data: InvestmentCreateManyInput | InvestmentCreateManyInput[]
  }

  /**
   * Investment createManyAndReturn
   */
  export type InvestmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * The data used to create many Investments.
     */
    data: InvestmentCreateManyInput | InvestmentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Investment update
   */
  export type InvestmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Investment.
     */
    data: XOR<InvestmentUpdateInput, InvestmentUncheckedUpdateInput>
    /**
     * Choose, which Investment to update.
     */
    where: InvestmentWhereUniqueInput
  }

  /**
   * Investment updateMany
   */
  export type InvestmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Investments.
     */
    data: XOR<InvestmentUpdateManyMutationInput, InvestmentUncheckedUpdateManyInput>
    /**
     * Filter which Investments to update
     */
    where?: InvestmentWhereInput
    /**
     * Limit how many Investments to update.
     */
    limit?: number
  }

  /**
   * Investment updateManyAndReturn
   */
  export type InvestmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * The data used to update Investments.
     */
    data: XOR<InvestmentUpdateManyMutationInput, InvestmentUncheckedUpdateManyInput>
    /**
     * Filter which Investments to update
     */
    where?: InvestmentWhereInput
    /**
     * Limit how many Investments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Investment upsert
   */
  export type InvestmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Investment to update in case it exists.
     */
    where: InvestmentWhereUniqueInput
    /**
     * In case the Investment found by the `where` argument doesn't exist, create a new Investment with this data.
     */
    create: XOR<InvestmentCreateInput, InvestmentUncheckedCreateInput>
    /**
     * In case the Investment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvestmentUpdateInput, InvestmentUncheckedUpdateInput>
  }

  /**
   * Investment delete
   */
  export type InvestmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
    /**
     * Filter which Investment to delete.
     */
    where: InvestmentWhereUniqueInput
  }

  /**
   * Investment deleteMany
   */
  export type InvestmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Investments to delete
     */
    where?: InvestmentWhereInput
    /**
     * Limit how many Investments to delete.
     */
    limit?: number
  }

  /**
   * Investment without action
   */
  export type InvestmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Investment
     */
    select?: InvestmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Investment
     */
    omit?: InvestmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvestmentInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    isCompleted: boolean | null
    isDaily: boolean | null
    dueDate: Date | null
    completedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    protocolId: string | null
  }

  export type TaskMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    isCompleted: boolean | null
    isDaily: boolean | null
    dueDate: Date | null
    completedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    protocolId: string | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    title: number
    description: number
    isCompleted: number
    isDaily: number
    dueDate: number
    completedAt: number
    createdAt: number
    updatedAt: number
    userId: number
    protocolId: number
    _all: number
  }


  export type TaskMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    isCompleted?: true
    isDaily?: true
    dueDate?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    protocolId?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    isCompleted?: true
    isDaily?: true
    dueDate?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    protocolId?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    isCompleted?: true
    isDaily?: true
    dueDate?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    protocolId?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: string
    title: string
    description: string | null
    isCompleted: boolean
    isDaily: boolean
    dueDate: Date | null
    completedAt: Date | null
    createdAt: Date
    updatedAt: Date
    userId: string
    protocolId: string | null
    _count: TaskCountAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    isCompleted?: boolean
    isDaily?: boolean
    dueDate?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    protocolId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    protocol?: boolean | Task$protocolArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    isCompleted?: boolean
    isDaily?: boolean
    dueDate?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    protocolId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    protocol?: boolean | Task$protocolArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    isCompleted?: boolean
    isDaily?: boolean
    dueDate?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    protocolId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    protocol?: boolean | Task$protocolArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    isCompleted?: boolean
    isDaily?: boolean
    dueDate?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    protocolId?: boolean
  }

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "isCompleted" | "isDaily" | "dueDate" | "completedAt" | "createdAt" | "updatedAt" | "userId" | "protocolId", ExtArgs["result"]["task"]>
  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    protocol?: boolean | Task$protocolArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    protocol?: boolean | Task$protocolArgs<ExtArgs>
  }
  export type TaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    protocol?: boolean | Task$protocolArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      protocol: Prisma.$ProtocolPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      isCompleted: boolean
      isDaily: boolean
      dueDate: Date | null
      completedAt: Date | null
      createdAt: Date
      updatedAt: Date
      userId: string
      protocolId: string | null
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {TaskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    protocol<T extends Task$protocolArgs<ExtArgs> = {}>(args?: Subset<T, Task$protocolArgs<ExtArgs>>): Prisma__ProtocolClient<$Result.GetResult<Prisma.$ProtocolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'String'>
    readonly title: FieldRef<"Task", 'String'>
    readonly description: FieldRef<"Task", 'String'>
    readonly isCompleted: FieldRef<"Task", 'Boolean'>
    readonly isDaily: FieldRef<"Task", 'Boolean'>
    readonly dueDate: FieldRef<"Task", 'DateTime'>
    readonly completedAt: FieldRef<"Task", 'DateTime'>
    readonly createdAt: FieldRef<"Task", 'DateTime'>
    readonly updatedAt: FieldRef<"Task", 'DateTime'>
    readonly userId: FieldRef<"Task", 'String'>
    readonly protocolId: FieldRef<"Task", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task updateManyAndReturn
   */
  export type TaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task.protocol
   */
  export type Task$protocolArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Protocol
     */
    select?: ProtocolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Protocol
     */
    omit?: ProtocolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProtocolInclude<ExtArgs> | null
    where?: ProtocolWhereInput
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    amount: number | null
    originalAmount: number | null
    discountAmount: number | null
  }

  export type PaymentSumAggregateOutputType = {
    amount: number | null
    originalAmount: number | null
    discountAmount: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    plan: $Enums.PaymentPlan | null
    amount: number | null
    originalAmount: number | null
    discountAmount: number | null
    affiliateCodeUsed: string | null
    transactionHash: string | null
    status: $Enums.PaymentStatus | null
    verifiedAt: Date | null
    validUntil: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    plan: $Enums.PaymentPlan | null
    amount: number | null
    originalAmount: number | null
    discountAmount: number | null
    affiliateCodeUsed: string | null
    transactionHash: string | null
    status: $Enums.PaymentStatus | null
    verifiedAt: Date | null
    validUntil: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    plan: number
    amount: number
    originalAmount: number
    discountAmount: number
    affiliateCodeUsed: number
    transactionHash: number
    status: number
    verifiedAt: number
    validUntil: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    amount?: true
    originalAmount?: true
    discountAmount?: true
  }

  export type PaymentSumAggregateInputType = {
    amount?: true
    originalAmount?: true
    discountAmount?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    plan?: true
    amount?: true
    originalAmount?: true
    discountAmount?: true
    affiliateCodeUsed?: true
    transactionHash?: true
    status?: true
    verifiedAt?: true
    validUntil?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    plan?: true
    amount?: true
    originalAmount?: true
    discountAmount?: true
    affiliateCodeUsed?: true
    transactionHash?: true
    status?: true
    verifiedAt?: true
    validUntil?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    plan?: true
    amount?: true
    originalAmount?: true
    discountAmount?: true
    affiliateCodeUsed?: true
    transactionHash?: true
    status?: true
    verifiedAt?: true
    validUntil?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: string
    plan: $Enums.PaymentPlan
    amount: number
    originalAmount: number | null
    discountAmount: number | null
    affiliateCodeUsed: string | null
    transactionHash: string | null
    status: $Enums.PaymentStatus
    verifiedAt: Date | null
    validUntil: Date
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    plan?: boolean
    amount?: boolean
    originalAmount?: boolean
    discountAmount?: boolean
    affiliateCodeUsed?: boolean
    transactionHash?: boolean
    status?: boolean
    verifiedAt?: boolean
    validUntil?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    affiliateUsage?: boolean | Payment$affiliateUsageArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    plan?: boolean
    amount?: boolean
    originalAmount?: boolean
    discountAmount?: boolean
    affiliateCodeUsed?: boolean
    transactionHash?: boolean
    status?: boolean
    verifiedAt?: boolean
    validUntil?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    plan?: boolean
    amount?: boolean
    originalAmount?: boolean
    discountAmount?: boolean
    affiliateCodeUsed?: boolean
    transactionHash?: boolean
    status?: boolean
    verifiedAt?: boolean
    validUntil?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    plan?: boolean
    amount?: boolean
    originalAmount?: boolean
    discountAmount?: boolean
    affiliateCodeUsed?: boolean
    transactionHash?: boolean
    status?: boolean
    verifiedAt?: boolean
    validUntil?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "plan" | "amount" | "originalAmount" | "discountAmount" | "affiliateCodeUsed" | "transactionHash" | "status" | "verifiedAt" | "validUntil" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    affiliateUsage?: boolean | Payment$affiliateUsageArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      affiliateUsage: Prisma.$AffiliateUsagePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      plan: $Enums.PaymentPlan
      amount: number
      originalAmount: number | null
      discountAmount: number | null
      affiliateCodeUsed: string | null
      transactionHash: string | null
      status: $Enums.PaymentStatus
      verifiedAt: Date | null
      validUntil: Date
      createdAt: Date
      updatedAt: Date
      userId: string
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    affiliateUsage<T extends Payment$affiliateUsageArgs<ExtArgs> = {}>(args?: Subset<T, Payment$affiliateUsageArgs<ExtArgs>>): Prisma__AffiliateUsageClient<$Result.GetResult<Prisma.$AffiliateUsagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'String'>
    readonly plan: FieldRef<"Payment", 'PaymentPlan'>
    readonly amount: FieldRef<"Payment", 'Float'>
    readonly originalAmount: FieldRef<"Payment", 'Float'>
    readonly discountAmount: FieldRef<"Payment", 'Float'>
    readonly affiliateCodeUsed: FieldRef<"Payment", 'String'>
    readonly transactionHash: FieldRef<"Payment", 'String'>
    readonly status: FieldRef<"Payment", 'PaymentStatus'>
    readonly verifiedAt: FieldRef<"Payment", 'DateTime'>
    readonly validUntil: FieldRef<"Payment", 'DateTime'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly updatedAt: FieldRef<"Payment", 'DateTime'>
    readonly userId: FieldRef<"Payment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment.affiliateUsage
   */
  export type Payment$affiliateUsageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateUsage
     */
    select?: AffiliateUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateUsage
     */
    omit?: AffiliateUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateUsageInclude<ExtArgs> | null
    where?: AffiliateUsageWhereInput
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model TwitterCache
   */

  export type AggregateTwitterCache = {
    _count: TwitterCacheCountAggregateOutputType | null
    _min: TwitterCacheMinAggregateOutputType | null
    _max: TwitterCacheMaxAggregateOutputType | null
  }

  export type TwitterCacheMinAggregateOutputType = {
    id: string | null
    handle: string | null
    tweets: string | null
    lastUpdated: Date | null
  }

  export type TwitterCacheMaxAggregateOutputType = {
    id: string | null
    handle: string | null
    tweets: string | null
    lastUpdated: Date | null
  }

  export type TwitterCacheCountAggregateOutputType = {
    id: number
    handle: number
    tweets: number
    lastUpdated: number
    _all: number
  }


  export type TwitterCacheMinAggregateInputType = {
    id?: true
    handle?: true
    tweets?: true
    lastUpdated?: true
  }

  export type TwitterCacheMaxAggregateInputType = {
    id?: true
    handle?: true
    tweets?: true
    lastUpdated?: true
  }

  export type TwitterCacheCountAggregateInputType = {
    id?: true
    handle?: true
    tweets?: true
    lastUpdated?: true
    _all?: true
  }

  export type TwitterCacheAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TwitterCache to aggregate.
     */
    where?: TwitterCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TwitterCaches to fetch.
     */
    orderBy?: TwitterCacheOrderByWithRelationInput | TwitterCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TwitterCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TwitterCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TwitterCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TwitterCaches
    **/
    _count?: true | TwitterCacheCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TwitterCacheMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TwitterCacheMaxAggregateInputType
  }

  export type GetTwitterCacheAggregateType<T extends TwitterCacheAggregateArgs> = {
        [P in keyof T & keyof AggregateTwitterCache]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTwitterCache[P]>
      : GetScalarType<T[P], AggregateTwitterCache[P]>
  }




  export type TwitterCacheGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TwitterCacheWhereInput
    orderBy?: TwitterCacheOrderByWithAggregationInput | TwitterCacheOrderByWithAggregationInput[]
    by: TwitterCacheScalarFieldEnum[] | TwitterCacheScalarFieldEnum
    having?: TwitterCacheScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TwitterCacheCountAggregateInputType | true
    _min?: TwitterCacheMinAggregateInputType
    _max?: TwitterCacheMaxAggregateInputType
  }

  export type TwitterCacheGroupByOutputType = {
    id: string
    handle: string
    tweets: string
    lastUpdated: Date
    _count: TwitterCacheCountAggregateOutputType | null
    _min: TwitterCacheMinAggregateOutputType | null
    _max: TwitterCacheMaxAggregateOutputType | null
  }

  type GetTwitterCacheGroupByPayload<T extends TwitterCacheGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TwitterCacheGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TwitterCacheGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TwitterCacheGroupByOutputType[P]>
            : GetScalarType<T[P], TwitterCacheGroupByOutputType[P]>
        }
      >
    >


  export type TwitterCacheSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    handle?: boolean
    tweets?: boolean
    lastUpdated?: boolean
  }, ExtArgs["result"]["twitterCache"]>

  export type TwitterCacheSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    handle?: boolean
    tweets?: boolean
    lastUpdated?: boolean
  }, ExtArgs["result"]["twitterCache"]>

  export type TwitterCacheSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    handle?: boolean
    tweets?: boolean
    lastUpdated?: boolean
  }, ExtArgs["result"]["twitterCache"]>

  export type TwitterCacheSelectScalar = {
    id?: boolean
    handle?: boolean
    tweets?: boolean
    lastUpdated?: boolean
  }

  export type TwitterCacheOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "handle" | "tweets" | "lastUpdated", ExtArgs["result"]["twitterCache"]>

  export type $TwitterCachePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TwitterCache"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      handle: string
      tweets: string
      lastUpdated: Date
    }, ExtArgs["result"]["twitterCache"]>
    composites: {}
  }

  type TwitterCacheGetPayload<S extends boolean | null | undefined | TwitterCacheDefaultArgs> = $Result.GetResult<Prisma.$TwitterCachePayload, S>

  type TwitterCacheCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TwitterCacheFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TwitterCacheCountAggregateInputType | true
    }

  export interface TwitterCacheDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TwitterCache'], meta: { name: 'TwitterCache' } }
    /**
     * Find zero or one TwitterCache that matches the filter.
     * @param {TwitterCacheFindUniqueArgs} args - Arguments to find a TwitterCache
     * @example
     * // Get one TwitterCache
     * const twitterCache = await prisma.twitterCache.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TwitterCacheFindUniqueArgs>(args: SelectSubset<T, TwitterCacheFindUniqueArgs<ExtArgs>>): Prisma__TwitterCacheClient<$Result.GetResult<Prisma.$TwitterCachePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TwitterCache that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TwitterCacheFindUniqueOrThrowArgs} args - Arguments to find a TwitterCache
     * @example
     * // Get one TwitterCache
     * const twitterCache = await prisma.twitterCache.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TwitterCacheFindUniqueOrThrowArgs>(args: SelectSubset<T, TwitterCacheFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TwitterCacheClient<$Result.GetResult<Prisma.$TwitterCachePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TwitterCache that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwitterCacheFindFirstArgs} args - Arguments to find a TwitterCache
     * @example
     * // Get one TwitterCache
     * const twitterCache = await prisma.twitterCache.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TwitterCacheFindFirstArgs>(args?: SelectSubset<T, TwitterCacheFindFirstArgs<ExtArgs>>): Prisma__TwitterCacheClient<$Result.GetResult<Prisma.$TwitterCachePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TwitterCache that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwitterCacheFindFirstOrThrowArgs} args - Arguments to find a TwitterCache
     * @example
     * // Get one TwitterCache
     * const twitterCache = await prisma.twitterCache.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TwitterCacheFindFirstOrThrowArgs>(args?: SelectSubset<T, TwitterCacheFindFirstOrThrowArgs<ExtArgs>>): Prisma__TwitterCacheClient<$Result.GetResult<Prisma.$TwitterCachePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TwitterCaches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwitterCacheFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TwitterCaches
     * const twitterCaches = await prisma.twitterCache.findMany()
     * 
     * // Get first 10 TwitterCaches
     * const twitterCaches = await prisma.twitterCache.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const twitterCacheWithIdOnly = await prisma.twitterCache.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TwitterCacheFindManyArgs>(args?: SelectSubset<T, TwitterCacheFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TwitterCachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TwitterCache.
     * @param {TwitterCacheCreateArgs} args - Arguments to create a TwitterCache.
     * @example
     * // Create one TwitterCache
     * const TwitterCache = await prisma.twitterCache.create({
     *   data: {
     *     // ... data to create a TwitterCache
     *   }
     * })
     * 
     */
    create<T extends TwitterCacheCreateArgs>(args: SelectSubset<T, TwitterCacheCreateArgs<ExtArgs>>): Prisma__TwitterCacheClient<$Result.GetResult<Prisma.$TwitterCachePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TwitterCaches.
     * @param {TwitterCacheCreateManyArgs} args - Arguments to create many TwitterCaches.
     * @example
     * // Create many TwitterCaches
     * const twitterCache = await prisma.twitterCache.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TwitterCacheCreateManyArgs>(args?: SelectSubset<T, TwitterCacheCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TwitterCaches and returns the data saved in the database.
     * @param {TwitterCacheCreateManyAndReturnArgs} args - Arguments to create many TwitterCaches.
     * @example
     * // Create many TwitterCaches
     * const twitterCache = await prisma.twitterCache.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TwitterCaches and only return the `id`
     * const twitterCacheWithIdOnly = await prisma.twitterCache.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TwitterCacheCreateManyAndReturnArgs>(args?: SelectSubset<T, TwitterCacheCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TwitterCachePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TwitterCache.
     * @param {TwitterCacheDeleteArgs} args - Arguments to delete one TwitterCache.
     * @example
     * // Delete one TwitterCache
     * const TwitterCache = await prisma.twitterCache.delete({
     *   where: {
     *     // ... filter to delete one TwitterCache
     *   }
     * })
     * 
     */
    delete<T extends TwitterCacheDeleteArgs>(args: SelectSubset<T, TwitterCacheDeleteArgs<ExtArgs>>): Prisma__TwitterCacheClient<$Result.GetResult<Prisma.$TwitterCachePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TwitterCache.
     * @param {TwitterCacheUpdateArgs} args - Arguments to update one TwitterCache.
     * @example
     * // Update one TwitterCache
     * const twitterCache = await prisma.twitterCache.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TwitterCacheUpdateArgs>(args: SelectSubset<T, TwitterCacheUpdateArgs<ExtArgs>>): Prisma__TwitterCacheClient<$Result.GetResult<Prisma.$TwitterCachePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TwitterCaches.
     * @param {TwitterCacheDeleteManyArgs} args - Arguments to filter TwitterCaches to delete.
     * @example
     * // Delete a few TwitterCaches
     * const { count } = await prisma.twitterCache.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TwitterCacheDeleteManyArgs>(args?: SelectSubset<T, TwitterCacheDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TwitterCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwitterCacheUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TwitterCaches
     * const twitterCache = await prisma.twitterCache.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TwitterCacheUpdateManyArgs>(args: SelectSubset<T, TwitterCacheUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TwitterCaches and returns the data updated in the database.
     * @param {TwitterCacheUpdateManyAndReturnArgs} args - Arguments to update many TwitterCaches.
     * @example
     * // Update many TwitterCaches
     * const twitterCache = await prisma.twitterCache.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TwitterCaches and only return the `id`
     * const twitterCacheWithIdOnly = await prisma.twitterCache.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TwitterCacheUpdateManyAndReturnArgs>(args: SelectSubset<T, TwitterCacheUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TwitterCachePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TwitterCache.
     * @param {TwitterCacheUpsertArgs} args - Arguments to update or create a TwitterCache.
     * @example
     * // Update or create a TwitterCache
     * const twitterCache = await prisma.twitterCache.upsert({
     *   create: {
     *     // ... data to create a TwitterCache
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TwitterCache we want to update
     *   }
     * })
     */
    upsert<T extends TwitterCacheUpsertArgs>(args: SelectSubset<T, TwitterCacheUpsertArgs<ExtArgs>>): Prisma__TwitterCacheClient<$Result.GetResult<Prisma.$TwitterCachePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TwitterCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwitterCacheCountArgs} args - Arguments to filter TwitterCaches to count.
     * @example
     * // Count the number of TwitterCaches
     * const count = await prisma.twitterCache.count({
     *   where: {
     *     // ... the filter for the TwitterCaches we want to count
     *   }
     * })
    **/
    count<T extends TwitterCacheCountArgs>(
      args?: Subset<T, TwitterCacheCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TwitterCacheCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TwitterCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwitterCacheAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TwitterCacheAggregateArgs>(args: Subset<T, TwitterCacheAggregateArgs>): Prisma.PrismaPromise<GetTwitterCacheAggregateType<T>>

    /**
     * Group by TwitterCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwitterCacheGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TwitterCacheGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TwitterCacheGroupByArgs['orderBy'] }
        : { orderBy?: TwitterCacheGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TwitterCacheGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTwitterCacheGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TwitterCache model
   */
  readonly fields: TwitterCacheFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TwitterCache.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TwitterCacheClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TwitterCache model
   */
  interface TwitterCacheFieldRefs {
    readonly id: FieldRef<"TwitterCache", 'String'>
    readonly handle: FieldRef<"TwitterCache", 'String'>
    readonly tweets: FieldRef<"TwitterCache", 'String'>
    readonly lastUpdated: FieldRef<"TwitterCache", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TwitterCache findUnique
   */
  export type TwitterCacheFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwitterCache
     */
    select?: TwitterCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwitterCache
     */
    omit?: TwitterCacheOmit<ExtArgs> | null
    /**
     * Filter, which TwitterCache to fetch.
     */
    where: TwitterCacheWhereUniqueInput
  }

  /**
   * TwitterCache findUniqueOrThrow
   */
  export type TwitterCacheFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwitterCache
     */
    select?: TwitterCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwitterCache
     */
    omit?: TwitterCacheOmit<ExtArgs> | null
    /**
     * Filter, which TwitterCache to fetch.
     */
    where: TwitterCacheWhereUniqueInput
  }

  /**
   * TwitterCache findFirst
   */
  export type TwitterCacheFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwitterCache
     */
    select?: TwitterCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwitterCache
     */
    omit?: TwitterCacheOmit<ExtArgs> | null
    /**
     * Filter, which TwitterCache to fetch.
     */
    where?: TwitterCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TwitterCaches to fetch.
     */
    orderBy?: TwitterCacheOrderByWithRelationInput | TwitterCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TwitterCaches.
     */
    cursor?: TwitterCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TwitterCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TwitterCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TwitterCaches.
     */
    distinct?: TwitterCacheScalarFieldEnum | TwitterCacheScalarFieldEnum[]
  }

  /**
   * TwitterCache findFirstOrThrow
   */
  export type TwitterCacheFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwitterCache
     */
    select?: TwitterCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwitterCache
     */
    omit?: TwitterCacheOmit<ExtArgs> | null
    /**
     * Filter, which TwitterCache to fetch.
     */
    where?: TwitterCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TwitterCaches to fetch.
     */
    orderBy?: TwitterCacheOrderByWithRelationInput | TwitterCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TwitterCaches.
     */
    cursor?: TwitterCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TwitterCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TwitterCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TwitterCaches.
     */
    distinct?: TwitterCacheScalarFieldEnum | TwitterCacheScalarFieldEnum[]
  }

  /**
   * TwitterCache findMany
   */
  export type TwitterCacheFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwitterCache
     */
    select?: TwitterCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwitterCache
     */
    omit?: TwitterCacheOmit<ExtArgs> | null
    /**
     * Filter, which TwitterCaches to fetch.
     */
    where?: TwitterCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TwitterCaches to fetch.
     */
    orderBy?: TwitterCacheOrderByWithRelationInput | TwitterCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TwitterCaches.
     */
    cursor?: TwitterCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TwitterCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TwitterCaches.
     */
    skip?: number
    distinct?: TwitterCacheScalarFieldEnum | TwitterCacheScalarFieldEnum[]
  }

  /**
   * TwitterCache create
   */
  export type TwitterCacheCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwitterCache
     */
    select?: TwitterCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwitterCache
     */
    omit?: TwitterCacheOmit<ExtArgs> | null
    /**
     * The data needed to create a TwitterCache.
     */
    data: XOR<TwitterCacheCreateInput, TwitterCacheUncheckedCreateInput>
  }

  /**
   * TwitterCache createMany
   */
  export type TwitterCacheCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TwitterCaches.
     */
    data: TwitterCacheCreateManyInput | TwitterCacheCreateManyInput[]
  }

  /**
   * TwitterCache createManyAndReturn
   */
  export type TwitterCacheCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwitterCache
     */
    select?: TwitterCacheSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TwitterCache
     */
    omit?: TwitterCacheOmit<ExtArgs> | null
    /**
     * The data used to create many TwitterCaches.
     */
    data: TwitterCacheCreateManyInput | TwitterCacheCreateManyInput[]
  }

  /**
   * TwitterCache update
   */
  export type TwitterCacheUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwitterCache
     */
    select?: TwitterCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwitterCache
     */
    omit?: TwitterCacheOmit<ExtArgs> | null
    /**
     * The data needed to update a TwitterCache.
     */
    data: XOR<TwitterCacheUpdateInput, TwitterCacheUncheckedUpdateInput>
    /**
     * Choose, which TwitterCache to update.
     */
    where: TwitterCacheWhereUniqueInput
  }

  /**
   * TwitterCache updateMany
   */
  export type TwitterCacheUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TwitterCaches.
     */
    data: XOR<TwitterCacheUpdateManyMutationInput, TwitterCacheUncheckedUpdateManyInput>
    /**
     * Filter which TwitterCaches to update
     */
    where?: TwitterCacheWhereInput
    /**
     * Limit how many TwitterCaches to update.
     */
    limit?: number
  }

  /**
   * TwitterCache updateManyAndReturn
   */
  export type TwitterCacheUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwitterCache
     */
    select?: TwitterCacheSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TwitterCache
     */
    omit?: TwitterCacheOmit<ExtArgs> | null
    /**
     * The data used to update TwitterCaches.
     */
    data: XOR<TwitterCacheUpdateManyMutationInput, TwitterCacheUncheckedUpdateManyInput>
    /**
     * Filter which TwitterCaches to update
     */
    where?: TwitterCacheWhereInput
    /**
     * Limit how many TwitterCaches to update.
     */
    limit?: number
  }

  /**
   * TwitterCache upsert
   */
  export type TwitterCacheUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwitterCache
     */
    select?: TwitterCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwitterCache
     */
    omit?: TwitterCacheOmit<ExtArgs> | null
    /**
     * The filter to search for the TwitterCache to update in case it exists.
     */
    where: TwitterCacheWhereUniqueInput
    /**
     * In case the TwitterCache found by the `where` argument doesn't exist, create a new TwitterCache with this data.
     */
    create: XOR<TwitterCacheCreateInput, TwitterCacheUncheckedCreateInput>
    /**
     * In case the TwitterCache was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TwitterCacheUpdateInput, TwitterCacheUncheckedUpdateInput>
  }

  /**
   * TwitterCache delete
   */
  export type TwitterCacheDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwitterCache
     */
    select?: TwitterCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwitterCache
     */
    omit?: TwitterCacheOmit<ExtArgs> | null
    /**
     * Filter which TwitterCache to delete.
     */
    where: TwitterCacheWhereUniqueInput
  }

  /**
   * TwitterCache deleteMany
   */
  export type TwitterCacheDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TwitterCaches to delete
     */
    where?: TwitterCacheWhereInput
    /**
     * Limit how many TwitterCaches to delete.
     */
    limit?: number
  }

  /**
   * TwitterCache without action
   */
  export type TwitterCacheDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TwitterCache
     */
    select?: TwitterCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TwitterCache
     */
    omit?: TwitterCacheOmit<ExtArgs> | null
  }


  /**
   * Model AffiliateCode
   */

  export type AggregateAffiliateCode = {
    _count: AffiliateCodeCountAggregateOutputType | null
    _min: AffiliateCodeMinAggregateOutputType | null
    _max: AffiliateCodeMaxAggregateOutputType | null
  }

  export type AffiliateCodeMinAggregateOutputType = {
    id: string | null
    code: string | null
    influencerName: string | null
    influencerEmail: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    createdByUserId: string | null
  }

  export type AffiliateCodeMaxAggregateOutputType = {
    id: string | null
    code: string | null
    influencerName: string | null
    influencerEmail: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    createdByUserId: string | null
  }

  export type AffiliateCodeCountAggregateOutputType = {
    id: number
    code: number
    influencerName: number
    influencerEmail: number
    isActive: number
    createdAt: number
    updatedAt: number
    createdByUserId: number
    _all: number
  }


  export type AffiliateCodeMinAggregateInputType = {
    id?: true
    code?: true
    influencerName?: true
    influencerEmail?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    createdByUserId?: true
  }

  export type AffiliateCodeMaxAggregateInputType = {
    id?: true
    code?: true
    influencerName?: true
    influencerEmail?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    createdByUserId?: true
  }

  export type AffiliateCodeCountAggregateInputType = {
    id?: true
    code?: true
    influencerName?: true
    influencerEmail?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    createdByUserId?: true
    _all?: true
  }

  export type AffiliateCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AffiliateCode to aggregate.
     */
    where?: AffiliateCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliateCodes to fetch.
     */
    orderBy?: AffiliateCodeOrderByWithRelationInput | AffiliateCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AffiliateCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliateCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliateCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AffiliateCodes
    **/
    _count?: true | AffiliateCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AffiliateCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AffiliateCodeMaxAggregateInputType
  }

  export type GetAffiliateCodeAggregateType<T extends AffiliateCodeAggregateArgs> = {
        [P in keyof T & keyof AggregateAffiliateCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAffiliateCode[P]>
      : GetScalarType<T[P], AggregateAffiliateCode[P]>
  }




  export type AffiliateCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AffiliateCodeWhereInput
    orderBy?: AffiliateCodeOrderByWithAggregationInput | AffiliateCodeOrderByWithAggregationInput[]
    by: AffiliateCodeScalarFieldEnum[] | AffiliateCodeScalarFieldEnum
    having?: AffiliateCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AffiliateCodeCountAggregateInputType | true
    _min?: AffiliateCodeMinAggregateInputType
    _max?: AffiliateCodeMaxAggregateInputType
  }

  export type AffiliateCodeGroupByOutputType = {
    id: string
    code: string
    influencerName: string
    influencerEmail: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    createdByUserId: string
    _count: AffiliateCodeCountAggregateOutputType | null
    _min: AffiliateCodeMinAggregateOutputType | null
    _max: AffiliateCodeMaxAggregateOutputType | null
  }

  type GetAffiliateCodeGroupByPayload<T extends AffiliateCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AffiliateCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AffiliateCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AffiliateCodeGroupByOutputType[P]>
            : GetScalarType<T[P], AffiliateCodeGroupByOutputType[P]>
        }
      >
    >


  export type AffiliateCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    influencerName?: boolean
    influencerEmail?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdByUserId?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    usages?: boolean | AffiliateCode$usagesArgs<ExtArgs>
    _count?: boolean | AffiliateCodeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["affiliateCode"]>

  export type AffiliateCodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    influencerName?: boolean
    influencerEmail?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdByUserId?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["affiliateCode"]>

  export type AffiliateCodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    influencerName?: boolean
    influencerEmail?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdByUserId?: boolean
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["affiliateCode"]>

  export type AffiliateCodeSelectScalar = {
    id?: boolean
    code?: boolean
    influencerName?: boolean
    influencerEmail?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdByUserId?: boolean
  }

  export type AffiliateCodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "influencerName" | "influencerEmail" | "isActive" | "createdAt" | "updatedAt" | "createdByUserId", ExtArgs["result"]["affiliateCode"]>
  export type AffiliateCodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    usages?: boolean | AffiliateCode$usagesArgs<ExtArgs>
    _count?: boolean | AffiliateCodeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AffiliateCodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AffiliateCodeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AffiliateCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AffiliateCode"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs>
      usages: Prisma.$AffiliateUsagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      influencerName: string
      influencerEmail: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
      createdByUserId: string
    }, ExtArgs["result"]["affiliateCode"]>
    composites: {}
  }

  type AffiliateCodeGetPayload<S extends boolean | null | undefined | AffiliateCodeDefaultArgs> = $Result.GetResult<Prisma.$AffiliateCodePayload, S>

  type AffiliateCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AffiliateCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AffiliateCodeCountAggregateInputType | true
    }

  export interface AffiliateCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AffiliateCode'], meta: { name: 'AffiliateCode' } }
    /**
     * Find zero or one AffiliateCode that matches the filter.
     * @param {AffiliateCodeFindUniqueArgs} args - Arguments to find a AffiliateCode
     * @example
     * // Get one AffiliateCode
     * const affiliateCode = await prisma.affiliateCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AffiliateCodeFindUniqueArgs>(args: SelectSubset<T, AffiliateCodeFindUniqueArgs<ExtArgs>>): Prisma__AffiliateCodeClient<$Result.GetResult<Prisma.$AffiliateCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AffiliateCode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AffiliateCodeFindUniqueOrThrowArgs} args - Arguments to find a AffiliateCode
     * @example
     * // Get one AffiliateCode
     * const affiliateCode = await prisma.affiliateCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AffiliateCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, AffiliateCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AffiliateCodeClient<$Result.GetResult<Prisma.$AffiliateCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AffiliateCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateCodeFindFirstArgs} args - Arguments to find a AffiliateCode
     * @example
     * // Get one AffiliateCode
     * const affiliateCode = await prisma.affiliateCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AffiliateCodeFindFirstArgs>(args?: SelectSubset<T, AffiliateCodeFindFirstArgs<ExtArgs>>): Prisma__AffiliateCodeClient<$Result.GetResult<Prisma.$AffiliateCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AffiliateCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateCodeFindFirstOrThrowArgs} args - Arguments to find a AffiliateCode
     * @example
     * // Get one AffiliateCode
     * const affiliateCode = await prisma.affiliateCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AffiliateCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, AffiliateCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__AffiliateCodeClient<$Result.GetResult<Prisma.$AffiliateCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AffiliateCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AffiliateCodes
     * const affiliateCodes = await prisma.affiliateCode.findMany()
     * 
     * // Get first 10 AffiliateCodes
     * const affiliateCodes = await prisma.affiliateCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const affiliateCodeWithIdOnly = await prisma.affiliateCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AffiliateCodeFindManyArgs>(args?: SelectSubset<T, AffiliateCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AffiliateCode.
     * @param {AffiliateCodeCreateArgs} args - Arguments to create a AffiliateCode.
     * @example
     * // Create one AffiliateCode
     * const AffiliateCode = await prisma.affiliateCode.create({
     *   data: {
     *     // ... data to create a AffiliateCode
     *   }
     * })
     * 
     */
    create<T extends AffiliateCodeCreateArgs>(args: SelectSubset<T, AffiliateCodeCreateArgs<ExtArgs>>): Prisma__AffiliateCodeClient<$Result.GetResult<Prisma.$AffiliateCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AffiliateCodes.
     * @param {AffiliateCodeCreateManyArgs} args - Arguments to create many AffiliateCodes.
     * @example
     * // Create many AffiliateCodes
     * const affiliateCode = await prisma.affiliateCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AffiliateCodeCreateManyArgs>(args?: SelectSubset<T, AffiliateCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AffiliateCodes and returns the data saved in the database.
     * @param {AffiliateCodeCreateManyAndReturnArgs} args - Arguments to create many AffiliateCodes.
     * @example
     * // Create many AffiliateCodes
     * const affiliateCode = await prisma.affiliateCode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AffiliateCodes and only return the `id`
     * const affiliateCodeWithIdOnly = await prisma.affiliateCode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AffiliateCodeCreateManyAndReturnArgs>(args?: SelectSubset<T, AffiliateCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AffiliateCode.
     * @param {AffiliateCodeDeleteArgs} args - Arguments to delete one AffiliateCode.
     * @example
     * // Delete one AffiliateCode
     * const AffiliateCode = await prisma.affiliateCode.delete({
     *   where: {
     *     // ... filter to delete one AffiliateCode
     *   }
     * })
     * 
     */
    delete<T extends AffiliateCodeDeleteArgs>(args: SelectSubset<T, AffiliateCodeDeleteArgs<ExtArgs>>): Prisma__AffiliateCodeClient<$Result.GetResult<Prisma.$AffiliateCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AffiliateCode.
     * @param {AffiliateCodeUpdateArgs} args - Arguments to update one AffiliateCode.
     * @example
     * // Update one AffiliateCode
     * const affiliateCode = await prisma.affiliateCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AffiliateCodeUpdateArgs>(args: SelectSubset<T, AffiliateCodeUpdateArgs<ExtArgs>>): Prisma__AffiliateCodeClient<$Result.GetResult<Prisma.$AffiliateCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AffiliateCodes.
     * @param {AffiliateCodeDeleteManyArgs} args - Arguments to filter AffiliateCodes to delete.
     * @example
     * // Delete a few AffiliateCodes
     * const { count } = await prisma.affiliateCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AffiliateCodeDeleteManyArgs>(args?: SelectSubset<T, AffiliateCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AffiliateCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AffiliateCodes
     * const affiliateCode = await prisma.affiliateCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AffiliateCodeUpdateManyArgs>(args: SelectSubset<T, AffiliateCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AffiliateCodes and returns the data updated in the database.
     * @param {AffiliateCodeUpdateManyAndReturnArgs} args - Arguments to update many AffiliateCodes.
     * @example
     * // Update many AffiliateCodes
     * const affiliateCode = await prisma.affiliateCode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AffiliateCodes and only return the `id`
     * const affiliateCodeWithIdOnly = await prisma.affiliateCode.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AffiliateCodeUpdateManyAndReturnArgs>(args: SelectSubset<T, AffiliateCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AffiliateCode.
     * @param {AffiliateCodeUpsertArgs} args - Arguments to update or create a AffiliateCode.
     * @example
     * // Update or create a AffiliateCode
     * const affiliateCode = await prisma.affiliateCode.upsert({
     *   create: {
     *     // ... data to create a AffiliateCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AffiliateCode we want to update
     *   }
     * })
     */
    upsert<T extends AffiliateCodeUpsertArgs>(args: SelectSubset<T, AffiliateCodeUpsertArgs<ExtArgs>>): Prisma__AffiliateCodeClient<$Result.GetResult<Prisma.$AffiliateCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AffiliateCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateCodeCountArgs} args - Arguments to filter AffiliateCodes to count.
     * @example
     * // Count the number of AffiliateCodes
     * const count = await prisma.affiliateCode.count({
     *   where: {
     *     // ... the filter for the AffiliateCodes we want to count
     *   }
     * })
    **/
    count<T extends AffiliateCodeCountArgs>(
      args?: Subset<T, AffiliateCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AffiliateCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AffiliateCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AffiliateCodeAggregateArgs>(args: Subset<T, AffiliateCodeAggregateArgs>): Prisma.PrismaPromise<GetAffiliateCodeAggregateType<T>>

    /**
     * Group by AffiliateCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateCodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AffiliateCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AffiliateCodeGroupByArgs['orderBy'] }
        : { orderBy?: AffiliateCodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AffiliateCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAffiliateCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AffiliateCode model
   */
  readonly fields: AffiliateCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AffiliateCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AffiliateCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    usages<T extends AffiliateCode$usagesArgs<ExtArgs> = {}>(args?: Subset<T, AffiliateCode$usagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateUsagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AffiliateCode model
   */
  interface AffiliateCodeFieldRefs {
    readonly id: FieldRef<"AffiliateCode", 'String'>
    readonly code: FieldRef<"AffiliateCode", 'String'>
    readonly influencerName: FieldRef<"AffiliateCode", 'String'>
    readonly influencerEmail: FieldRef<"AffiliateCode", 'String'>
    readonly isActive: FieldRef<"AffiliateCode", 'Boolean'>
    readonly createdAt: FieldRef<"AffiliateCode", 'DateTime'>
    readonly updatedAt: FieldRef<"AffiliateCode", 'DateTime'>
    readonly createdByUserId: FieldRef<"AffiliateCode", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AffiliateCode findUnique
   */
  export type AffiliateCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCode
     */
    select?: AffiliateCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateCode
     */
    omit?: AffiliateCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateCodeInclude<ExtArgs> | null
    /**
     * Filter, which AffiliateCode to fetch.
     */
    where: AffiliateCodeWhereUniqueInput
  }

  /**
   * AffiliateCode findUniqueOrThrow
   */
  export type AffiliateCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCode
     */
    select?: AffiliateCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateCode
     */
    omit?: AffiliateCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateCodeInclude<ExtArgs> | null
    /**
     * Filter, which AffiliateCode to fetch.
     */
    where: AffiliateCodeWhereUniqueInput
  }

  /**
   * AffiliateCode findFirst
   */
  export type AffiliateCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCode
     */
    select?: AffiliateCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateCode
     */
    omit?: AffiliateCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateCodeInclude<ExtArgs> | null
    /**
     * Filter, which AffiliateCode to fetch.
     */
    where?: AffiliateCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliateCodes to fetch.
     */
    orderBy?: AffiliateCodeOrderByWithRelationInput | AffiliateCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AffiliateCodes.
     */
    cursor?: AffiliateCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliateCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliateCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AffiliateCodes.
     */
    distinct?: AffiliateCodeScalarFieldEnum | AffiliateCodeScalarFieldEnum[]
  }

  /**
   * AffiliateCode findFirstOrThrow
   */
  export type AffiliateCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCode
     */
    select?: AffiliateCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateCode
     */
    omit?: AffiliateCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateCodeInclude<ExtArgs> | null
    /**
     * Filter, which AffiliateCode to fetch.
     */
    where?: AffiliateCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliateCodes to fetch.
     */
    orderBy?: AffiliateCodeOrderByWithRelationInput | AffiliateCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AffiliateCodes.
     */
    cursor?: AffiliateCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliateCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliateCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AffiliateCodes.
     */
    distinct?: AffiliateCodeScalarFieldEnum | AffiliateCodeScalarFieldEnum[]
  }

  /**
   * AffiliateCode findMany
   */
  export type AffiliateCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCode
     */
    select?: AffiliateCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateCode
     */
    omit?: AffiliateCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateCodeInclude<ExtArgs> | null
    /**
     * Filter, which AffiliateCodes to fetch.
     */
    where?: AffiliateCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliateCodes to fetch.
     */
    orderBy?: AffiliateCodeOrderByWithRelationInput | AffiliateCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AffiliateCodes.
     */
    cursor?: AffiliateCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliateCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliateCodes.
     */
    skip?: number
    distinct?: AffiliateCodeScalarFieldEnum | AffiliateCodeScalarFieldEnum[]
  }

  /**
   * AffiliateCode create
   */
  export type AffiliateCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCode
     */
    select?: AffiliateCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateCode
     */
    omit?: AffiliateCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateCodeInclude<ExtArgs> | null
    /**
     * The data needed to create a AffiliateCode.
     */
    data: XOR<AffiliateCodeCreateInput, AffiliateCodeUncheckedCreateInput>
  }

  /**
   * AffiliateCode createMany
   */
  export type AffiliateCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AffiliateCodes.
     */
    data: AffiliateCodeCreateManyInput | AffiliateCodeCreateManyInput[]
  }

  /**
   * AffiliateCode createManyAndReturn
   */
  export type AffiliateCodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCode
     */
    select?: AffiliateCodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateCode
     */
    omit?: AffiliateCodeOmit<ExtArgs> | null
    /**
     * The data used to create many AffiliateCodes.
     */
    data: AffiliateCodeCreateManyInput | AffiliateCodeCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateCodeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AffiliateCode update
   */
  export type AffiliateCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCode
     */
    select?: AffiliateCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateCode
     */
    omit?: AffiliateCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateCodeInclude<ExtArgs> | null
    /**
     * The data needed to update a AffiliateCode.
     */
    data: XOR<AffiliateCodeUpdateInput, AffiliateCodeUncheckedUpdateInput>
    /**
     * Choose, which AffiliateCode to update.
     */
    where: AffiliateCodeWhereUniqueInput
  }

  /**
   * AffiliateCode updateMany
   */
  export type AffiliateCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AffiliateCodes.
     */
    data: XOR<AffiliateCodeUpdateManyMutationInput, AffiliateCodeUncheckedUpdateManyInput>
    /**
     * Filter which AffiliateCodes to update
     */
    where?: AffiliateCodeWhereInput
    /**
     * Limit how many AffiliateCodes to update.
     */
    limit?: number
  }

  /**
   * AffiliateCode updateManyAndReturn
   */
  export type AffiliateCodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCode
     */
    select?: AffiliateCodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateCode
     */
    omit?: AffiliateCodeOmit<ExtArgs> | null
    /**
     * The data used to update AffiliateCodes.
     */
    data: XOR<AffiliateCodeUpdateManyMutationInput, AffiliateCodeUncheckedUpdateManyInput>
    /**
     * Filter which AffiliateCodes to update
     */
    where?: AffiliateCodeWhereInput
    /**
     * Limit how many AffiliateCodes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateCodeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AffiliateCode upsert
   */
  export type AffiliateCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCode
     */
    select?: AffiliateCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateCode
     */
    omit?: AffiliateCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateCodeInclude<ExtArgs> | null
    /**
     * The filter to search for the AffiliateCode to update in case it exists.
     */
    where: AffiliateCodeWhereUniqueInput
    /**
     * In case the AffiliateCode found by the `where` argument doesn't exist, create a new AffiliateCode with this data.
     */
    create: XOR<AffiliateCodeCreateInput, AffiliateCodeUncheckedCreateInput>
    /**
     * In case the AffiliateCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AffiliateCodeUpdateInput, AffiliateCodeUncheckedUpdateInput>
  }

  /**
   * AffiliateCode delete
   */
  export type AffiliateCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCode
     */
    select?: AffiliateCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateCode
     */
    omit?: AffiliateCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateCodeInclude<ExtArgs> | null
    /**
     * Filter which AffiliateCode to delete.
     */
    where: AffiliateCodeWhereUniqueInput
  }

  /**
   * AffiliateCode deleteMany
   */
  export type AffiliateCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AffiliateCodes to delete
     */
    where?: AffiliateCodeWhereInput
    /**
     * Limit how many AffiliateCodes to delete.
     */
    limit?: number
  }

  /**
   * AffiliateCode.usages
   */
  export type AffiliateCode$usagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateUsage
     */
    select?: AffiliateUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateUsage
     */
    omit?: AffiliateUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateUsageInclude<ExtArgs> | null
    where?: AffiliateUsageWhereInput
    orderBy?: AffiliateUsageOrderByWithRelationInput | AffiliateUsageOrderByWithRelationInput[]
    cursor?: AffiliateUsageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AffiliateUsageScalarFieldEnum | AffiliateUsageScalarFieldEnum[]
  }

  /**
   * AffiliateCode without action
   */
  export type AffiliateCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateCode
     */
    select?: AffiliateCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateCode
     */
    omit?: AffiliateCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateCodeInclude<ExtArgs> | null
  }


  /**
   * Model AffiliateUsage
   */

  export type AggregateAffiliateUsage = {
    _count: AffiliateUsageCountAggregateOutputType | null
    _avg: AffiliateUsageAvgAggregateOutputType | null
    _sum: AffiliateUsageSumAggregateOutputType | null
    _min: AffiliateUsageMinAggregateOutputType | null
    _max: AffiliateUsageMaxAggregateOutputType | null
  }

  export type AffiliateUsageAvgAggregateOutputType = {
    originalAmount: number | null
    discountAmount: number | null
    finalAmount: number | null
    commissionAmount: number | null
  }

  export type AffiliateUsageSumAggregateOutputType = {
    originalAmount: number | null
    discountAmount: number | null
    finalAmount: number | null
    commissionAmount: number | null
  }

  export type AffiliateUsageMinAggregateOutputType = {
    id: string | null
    originalAmount: number | null
    discountAmount: number | null
    finalAmount: number | null
    commissionAmount: number | null
    createdAt: Date | null
    affiliateCodeId: string | null
    userId: string | null
    paymentId: string | null
  }

  export type AffiliateUsageMaxAggregateOutputType = {
    id: string | null
    originalAmount: number | null
    discountAmount: number | null
    finalAmount: number | null
    commissionAmount: number | null
    createdAt: Date | null
    affiliateCodeId: string | null
    userId: string | null
    paymentId: string | null
  }

  export type AffiliateUsageCountAggregateOutputType = {
    id: number
    originalAmount: number
    discountAmount: number
    finalAmount: number
    commissionAmount: number
    createdAt: number
    affiliateCodeId: number
    userId: number
    paymentId: number
    _all: number
  }


  export type AffiliateUsageAvgAggregateInputType = {
    originalAmount?: true
    discountAmount?: true
    finalAmount?: true
    commissionAmount?: true
  }

  export type AffiliateUsageSumAggregateInputType = {
    originalAmount?: true
    discountAmount?: true
    finalAmount?: true
    commissionAmount?: true
  }

  export type AffiliateUsageMinAggregateInputType = {
    id?: true
    originalAmount?: true
    discountAmount?: true
    finalAmount?: true
    commissionAmount?: true
    createdAt?: true
    affiliateCodeId?: true
    userId?: true
    paymentId?: true
  }

  export type AffiliateUsageMaxAggregateInputType = {
    id?: true
    originalAmount?: true
    discountAmount?: true
    finalAmount?: true
    commissionAmount?: true
    createdAt?: true
    affiliateCodeId?: true
    userId?: true
    paymentId?: true
  }

  export type AffiliateUsageCountAggregateInputType = {
    id?: true
    originalAmount?: true
    discountAmount?: true
    finalAmount?: true
    commissionAmount?: true
    createdAt?: true
    affiliateCodeId?: true
    userId?: true
    paymentId?: true
    _all?: true
  }

  export type AffiliateUsageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AffiliateUsage to aggregate.
     */
    where?: AffiliateUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliateUsages to fetch.
     */
    orderBy?: AffiliateUsageOrderByWithRelationInput | AffiliateUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AffiliateUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliateUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliateUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AffiliateUsages
    **/
    _count?: true | AffiliateUsageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AffiliateUsageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AffiliateUsageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AffiliateUsageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AffiliateUsageMaxAggregateInputType
  }

  export type GetAffiliateUsageAggregateType<T extends AffiliateUsageAggregateArgs> = {
        [P in keyof T & keyof AggregateAffiliateUsage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAffiliateUsage[P]>
      : GetScalarType<T[P], AggregateAffiliateUsage[P]>
  }




  export type AffiliateUsageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AffiliateUsageWhereInput
    orderBy?: AffiliateUsageOrderByWithAggregationInput | AffiliateUsageOrderByWithAggregationInput[]
    by: AffiliateUsageScalarFieldEnum[] | AffiliateUsageScalarFieldEnum
    having?: AffiliateUsageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AffiliateUsageCountAggregateInputType | true
    _avg?: AffiliateUsageAvgAggregateInputType
    _sum?: AffiliateUsageSumAggregateInputType
    _min?: AffiliateUsageMinAggregateInputType
    _max?: AffiliateUsageMaxAggregateInputType
  }

  export type AffiliateUsageGroupByOutputType = {
    id: string
    originalAmount: number
    discountAmount: number
    finalAmount: number
    commissionAmount: number
    createdAt: Date
    affiliateCodeId: string
    userId: string
    paymentId: string
    _count: AffiliateUsageCountAggregateOutputType | null
    _avg: AffiliateUsageAvgAggregateOutputType | null
    _sum: AffiliateUsageSumAggregateOutputType | null
    _min: AffiliateUsageMinAggregateOutputType | null
    _max: AffiliateUsageMaxAggregateOutputType | null
  }

  type GetAffiliateUsageGroupByPayload<T extends AffiliateUsageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AffiliateUsageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AffiliateUsageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AffiliateUsageGroupByOutputType[P]>
            : GetScalarType<T[P], AffiliateUsageGroupByOutputType[P]>
        }
      >
    >


  export type AffiliateUsageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    originalAmount?: boolean
    discountAmount?: boolean
    finalAmount?: boolean
    commissionAmount?: boolean
    createdAt?: boolean
    affiliateCodeId?: boolean
    userId?: boolean
    paymentId?: boolean
    affiliateCode?: boolean | AffiliateCodeDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    payment?: boolean | PaymentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["affiliateUsage"]>

  export type AffiliateUsageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    originalAmount?: boolean
    discountAmount?: boolean
    finalAmount?: boolean
    commissionAmount?: boolean
    createdAt?: boolean
    affiliateCodeId?: boolean
    userId?: boolean
    paymentId?: boolean
    affiliateCode?: boolean | AffiliateCodeDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    payment?: boolean | PaymentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["affiliateUsage"]>

  export type AffiliateUsageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    originalAmount?: boolean
    discountAmount?: boolean
    finalAmount?: boolean
    commissionAmount?: boolean
    createdAt?: boolean
    affiliateCodeId?: boolean
    userId?: boolean
    paymentId?: boolean
    affiliateCode?: boolean | AffiliateCodeDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    payment?: boolean | PaymentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["affiliateUsage"]>

  export type AffiliateUsageSelectScalar = {
    id?: boolean
    originalAmount?: boolean
    discountAmount?: boolean
    finalAmount?: boolean
    commissionAmount?: boolean
    createdAt?: boolean
    affiliateCodeId?: boolean
    userId?: boolean
    paymentId?: boolean
  }

  export type AffiliateUsageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "originalAmount" | "discountAmount" | "finalAmount" | "commissionAmount" | "createdAt" | "affiliateCodeId" | "userId" | "paymentId", ExtArgs["result"]["affiliateUsage"]>
  export type AffiliateUsageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    affiliateCode?: boolean | AffiliateCodeDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    payment?: boolean | PaymentDefaultArgs<ExtArgs>
  }
  export type AffiliateUsageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    affiliateCode?: boolean | AffiliateCodeDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    payment?: boolean | PaymentDefaultArgs<ExtArgs>
  }
  export type AffiliateUsageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    affiliateCode?: boolean | AffiliateCodeDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    payment?: boolean | PaymentDefaultArgs<ExtArgs>
  }

  export type $AffiliateUsagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AffiliateUsage"
    objects: {
      affiliateCode: Prisma.$AffiliateCodePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      payment: Prisma.$PaymentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      originalAmount: number
      discountAmount: number
      finalAmount: number
      commissionAmount: number
      createdAt: Date
      affiliateCodeId: string
      userId: string
      paymentId: string
    }, ExtArgs["result"]["affiliateUsage"]>
    composites: {}
  }

  type AffiliateUsageGetPayload<S extends boolean | null | undefined | AffiliateUsageDefaultArgs> = $Result.GetResult<Prisma.$AffiliateUsagePayload, S>

  type AffiliateUsageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AffiliateUsageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AffiliateUsageCountAggregateInputType | true
    }

  export interface AffiliateUsageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AffiliateUsage'], meta: { name: 'AffiliateUsage' } }
    /**
     * Find zero or one AffiliateUsage that matches the filter.
     * @param {AffiliateUsageFindUniqueArgs} args - Arguments to find a AffiliateUsage
     * @example
     * // Get one AffiliateUsage
     * const affiliateUsage = await prisma.affiliateUsage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AffiliateUsageFindUniqueArgs>(args: SelectSubset<T, AffiliateUsageFindUniqueArgs<ExtArgs>>): Prisma__AffiliateUsageClient<$Result.GetResult<Prisma.$AffiliateUsagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AffiliateUsage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AffiliateUsageFindUniqueOrThrowArgs} args - Arguments to find a AffiliateUsage
     * @example
     * // Get one AffiliateUsage
     * const affiliateUsage = await prisma.affiliateUsage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AffiliateUsageFindUniqueOrThrowArgs>(args: SelectSubset<T, AffiliateUsageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AffiliateUsageClient<$Result.GetResult<Prisma.$AffiliateUsagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AffiliateUsage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateUsageFindFirstArgs} args - Arguments to find a AffiliateUsage
     * @example
     * // Get one AffiliateUsage
     * const affiliateUsage = await prisma.affiliateUsage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AffiliateUsageFindFirstArgs>(args?: SelectSubset<T, AffiliateUsageFindFirstArgs<ExtArgs>>): Prisma__AffiliateUsageClient<$Result.GetResult<Prisma.$AffiliateUsagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AffiliateUsage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateUsageFindFirstOrThrowArgs} args - Arguments to find a AffiliateUsage
     * @example
     * // Get one AffiliateUsage
     * const affiliateUsage = await prisma.affiliateUsage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AffiliateUsageFindFirstOrThrowArgs>(args?: SelectSubset<T, AffiliateUsageFindFirstOrThrowArgs<ExtArgs>>): Prisma__AffiliateUsageClient<$Result.GetResult<Prisma.$AffiliateUsagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AffiliateUsages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateUsageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AffiliateUsages
     * const affiliateUsages = await prisma.affiliateUsage.findMany()
     * 
     * // Get first 10 AffiliateUsages
     * const affiliateUsages = await prisma.affiliateUsage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const affiliateUsageWithIdOnly = await prisma.affiliateUsage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AffiliateUsageFindManyArgs>(args?: SelectSubset<T, AffiliateUsageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateUsagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AffiliateUsage.
     * @param {AffiliateUsageCreateArgs} args - Arguments to create a AffiliateUsage.
     * @example
     * // Create one AffiliateUsage
     * const AffiliateUsage = await prisma.affiliateUsage.create({
     *   data: {
     *     // ... data to create a AffiliateUsage
     *   }
     * })
     * 
     */
    create<T extends AffiliateUsageCreateArgs>(args: SelectSubset<T, AffiliateUsageCreateArgs<ExtArgs>>): Prisma__AffiliateUsageClient<$Result.GetResult<Prisma.$AffiliateUsagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AffiliateUsages.
     * @param {AffiliateUsageCreateManyArgs} args - Arguments to create many AffiliateUsages.
     * @example
     * // Create many AffiliateUsages
     * const affiliateUsage = await prisma.affiliateUsage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AffiliateUsageCreateManyArgs>(args?: SelectSubset<T, AffiliateUsageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AffiliateUsages and returns the data saved in the database.
     * @param {AffiliateUsageCreateManyAndReturnArgs} args - Arguments to create many AffiliateUsages.
     * @example
     * // Create many AffiliateUsages
     * const affiliateUsage = await prisma.affiliateUsage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AffiliateUsages and only return the `id`
     * const affiliateUsageWithIdOnly = await prisma.affiliateUsage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AffiliateUsageCreateManyAndReturnArgs>(args?: SelectSubset<T, AffiliateUsageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateUsagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AffiliateUsage.
     * @param {AffiliateUsageDeleteArgs} args - Arguments to delete one AffiliateUsage.
     * @example
     * // Delete one AffiliateUsage
     * const AffiliateUsage = await prisma.affiliateUsage.delete({
     *   where: {
     *     // ... filter to delete one AffiliateUsage
     *   }
     * })
     * 
     */
    delete<T extends AffiliateUsageDeleteArgs>(args: SelectSubset<T, AffiliateUsageDeleteArgs<ExtArgs>>): Prisma__AffiliateUsageClient<$Result.GetResult<Prisma.$AffiliateUsagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AffiliateUsage.
     * @param {AffiliateUsageUpdateArgs} args - Arguments to update one AffiliateUsage.
     * @example
     * // Update one AffiliateUsage
     * const affiliateUsage = await prisma.affiliateUsage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AffiliateUsageUpdateArgs>(args: SelectSubset<T, AffiliateUsageUpdateArgs<ExtArgs>>): Prisma__AffiliateUsageClient<$Result.GetResult<Prisma.$AffiliateUsagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AffiliateUsages.
     * @param {AffiliateUsageDeleteManyArgs} args - Arguments to filter AffiliateUsages to delete.
     * @example
     * // Delete a few AffiliateUsages
     * const { count } = await prisma.affiliateUsage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AffiliateUsageDeleteManyArgs>(args?: SelectSubset<T, AffiliateUsageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AffiliateUsages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateUsageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AffiliateUsages
     * const affiliateUsage = await prisma.affiliateUsage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AffiliateUsageUpdateManyArgs>(args: SelectSubset<T, AffiliateUsageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AffiliateUsages and returns the data updated in the database.
     * @param {AffiliateUsageUpdateManyAndReturnArgs} args - Arguments to update many AffiliateUsages.
     * @example
     * // Update many AffiliateUsages
     * const affiliateUsage = await prisma.affiliateUsage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AffiliateUsages and only return the `id`
     * const affiliateUsageWithIdOnly = await prisma.affiliateUsage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AffiliateUsageUpdateManyAndReturnArgs>(args: SelectSubset<T, AffiliateUsageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AffiliateUsagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AffiliateUsage.
     * @param {AffiliateUsageUpsertArgs} args - Arguments to update or create a AffiliateUsage.
     * @example
     * // Update or create a AffiliateUsage
     * const affiliateUsage = await prisma.affiliateUsage.upsert({
     *   create: {
     *     // ... data to create a AffiliateUsage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AffiliateUsage we want to update
     *   }
     * })
     */
    upsert<T extends AffiliateUsageUpsertArgs>(args: SelectSubset<T, AffiliateUsageUpsertArgs<ExtArgs>>): Prisma__AffiliateUsageClient<$Result.GetResult<Prisma.$AffiliateUsagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AffiliateUsages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateUsageCountArgs} args - Arguments to filter AffiliateUsages to count.
     * @example
     * // Count the number of AffiliateUsages
     * const count = await prisma.affiliateUsage.count({
     *   where: {
     *     // ... the filter for the AffiliateUsages we want to count
     *   }
     * })
    **/
    count<T extends AffiliateUsageCountArgs>(
      args?: Subset<T, AffiliateUsageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AffiliateUsageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AffiliateUsage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateUsageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AffiliateUsageAggregateArgs>(args: Subset<T, AffiliateUsageAggregateArgs>): Prisma.PrismaPromise<GetAffiliateUsageAggregateType<T>>

    /**
     * Group by AffiliateUsage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AffiliateUsageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AffiliateUsageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AffiliateUsageGroupByArgs['orderBy'] }
        : { orderBy?: AffiliateUsageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AffiliateUsageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAffiliateUsageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AffiliateUsage model
   */
  readonly fields: AffiliateUsageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AffiliateUsage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AffiliateUsageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    affiliateCode<T extends AffiliateCodeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AffiliateCodeDefaultArgs<ExtArgs>>): Prisma__AffiliateCodeClient<$Result.GetResult<Prisma.$AffiliateCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    payment<T extends PaymentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PaymentDefaultArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AffiliateUsage model
   */
  interface AffiliateUsageFieldRefs {
    readonly id: FieldRef<"AffiliateUsage", 'String'>
    readonly originalAmount: FieldRef<"AffiliateUsage", 'Float'>
    readonly discountAmount: FieldRef<"AffiliateUsage", 'Float'>
    readonly finalAmount: FieldRef<"AffiliateUsage", 'Float'>
    readonly commissionAmount: FieldRef<"AffiliateUsage", 'Float'>
    readonly createdAt: FieldRef<"AffiliateUsage", 'DateTime'>
    readonly affiliateCodeId: FieldRef<"AffiliateUsage", 'String'>
    readonly userId: FieldRef<"AffiliateUsage", 'String'>
    readonly paymentId: FieldRef<"AffiliateUsage", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AffiliateUsage findUnique
   */
  export type AffiliateUsageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateUsage
     */
    select?: AffiliateUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateUsage
     */
    omit?: AffiliateUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateUsageInclude<ExtArgs> | null
    /**
     * Filter, which AffiliateUsage to fetch.
     */
    where: AffiliateUsageWhereUniqueInput
  }

  /**
   * AffiliateUsage findUniqueOrThrow
   */
  export type AffiliateUsageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateUsage
     */
    select?: AffiliateUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateUsage
     */
    omit?: AffiliateUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateUsageInclude<ExtArgs> | null
    /**
     * Filter, which AffiliateUsage to fetch.
     */
    where: AffiliateUsageWhereUniqueInput
  }

  /**
   * AffiliateUsage findFirst
   */
  export type AffiliateUsageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateUsage
     */
    select?: AffiliateUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateUsage
     */
    omit?: AffiliateUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateUsageInclude<ExtArgs> | null
    /**
     * Filter, which AffiliateUsage to fetch.
     */
    where?: AffiliateUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliateUsages to fetch.
     */
    orderBy?: AffiliateUsageOrderByWithRelationInput | AffiliateUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AffiliateUsages.
     */
    cursor?: AffiliateUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliateUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliateUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AffiliateUsages.
     */
    distinct?: AffiliateUsageScalarFieldEnum | AffiliateUsageScalarFieldEnum[]
  }

  /**
   * AffiliateUsage findFirstOrThrow
   */
  export type AffiliateUsageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateUsage
     */
    select?: AffiliateUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateUsage
     */
    omit?: AffiliateUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateUsageInclude<ExtArgs> | null
    /**
     * Filter, which AffiliateUsage to fetch.
     */
    where?: AffiliateUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliateUsages to fetch.
     */
    orderBy?: AffiliateUsageOrderByWithRelationInput | AffiliateUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AffiliateUsages.
     */
    cursor?: AffiliateUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliateUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliateUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AffiliateUsages.
     */
    distinct?: AffiliateUsageScalarFieldEnum | AffiliateUsageScalarFieldEnum[]
  }

  /**
   * AffiliateUsage findMany
   */
  export type AffiliateUsageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateUsage
     */
    select?: AffiliateUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateUsage
     */
    omit?: AffiliateUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateUsageInclude<ExtArgs> | null
    /**
     * Filter, which AffiliateUsages to fetch.
     */
    where?: AffiliateUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AffiliateUsages to fetch.
     */
    orderBy?: AffiliateUsageOrderByWithRelationInput | AffiliateUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AffiliateUsages.
     */
    cursor?: AffiliateUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AffiliateUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AffiliateUsages.
     */
    skip?: number
    distinct?: AffiliateUsageScalarFieldEnum | AffiliateUsageScalarFieldEnum[]
  }

  /**
   * AffiliateUsage create
   */
  export type AffiliateUsageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateUsage
     */
    select?: AffiliateUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateUsage
     */
    omit?: AffiliateUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateUsageInclude<ExtArgs> | null
    /**
     * The data needed to create a AffiliateUsage.
     */
    data: XOR<AffiliateUsageCreateInput, AffiliateUsageUncheckedCreateInput>
  }

  /**
   * AffiliateUsage createMany
   */
  export type AffiliateUsageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AffiliateUsages.
     */
    data: AffiliateUsageCreateManyInput | AffiliateUsageCreateManyInput[]
  }

  /**
   * AffiliateUsage createManyAndReturn
   */
  export type AffiliateUsageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateUsage
     */
    select?: AffiliateUsageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateUsage
     */
    omit?: AffiliateUsageOmit<ExtArgs> | null
    /**
     * The data used to create many AffiliateUsages.
     */
    data: AffiliateUsageCreateManyInput | AffiliateUsageCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateUsageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AffiliateUsage update
   */
  export type AffiliateUsageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateUsage
     */
    select?: AffiliateUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateUsage
     */
    omit?: AffiliateUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateUsageInclude<ExtArgs> | null
    /**
     * The data needed to update a AffiliateUsage.
     */
    data: XOR<AffiliateUsageUpdateInput, AffiliateUsageUncheckedUpdateInput>
    /**
     * Choose, which AffiliateUsage to update.
     */
    where: AffiliateUsageWhereUniqueInput
  }

  /**
   * AffiliateUsage updateMany
   */
  export type AffiliateUsageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AffiliateUsages.
     */
    data: XOR<AffiliateUsageUpdateManyMutationInput, AffiliateUsageUncheckedUpdateManyInput>
    /**
     * Filter which AffiliateUsages to update
     */
    where?: AffiliateUsageWhereInput
    /**
     * Limit how many AffiliateUsages to update.
     */
    limit?: number
  }

  /**
   * AffiliateUsage updateManyAndReturn
   */
  export type AffiliateUsageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateUsage
     */
    select?: AffiliateUsageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateUsage
     */
    omit?: AffiliateUsageOmit<ExtArgs> | null
    /**
     * The data used to update AffiliateUsages.
     */
    data: XOR<AffiliateUsageUpdateManyMutationInput, AffiliateUsageUncheckedUpdateManyInput>
    /**
     * Filter which AffiliateUsages to update
     */
    where?: AffiliateUsageWhereInput
    /**
     * Limit how many AffiliateUsages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateUsageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AffiliateUsage upsert
   */
  export type AffiliateUsageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateUsage
     */
    select?: AffiliateUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateUsage
     */
    omit?: AffiliateUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateUsageInclude<ExtArgs> | null
    /**
     * The filter to search for the AffiliateUsage to update in case it exists.
     */
    where: AffiliateUsageWhereUniqueInput
    /**
     * In case the AffiliateUsage found by the `where` argument doesn't exist, create a new AffiliateUsage with this data.
     */
    create: XOR<AffiliateUsageCreateInput, AffiliateUsageUncheckedCreateInput>
    /**
     * In case the AffiliateUsage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AffiliateUsageUpdateInput, AffiliateUsageUncheckedUpdateInput>
  }

  /**
   * AffiliateUsage delete
   */
  export type AffiliateUsageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateUsage
     */
    select?: AffiliateUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateUsage
     */
    omit?: AffiliateUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateUsageInclude<ExtArgs> | null
    /**
     * Filter which AffiliateUsage to delete.
     */
    where: AffiliateUsageWhereUniqueInput
  }

  /**
   * AffiliateUsage deleteMany
   */
  export type AffiliateUsageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AffiliateUsages to delete
     */
    where?: AffiliateUsageWhereInput
    /**
     * Limit how many AffiliateUsages to delete.
     */
    limit?: number
  }

  /**
   * AffiliateUsage without action
   */
  export type AffiliateUsageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AffiliateUsage
     */
    select?: AffiliateUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AffiliateUsage
     */
    omit?: AffiliateUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AffiliateUsageInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    isPremium: 'isPremium',
    premiumUntil: 'premiumUntil',
    isAdmin: 'isAdmin',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProtocolScalarFieldEnum: {
    id: 'id',
    name: 'name',
    network: 'network',
    officialUrl: 'officialUrl',
    twitterHandle: 'twitterHandle',
    farmStartDate: 'farmStartDate',
    dailyMissions: 'dailyMissions',
    logoUrl: 'logoUrl',
    primaryColor: 'primaryColor',
    totalInvested: 'totalInvested',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type ProtocolScalarFieldEnum = (typeof ProtocolScalarFieldEnum)[keyof typeof ProtocolScalarFieldEnum]


  export const InvestmentScalarFieldEnum: {
    id: 'id',
    amount: 'amount',
    type: 'type',
    date: 'date',
    description: 'description',
    createdAt: 'createdAt',
    protocolId: 'protocolId'
  };

  export type InvestmentScalarFieldEnum = (typeof InvestmentScalarFieldEnum)[keyof typeof InvestmentScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    isCompleted: 'isCompleted',
    isDaily: 'isDaily',
    dueDate: 'dueDate',
    completedAt: 'completedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    protocolId: 'protocolId'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    plan: 'plan',
    amount: 'amount',
    originalAmount: 'originalAmount',
    discountAmount: 'discountAmount',
    affiliateCodeUsed: 'affiliateCodeUsed',
    transactionHash: 'transactionHash',
    status: 'status',
    verifiedAt: 'verifiedAt',
    validUntil: 'validUntil',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const TwitterCacheScalarFieldEnum: {
    id: 'id',
    handle: 'handle',
    tweets: 'tweets',
    lastUpdated: 'lastUpdated'
  };

  export type TwitterCacheScalarFieldEnum = (typeof TwitterCacheScalarFieldEnum)[keyof typeof TwitterCacheScalarFieldEnum]


  export const AffiliateCodeScalarFieldEnum: {
    id: 'id',
    code: 'code',
    influencerName: 'influencerName',
    influencerEmail: 'influencerEmail',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    createdByUserId: 'createdByUserId'
  };

  export type AffiliateCodeScalarFieldEnum = (typeof AffiliateCodeScalarFieldEnum)[keyof typeof AffiliateCodeScalarFieldEnum]


  export const AffiliateUsageScalarFieldEnum: {
    id: 'id',
    originalAmount: 'originalAmount',
    discountAmount: 'discountAmount',
    finalAmount: 'finalAmount',
    commissionAmount: 'commissionAmount',
    createdAt: 'createdAt',
    affiliateCodeId: 'affiliateCodeId',
    userId: 'userId',
    paymentId: 'paymentId'
  };

  export type AffiliateUsageScalarFieldEnum = (typeof AffiliateUsageScalarFieldEnum)[keyof typeof AffiliateUsageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'InvestmentType'
   */
  export type EnumInvestmentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InvestmentType'>
    


  /**
   * Reference to a field of type 'PaymentPlan'
   */
  export type EnumPaymentPlanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentPlan'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    isPremium?: BoolFilter<"User"> | boolean
    premiumUntil?: DateTimeNullableFilter<"User"> | Date | string | null
    isAdmin?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    protocols?: ProtocolListRelationFilter
    tasks?: TaskListRelationFilter
    payments?: PaymentListRelationFilter
    affiliateCodes?: AffiliateCodeListRelationFilter
    affiliateUsages?: AffiliateUsageListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    isPremium?: SortOrder
    premiumUntil?: SortOrderInput | SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    protocols?: ProtocolOrderByRelationAggregateInput
    tasks?: TaskOrderByRelationAggregateInput
    payments?: PaymentOrderByRelationAggregateInput
    affiliateCodes?: AffiliateCodeOrderByRelationAggregateInput
    affiliateUsages?: AffiliateUsageOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    isPremium?: BoolFilter<"User"> | boolean
    premiumUntil?: DateTimeNullableFilter<"User"> | Date | string | null
    isAdmin?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    protocols?: ProtocolListRelationFilter
    tasks?: TaskListRelationFilter
    payments?: PaymentListRelationFilter
    affiliateCodes?: AffiliateCodeListRelationFilter
    affiliateUsages?: AffiliateUsageListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrderInput | SortOrder
    isPremium?: SortOrder
    premiumUntil?: SortOrderInput | SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    isPremium?: BoolWithAggregatesFilter<"User"> | boolean
    premiumUntil?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    isAdmin?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ProtocolWhereInput = {
    AND?: ProtocolWhereInput | ProtocolWhereInput[]
    OR?: ProtocolWhereInput[]
    NOT?: ProtocolWhereInput | ProtocolWhereInput[]
    id?: StringFilter<"Protocol"> | string
    name?: StringFilter<"Protocol"> | string
    network?: StringFilter<"Protocol"> | string
    officialUrl?: StringFilter<"Protocol"> | string
    twitterHandle?: StringNullableFilter<"Protocol"> | string | null
    farmStartDate?: DateTimeNullableFilter<"Protocol"> | Date | string | null
    dailyMissions?: BoolFilter<"Protocol"> | boolean
    logoUrl?: StringNullableFilter<"Protocol"> | string | null
    primaryColor?: StringNullableFilter<"Protocol"> | string | null
    totalInvested?: FloatFilter<"Protocol"> | number
    isActive?: BoolFilter<"Protocol"> | boolean
    createdAt?: DateTimeFilter<"Protocol"> | Date | string
    updatedAt?: DateTimeFilter<"Protocol"> | Date | string
    userId?: StringFilter<"Protocol"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    investments?: InvestmentListRelationFilter
    tasks?: TaskListRelationFilter
  }

  export type ProtocolOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    network?: SortOrder
    officialUrl?: SortOrder
    twitterHandle?: SortOrderInput | SortOrder
    farmStartDate?: SortOrderInput | SortOrder
    dailyMissions?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    primaryColor?: SortOrderInput | SortOrder
    totalInvested?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    investments?: InvestmentOrderByRelationAggregateInput
    tasks?: TaskOrderByRelationAggregateInput
  }

  export type ProtocolWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProtocolWhereInput | ProtocolWhereInput[]
    OR?: ProtocolWhereInput[]
    NOT?: ProtocolWhereInput | ProtocolWhereInput[]
    name?: StringFilter<"Protocol"> | string
    network?: StringFilter<"Protocol"> | string
    officialUrl?: StringFilter<"Protocol"> | string
    twitterHandle?: StringNullableFilter<"Protocol"> | string | null
    farmStartDate?: DateTimeNullableFilter<"Protocol"> | Date | string | null
    dailyMissions?: BoolFilter<"Protocol"> | boolean
    logoUrl?: StringNullableFilter<"Protocol"> | string | null
    primaryColor?: StringNullableFilter<"Protocol"> | string | null
    totalInvested?: FloatFilter<"Protocol"> | number
    isActive?: BoolFilter<"Protocol"> | boolean
    createdAt?: DateTimeFilter<"Protocol"> | Date | string
    updatedAt?: DateTimeFilter<"Protocol"> | Date | string
    userId?: StringFilter<"Protocol"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    investments?: InvestmentListRelationFilter
    tasks?: TaskListRelationFilter
  }, "id">

  export type ProtocolOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    network?: SortOrder
    officialUrl?: SortOrder
    twitterHandle?: SortOrderInput | SortOrder
    farmStartDate?: SortOrderInput | SortOrder
    dailyMissions?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    primaryColor?: SortOrderInput | SortOrder
    totalInvested?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: ProtocolCountOrderByAggregateInput
    _avg?: ProtocolAvgOrderByAggregateInput
    _max?: ProtocolMaxOrderByAggregateInput
    _min?: ProtocolMinOrderByAggregateInput
    _sum?: ProtocolSumOrderByAggregateInput
  }

  export type ProtocolScalarWhereWithAggregatesInput = {
    AND?: ProtocolScalarWhereWithAggregatesInput | ProtocolScalarWhereWithAggregatesInput[]
    OR?: ProtocolScalarWhereWithAggregatesInput[]
    NOT?: ProtocolScalarWhereWithAggregatesInput | ProtocolScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Protocol"> | string
    name?: StringWithAggregatesFilter<"Protocol"> | string
    network?: StringWithAggregatesFilter<"Protocol"> | string
    officialUrl?: StringWithAggregatesFilter<"Protocol"> | string
    twitterHandle?: StringNullableWithAggregatesFilter<"Protocol"> | string | null
    farmStartDate?: DateTimeNullableWithAggregatesFilter<"Protocol"> | Date | string | null
    dailyMissions?: BoolWithAggregatesFilter<"Protocol"> | boolean
    logoUrl?: StringNullableWithAggregatesFilter<"Protocol"> | string | null
    primaryColor?: StringNullableWithAggregatesFilter<"Protocol"> | string | null
    totalInvested?: FloatWithAggregatesFilter<"Protocol"> | number
    isActive?: BoolWithAggregatesFilter<"Protocol"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Protocol"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Protocol"> | Date | string
    userId?: StringWithAggregatesFilter<"Protocol"> | string
  }

  export type InvestmentWhereInput = {
    AND?: InvestmentWhereInput | InvestmentWhereInput[]
    OR?: InvestmentWhereInput[]
    NOT?: InvestmentWhereInput | InvestmentWhereInput[]
    id?: StringFilter<"Investment"> | string
    amount?: FloatFilter<"Investment"> | number
    type?: EnumInvestmentTypeFilter<"Investment"> | $Enums.InvestmentType
    date?: DateTimeFilter<"Investment"> | Date | string
    description?: StringNullableFilter<"Investment"> | string | null
    createdAt?: DateTimeFilter<"Investment"> | Date | string
    protocolId?: StringFilter<"Investment"> | string
    protocol?: XOR<ProtocolScalarRelationFilter, ProtocolWhereInput>
  }

  export type InvestmentOrderByWithRelationInput = {
    id?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    date?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    protocolId?: SortOrder
    protocol?: ProtocolOrderByWithRelationInput
  }

  export type InvestmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InvestmentWhereInput | InvestmentWhereInput[]
    OR?: InvestmentWhereInput[]
    NOT?: InvestmentWhereInput | InvestmentWhereInput[]
    amount?: FloatFilter<"Investment"> | number
    type?: EnumInvestmentTypeFilter<"Investment"> | $Enums.InvestmentType
    date?: DateTimeFilter<"Investment"> | Date | string
    description?: StringNullableFilter<"Investment"> | string | null
    createdAt?: DateTimeFilter<"Investment"> | Date | string
    protocolId?: StringFilter<"Investment"> | string
    protocol?: XOR<ProtocolScalarRelationFilter, ProtocolWhereInput>
  }, "id">

  export type InvestmentOrderByWithAggregationInput = {
    id?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    date?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    protocolId?: SortOrder
    _count?: InvestmentCountOrderByAggregateInput
    _avg?: InvestmentAvgOrderByAggregateInput
    _max?: InvestmentMaxOrderByAggregateInput
    _min?: InvestmentMinOrderByAggregateInput
    _sum?: InvestmentSumOrderByAggregateInput
  }

  export type InvestmentScalarWhereWithAggregatesInput = {
    AND?: InvestmentScalarWhereWithAggregatesInput | InvestmentScalarWhereWithAggregatesInput[]
    OR?: InvestmentScalarWhereWithAggregatesInput[]
    NOT?: InvestmentScalarWhereWithAggregatesInput | InvestmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Investment"> | string
    amount?: FloatWithAggregatesFilter<"Investment"> | number
    type?: EnumInvestmentTypeWithAggregatesFilter<"Investment"> | $Enums.InvestmentType
    date?: DateTimeWithAggregatesFilter<"Investment"> | Date | string
    description?: StringNullableWithAggregatesFilter<"Investment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Investment"> | Date | string
    protocolId?: StringWithAggregatesFilter<"Investment"> | string
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: StringFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    isCompleted?: BoolFilter<"Task"> | boolean
    isDaily?: BoolFilter<"Task"> | boolean
    dueDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    userId?: StringFilter<"Task"> | string
    protocolId?: StringNullableFilter<"Task"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    protocol?: XOR<ProtocolNullableScalarRelationFilter, ProtocolWhereInput> | null
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    isCompleted?: SortOrder
    isDaily?: SortOrder
    dueDate?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    protocolId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    protocol?: ProtocolOrderByWithRelationInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    isCompleted?: BoolFilter<"Task"> | boolean
    isDaily?: BoolFilter<"Task"> | boolean
    dueDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    userId?: StringFilter<"Task"> | string
    protocolId?: StringNullableFilter<"Task"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    protocol?: XOR<ProtocolNullableScalarRelationFilter, ProtocolWhereInput> | null
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    isCompleted?: SortOrder
    isDaily?: SortOrder
    dueDate?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    protocolId?: SortOrderInput | SortOrder
    _count?: TaskCountOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Task"> | string
    title?: StringWithAggregatesFilter<"Task"> | string
    description?: StringNullableWithAggregatesFilter<"Task"> | string | null
    isCompleted?: BoolWithAggregatesFilter<"Task"> | boolean
    isDaily?: BoolWithAggregatesFilter<"Task"> | boolean
    dueDate?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    userId?: StringWithAggregatesFilter<"Task"> | string
    protocolId?: StringNullableWithAggregatesFilter<"Task"> | string | null
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: StringFilter<"Payment"> | string
    plan?: EnumPaymentPlanFilter<"Payment"> | $Enums.PaymentPlan
    amount?: FloatFilter<"Payment"> | number
    originalAmount?: FloatNullableFilter<"Payment"> | number | null
    discountAmount?: FloatNullableFilter<"Payment"> | number | null
    affiliateCodeUsed?: StringNullableFilter<"Payment"> | string | null
    transactionHash?: StringNullableFilter<"Payment"> | string | null
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    verifiedAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    validUntil?: DateTimeFilter<"Payment"> | Date | string
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    userId?: StringFilter<"Payment"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    affiliateUsage?: XOR<AffiliateUsageNullableScalarRelationFilter, AffiliateUsageWhereInput> | null
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    plan?: SortOrder
    amount?: SortOrder
    originalAmount?: SortOrderInput | SortOrder
    discountAmount?: SortOrderInput | SortOrder
    affiliateCodeUsed?: SortOrderInput | SortOrder
    transactionHash?: SortOrderInput | SortOrder
    status?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    validUntil?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    affiliateUsage?: AffiliateUsageOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    plan?: EnumPaymentPlanFilter<"Payment"> | $Enums.PaymentPlan
    amount?: FloatFilter<"Payment"> | number
    originalAmount?: FloatNullableFilter<"Payment"> | number | null
    discountAmount?: FloatNullableFilter<"Payment"> | number | null
    affiliateCodeUsed?: StringNullableFilter<"Payment"> | string | null
    transactionHash?: StringNullableFilter<"Payment"> | string | null
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    verifiedAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    validUntil?: DateTimeFilter<"Payment"> | Date | string
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    userId?: StringFilter<"Payment"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    affiliateUsage?: XOR<AffiliateUsageNullableScalarRelationFilter, AffiliateUsageWhereInput> | null
  }, "id">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    plan?: SortOrder
    amount?: SortOrder
    originalAmount?: SortOrderInput | SortOrder
    discountAmount?: SortOrderInput | SortOrder
    affiliateCodeUsed?: SortOrderInput | SortOrder
    transactionHash?: SortOrderInput | SortOrder
    status?: SortOrder
    verifiedAt?: SortOrderInput | SortOrder
    validUntil?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payment"> | string
    plan?: EnumPaymentPlanWithAggregatesFilter<"Payment"> | $Enums.PaymentPlan
    amount?: FloatWithAggregatesFilter<"Payment"> | number
    originalAmount?: FloatNullableWithAggregatesFilter<"Payment"> | number | null
    discountAmount?: FloatNullableWithAggregatesFilter<"Payment"> | number | null
    affiliateCodeUsed?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    transactionHash?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    status?: EnumPaymentStatusWithAggregatesFilter<"Payment"> | $Enums.PaymentStatus
    verifiedAt?: DateTimeNullableWithAggregatesFilter<"Payment"> | Date | string | null
    validUntil?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    userId?: StringWithAggregatesFilter<"Payment"> | string
  }

  export type TwitterCacheWhereInput = {
    AND?: TwitterCacheWhereInput | TwitterCacheWhereInput[]
    OR?: TwitterCacheWhereInput[]
    NOT?: TwitterCacheWhereInput | TwitterCacheWhereInput[]
    id?: StringFilter<"TwitterCache"> | string
    handle?: StringFilter<"TwitterCache"> | string
    tweets?: StringFilter<"TwitterCache"> | string
    lastUpdated?: DateTimeFilter<"TwitterCache"> | Date | string
  }

  export type TwitterCacheOrderByWithRelationInput = {
    id?: SortOrder
    handle?: SortOrder
    tweets?: SortOrder
    lastUpdated?: SortOrder
  }

  export type TwitterCacheWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    handle?: string
    AND?: TwitterCacheWhereInput | TwitterCacheWhereInput[]
    OR?: TwitterCacheWhereInput[]
    NOT?: TwitterCacheWhereInput | TwitterCacheWhereInput[]
    tweets?: StringFilter<"TwitterCache"> | string
    lastUpdated?: DateTimeFilter<"TwitterCache"> | Date | string
  }, "id" | "handle">

  export type TwitterCacheOrderByWithAggregationInput = {
    id?: SortOrder
    handle?: SortOrder
    tweets?: SortOrder
    lastUpdated?: SortOrder
    _count?: TwitterCacheCountOrderByAggregateInput
    _max?: TwitterCacheMaxOrderByAggregateInput
    _min?: TwitterCacheMinOrderByAggregateInput
  }

  export type TwitterCacheScalarWhereWithAggregatesInput = {
    AND?: TwitterCacheScalarWhereWithAggregatesInput | TwitterCacheScalarWhereWithAggregatesInput[]
    OR?: TwitterCacheScalarWhereWithAggregatesInput[]
    NOT?: TwitterCacheScalarWhereWithAggregatesInput | TwitterCacheScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TwitterCache"> | string
    handle?: StringWithAggregatesFilter<"TwitterCache"> | string
    tweets?: StringWithAggregatesFilter<"TwitterCache"> | string
    lastUpdated?: DateTimeWithAggregatesFilter<"TwitterCache"> | Date | string
  }

  export type AffiliateCodeWhereInput = {
    AND?: AffiliateCodeWhereInput | AffiliateCodeWhereInput[]
    OR?: AffiliateCodeWhereInput[]
    NOT?: AffiliateCodeWhereInput | AffiliateCodeWhereInput[]
    id?: StringFilter<"AffiliateCode"> | string
    code?: StringFilter<"AffiliateCode"> | string
    influencerName?: StringFilter<"AffiliateCode"> | string
    influencerEmail?: StringNullableFilter<"AffiliateCode"> | string | null
    isActive?: BoolFilter<"AffiliateCode"> | boolean
    createdAt?: DateTimeFilter<"AffiliateCode"> | Date | string
    updatedAt?: DateTimeFilter<"AffiliateCode"> | Date | string
    createdByUserId?: StringFilter<"AffiliateCode"> | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    usages?: AffiliateUsageListRelationFilter
  }

  export type AffiliateCodeOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    influencerName?: SortOrder
    influencerEmail?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdByUserId?: SortOrder
    createdBy?: UserOrderByWithRelationInput
    usages?: AffiliateUsageOrderByRelationAggregateInput
  }

  export type AffiliateCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: AffiliateCodeWhereInput | AffiliateCodeWhereInput[]
    OR?: AffiliateCodeWhereInput[]
    NOT?: AffiliateCodeWhereInput | AffiliateCodeWhereInput[]
    influencerName?: StringFilter<"AffiliateCode"> | string
    influencerEmail?: StringNullableFilter<"AffiliateCode"> | string | null
    isActive?: BoolFilter<"AffiliateCode"> | boolean
    createdAt?: DateTimeFilter<"AffiliateCode"> | Date | string
    updatedAt?: DateTimeFilter<"AffiliateCode"> | Date | string
    createdByUserId?: StringFilter<"AffiliateCode"> | string
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    usages?: AffiliateUsageListRelationFilter
  }, "id" | "code">

  export type AffiliateCodeOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    influencerName?: SortOrder
    influencerEmail?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdByUserId?: SortOrder
    _count?: AffiliateCodeCountOrderByAggregateInput
    _max?: AffiliateCodeMaxOrderByAggregateInput
    _min?: AffiliateCodeMinOrderByAggregateInput
  }

  export type AffiliateCodeScalarWhereWithAggregatesInput = {
    AND?: AffiliateCodeScalarWhereWithAggregatesInput | AffiliateCodeScalarWhereWithAggregatesInput[]
    OR?: AffiliateCodeScalarWhereWithAggregatesInput[]
    NOT?: AffiliateCodeScalarWhereWithAggregatesInput | AffiliateCodeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AffiliateCode"> | string
    code?: StringWithAggregatesFilter<"AffiliateCode"> | string
    influencerName?: StringWithAggregatesFilter<"AffiliateCode"> | string
    influencerEmail?: StringNullableWithAggregatesFilter<"AffiliateCode"> | string | null
    isActive?: BoolWithAggregatesFilter<"AffiliateCode"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"AffiliateCode"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AffiliateCode"> | Date | string
    createdByUserId?: StringWithAggregatesFilter<"AffiliateCode"> | string
  }

  export type AffiliateUsageWhereInput = {
    AND?: AffiliateUsageWhereInput | AffiliateUsageWhereInput[]
    OR?: AffiliateUsageWhereInput[]
    NOT?: AffiliateUsageWhereInput | AffiliateUsageWhereInput[]
    id?: StringFilter<"AffiliateUsage"> | string
    originalAmount?: FloatFilter<"AffiliateUsage"> | number
    discountAmount?: FloatFilter<"AffiliateUsage"> | number
    finalAmount?: FloatFilter<"AffiliateUsage"> | number
    commissionAmount?: FloatFilter<"AffiliateUsage"> | number
    createdAt?: DateTimeFilter<"AffiliateUsage"> | Date | string
    affiliateCodeId?: StringFilter<"AffiliateUsage"> | string
    userId?: StringFilter<"AffiliateUsage"> | string
    paymentId?: StringFilter<"AffiliateUsage"> | string
    affiliateCode?: XOR<AffiliateCodeScalarRelationFilter, AffiliateCodeWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    payment?: XOR<PaymentScalarRelationFilter, PaymentWhereInput>
  }

  export type AffiliateUsageOrderByWithRelationInput = {
    id?: SortOrder
    originalAmount?: SortOrder
    discountAmount?: SortOrder
    finalAmount?: SortOrder
    commissionAmount?: SortOrder
    createdAt?: SortOrder
    affiliateCodeId?: SortOrder
    userId?: SortOrder
    paymentId?: SortOrder
    affiliateCode?: AffiliateCodeOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    payment?: PaymentOrderByWithRelationInput
  }

  export type AffiliateUsageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    paymentId?: string
    AND?: AffiliateUsageWhereInput | AffiliateUsageWhereInput[]
    OR?: AffiliateUsageWhereInput[]
    NOT?: AffiliateUsageWhereInput | AffiliateUsageWhereInput[]
    originalAmount?: FloatFilter<"AffiliateUsage"> | number
    discountAmount?: FloatFilter<"AffiliateUsage"> | number
    finalAmount?: FloatFilter<"AffiliateUsage"> | number
    commissionAmount?: FloatFilter<"AffiliateUsage"> | number
    createdAt?: DateTimeFilter<"AffiliateUsage"> | Date | string
    affiliateCodeId?: StringFilter<"AffiliateUsage"> | string
    userId?: StringFilter<"AffiliateUsage"> | string
    affiliateCode?: XOR<AffiliateCodeScalarRelationFilter, AffiliateCodeWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    payment?: XOR<PaymentScalarRelationFilter, PaymentWhereInput>
  }, "id" | "paymentId">

  export type AffiliateUsageOrderByWithAggregationInput = {
    id?: SortOrder
    originalAmount?: SortOrder
    discountAmount?: SortOrder
    finalAmount?: SortOrder
    commissionAmount?: SortOrder
    createdAt?: SortOrder
    affiliateCodeId?: SortOrder
    userId?: SortOrder
    paymentId?: SortOrder
    _count?: AffiliateUsageCountOrderByAggregateInput
    _avg?: AffiliateUsageAvgOrderByAggregateInput
    _max?: AffiliateUsageMaxOrderByAggregateInput
    _min?: AffiliateUsageMinOrderByAggregateInput
    _sum?: AffiliateUsageSumOrderByAggregateInput
  }

  export type AffiliateUsageScalarWhereWithAggregatesInput = {
    AND?: AffiliateUsageScalarWhereWithAggregatesInput | AffiliateUsageScalarWhereWithAggregatesInput[]
    OR?: AffiliateUsageScalarWhereWithAggregatesInput[]
    NOT?: AffiliateUsageScalarWhereWithAggregatesInput | AffiliateUsageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AffiliateUsage"> | string
    originalAmount?: FloatWithAggregatesFilter<"AffiliateUsage"> | number
    discountAmount?: FloatWithAggregatesFilter<"AffiliateUsage"> | number
    finalAmount?: FloatWithAggregatesFilter<"AffiliateUsage"> | number
    commissionAmount?: FloatWithAggregatesFilter<"AffiliateUsage"> | number
    createdAt?: DateTimeWithAggregatesFilter<"AffiliateUsage"> | Date | string
    affiliateCodeId?: StringWithAggregatesFilter<"AffiliateUsage"> | string
    userId?: StringWithAggregatesFilter<"AffiliateUsage"> | string
    paymentId?: StringWithAggregatesFilter<"AffiliateUsage"> | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    isPremium?: boolean
    premiumUntil?: Date | string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    protocols?: ProtocolCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    affiliateCodes?: AffiliateCodeCreateNestedManyWithoutCreatedByInput
    affiliateUsages?: AffiliateUsageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    isPremium?: boolean
    premiumUntil?: Date | string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    protocols?: ProtocolUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    affiliateCodes?: AffiliateCodeUncheckedCreateNestedManyWithoutCreatedByInput
    affiliateUsages?: AffiliateUsageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    protocols?: ProtocolUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    affiliateCodes?: AffiliateCodeUpdateManyWithoutCreatedByNestedInput
    affiliateUsages?: AffiliateUsageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    protocols?: ProtocolUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    affiliateCodes?: AffiliateCodeUncheckedUpdateManyWithoutCreatedByNestedInput
    affiliateUsages?: AffiliateUsageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    isPremium?: boolean
    premiumUntil?: Date | string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProtocolCreateInput = {
    id?: string
    name: string
    network: string
    officialUrl: string
    twitterHandle?: string | null
    farmStartDate?: Date | string | null
    dailyMissions?: boolean
    logoUrl?: string | null
    primaryColor?: string | null
    totalInvested?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProtocolsInput
    investments?: InvestmentCreateNestedManyWithoutProtocolInput
    tasks?: TaskCreateNestedManyWithoutProtocolInput
  }

  export type ProtocolUncheckedCreateInput = {
    id?: string
    name: string
    network: string
    officialUrl: string
    twitterHandle?: string | null
    farmStartDate?: Date | string | null
    dailyMissions?: boolean
    logoUrl?: string | null
    primaryColor?: string | null
    totalInvested?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    investments?: InvestmentUncheckedCreateNestedManyWithoutProtocolInput
    tasks?: TaskUncheckedCreateNestedManyWithoutProtocolInput
  }

  export type ProtocolUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    officialUrl?: StringFieldUpdateOperationsInput | string
    twitterHandle?: NullableStringFieldUpdateOperationsInput | string | null
    farmStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dailyMissions?: BoolFieldUpdateOperationsInput | boolean
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    totalInvested?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProtocolsNestedInput
    investments?: InvestmentUpdateManyWithoutProtocolNestedInput
    tasks?: TaskUpdateManyWithoutProtocolNestedInput
  }

  export type ProtocolUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    officialUrl?: StringFieldUpdateOperationsInput | string
    twitterHandle?: NullableStringFieldUpdateOperationsInput | string | null
    farmStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dailyMissions?: BoolFieldUpdateOperationsInput | boolean
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    totalInvested?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    investments?: InvestmentUncheckedUpdateManyWithoutProtocolNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutProtocolNestedInput
  }

  export type ProtocolCreateManyInput = {
    id?: string
    name: string
    network: string
    officialUrl: string
    twitterHandle?: string | null
    farmStartDate?: Date | string | null
    dailyMissions?: boolean
    logoUrl?: string | null
    primaryColor?: string | null
    totalInvested?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type ProtocolUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    officialUrl?: StringFieldUpdateOperationsInput | string
    twitterHandle?: NullableStringFieldUpdateOperationsInput | string | null
    farmStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dailyMissions?: BoolFieldUpdateOperationsInput | boolean
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    totalInvested?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProtocolUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    officialUrl?: StringFieldUpdateOperationsInput | string
    twitterHandle?: NullableStringFieldUpdateOperationsInput | string | null
    farmStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dailyMissions?: BoolFieldUpdateOperationsInput | boolean
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    totalInvested?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type InvestmentCreateInput = {
    id?: string
    amount: number
    type: $Enums.InvestmentType
    date: Date | string
    description?: string | null
    createdAt?: Date | string
    protocol: ProtocolCreateNestedOneWithoutInvestmentsInput
  }

  export type InvestmentUncheckedCreateInput = {
    id?: string
    amount: number
    type: $Enums.InvestmentType
    date: Date | string
    description?: string | null
    createdAt?: Date | string
    protocolId: string
  }

  export type InvestmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumInvestmentTypeFieldUpdateOperationsInput | $Enums.InvestmentType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    protocol?: ProtocolUpdateOneRequiredWithoutInvestmentsNestedInput
  }

  export type InvestmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumInvestmentTypeFieldUpdateOperationsInput | $Enums.InvestmentType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    protocolId?: StringFieldUpdateOperationsInput | string
  }

  export type InvestmentCreateManyInput = {
    id?: string
    amount: number
    type: $Enums.InvestmentType
    date: Date | string
    description?: string | null
    createdAt?: Date | string
    protocolId: string
  }

  export type InvestmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumInvestmentTypeFieldUpdateOperationsInput | $Enums.InvestmentType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvestmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumInvestmentTypeFieldUpdateOperationsInput | $Enums.InvestmentType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    protocolId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskCreateInput = {
    id?: string
    title: string
    description?: string | null
    isCompleted?: boolean
    isDaily?: boolean
    dueDate?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTasksInput
    protocol?: ProtocolCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    isCompleted?: boolean
    isDaily?: boolean
    dueDate?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    protocolId?: string | null
  }

  export type TaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isDaily?: BoolFieldUpdateOperationsInput | boolean
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTasksNestedInput
    protocol?: ProtocolUpdateOneWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isDaily?: BoolFieldUpdateOperationsInput | boolean
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    protocolId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    isCompleted?: boolean
    isDaily?: boolean
    dueDate?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    protocolId?: string | null
  }

  export type TaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isDaily?: BoolFieldUpdateOperationsInput | boolean
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isDaily?: BoolFieldUpdateOperationsInput | boolean
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    protocolId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaymentCreateInput = {
    id?: string
    plan: $Enums.PaymentPlan
    amount: number
    originalAmount?: number | null
    discountAmount?: number | null
    affiliateCodeUsed?: string | null
    transactionHash?: string | null
    status?: $Enums.PaymentStatus
    verifiedAt?: Date | string | null
    validUntil: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPaymentsInput
    affiliateUsage?: AffiliateUsageCreateNestedOneWithoutPaymentInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    plan: $Enums.PaymentPlan
    amount: number
    originalAmount?: number | null
    discountAmount?: number | null
    affiliateCodeUsed?: string | null
    transactionHash?: string | null
    status?: $Enums.PaymentStatus
    verifiedAt?: Date | string | null
    validUntil: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    affiliateUsage?: AffiliateUsageUncheckedCreateNestedOneWithoutPaymentInput
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: EnumPaymentPlanFieldUpdateOperationsInput | $Enums.PaymentPlan
    amount?: FloatFieldUpdateOperationsInput | number
    originalAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    discountAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    affiliateCodeUsed?: NullableStringFieldUpdateOperationsInput | string | null
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    validUntil?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPaymentsNestedInput
    affiliateUsage?: AffiliateUsageUpdateOneWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: EnumPaymentPlanFieldUpdateOperationsInput | $Enums.PaymentPlan
    amount?: FloatFieldUpdateOperationsInput | number
    originalAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    discountAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    affiliateCodeUsed?: NullableStringFieldUpdateOperationsInput | string | null
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    validUntil?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    affiliateUsage?: AffiliateUsageUncheckedUpdateOneWithoutPaymentNestedInput
  }

  export type PaymentCreateManyInput = {
    id?: string
    plan: $Enums.PaymentPlan
    amount: number
    originalAmount?: number | null
    discountAmount?: number | null
    affiliateCodeUsed?: string | null
    transactionHash?: string | null
    status?: $Enums.PaymentStatus
    verifiedAt?: Date | string | null
    validUntil: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: EnumPaymentPlanFieldUpdateOperationsInput | $Enums.PaymentPlan
    amount?: FloatFieldUpdateOperationsInput | number
    originalAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    discountAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    affiliateCodeUsed?: NullableStringFieldUpdateOperationsInput | string | null
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    validUntil?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: EnumPaymentPlanFieldUpdateOperationsInput | $Enums.PaymentPlan
    amount?: FloatFieldUpdateOperationsInput | number
    originalAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    discountAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    affiliateCodeUsed?: NullableStringFieldUpdateOperationsInput | string | null
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    validUntil?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TwitterCacheCreateInput = {
    id?: string
    handle: string
    tweets: string
    lastUpdated?: Date | string
  }

  export type TwitterCacheUncheckedCreateInput = {
    id?: string
    handle: string
    tweets: string
    lastUpdated?: Date | string
  }

  export type TwitterCacheUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    tweets?: StringFieldUpdateOperationsInput | string
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TwitterCacheUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    tweets?: StringFieldUpdateOperationsInput | string
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TwitterCacheCreateManyInput = {
    id?: string
    handle: string
    tweets: string
    lastUpdated?: Date | string
  }

  export type TwitterCacheUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    tweets?: StringFieldUpdateOperationsInput | string
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TwitterCacheUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    handle?: StringFieldUpdateOperationsInput | string
    tweets?: StringFieldUpdateOperationsInput | string
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliateCodeCreateInput = {
    id?: string
    code: string
    influencerName: string
    influencerEmail?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutAffiliateCodesInput
    usages?: AffiliateUsageCreateNestedManyWithoutAffiliateCodeInput
  }

  export type AffiliateCodeUncheckedCreateInput = {
    id?: string
    code: string
    influencerName: string
    influencerEmail?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdByUserId: string
    usages?: AffiliateUsageUncheckedCreateNestedManyWithoutAffiliateCodeInput
  }

  export type AffiliateCodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    influencerName?: StringFieldUpdateOperationsInput | string
    influencerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutAffiliateCodesNestedInput
    usages?: AffiliateUsageUpdateManyWithoutAffiliateCodeNestedInput
  }

  export type AffiliateCodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    influencerName?: StringFieldUpdateOperationsInput | string
    influencerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
    usages?: AffiliateUsageUncheckedUpdateManyWithoutAffiliateCodeNestedInput
  }

  export type AffiliateCodeCreateManyInput = {
    id?: string
    code: string
    influencerName: string
    influencerEmail?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdByUserId: string
  }

  export type AffiliateCodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    influencerName?: StringFieldUpdateOperationsInput | string
    influencerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliateCodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    influencerName?: StringFieldUpdateOperationsInput | string
    influencerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
  }

  export type AffiliateUsageCreateInput = {
    id?: string
    originalAmount: number
    discountAmount: number
    finalAmount: number
    commissionAmount: number
    createdAt?: Date | string
    affiliateCode: AffiliateCodeCreateNestedOneWithoutUsagesInput
    user: UserCreateNestedOneWithoutAffiliateUsagesInput
    payment: PaymentCreateNestedOneWithoutAffiliateUsageInput
  }

  export type AffiliateUsageUncheckedCreateInput = {
    id?: string
    originalAmount: number
    discountAmount: number
    finalAmount: number
    commissionAmount: number
    createdAt?: Date | string
    affiliateCodeId: string
    userId: string
    paymentId: string
  }

  export type AffiliateUsageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    commissionAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affiliateCode?: AffiliateCodeUpdateOneRequiredWithoutUsagesNestedInput
    user?: UserUpdateOneRequiredWithoutAffiliateUsagesNestedInput
    payment?: PaymentUpdateOneRequiredWithoutAffiliateUsageNestedInput
  }

  export type AffiliateUsageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    commissionAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affiliateCodeId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    paymentId?: StringFieldUpdateOperationsInput | string
  }

  export type AffiliateUsageCreateManyInput = {
    id?: string
    originalAmount: number
    discountAmount: number
    finalAmount: number
    commissionAmount: number
    createdAt?: Date | string
    affiliateCodeId: string
    userId: string
    paymentId: string
  }

  export type AffiliateUsageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    commissionAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliateUsageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    commissionAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affiliateCodeId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    paymentId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProtocolListRelationFilter = {
    every?: ProtocolWhereInput
    some?: ProtocolWhereInput
    none?: ProtocolWhereInput
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type AffiliateCodeListRelationFilter = {
    every?: AffiliateCodeWhereInput
    some?: AffiliateCodeWhereInput
    none?: AffiliateCodeWhereInput
  }

  export type AffiliateUsageListRelationFilter = {
    every?: AffiliateUsageWhereInput
    some?: AffiliateUsageWhereInput
    none?: AffiliateUsageWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProtocolOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AffiliateCodeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AffiliateUsageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    isPremium?: SortOrder
    premiumUntil?: SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    isPremium?: SortOrder
    premiumUntil?: SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    isPremium?: SortOrder
    premiumUntil?: SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type InvestmentListRelationFilter = {
    every?: InvestmentWhereInput
    some?: InvestmentWhereInput
    none?: InvestmentWhereInput
  }

  export type InvestmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProtocolCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    network?: SortOrder
    officialUrl?: SortOrder
    twitterHandle?: SortOrder
    farmStartDate?: SortOrder
    dailyMissions?: SortOrder
    logoUrl?: SortOrder
    primaryColor?: SortOrder
    totalInvested?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type ProtocolAvgOrderByAggregateInput = {
    totalInvested?: SortOrder
  }

  export type ProtocolMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    network?: SortOrder
    officialUrl?: SortOrder
    twitterHandle?: SortOrder
    farmStartDate?: SortOrder
    dailyMissions?: SortOrder
    logoUrl?: SortOrder
    primaryColor?: SortOrder
    totalInvested?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type ProtocolMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    network?: SortOrder
    officialUrl?: SortOrder
    twitterHandle?: SortOrder
    farmStartDate?: SortOrder
    dailyMissions?: SortOrder
    logoUrl?: SortOrder
    primaryColor?: SortOrder
    totalInvested?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type ProtocolSumOrderByAggregateInput = {
    totalInvested?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumInvestmentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.InvestmentType | EnumInvestmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.InvestmentType[]
    notIn?: $Enums.InvestmentType[]
    not?: NestedEnumInvestmentTypeFilter<$PrismaModel> | $Enums.InvestmentType
  }

  export type ProtocolScalarRelationFilter = {
    is?: ProtocolWhereInput
    isNot?: ProtocolWhereInput
  }

  export type InvestmentCountOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    date?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    protocolId?: SortOrder
  }

  export type InvestmentAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type InvestmentMaxOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    date?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    protocolId?: SortOrder
  }

  export type InvestmentMinOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    date?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    protocolId?: SortOrder
  }

  export type InvestmentSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumInvestmentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InvestmentType | EnumInvestmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.InvestmentType[]
    notIn?: $Enums.InvestmentType[]
    not?: NestedEnumInvestmentTypeWithAggregatesFilter<$PrismaModel> | $Enums.InvestmentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInvestmentTypeFilter<$PrismaModel>
    _max?: NestedEnumInvestmentTypeFilter<$PrismaModel>
  }

  export type ProtocolNullableScalarRelationFilter = {
    is?: ProtocolWhereInput | null
    isNot?: ProtocolWhereInput | null
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    isCompleted?: SortOrder
    isDaily?: SortOrder
    dueDate?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    protocolId?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    isCompleted?: SortOrder
    isDaily?: SortOrder
    dueDate?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    protocolId?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    isCompleted?: SortOrder
    isDaily?: SortOrder
    dueDate?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    protocolId?: SortOrder
  }

  export type EnumPaymentPlanFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentPlan | EnumPaymentPlanFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentPlan[]
    notIn?: $Enums.PaymentPlan[]
    not?: NestedEnumPaymentPlanFilter<$PrismaModel> | $Enums.PaymentPlan
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[]
    notIn?: $Enums.PaymentStatus[]
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type AffiliateUsageNullableScalarRelationFilter = {
    is?: AffiliateUsageWhereInput | null
    isNot?: AffiliateUsageWhereInput | null
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    plan?: SortOrder
    amount?: SortOrder
    originalAmount?: SortOrder
    discountAmount?: SortOrder
    affiliateCodeUsed?: SortOrder
    transactionHash?: SortOrder
    status?: SortOrder
    verifiedAt?: SortOrder
    validUntil?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
    originalAmount?: SortOrder
    discountAmount?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    plan?: SortOrder
    amount?: SortOrder
    originalAmount?: SortOrder
    discountAmount?: SortOrder
    affiliateCodeUsed?: SortOrder
    transactionHash?: SortOrder
    status?: SortOrder
    verifiedAt?: SortOrder
    validUntil?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    plan?: SortOrder
    amount?: SortOrder
    originalAmount?: SortOrder
    discountAmount?: SortOrder
    affiliateCodeUsed?: SortOrder
    transactionHash?: SortOrder
    status?: SortOrder
    verifiedAt?: SortOrder
    validUntil?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    amount?: SortOrder
    originalAmount?: SortOrder
    discountAmount?: SortOrder
  }

  export type EnumPaymentPlanWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentPlan | EnumPaymentPlanFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentPlan[]
    notIn?: $Enums.PaymentPlan[]
    not?: NestedEnumPaymentPlanWithAggregatesFilter<$PrismaModel> | $Enums.PaymentPlan
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentPlanFilter<$PrismaModel>
    _max?: NestedEnumPaymentPlanFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[]
    notIn?: $Enums.PaymentStatus[]
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type TwitterCacheCountOrderByAggregateInput = {
    id?: SortOrder
    handle?: SortOrder
    tweets?: SortOrder
    lastUpdated?: SortOrder
  }

  export type TwitterCacheMaxOrderByAggregateInput = {
    id?: SortOrder
    handle?: SortOrder
    tweets?: SortOrder
    lastUpdated?: SortOrder
  }

  export type TwitterCacheMinOrderByAggregateInput = {
    id?: SortOrder
    handle?: SortOrder
    tweets?: SortOrder
    lastUpdated?: SortOrder
  }

  export type AffiliateCodeCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    influencerName?: SortOrder
    influencerEmail?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdByUserId?: SortOrder
  }

  export type AffiliateCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    influencerName?: SortOrder
    influencerEmail?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdByUserId?: SortOrder
  }

  export type AffiliateCodeMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    influencerName?: SortOrder
    influencerEmail?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdByUserId?: SortOrder
  }

  export type AffiliateCodeScalarRelationFilter = {
    is?: AffiliateCodeWhereInput
    isNot?: AffiliateCodeWhereInput
  }

  export type PaymentScalarRelationFilter = {
    is?: PaymentWhereInput
    isNot?: PaymentWhereInput
  }

  export type AffiliateUsageCountOrderByAggregateInput = {
    id?: SortOrder
    originalAmount?: SortOrder
    discountAmount?: SortOrder
    finalAmount?: SortOrder
    commissionAmount?: SortOrder
    createdAt?: SortOrder
    affiliateCodeId?: SortOrder
    userId?: SortOrder
    paymentId?: SortOrder
  }

  export type AffiliateUsageAvgOrderByAggregateInput = {
    originalAmount?: SortOrder
    discountAmount?: SortOrder
    finalAmount?: SortOrder
    commissionAmount?: SortOrder
  }

  export type AffiliateUsageMaxOrderByAggregateInput = {
    id?: SortOrder
    originalAmount?: SortOrder
    discountAmount?: SortOrder
    finalAmount?: SortOrder
    commissionAmount?: SortOrder
    createdAt?: SortOrder
    affiliateCodeId?: SortOrder
    userId?: SortOrder
    paymentId?: SortOrder
  }

  export type AffiliateUsageMinOrderByAggregateInput = {
    id?: SortOrder
    originalAmount?: SortOrder
    discountAmount?: SortOrder
    finalAmount?: SortOrder
    commissionAmount?: SortOrder
    createdAt?: SortOrder
    affiliateCodeId?: SortOrder
    userId?: SortOrder
    paymentId?: SortOrder
  }

  export type AffiliateUsageSumOrderByAggregateInput = {
    originalAmount?: SortOrder
    discountAmount?: SortOrder
    finalAmount?: SortOrder
    commissionAmount?: SortOrder
  }

  export type ProtocolCreateNestedManyWithoutUserInput = {
    create?: XOR<ProtocolCreateWithoutUserInput, ProtocolUncheckedCreateWithoutUserInput> | ProtocolCreateWithoutUserInput[] | ProtocolUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProtocolCreateOrConnectWithoutUserInput | ProtocolCreateOrConnectWithoutUserInput[]
    createMany?: ProtocolCreateManyUserInputEnvelope
    connect?: ProtocolWhereUniqueInput | ProtocolWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type PaymentCreateNestedManyWithoutUserInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type AffiliateCodeCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<AffiliateCodeCreateWithoutCreatedByInput, AffiliateCodeUncheckedCreateWithoutCreatedByInput> | AffiliateCodeCreateWithoutCreatedByInput[] | AffiliateCodeUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: AffiliateCodeCreateOrConnectWithoutCreatedByInput | AffiliateCodeCreateOrConnectWithoutCreatedByInput[]
    createMany?: AffiliateCodeCreateManyCreatedByInputEnvelope
    connect?: AffiliateCodeWhereUniqueInput | AffiliateCodeWhereUniqueInput[]
  }

  export type AffiliateUsageCreateNestedManyWithoutUserInput = {
    create?: XOR<AffiliateUsageCreateWithoutUserInput, AffiliateUsageUncheckedCreateWithoutUserInput> | AffiliateUsageCreateWithoutUserInput[] | AffiliateUsageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AffiliateUsageCreateOrConnectWithoutUserInput | AffiliateUsageCreateOrConnectWithoutUserInput[]
    createMany?: AffiliateUsageCreateManyUserInputEnvelope
    connect?: AffiliateUsageWhereUniqueInput | AffiliateUsageWhereUniqueInput[]
  }

  export type ProtocolUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProtocolCreateWithoutUserInput, ProtocolUncheckedCreateWithoutUserInput> | ProtocolCreateWithoutUserInput[] | ProtocolUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProtocolCreateOrConnectWithoutUserInput | ProtocolCreateOrConnectWithoutUserInput[]
    createMany?: ProtocolCreateManyUserInputEnvelope
    connect?: ProtocolWhereUniqueInput | ProtocolWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type AffiliateCodeUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<AffiliateCodeCreateWithoutCreatedByInput, AffiliateCodeUncheckedCreateWithoutCreatedByInput> | AffiliateCodeCreateWithoutCreatedByInput[] | AffiliateCodeUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: AffiliateCodeCreateOrConnectWithoutCreatedByInput | AffiliateCodeCreateOrConnectWithoutCreatedByInput[]
    createMany?: AffiliateCodeCreateManyCreatedByInputEnvelope
    connect?: AffiliateCodeWhereUniqueInput | AffiliateCodeWhereUniqueInput[]
  }

  export type AffiliateUsageUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AffiliateUsageCreateWithoutUserInput, AffiliateUsageUncheckedCreateWithoutUserInput> | AffiliateUsageCreateWithoutUserInput[] | AffiliateUsageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AffiliateUsageCreateOrConnectWithoutUserInput | AffiliateUsageCreateOrConnectWithoutUserInput[]
    createMany?: AffiliateUsageCreateManyUserInputEnvelope
    connect?: AffiliateUsageWhereUniqueInput | AffiliateUsageWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProtocolUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProtocolCreateWithoutUserInput, ProtocolUncheckedCreateWithoutUserInput> | ProtocolCreateWithoutUserInput[] | ProtocolUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProtocolCreateOrConnectWithoutUserInput | ProtocolCreateOrConnectWithoutUserInput[]
    upsert?: ProtocolUpsertWithWhereUniqueWithoutUserInput | ProtocolUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProtocolCreateManyUserInputEnvelope
    set?: ProtocolWhereUniqueInput | ProtocolWhereUniqueInput[]
    disconnect?: ProtocolWhereUniqueInput | ProtocolWhereUniqueInput[]
    delete?: ProtocolWhereUniqueInput | ProtocolWhereUniqueInput[]
    connect?: ProtocolWhereUniqueInput | ProtocolWhereUniqueInput[]
    update?: ProtocolUpdateWithWhereUniqueWithoutUserInput | ProtocolUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProtocolUpdateManyWithWhereWithoutUserInput | ProtocolUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProtocolScalarWhereInput | ProtocolScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutUserInput | TaskUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutUserInput | TaskUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutUserInput | TaskUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type PaymentUpdateManyWithoutUserNestedInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutUserInput | PaymentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutUserInput | PaymentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutUserInput | PaymentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type AffiliateCodeUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<AffiliateCodeCreateWithoutCreatedByInput, AffiliateCodeUncheckedCreateWithoutCreatedByInput> | AffiliateCodeCreateWithoutCreatedByInput[] | AffiliateCodeUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: AffiliateCodeCreateOrConnectWithoutCreatedByInput | AffiliateCodeCreateOrConnectWithoutCreatedByInput[]
    upsert?: AffiliateCodeUpsertWithWhereUniqueWithoutCreatedByInput | AffiliateCodeUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: AffiliateCodeCreateManyCreatedByInputEnvelope
    set?: AffiliateCodeWhereUniqueInput | AffiliateCodeWhereUniqueInput[]
    disconnect?: AffiliateCodeWhereUniqueInput | AffiliateCodeWhereUniqueInput[]
    delete?: AffiliateCodeWhereUniqueInput | AffiliateCodeWhereUniqueInput[]
    connect?: AffiliateCodeWhereUniqueInput | AffiliateCodeWhereUniqueInput[]
    update?: AffiliateCodeUpdateWithWhereUniqueWithoutCreatedByInput | AffiliateCodeUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: AffiliateCodeUpdateManyWithWhereWithoutCreatedByInput | AffiliateCodeUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: AffiliateCodeScalarWhereInput | AffiliateCodeScalarWhereInput[]
  }

  export type AffiliateUsageUpdateManyWithoutUserNestedInput = {
    create?: XOR<AffiliateUsageCreateWithoutUserInput, AffiliateUsageUncheckedCreateWithoutUserInput> | AffiliateUsageCreateWithoutUserInput[] | AffiliateUsageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AffiliateUsageCreateOrConnectWithoutUserInput | AffiliateUsageCreateOrConnectWithoutUserInput[]
    upsert?: AffiliateUsageUpsertWithWhereUniqueWithoutUserInput | AffiliateUsageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AffiliateUsageCreateManyUserInputEnvelope
    set?: AffiliateUsageWhereUniqueInput | AffiliateUsageWhereUniqueInput[]
    disconnect?: AffiliateUsageWhereUniqueInput | AffiliateUsageWhereUniqueInput[]
    delete?: AffiliateUsageWhereUniqueInput | AffiliateUsageWhereUniqueInput[]
    connect?: AffiliateUsageWhereUniqueInput | AffiliateUsageWhereUniqueInput[]
    update?: AffiliateUsageUpdateWithWhereUniqueWithoutUserInput | AffiliateUsageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AffiliateUsageUpdateManyWithWhereWithoutUserInput | AffiliateUsageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AffiliateUsageScalarWhereInput | AffiliateUsageScalarWhereInput[]
  }

  export type ProtocolUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProtocolCreateWithoutUserInput, ProtocolUncheckedCreateWithoutUserInput> | ProtocolCreateWithoutUserInput[] | ProtocolUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProtocolCreateOrConnectWithoutUserInput | ProtocolCreateOrConnectWithoutUserInput[]
    upsert?: ProtocolUpsertWithWhereUniqueWithoutUserInput | ProtocolUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProtocolCreateManyUserInputEnvelope
    set?: ProtocolWhereUniqueInput | ProtocolWhereUniqueInput[]
    disconnect?: ProtocolWhereUniqueInput | ProtocolWhereUniqueInput[]
    delete?: ProtocolWhereUniqueInput | ProtocolWhereUniqueInput[]
    connect?: ProtocolWhereUniqueInput | ProtocolWhereUniqueInput[]
    update?: ProtocolUpdateWithWhereUniqueWithoutUserInput | ProtocolUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProtocolUpdateManyWithWhereWithoutUserInput | ProtocolUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProtocolScalarWhereInput | ProtocolScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutUserInput | TaskUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutUserInput | TaskUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutUserInput | TaskUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutUserInput | PaymentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutUserInput | PaymentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutUserInput | PaymentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type AffiliateCodeUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<AffiliateCodeCreateWithoutCreatedByInput, AffiliateCodeUncheckedCreateWithoutCreatedByInput> | AffiliateCodeCreateWithoutCreatedByInput[] | AffiliateCodeUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: AffiliateCodeCreateOrConnectWithoutCreatedByInput | AffiliateCodeCreateOrConnectWithoutCreatedByInput[]
    upsert?: AffiliateCodeUpsertWithWhereUniqueWithoutCreatedByInput | AffiliateCodeUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: AffiliateCodeCreateManyCreatedByInputEnvelope
    set?: AffiliateCodeWhereUniqueInput | AffiliateCodeWhereUniqueInput[]
    disconnect?: AffiliateCodeWhereUniqueInput | AffiliateCodeWhereUniqueInput[]
    delete?: AffiliateCodeWhereUniqueInput | AffiliateCodeWhereUniqueInput[]
    connect?: AffiliateCodeWhereUniqueInput | AffiliateCodeWhereUniqueInput[]
    update?: AffiliateCodeUpdateWithWhereUniqueWithoutCreatedByInput | AffiliateCodeUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: AffiliateCodeUpdateManyWithWhereWithoutCreatedByInput | AffiliateCodeUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: AffiliateCodeScalarWhereInput | AffiliateCodeScalarWhereInput[]
  }

  export type AffiliateUsageUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AffiliateUsageCreateWithoutUserInput, AffiliateUsageUncheckedCreateWithoutUserInput> | AffiliateUsageCreateWithoutUserInput[] | AffiliateUsageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AffiliateUsageCreateOrConnectWithoutUserInput | AffiliateUsageCreateOrConnectWithoutUserInput[]
    upsert?: AffiliateUsageUpsertWithWhereUniqueWithoutUserInput | AffiliateUsageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AffiliateUsageCreateManyUserInputEnvelope
    set?: AffiliateUsageWhereUniqueInput | AffiliateUsageWhereUniqueInput[]
    disconnect?: AffiliateUsageWhereUniqueInput | AffiliateUsageWhereUniqueInput[]
    delete?: AffiliateUsageWhereUniqueInput | AffiliateUsageWhereUniqueInput[]
    connect?: AffiliateUsageWhereUniqueInput | AffiliateUsageWhereUniqueInput[]
    update?: AffiliateUsageUpdateWithWhereUniqueWithoutUserInput | AffiliateUsageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AffiliateUsageUpdateManyWithWhereWithoutUserInput | AffiliateUsageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AffiliateUsageScalarWhereInput | AffiliateUsageScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutProtocolsInput = {
    create?: XOR<UserCreateWithoutProtocolsInput, UserUncheckedCreateWithoutProtocolsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProtocolsInput
    connect?: UserWhereUniqueInput
  }

  export type InvestmentCreateNestedManyWithoutProtocolInput = {
    create?: XOR<InvestmentCreateWithoutProtocolInput, InvestmentUncheckedCreateWithoutProtocolInput> | InvestmentCreateWithoutProtocolInput[] | InvestmentUncheckedCreateWithoutProtocolInput[]
    connectOrCreate?: InvestmentCreateOrConnectWithoutProtocolInput | InvestmentCreateOrConnectWithoutProtocolInput[]
    createMany?: InvestmentCreateManyProtocolInputEnvelope
    connect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutProtocolInput = {
    create?: XOR<TaskCreateWithoutProtocolInput, TaskUncheckedCreateWithoutProtocolInput> | TaskCreateWithoutProtocolInput[] | TaskUncheckedCreateWithoutProtocolInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutProtocolInput | TaskCreateOrConnectWithoutProtocolInput[]
    createMany?: TaskCreateManyProtocolInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type InvestmentUncheckedCreateNestedManyWithoutProtocolInput = {
    create?: XOR<InvestmentCreateWithoutProtocolInput, InvestmentUncheckedCreateWithoutProtocolInput> | InvestmentCreateWithoutProtocolInput[] | InvestmentUncheckedCreateWithoutProtocolInput[]
    connectOrCreate?: InvestmentCreateOrConnectWithoutProtocolInput | InvestmentCreateOrConnectWithoutProtocolInput[]
    createMany?: InvestmentCreateManyProtocolInputEnvelope
    connect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutProtocolInput = {
    create?: XOR<TaskCreateWithoutProtocolInput, TaskUncheckedCreateWithoutProtocolInput> | TaskCreateWithoutProtocolInput[] | TaskUncheckedCreateWithoutProtocolInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutProtocolInput | TaskCreateOrConnectWithoutProtocolInput[]
    createMany?: TaskCreateManyProtocolInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutProtocolsNestedInput = {
    create?: XOR<UserCreateWithoutProtocolsInput, UserUncheckedCreateWithoutProtocolsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProtocolsInput
    upsert?: UserUpsertWithoutProtocolsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProtocolsInput, UserUpdateWithoutProtocolsInput>, UserUncheckedUpdateWithoutProtocolsInput>
  }

  export type InvestmentUpdateManyWithoutProtocolNestedInput = {
    create?: XOR<InvestmentCreateWithoutProtocolInput, InvestmentUncheckedCreateWithoutProtocolInput> | InvestmentCreateWithoutProtocolInput[] | InvestmentUncheckedCreateWithoutProtocolInput[]
    connectOrCreate?: InvestmentCreateOrConnectWithoutProtocolInput | InvestmentCreateOrConnectWithoutProtocolInput[]
    upsert?: InvestmentUpsertWithWhereUniqueWithoutProtocolInput | InvestmentUpsertWithWhereUniqueWithoutProtocolInput[]
    createMany?: InvestmentCreateManyProtocolInputEnvelope
    set?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    disconnect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    delete?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    connect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    update?: InvestmentUpdateWithWhereUniqueWithoutProtocolInput | InvestmentUpdateWithWhereUniqueWithoutProtocolInput[]
    updateMany?: InvestmentUpdateManyWithWhereWithoutProtocolInput | InvestmentUpdateManyWithWhereWithoutProtocolInput[]
    deleteMany?: InvestmentScalarWhereInput | InvestmentScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutProtocolNestedInput = {
    create?: XOR<TaskCreateWithoutProtocolInput, TaskUncheckedCreateWithoutProtocolInput> | TaskCreateWithoutProtocolInput[] | TaskUncheckedCreateWithoutProtocolInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutProtocolInput | TaskCreateOrConnectWithoutProtocolInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutProtocolInput | TaskUpsertWithWhereUniqueWithoutProtocolInput[]
    createMany?: TaskCreateManyProtocolInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutProtocolInput | TaskUpdateWithWhereUniqueWithoutProtocolInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutProtocolInput | TaskUpdateManyWithWhereWithoutProtocolInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type InvestmentUncheckedUpdateManyWithoutProtocolNestedInput = {
    create?: XOR<InvestmentCreateWithoutProtocolInput, InvestmentUncheckedCreateWithoutProtocolInput> | InvestmentCreateWithoutProtocolInput[] | InvestmentUncheckedCreateWithoutProtocolInput[]
    connectOrCreate?: InvestmentCreateOrConnectWithoutProtocolInput | InvestmentCreateOrConnectWithoutProtocolInput[]
    upsert?: InvestmentUpsertWithWhereUniqueWithoutProtocolInput | InvestmentUpsertWithWhereUniqueWithoutProtocolInput[]
    createMany?: InvestmentCreateManyProtocolInputEnvelope
    set?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    disconnect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    delete?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    connect?: InvestmentWhereUniqueInput | InvestmentWhereUniqueInput[]
    update?: InvestmentUpdateWithWhereUniqueWithoutProtocolInput | InvestmentUpdateWithWhereUniqueWithoutProtocolInput[]
    updateMany?: InvestmentUpdateManyWithWhereWithoutProtocolInput | InvestmentUpdateManyWithWhereWithoutProtocolInput[]
    deleteMany?: InvestmentScalarWhereInput | InvestmentScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutProtocolNestedInput = {
    create?: XOR<TaskCreateWithoutProtocolInput, TaskUncheckedCreateWithoutProtocolInput> | TaskCreateWithoutProtocolInput[] | TaskUncheckedCreateWithoutProtocolInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutProtocolInput | TaskCreateOrConnectWithoutProtocolInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutProtocolInput | TaskUpsertWithWhereUniqueWithoutProtocolInput[]
    createMany?: TaskCreateManyProtocolInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutProtocolInput | TaskUpdateWithWhereUniqueWithoutProtocolInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutProtocolInput | TaskUpdateManyWithWhereWithoutProtocolInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type ProtocolCreateNestedOneWithoutInvestmentsInput = {
    create?: XOR<ProtocolCreateWithoutInvestmentsInput, ProtocolUncheckedCreateWithoutInvestmentsInput>
    connectOrCreate?: ProtocolCreateOrConnectWithoutInvestmentsInput
    connect?: ProtocolWhereUniqueInput
  }

  export type EnumInvestmentTypeFieldUpdateOperationsInput = {
    set?: $Enums.InvestmentType
  }

  export type ProtocolUpdateOneRequiredWithoutInvestmentsNestedInput = {
    create?: XOR<ProtocolCreateWithoutInvestmentsInput, ProtocolUncheckedCreateWithoutInvestmentsInput>
    connectOrCreate?: ProtocolCreateOrConnectWithoutInvestmentsInput
    upsert?: ProtocolUpsertWithoutInvestmentsInput
    connect?: ProtocolWhereUniqueInput
    update?: XOR<XOR<ProtocolUpdateToOneWithWhereWithoutInvestmentsInput, ProtocolUpdateWithoutInvestmentsInput>, ProtocolUncheckedUpdateWithoutInvestmentsInput>
  }

  export type UserCreateNestedOneWithoutTasksInput = {
    create?: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutTasksInput
    connect?: UserWhereUniqueInput
  }

  export type ProtocolCreateNestedOneWithoutTasksInput = {
    create?: XOR<ProtocolCreateWithoutTasksInput, ProtocolUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ProtocolCreateOrConnectWithoutTasksInput
    connect?: ProtocolWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutTasksInput
    upsert?: UserUpsertWithoutTasksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTasksInput, UserUpdateWithoutTasksInput>, UserUncheckedUpdateWithoutTasksInput>
  }

  export type ProtocolUpdateOneWithoutTasksNestedInput = {
    create?: XOR<ProtocolCreateWithoutTasksInput, ProtocolUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ProtocolCreateOrConnectWithoutTasksInput
    upsert?: ProtocolUpsertWithoutTasksInput
    disconnect?: ProtocolWhereInput | boolean
    delete?: ProtocolWhereInput | boolean
    connect?: ProtocolWhereUniqueInput
    update?: XOR<XOR<ProtocolUpdateToOneWithWhereWithoutTasksInput, ProtocolUpdateWithoutTasksInput>, ProtocolUncheckedUpdateWithoutTasksInput>
  }

  export type UserCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentsInput
    connect?: UserWhereUniqueInput
  }

  export type AffiliateUsageCreateNestedOneWithoutPaymentInput = {
    create?: XOR<AffiliateUsageCreateWithoutPaymentInput, AffiliateUsageUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: AffiliateUsageCreateOrConnectWithoutPaymentInput
    connect?: AffiliateUsageWhereUniqueInput
  }

  export type AffiliateUsageUncheckedCreateNestedOneWithoutPaymentInput = {
    create?: XOR<AffiliateUsageCreateWithoutPaymentInput, AffiliateUsageUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: AffiliateUsageCreateOrConnectWithoutPaymentInput
    connect?: AffiliateUsageWhereUniqueInput
  }

  export type EnumPaymentPlanFieldUpdateOperationsInput = {
    set?: $Enums.PaymentPlan
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type UserUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentsInput
    upsert?: UserUpsertWithoutPaymentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPaymentsInput, UserUpdateWithoutPaymentsInput>, UserUncheckedUpdateWithoutPaymentsInput>
  }

  export type AffiliateUsageUpdateOneWithoutPaymentNestedInput = {
    create?: XOR<AffiliateUsageCreateWithoutPaymentInput, AffiliateUsageUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: AffiliateUsageCreateOrConnectWithoutPaymentInput
    upsert?: AffiliateUsageUpsertWithoutPaymentInput
    disconnect?: AffiliateUsageWhereInput | boolean
    delete?: AffiliateUsageWhereInput | boolean
    connect?: AffiliateUsageWhereUniqueInput
    update?: XOR<XOR<AffiliateUsageUpdateToOneWithWhereWithoutPaymentInput, AffiliateUsageUpdateWithoutPaymentInput>, AffiliateUsageUncheckedUpdateWithoutPaymentInput>
  }

  export type AffiliateUsageUncheckedUpdateOneWithoutPaymentNestedInput = {
    create?: XOR<AffiliateUsageCreateWithoutPaymentInput, AffiliateUsageUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: AffiliateUsageCreateOrConnectWithoutPaymentInput
    upsert?: AffiliateUsageUpsertWithoutPaymentInput
    disconnect?: AffiliateUsageWhereInput | boolean
    delete?: AffiliateUsageWhereInput | boolean
    connect?: AffiliateUsageWhereUniqueInput
    update?: XOR<XOR<AffiliateUsageUpdateToOneWithWhereWithoutPaymentInput, AffiliateUsageUpdateWithoutPaymentInput>, AffiliateUsageUncheckedUpdateWithoutPaymentInput>
  }

  export type UserCreateNestedOneWithoutAffiliateCodesInput = {
    create?: XOR<UserCreateWithoutAffiliateCodesInput, UserUncheckedCreateWithoutAffiliateCodesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAffiliateCodesInput
    connect?: UserWhereUniqueInput
  }

  export type AffiliateUsageCreateNestedManyWithoutAffiliateCodeInput = {
    create?: XOR<AffiliateUsageCreateWithoutAffiliateCodeInput, AffiliateUsageUncheckedCreateWithoutAffiliateCodeInput> | AffiliateUsageCreateWithoutAffiliateCodeInput[] | AffiliateUsageUncheckedCreateWithoutAffiliateCodeInput[]
    connectOrCreate?: AffiliateUsageCreateOrConnectWithoutAffiliateCodeInput | AffiliateUsageCreateOrConnectWithoutAffiliateCodeInput[]
    createMany?: AffiliateUsageCreateManyAffiliateCodeInputEnvelope
    connect?: AffiliateUsageWhereUniqueInput | AffiliateUsageWhereUniqueInput[]
  }

  export type AffiliateUsageUncheckedCreateNestedManyWithoutAffiliateCodeInput = {
    create?: XOR<AffiliateUsageCreateWithoutAffiliateCodeInput, AffiliateUsageUncheckedCreateWithoutAffiliateCodeInput> | AffiliateUsageCreateWithoutAffiliateCodeInput[] | AffiliateUsageUncheckedCreateWithoutAffiliateCodeInput[]
    connectOrCreate?: AffiliateUsageCreateOrConnectWithoutAffiliateCodeInput | AffiliateUsageCreateOrConnectWithoutAffiliateCodeInput[]
    createMany?: AffiliateUsageCreateManyAffiliateCodeInputEnvelope
    connect?: AffiliateUsageWhereUniqueInput | AffiliateUsageWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutAffiliateCodesNestedInput = {
    create?: XOR<UserCreateWithoutAffiliateCodesInput, UserUncheckedCreateWithoutAffiliateCodesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAffiliateCodesInput
    upsert?: UserUpsertWithoutAffiliateCodesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAffiliateCodesInput, UserUpdateWithoutAffiliateCodesInput>, UserUncheckedUpdateWithoutAffiliateCodesInput>
  }

  export type AffiliateUsageUpdateManyWithoutAffiliateCodeNestedInput = {
    create?: XOR<AffiliateUsageCreateWithoutAffiliateCodeInput, AffiliateUsageUncheckedCreateWithoutAffiliateCodeInput> | AffiliateUsageCreateWithoutAffiliateCodeInput[] | AffiliateUsageUncheckedCreateWithoutAffiliateCodeInput[]
    connectOrCreate?: AffiliateUsageCreateOrConnectWithoutAffiliateCodeInput | AffiliateUsageCreateOrConnectWithoutAffiliateCodeInput[]
    upsert?: AffiliateUsageUpsertWithWhereUniqueWithoutAffiliateCodeInput | AffiliateUsageUpsertWithWhereUniqueWithoutAffiliateCodeInput[]
    createMany?: AffiliateUsageCreateManyAffiliateCodeInputEnvelope
    set?: AffiliateUsageWhereUniqueInput | AffiliateUsageWhereUniqueInput[]
    disconnect?: AffiliateUsageWhereUniqueInput | AffiliateUsageWhereUniqueInput[]
    delete?: AffiliateUsageWhereUniqueInput | AffiliateUsageWhereUniqueInput[]
    connect?: AffiliateUsageWhereUniqueInput | AffiliateUsageWhereUniqueInput[]
    update?: AffiliateUsageUpdateWithWhereUniqueWithoutAffiliateCodeInput | AffiliateUsageUpdateWithWhereUniqueWithoutAffiliateCodeInput[]
    updateMany?: AffiliateUsageUpdateManyWithWhereWithoutAffiliateCodeInput | AffiliateUsageUpdateManyWithWhereWithoutAffiliateCodeInput[]
    deleteMany?: AffiliateUsageScalarWhereInput | AffiliateUsageScalarWhereInput[]
  }

  export type AffiliateUsageUncheckedUpdateManyWithoutAffiliateCodeNestedInput = {
    create?: XOR<AffiliateUsageCreateWithoutAffiliateCodeInput, AffiliateUsageUncheckedCreateWithoutAffiliateCodeInput> | AffiliateUsageCreateWithoutAffiliateCodeInput[] | AffiliateUsageUncheckedCreateWithoutAffiliateCodeInput[]
    connectOrCreate?: AffiliateUsageCreateOrConnectWithoutAffiliateCodeInput | AffiliateUsageCreateOrConnectWithoutAffiliateCodeInput[]
    upsert?: AffiliateUsageUpsertWithWhereUniqueWithoutAffiliateCodeInput | AffiliateUsageUpsertWithWhereUniqueWithoutAffiliateCodeInput[]
    createMany?: AffiliateUsageCreateManyAffiliateCodeInputEnvelope
    set?: AffiliateUsageWhereUniqueInput | AffiliateUsageWhereUniqueInput[]
    disconnect?: AffiliateUsageWhereUniqueInput | AffiliateUsageWhereUniqueInput[]
    delete?: AffiliateUsageWhereUniqueInput | AffiliateUsageWhereUniqueInput[]
    connect?: AffiliateUsageWhereUniqueInput | AffiliateUsageWhereUniqueInput[]
    update?: AffiliateUsageUpdateWithWhereUniqueWithoutAffiliateCodeInput | AffiliateUsageUpdateWithWhereUniqueWithoutAffiliateCodeInput[]
    updateMany?: AffiliateUsageUpdateManyWithWhereWithoutAffiliateCodeInput | AffiliateUsageUpdateManyWithWhereWithoutAffiliateCodeInput[]
    deleteMany?: AffiliateUsageScalarWhereInput | AffiliateUsageScalarWhereInput[]
  }

  export type AffiliateCodeCreateNestedOneWithoutUsagesInput = {
    create?: XOR<AffiliateCodeCreateWithoutUsagesInput, AffiliateCodeUncheckedCreateWithoutUsagesInput>
    connectOrCreate?: AffiliateCodeCreateOrConnectWithoutUsagesInput
    connect?: AffiliateCodeWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAffiliateUsagesInput = {
    create?: XOR<UserCreateWithoutAffiliateUsagesInput, UserUncheckedCreateWithoutAffiliateUsagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAffiliateUsagesInput
    connect?: UserWhereUniqueInput
  }

  export type PaymentCreateNestedOneWithoutAffiliateUsageInput = {
    create?: XOR<PaymentCreateWithoutAffiliateUsageInput, PaymentUncheckedCreateWithoutAffiliateUsageInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutAffiliateUsageInput
    connect?: PaymentWhereUniqueInput
  }

  export type AffiliateCodeUpdateOneRequiredWithoutUsagesNestedInput = {
    create?: XOR<AffiliateCodeCreateWithoutUsagesInput, AffiliateCodeUncheckedCreateWithoutUsagesInput>
    connectOrCreate?: AffiliateCodeCreateOrConnectWithoutUsagesInput
    upsert?: AffiliateCodeUpsertWithoutUsagesInput
    connect?: AffiliateCodeWhereUniqueInput
    update?: XOR<XOR<AffiliateCodeUpdateToOneWithWhereWithoutUsagesInput, AffiliateCodeUpdateWithoutUsagesInput>, AffiliateCodeUncheckedUpdateWithoutUsagesInput>
  }

  export type UserUpdateOneRequiredWithoutAffiliateUsagesNestedInput = {
    create?: XOR<UserCreateWithoutAffiliateUsagesInput, UserUncheckedCreateWithoutAffiliateUsagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAffiliateUsagesInput
    upsert?: UserUpsertWithoutAffiliateUsagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAffiliateUsagesInput, UserUpdateWithoutAffiliateUsagesInput>, UserUncheckedUpdateWithoutAffiliateUsagesInput>
  }

  export type PaymentUpdateOneRequiredWithoutAffiliateUsageNestedInput = {
    create?: XOR<PaymentCreateWithoutAffiliateUsageInput, PaymentUncheckedCreateWithoutAffiliateUsageInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutAffiliateUsageInput
    upsert?: PaymentUpsertWithoutAffiliateUsageInput
    connect?: PaymentWhereUniqueInput
    update?: XOR<XOR<PaymentUpdateToOneWithWhereWithoutAffiliateUsageInput, PaymentUpdateWithoutAffiliateUsageInput>, PaymentUncheckedUpdateWithoutAffiliateUsageInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumInvestmentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.InvestmentType | EnumInvestmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.InvestmentType[]
    notIn?: $Enums.InvestmentType[]
    not?: NestedEnumInvestmentTypeFilter<$PrismaModel> | $Enums.InvestmentType
  }

  export type NestedEnumInvestmentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InvestmentType | EnumInvestmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.InvestmentType[]
    notIn?: $Enums.InvestmentType[]
    not?: NestedEnumInvestmentTypeWithAggregatesFilter<$PrismaModel> | $Enums.InvestmentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInvestmentTypeFilter<$PrismaModel>
    _max?: NestedEnumInvestmentTypeFilter<$PrismaModel>
  }

  export type NestedEnumPaymentPlanFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentPlan | EnumPaymentPlanFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentPlan[]
    notIn?: $Enums.PaymentPlan[]
    not?: NestedEnumPaymentPlanFilter<$PrismaModel> | $Enums.PaymentPlan
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[]
    notIn?: $Enums.PaymentStatus[]
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedEnumPaymentPlanWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentPlan | EnumPaymentPlanFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentPlan[]
    notIn?: $Enums.PaymentPlan[]
    not?: NestedEnumPaymentPlanWithAggregatesFilter<$PrismaModel> | $Enums.PaymentPlan
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentPlanFilter<$PrismaModel>
    _max?: NestedEnumPaymentPlanFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[]
    notIn?: $Enums.PaymentStatus[]
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type ProtocolCreateWithoutUserInput = {
    id?: string
    name: string
    network: string
    officialUrl: string
    twitterHandle?: string | null
    farmStartDate?: Date | string | null
    dailyMissions?: boolean
    logoUrl?: string | null
    primaryColor?: string | null
    totalInvested?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    investments?: InvestmentCreateNestedManyWithoutProtocolInput
    tasks?: TaskCreateNestedManyWithoutProtocolInput
  }

  export type ProtocolUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    network: string
    officialUrl: string
    twitterHandle?: string | null
    farmStartDate?: Date | string | null
    dailyMissions?: boolean
    logoUrl?: string | null
    primaryColor?: string | null
    totalInvested?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    investments?: InvestmentUncheckedCreateNestedManyWithoutProtocolInput
    tasks?: TaskUncheckedCreateNestedManyWithoutProtocolInput
  }

  export type ProtocolCreateOrConnectWithoutUserInput = {
    where: ProtocolWhereUniqueInput
    create: XOR<ProtocolCreateWithoutUserInput, ProtocolUncheckedCreateWithoutUserInput>
  }

  export type ProtocolCreateManyUserInputEnvelope = {
    data: ProtocolCreateManyUserInput | ProtocolCreateManyUserInput[]
  }

  export type TaskCreateWithoutUserInput = {
    id?: string
    title: string
    description?: string | null
    isCompleted?: boolean
    isDaily?: boolean
    dueDate?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    protocol?: ProtocolCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    description?: string | null
    isCompleted?: boolean
    isDaily?: boolean
    dueDate?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    protocolId?: string | null
  }

  export type TaskCreateOrConnectWithoutUserInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput>
  }

  export type TaskCreateManyUserInputEnvelope = {
    data: TaskCreateManyUserInput | TaskCreateManyUserInput[]
  }

  export type PaymentCreateWithoutUserInput = {
    id?: string
    plan: $Enums.PaymentPlan
    amount: number
    originalAmount?: number | null
    discountAmount?: number | null
    affiliateCodeUsed?: string | null
    transactionHash?: string | null
    status?: $Enums.PaymentStatus
    verifiedAt?: Date | string | null
    validUntil: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    affiliateUsage?: AffiliateUsageCreateNestedOneWithoutPaymentInput
  }

  export type PaymentUncheckedCreateWithoutUserInput = {
    id?: string
    plan: $Enums.PaymentPlan
    amount: number
    originalAmount?: number | null
    discountAmount?: number | null
    affiliateCodeUsed?: string | null
    transactionHash?: string | null
    status?: $Enums.PaymentStatus
    verifiedAt?: Date | string | null
    validUntil: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    affiliateUsage?: AffiliateUsageUncheckedCreateNestedOneWithoutPaymentInput
  }

  export type PaymentCreateOrConnectWithoutUserInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput>
  }

  export type PaymentCreateManyUserInputEnvelope = {
    data: PaymentCreateManyUserInput | PaymentCreateManyUserInput[]
  }

  export type AffiliateCodeCreateWithoutCreatedByInput = {
    id?: string
    code: string
    influencerName: string
    influencerEmail?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    usages?: AffiliateUsageCreateNestedManyWithoutAffiliateCodeInput
  }

  export type AffiliateCodeUncheckedCreateWithoutCreatedByInput = {
    id?: string
    code: string
    influencerName: string
    influencerEmail?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    usages?: AffiliateUsageUncheckedCreateNestedManyWithoutAffiliateCodeInput
  }

  export type AffiliateCodeCreateOrConnectWithoutCreatedByInput = {
    where: AffiliateCodeWhereUniqueInput
    create: XOR<AffiliateCodeCreateWithoutCreatedByInput, AffiliateCodeUncheckedCreateWithoutCreatedByInput>
  }

  export type AffiliateCodeCreateManyCreatedByInputEnvelope = {
    data: AffiliateCodeCreateManyCreatedByInput | AffiliateCodeCreateManyCreatedByInput[]
  }

  export type AffiliateUsageCreateWithoutUserInput = {
    id?: string
    originalAmount: number
    discountAmount: number
    finalAmount: number
    commissionAmount: number
    createdAt?: Date | string
    affiliateCode: AffiliateCodeCreateNestedOneWithoutUsagesInput
    payment: PaymentCreateNestedOneWithoutAffiliateUsageInput
  }

  export type AffiliateUsageUncheckedCreateWithoutUserInput = {
    id?: string
    originalAmount: number
    discountAmount: number
    finalAmount: number
    commissionAmount: number
    createdAt?: Date | string
    affiliateCodeId: string
    paymentId: string
  }

  export type AffiliateUsageCreateOrConnectWithoutUserInput = {
    where: AffiliateUsageWhereUniqueInput
    create: XOR<AffiliateUsageCreateWithoutUserInput, AffiliateUsageUncheckedCreateWithoutUserInput>
  }

  export type AffiliateUsageCreateManyUserInputEnvelope = {
    data: AffiliateUsageCreateManyUserInput | AffiliateUsageCreateManyUserInput[]
  }

  export type ProtocolUpsertWithWhereUniqueWithoutUserInput = {
    where: ProtocolWhereUniqueInput
    update: XOR<ProtocolUpdateWithoutUserInput, ProtocolUncheckedUpdateWithoutUserInput>
    create: XOR<ProtocolCreateWithoutUserInput, ProtocolUncheckedCreateWithoutUserInput>
  }

  export type ProtocolUpdateWithWhereUniqueWithoutUserInput = {
    where: ProtocolWhereUniqueInput
    data: XOR<ProtocolUpdateWithoutUserInput, ProtocolUncheckedUpdateWithoutUserInput>
  }

  export type ProtocolUpdateManyWithWhereWithoutUserInput = {
    where: ProtocolScalarWhereInput
    data: XOR<ProtocolUpdateManyMutationInput, ProtocolUncheckedUpdateManyWithoutUserInput>
  }

  export type ProtocolScalarWhereInput = {
    AND?: ProtocolScalarWhereInput | ProtocolScalarWhereInput[]
    OR?: ProtocolScalarWhereInput[]
    NOT?: ProtocolScalarWhereInput | ProtocolScalarWhereInput[]
    id?: StringFilter<"Protocol"> | string
    name?: StringFilter<"Protocol"> | string
    network?: StringFilter<"Protocol"> | string
    officialUrl?: StringFilter<"Protocol"> | string
    twitterHandle?: StringNullableFilter<"Protocol"> | string | null
    farmStartDate?: DateTimeNullableFilter<"Protocol"> | Date | string | null
    dailyMissions?: BoolFilter<"Protocol"> | boolean
    logoUrl?: StringNullableFilter<"Protocol"> | string | null
    primaryColor?: StringNullableFilter<"Protocol"> | string | null
    totalInvested?: FloatFilter<"Protocol"> | number
    isActive?: BoolFilter<"Protocol"> | boolean
    createdAt?: DateTimeFilter<"Protocol"> | Date | string
    updatedAt?: DateTimeFilter<"Protocol"> | Date | string
    userId?: StringFilter<"Protocol"> | string
  }

  export type TaskUpsertWithWhereUniqueWithoutUserInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutUserInput, TaskUncheckedUpdateWithoutUserInput>
    create: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutUserInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutUserInput, TaskUncheckedUpdateWithoutUserInput>
  }

  export type TaskUpdateManyWithWhereWithoutUserInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutUserInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: StringFilter<"Task"> | string
    title?: StringFilter<"Task"> | string
    description?: StringNullableFilter<"Task"> | string | null
    isCompleted?: BoolFilter<"Task"> | boolean
    isDaily?: BoolFilter<"Task"> | boolean
    dueDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    userId?: StringFilter<"Task"> | string
    protocolId?: StringNullableFilter<"Task"> | string | null
  }

  export type PaymentUpsertWithWhereUniqueWithoutUserInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutUserInput, PaymentUncheckedUpdateWithoutUserInput>
    create: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutUserInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutUserInput, PaymentUncheckedUpdateWithoutUserInput>
  }

  export type PaymentUpdateManyWithWhereWithoutUserInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutUserInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: StringFilter<"Payment"> | string
    plan?: EnumPaymentPlanFilter<"Payment"> | $Enums.PaymentPlan
    amount?: FloatFilter<"Payment"> | number
    originalAmount?: FloatNullableFilter<"Payment"> | number | null
    discountAmount?: FloatNullableFilter<"Payment"> | number | null
    affiliateCodeUsed?: StringNullableFilter<"Payment"> | string | null
    transactionHash?: StringNullableFilter<"Payment"> | string | null
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    verifiedAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    validUntil?: DateTimeFilter<"Payment"> | Date | string
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    userId?: StringFilter<"Payment"> | string
  }

  export type AffiliateCodeUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: AffiliateCodeWhereUniqueInput
    update: XOR<AffiliateCodeUpdateWithoutCreatedByInput, AffiliateCodeUncheckedUpdateWithoutCreatedByInput>
    create: XOR<AffiliateCodeCreateWithoutCreatedByInput, AffiliateCodeUncheckedCreateWithoutCreatedByInput>
  }

  export type AffiliateCodeUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: AffiliateCodeWhereUniqueInput
    data: XOR<AffiliateCodeUpdateWithoutCreatedByInput, AffiliateCodeUncheckedUpdateWithoutCreatedByInput>
  }

  export type AffiliateCodeUpdateManyWithWhereWithoutCreatedByInput = {
    where: AffiliateCodeScalarWhereInput
    data: XOR<AffiliateCodeUpdateManyMutationInput, AffiliateCodeUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type AffiliateCodeScalarWhereInput = {
    AND?: AffiliateCodeScalarWhereInput | AffiliateCodeScalarWhereInput[]
    OR?: AffiliateCodeScalarWhereInput[]
    NOT?: AffiliateCodeScalarWhereInput | AffiliateCodeScalarWhereInput[]
    id?: StringFilter<"AffiliateCode"> | string
    code?: StringFilter<"AffiliateCode"> | string
    influencerName?: StringFilter<"AffiliateCode"> | string
    influencerEmail?: StringNullableFilter<"AffiliateCode"> | string | null
    isActive?: BoolFilter<"AffiliateCode"> | boolean
    createdAt?: DateTimeFilter<"AffiliateCode"> | Date | string
    updatedAt?: DateTimeFilter<"AffiliateCode"> | Date | string
    createdByUserId?: StringFilter<"AffiliateCode"> | string
  }

  export type AffiliateUsageUpsertWithWhereUniqueWithoutUserInput = {
    where: AffiliateUsageWhereUniqueInput
    update: XOR<AffiliateUsageUpdateWithoutUserInput, AffiliateUsageUncheckedUpdateWithoutUserInput>
    create: XOR<AffiliateUsageCreateWithoutUserInput, AffiliateUsageUncheckedCreateWithoutUserInput>
  }

  export type AffiliateUsageUpdateWithWhereUniqueWithoutUserInput = {
    where: AffiliateUsageWhereUniqueInput
    data: XOR<AffiliateUsageUpdateWithoutUserInput, AffiliateUsageUncheckedUpdateWithoutUserInput>
  }

  export type AffiliateUsageUpdateManyWithWhereWithoutUserInput = {
    where: AffiliateUsageScalarWhereInput
    data: XOR<AffiliateUsageUpdateManyMutationInput, AffiliateUsageUncheckedUpdateManyWithoutUserInput>
  }

  export type AffiliateUsageScalarWhereInput = {
    AND?: AffiliateUsageScalarWhereInput | AffiliateUsageScalarWhereInput[]
    OR?: AffiliateUsageScalarWhereInput[]
    NOT?: AffiliateUsageScalarWhereInput | AffiliateUsageScalarWhereInput[]
    id?: StringFilter<"AffiliateUsage"> | string
    originalAmount?: FloatFilter<"AffiliateUsage"> | number
    discountAmount?: FloatFilter<"AffiliateUsage"> | number
    finalAmount?: FloatFilter<"AffiliateUsage"> | number
    commissionAmount?: FloatFilter<"AffiliateUsage"> | number
    createdAt?: DateTimeFilter<"AffiliateUsage"> | Date | string
    affiliateCodeId?: StringFilter<"AffiliateUsage"> | string
    userId?: StringFilter<"AffiliateUsage"> | string
    paymentId?: StringFilter<"AffiliateUsage"> | string
  }

  export type UserCreateWithoutProtocolsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    isPremium?: boolean
    premiumUntil?: Date | string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    affiliateCodes?: AffiliateCodeCreateNestedManyWithoutCreatedByInput
    affiliateUsages?: AffiliateUsageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProtocolsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    isPremium?: boolean
    premiumUntil?: Date | string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    affiliateCodes?: AffiliateCodeUncheckedCreateNestedManyWithoutCreatedByInput
    affiliateUsages?: AffiliateUsageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProtocolsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProtocolsInput, UserUncheckedCreateWithoutProtocolsInput>
  }

  export type InvestmentCreateWithoutProtocolInput = {
    id?: string
    amount: number
    type: $Enums.InvestmentType
    date: Date | string
    description?: string | null
    createdAt?: Date | string
  }

  export type InvestmentUncheckedCreateWithoutProtocolInput = {
    id?: string
    amount: number
    type: $Enums.InvestmentType
    date: Date | string
    description?: string | null
    createdAt?: Date | string
  }

  export type InvestmentCreateOrConnectWithoutProtocolInput = {
    where: InvestmentWhereUniqueInput
    create: XOR<InvestmentCreateWithoutProtocolInput, InvestmentUncheckedCreateWithoutProtocolInput>
  }

  export type InvestmentCreateManyProtocolInputEnvelope = {
    data: InvestmentCreateManyProtocolInput | InvestmentCreateManyProtocolInput[]
  }

  export type TaskCreateWithoutProtocolInput = {
    id?: string
    title: string
    description?: string | null
    isCompleted?: boolean
    isDaily?: boolean
    dueDate?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateWithoutProtocolInput = {
    id?: string
    title: string
    description?: string | null
    isCompleted?: boolean
    isDaily?: boolean
    dueDate?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type TaskCreateOrConnectWithoutProtocolInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutProtocolInput, TaskUncheckedCreateWithoutProtocolInput>
  }

  export type TaskCreateManyProtocolInputEnvelope = {
    data: TaskCreateManyProtocolInput | TaskCreateManyProtocolInput[]
  }

  export type UserUpsertWithoutProtocolsInput = {
    update: XOR<UserUpdateWithoutProtocolsInput, UserUncheckedUpdateWithoutProtocolsInput>
    create: XOR<UserCreateWithoutProtocolsInput, UserUncheckedCreateWithoutProtocolsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProtocolsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProtocolsInput, UserUncheckedUpdateWithoutProtocolsInput>
  }

  export type UserUpdateWithoutProtocolsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    affiliateCodes?: AffiliateCodeUpdateManyWithoutCreatedByNestedInput
    affiliateUsages?: AffiliateUsageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProtocolsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    affiliateCodes?: AffiliateCodeUncheckedUpdateManyWithoutCreatedByNestedInput
    affiliateUsages?: AffiliateUsageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type InvestmentUpsertWithWhereUniqueWithoutProtocolInput = {
    where: InvestmentWhereUniqueInput
    update: XOR<InvestmentUpdateWithoutProtocolInput, InvestmentUncheckedUpdateWithoutProtocolInput>
    create: XOR<InvestmentCreateWithoutProtocolInput, InvestmentUncheckedCreateWithoutProtocolInput>
  }

  export type InvestmentUpdateWithWhereUniqueWithoutProtocolInput = {
    where: InvestmentWhereUniqueInput
    data: XOR<InvestmentUpdateWithoutProtocolInput, InvestmentUncheckedUpdateWithoutProtocolInput>
  }

  export type InvestmentUpdateManyWithWhereWithoutProtocolInput = {
    where: InvestmentScalarWhereInput
    data: XOR<InvestmentUpdateManyMutationInput, InvestmentUncheckedUpdateManyWithoutProtocolInput>
  }

  export type InvestmentScalarWhereInput = {
    AND?: InvestmentScalarWhereInput | InvestmentScalarWhereInput[]
    OR?: InvestmentScalarWhereInput[]
    NOT?: InvestmentScalarWhereInput | InvestmentScalarWhereInput[]
    id?: StringFilter<"Investment"> | string
    amount?: FloatFilter<"Investment"> | number
    type?: EnumInvestmentTypeFilter<"Investment"> | $Enums.InvestmentType
    date?: DateTimeFilter<"Investment"> | Date | string
    description?: StringNullableFilter<"Investment"> | string | null
    createdAt?: DateTimeFilter<"Investment"> | Date | string
    protocolId?: StringFilter<"Investment"> | string
  }

  export type TaskUpsertWithWhereUniqueWithoutProtocolInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutProtocolInput, TaskUncheckedUpdateWithoutProtocolInput>
    create: XOR<TaskCreateWithoutProtocolInput, TaskUncheckedCreateWithoutProtocolInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutProtocolInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutProtocolInput, TaskUncheckedUpdateWithoutProtocolInput>
  }

  export type TaskUpdateManyWithWhereWithoutProtocolInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutProtocolInput>
  }

  export type ProtocolCreateWithoutInvestmentsInput = {
    id?: string
    name: string
    network: string
    officialUrl: string
    twitterHandle?: string | null
    farmStartDate?: Date | string | null
    dailyMissions?: boolean
    logoUrl?: string | null
    primaryColor?: string | null
    totalInvested?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProtocolsInput
    tasks?: TaskCreateNestedManyWithoutProtocolInput
  }

  export type ProtocolUncheckedCreateWithoutInvestmentsInput = {
    id?: string
    name: string
    network: string
    officialUrl: string
    twitterHandle?: string | null
    farmStartDate?: Date | string | null
    dailyMissions?: boolean
    logoUrl?: string | null
    primaryColor?: string | null
    totalInvested?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    tasks?: TaskUncheckedCreateNestedManyWithoutProtocolInput
  }

  export type ProtocolCreateOrConnectWithoutInvestmentsInput = {
    where: ProtocolWhereUniqueInput
    create: XOR<ProtocolCreateWithoutInvestmentsInput, ProtocolUncheckedCreateWithoutInvestmentsInput>
  }

  export type ProtocolUpsertWithoutInvestmentsInput = {
    update: XOR<ProtocolUpdateWithoutInvestmentsInput, ProtocolUncheckedUpdateWithoutInvestmentsInput>
    create: XOR<ProtocolCreateWithoutInvestmentsInput, ProtocolUncheckedCreateWithoutInvestmentsInput>
    where?: ProtocolWhereInput
  }

  export type ProtocolUpdateToOneWithWhereWithoutInvestmentsInput = {
    where?: ProtocolWhereInput
    data: XOR<ProtocolUpdateWithoutInvestmentsInput, ProtocolUncheckedUpdateWithoutInvestmentsInput>
  }

  export type ProtocolUpdateWithoutInvestmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    officialUrl?: StringFieldUpdateOperationsInput | string
    twitterHandle?: NullableStringFieldUpdateOperationsInput | string | null
    farmStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dailyMissions?: BoolFieldUpdateOperationsInput | boolean
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    totalInvested?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProtocolsNestedInput
    tasks?: TaskUpdateManyWithoutProtocolNestedInput
  }

  export type ProtocolUncheckedUpdateWithoutInvestmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    officialUrl?: StringFieldUpdateOperationsInput | string
    twitterHandle?: NullableStringFieldUpdateOperationsInput | string | null
    farmStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dailyMissions?: BoolFieldUpdateOperationsInput | boolean
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    totalInvested?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUncheckedUpdateManyWithoutProtocolNestedInput
  }

  export type UserCreateWithoutTasksInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    isPremium?: boolean
    premiumUntil?: Date | string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    protocols?: ProtocolCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    affiliateCodes?: AffiliateCodeCreateNestedManyWithoutCreatedByInput
    affiliateUsages?: AffiliateUsageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTasksInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    isPremium?: boolean
    premiumUntil?: Date | string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    protocols?: ProtocolUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    affiliateCodes?: AffiliateCodeUncheckedCreateNestedManyWithoutCreatedByInput
    affiliateUsages?: AffiliateUsageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTasksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
  }

  export type ProtocolCreateWithoutTasksInput = {
    id?: string
    name: string
    network: string
    officialUrl: string
    twitterHandle?: string | null
    farmStartDate?: Date | string | null
    dailyMissions?: boolean
    logoUrl?: string | null
    primaryColor?: string | null
    totalInvested?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProtocolsInput
    investments?: InvestmentCreateNestedManyWithoutProtocolInput
  }

  export type ProtocolUncheckedCreateWithoutTasksInput = {
    id?: string
    name: string
    network: string
    officialUrl: string
    twitterHandle?: string | null
    farmStartDate?: Date | string | null
    dailyMissions?: boolean
    logoUrl?: string | null
    primaryColor?: string | null
    totalInvested?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    investments?: InvestmentUncheckedCreateNestedManyWithoutProtocolInput
  }

  export type ProtocolCreateOrConnectWithoutTasksInput = {
    where: ProtocolWhereUniqueInput
    create: XOR<ProtocolCreateWithoutTasksInput, ProtocolUncheckedCreateWithoutTasksInput>
  }

  export type UserUpsertWithoutTasksInput = {
    update: XOR<UserUpdateWithoutTasksInput, UserUncheckedUpdateWithoutTasksInput>
    create: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTasksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTasksInput, UserUncheckedUpdateWithoutTasksInput>
  }

  export type UserUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    protocols?: ProtocolUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    affiliateCodes?: AffiliateCodeUpdateManyWithoutCreatedByNestedInput
    affiliateUsages?: AffiliateUsageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    protocols?: ProtocolUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    affiliateCodes?: AffiliateCodeUncheckedUpdateManyWithoutCreatedByNestedInput
    affiliateUsages?: AffiliateUsageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProtocolUpsertWithoutTasksInput = {
    update: XOR<ProtocolUpdateWithoutTasksInput, ProtocolUncheckedUpdateWithoutTasksInput>
    create: XOR<ProtocolCreateWithoutTasksInput, ProtocolUncheckedCreateWithoutTasksInput>
    where?: ProtocolWhereInput
  }

  export type ProtocolUpdateToOneWithWhereWithoutTasksInput = {
    where?: ProtocolWhereInput
    data: XOR<ProtocolUpdateWithoutTasksInput, ProtocolUncheckedUpdateWithoutTasksInput>
  }

  export type ProtocolUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    officialUrl?: StringFieldUpdateOperationsInput | string
    twitterHandle?: NullableStringFieldUpdateOperationsInput | string | null
    farmStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dailyMissions?: BoolFieldUpdateOperationsInput | boolean
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    totalInvested?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProtocolsNestedInput
    investments?: InvestmentUpdateManyWithoutProtocolNestedInput
  }

  export type ProtocolUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    officialUrl?: StringFieldUpdateOperationsInput | string
    twitterHandle?: NullableStringFieldUpdateOperationsInput | string | null
    farmStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dailyMissions?: BoolFieldUpdateOperationsInput | boolean
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    totalInvested?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    investments?: InvestmentUncheckedUpdateManyWithoutProtocolNestedInput
  }

  export type UserCreateWithoutPaymentsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    isPremium?: boolean
    premiumUntil?: Date | string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    protocols?: ProtocolCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    affiliateCodes?: AffiliateCodeCreateNestedManyWithoutCreatedByInput
    affiliateUsages?: AffiliateUsageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPaymentsInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    isPremium?: boolean
    premiumUntil?: Date | string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    protocols?: ProtocolUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    affiliateCodes?: AffiliateCodeUncheckedCreateNestedManyWithoutCreatedByInput
    affiliateUsages?: AffiliateUsageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPaymentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
  }

  export type AffiliateUsageCreateWithoutPaymentInput = {
    id?: string
    originalAmount: number
    discountAmount: number
    finalAmount: number
    commissionAmount: number
    createdAt?: Date | string
    affiliateCode: AffiliateCodeCreateNestedOneWithoutUsagesInput
    user: UserCreateNestedOneWithoutAffiliateUsagesInput
  }

  export type AffiliateUsageUncheckedCreateWithoutPaymentInput = {
    id?: string
    originalAmount: number
    discountAmount: number
    finalAmount: number
    commissionAmount: number
    createdAt?: Date | string
    affiliateCodeId: string
    userId: string
  }

  export type AffiliateUsageCreateOrConnectWithoutPaymentInput = {
    where: AffiliateUsageWhereUniqueInput
    create: XOR<AffiliateUsageCreateWithoutPaymentInput, AffiliateUsageUncheckedCreateWithoutPaymentInput>
  }

  export type UserUpsertWithoutPaymentsInput = {
    update: XOR<UserUpdateWithoutPaymentsInput, UserUncheckedUpdateWithoutPaymentsInput>
    create: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPaymentsInput, UserUncheckedUpdateWithoutPaymentsInput>
  }

  export type UserUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    protocols?: ProtocolUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    affiliateCodes?: AffiliateCodeUpdateManyWithoutCreatedByNestedInput
    affiliateUsages?: AffiliateUsageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    protocols?: ProtocolUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    affiliateCodes?: AffiliateCodeUncheckedUpdateManyWithoutCreatedByNestedInput
    affiliateUsages?: AffiliateUsageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AffiliateUsageUpsertWithoutPaymentInput = {
    update: XOR<AffiliateUsageUpdateWithoutPaymentInput, AffiliateUsageUncheckedUpdateWithoutPaymentInput>
    create: XOR<AffiliateUsageCreateWithoutPaymentInput, AffiliateUsageUncheckedCreateWithoutPaymentInput>
    where?: AffiliateUsageWhereInput
  }

  export type AffiliateUsageUpdateToOneWithWhereWithoutPaymentInput = {
    where?: AffiliateUsageWhereInput
    data: XOR<AffiliateUsageUpdateWithoutPaymentInput, AffiliateUsageUncheckedUpdateWithoutPaymentInput>
  }

  export type AffiliateUsageUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    commissionAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affiliateCode?: AffiliateCodeUpdateOneRequiredWithoutUsagesNestedInput
    user?: UserUpdateOneRequiredWithoutAffiliateUsagesNestedInput
  }

  export type AffiliateUsageUncheckedUpdateWithoutPaymentInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    commissionAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affiliateCodeId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateWithoutAffiliateCodesInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    isPremium?: boolean
    premiumUntil?: Date | string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    protocols?: ProtocolCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    affiliateUsages?: AffiliateUsageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAffiliateCodesInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    isPremium?: boolean
    premiumUntil?: Date | string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    protocols?: ProtocolUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    affiliateUsages?: AffiliateUsageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAffiliateCodesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAffiliateCodesInput, UserUncheckedCreateWithoutAffiliateCodesInput>
  }

  export type AffiliateUsageCreateWithoutAffiliateCodeInput = {
    id?: string
    originalAmount: number
    discountAmount: number
    finalAmount: number
    commissionAmount: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutAffiliateUsagesInput
    payment: PaymentCreateNestedOneWithoutAffiliateUsageInput
  }

  export type AffiliateUsageUncheckedCreateWithoutAffiliateCodeInput = {
    id?: string
    originalAmount: number
    discountAmount: number
    finalAmount: number
    commissionAmount: number
    createdAt?: Date | string
    userId: string
    paymentId: string
  }

  export type AffiliateUsageCreateOrConnectWithoutAffiliateCodeInput = {
    where: AffiliateUsageWhereUniqueInput
    create: XOR<AffiliateUsageCreateWithoutAffiliateCodeInput, AffiliateUsageUncheckedCreateWithoutAffiliateCodeInput>
  }

  export type AffiliateUsageCreateManyAffiliateCodeInputEnvelope = {
    data: AffiliateUsageCreateManyAffiliateCodeInput | AffiliateUsageCreateManyAffiliateCodeInput[]
  }

  export type UserUpsertWithoutAffiliateCodesInput = {
    update: XOR<UserUpdateWithoutAffiliateCodesInput, UserUncheckedUpdateWithoutAffiliateCodesInput>
    create: XOR<UserCreateWithoutAffiliateCodesInput, UserUncheckedCreateWithoutAffiliateCodesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAffiliateCodesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAffiliateCodesInput, UserUncheckedUpdateWithoutAffiliateCodesInput>
  }

  export type UserUpdateWithoutAffiliateCodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    protocols?: ProtocolUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    affiliateUsages?: AffiliateUsageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAffiliateCodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    protocols?: ProtocolUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    affiliateUsages?: AffiliateUsageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AffiliateUsageUpsertWithWhereUniqueWithoutAffiliateCodeInput = {
    where: AffiliateUsageWhereUniqueInput
    update: XOR<AffiliateUsageUpdateWithoutAffiliateCodeInput, AffiliateUsageUncheckedUpdateWithoutAffiliateCodeInput>
    create: XOR<AffiliateUsageCreateWithoutAffiliateCodeInput, AffiliateUsageUncheckedCreateWithoutAffiliateCodeInput>
  }

  export type AffiliateUsageUpdateWithWhereUniqueWithoutAffiliateCodeInput = {
    where: AffiliateUsageWhereUniqueInput
    data: XOR<AffiliateUsageUpdateWithoutAffiliateCodeInput, AffiliateUsageUncheckedUpdateWithoutAffiliateCodeInput>
  }

  export type AffiliateUsageUpdateManyWithWhereWithoutAffiliateCodeInput = {
    where: AffiliateUsageScalarWhereInput
    data: XOR<AffiliateUsageUpdateManyMutationInput, AffiliateUsageUncheckedUpdateManyWithoutAffiliateCodeInput>
  }

  export type AffiliateCodeCreateWithoutUsagesInput = {
    id?: string
    code: string
    influencerName: string
    influencerEmail?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutAffiliateCodesInput
  }

  export type AffiliateCodeUncheckedCreateWithoutUsagesInput = {
    id?: string
    code: string
    influencerName: string
    influencerEmail?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    createdByUserId: string
  }

  export type AffiliateCodeCreateOrConnectWithoutUsagesInput = {
    where: AffiliateCodeWhereUniqueInput
    create: XOR<AffiliateCodeCreateWithoutUsagesInput, AffiliateCodeUncheckedCreateWithoutUsagesInput>
  }

  export type UserCreateWithoutAffiliateUsagesInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    isPremium?: boolean
    premiumUntil?: Date | string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    protocols?: ProtocolCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    affiliateCodes?: AffiliateCodeCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutAffiliateUsagesInput = {
    id?: string
    email: string
    password: string
    name?: string | null
    isPremium?: boolean
    premiumUntil?: Date | string | null
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    protocols?: ProtocolUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    affiliateCodes?: AffiliateCodeUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutAffiliateUsagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAffiliateUsagesInput, UserUncheckedCreateWithoutAffiliateUsagesInput>
  }

  export type PaymentCreateWithoutAffiliateUsageInput = {
    id?: string
    plan: $Enums.PaymentPlan
    amount: number
    originalAmount?: number | null
    discountAmount?: number | null
    affiliateCodeUsed?: string | null
    transactionHash?: string | null
    status?: $Enums.PaymentStatus
    verifiedAt?: Date | string | null
    validUntil: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateWithoutAffiliateUsageInput = {
    id?: string
    plan: $Enums.PaymentPlan
    amount: number
    originalAmount?: number | null
    discountAmount?: number | null
    affiliateCodeUsed?: string | null
    transactionHash?: string | null
    status?: $Enums.PaymentStatus
    verifiedAt?: Date | string | null
    validUntil: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type PaymentCreateOrConnectWithoutAffiliateUsageInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutAffiliateUsageInput, PaymentUncheckedCreateWithoutAffiliateUsageInput>
  }

  export type AffiliateCodeUpsertWithoutUsagesInput = {
    update: XOR<AffiliateCodeUpdateWithoutUsagesInput, AffiliateCodeUncheckedUpdateWithoutUsagesInput>
    create: XOR<AffiliateCodeCreateWithoutUsagesInput, AffiliateCodeUncheckedCreateWithoutUsagesInput>
    where?: AffiliateCodeWhereInput
  }

  export type AffiliateCodeUpdateToOneWithWhereWithoutUsagesInput = {
    where?: AffiliateCodeWhereInput
    data: XOR<AffiliateCodeUpdateWithoutUsagesInput, AffiliateCodeUncheckedUpdateWithoutUsagesInput>
  }

  export type AffiliateCodeUpdateWithoutUsagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    influencerName?: StringFieldUpdateOperationsInput | string
    influencerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutAffiliateCodesNestedInput
  }

  export type AffiliateCodeUncheckedUpdateWithoutUsagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    influencerName?: StringFieldUpdateOperationsInput | string
    influencerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdByUserId?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpsertWithoutAffiliateUsagesInput = {
    update: XOR<UserUpdateWithoutAffiliateUsagesInput, UserUncheckedUpdateWithoutAffiliateUsagesInput>
    create: XOR<UserCreateWithoutAffiliateUsagesInput, UserUncheckedCreateWithoutAffiliateUsagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAffiliateUsagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAffiliateUsagesInput, UserUncheckedUpdateWithoutAffiliateUsagesInput>
  }

  export type UserUpdateWithoutAffiliateUsagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    protocols?: ProtocolUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    affiliateCodes?: AffiliateCodeUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutAffiliateUsagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    isPremium?: BoolFieldUpdateOperationsInput | boolean
    premiumUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    protocols?: ProtocolUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    affiliateCodes?: AffiliateCodeUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type PaymentUpsertWithoutAffiliateUsageInput = {
    update: XOR<PaymentUpdateWithoutAffiliateUsageInput, PaymentUncheckedUpdateWithoutAffiliateUsageInput>
    create: XOR<PaymentCreateWithoutAffiliateUsageInput, PaymentUncheckedCreateWithoutAffiliateUsageInput>
    where?: PaymentWhereInput
  }

  export type PaymentUpdateToOneWithWhereWithoutAffiliateUsageInput = {
    where?: PaymentWhereInput
    data: XOR<PaymentUpdateWithoutAffiliateUsageInput, PaymentUncheckedUpdateWithoutAffiliateUsageInput>
  }

  export type PaymentUpdateWithoutAffiliateUsageInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: EnumPaymentPlanFieldUpdateOperationsInput | $Enums.PaymentPlan
    amount?: FloatFieldUpdateOperationsInput | number
    originalAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    discountAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    affiliateCodeUsed?: NullableStringFieldUpdateOperationsInput | string | null
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    validUntil?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateWithoutAffiliateUsageInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: EnumPaymentPlanFieldUpdateOperationsInput | $Enums.PaymentPlan
    amount?: FloatFieldUpdateOperationsInput | number
    originalAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    discountAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    affiliateCodeUsed?: NullableStringFieldUpdateOperationsInput | string | null
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    validUntil?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ProtocolCreateManyUserInput = {
    id?: string
    name: string
    network: string
    officialUrl: string
    twitterHandle?: string | null
    farmStartDate?: Date | string | null
    dailyMissions?: boolean
    logoUrl?: string | null
    primaryColor?: string | null
    totalInvested?: number
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TaskCreateManyUserInput = {
    id?: string
    title: string
    description?: string | null
    isCompleted?: boolean
    isDaily?: boolean
    dueDate?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    protocolId?: string | null
  }

  export type PaymentCreateManyUserInput = {
    id?: string
    plan: $Enums.PaymentPlan
    amount: number
    originalAmount?: number | null
    discountAmount?: number | null
    affiliateCodeUsed?: string | null
    transactionHash?: string | null
    status?: $Enums.PaymentStatus
    verifiedAt?: Date | string | null
    validUntil: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AffiliateCodeCreateManyCreatedByInput = {
    id?: string
    code: string
    influencerName: string
    influencerEmail?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AffiliateUsageCreateManyUserInput = {
    id?: string
    originalAmount: number
    discountAmount: number
    finalAmount: number
    commissionAmount: number
    createdAt?: Date | string
    affiliateCodeId: string
    paymentId: string
  }

  export type ProtocolUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    officialUrl?: StringFieldUpdateOperationsInput | string
    twitterHandle?: NullableStringFieldUpdateOperationsInput | string | null
    farmStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dailyMissions?: BoolFieldUpdateOperationsInput | boolean
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    totalInvested?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    investments?: InvestmentUpdateManyWithoutProtocolNestedInput
    tasks?: TaskUpdateManyWithoutProtocolNestedInput
  }

  export type ProtocolUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    officialUrl?: StringFieldUpdateOperationsInput | string
    twitterHandle?: NullableStringFieldUpdateOperationsInput | string | null
    farmStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dailyMissions?: BoolFieldUpdateOperationsInput | boolean
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    totalInvested?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    investments?: InvestmentUncheckedUpdateManyWithoutProtocolNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutProtocolNestedInput
  }

  export type ProtocolUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    network?: StringFieldUpdateOperationsInput | string
    officialUrl?: StringFieldUpdateOperationsInput | string
    twitterHandle?: NullableStringFieldUpdateOperationsInput | string | null
    farmStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dailyMissions?: BoolFieldUpdateOperationsInput | boolean
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    totalInvested?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isDaily?: BoolFieldUpdateOperationsInput | boolean
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    protocol?: ProtocolUpdateOneWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isDaily?: BoolFieldUpdateOperationsInput | boolean
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    protocolId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isDaily?: BoolFieldUpdateOperationsInput | boolean
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    protocolId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaymentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: EnumPaymentPlanFieldUpdateOperationsInput | $Enums.PaymentPlan
    amount?: FloatFieldUpdateOperationsInput | number
    originalAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    discountAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    affiliateCodeUsed?: NullableStringFieldUpdateOperationsInput | string | null
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    validUntil?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affiliateUsage?: AffiliateUsageUpdateOneWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: EnumPaymentPlanFieldUpdateOperationsInput | $Enums.PaymentPlan
    amount?: FloatFieldUpdateOperationsInput | number
    originalAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    discountAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    affiliateCodeUsed?: NullableStringFieldUpdateOperationsInput | string | null
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    validUntil?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affiliateUsage?: AffiliateUsageUncheckedUpdateOneWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    plan?: EnumPaymentPlanFieldUpdateOperationsInput | $Enums.PaymentPlan
    amount?: FloatFieldUpdateOperationsInput | number
    originalAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    discountAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    affiliateCodeUsed?: NullableStringFieldUpdateOperationsInput | string | null
    transactionHash?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    verifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    validUntil?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliateCodeUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    influencerName?: StringFieldUpdateOperationsInput | string
    influencerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usages?: AffiliateUsageUpdateManyWithoutAffiliateCodeNestedInput
  }

  export type AffiliateCodeUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    influencerName?: StringFieldUpdateOperationsInput | string
    influencerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usages?: AffiliateUsageUncheckedUpdateManyWithoutAffiliateCodeNestedInput
  }

  export type AffiliateCodeUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    influencerName?: StringFieldUpdateOperationsInput | string
    influencerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AffiliateUsageUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    commissionAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affiliateCode?: AffiliateCodeUpdateOneRequiredWithoutUsagesNestedInput
    payment?: PaymentUpdateOneRequiredWithoutAffiliateUsageNestedInput
  }

  export type AffiliateUsageUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    commissionAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affiliateCodeId?: StringFieldUpdateOperationsInput | string
    paymentId?: StringFieldUpdateOperationsInput | string
  }

  export type AffiliateUsageUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    commissionAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    affiliateCodeId?: StringFieldUpdateOperationsInput | string
    paymentId?: StringFieldUpdateOperationsInput | string
  }

  export type InvestmentCreateManyProtocolInput = {
    id?: string
    amount: number
    type: $Enums.InvestmentType
    date: Date | string
    description?: string | null
    createdAt?: Date | string
  }

  export type TaskCreateManyProtocolInput = {
    id?: string
    title: string
    description?: string | null
    isCompleted?: boolean
    isDaily?: boolean
    dueDate?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type InvestmentUpdateWithoutProtocolInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumInvestmentTypeFieldUpdateOperationsInput | $Enums.InvestmentType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvestmentUncheckedUpdateWithoutProtocolInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumInvestmentTypeFieldUpdateOperationsInput | $Enums.InvestmentType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvestmentUncheckedUpdateManyWithoutProtocolInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumInvestmentTypeFieldUpdateOperationsInput | $Enums.InvestmentType
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskUpdateWithoutProtocolInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isDaily?: BoolFieldUpdateOperationsInput | boolean
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutProtocolInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isDaily?: BoolFieldUpdateOperationsInput | boolean
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskUncheckedUpdateManyWithoutProtocolInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    isDaily?: BoolFieldUpdateOperationsInput | boolean
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AffiliateUsageCreateManyAffiliateCodeInput = {
    id?: string
    originalAmount: number
    discountAmount: number
    finalAmount: number
    commissionAmount: number
    createdAt?: Date | string
    userId: string
    paymentId: string
  }

  export type AffiliateUsageUpdateWithoutAffiliateCodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    commissionAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAffiliateUsagesNestedInput
    payment?: PaymentUpdateOneRequiredWithoutAffiliateUsageNestedInput
  }

  export type AffiliateUsageUncheckedUpdateWithoutAffiliateCodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    commissionAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    paymentId?: StringFieldUpdateOperationsInput | string
  }

  export type AffiliateUsageUncheckedUpdateManyWithoutAffiliateCodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalAmount?: FloatFieldUpdateOperationsInput | number
    discountAmount?: FloatFieldUpdateOperationsInput | number
    finalAmount?: FloatFieldUpdateOperationsInput | number
    commissionAmount?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    paymentId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}