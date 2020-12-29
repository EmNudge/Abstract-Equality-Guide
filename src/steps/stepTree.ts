function getType(val: any) {
  if (val === null) return 'null';
  const type = typeof val;
  
  if (type === 'function') return 'object';
  return type;
}

const True = () => true;
const False = () => false;

export interface Step {
  cond: (x: any, y: any) => boolean,
  do: ((x: any, y: any) => boolean | { x: any, y: any }) 
    | (() => boolean)
    | Step[];
}

type typeofType = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "null";

const isType = (type1: typeofType, type2: typeofType) => 
  (x: any, y: any) => getType(x) === type1 && getType(y) === type2;

export const stepTree: Step[] = [
  {
    cond: (x, y) => getType(x) === getType(y),
    do: (x, y) => x === y,
  },
  {
    cond: isType('null', 'undefined'),
    do: True,
  },
  {
    cond: isType('undefined', 'null'),
    do: True,
  },
  {
    cond: isType('number', 'string'),
    do: (x, y) => ({ x, y: Number(y) }),
  },
  {
    cond: isType('string', 'number'),
    do: (x, y) => ({ x: Number(x), y }),
  },
  {
    cond: isType('bigint', 'string'),
    do: [
      {
        cond: (_x, y) => {
          // exit early if can't be converted to bigint
          try {
            BigInt(y);
            return false;
          } catch(e) {
            return true;
          }
        },
        do: () => false,
      },
      {
        cond: () => true,
        do: (x, y) => {
          // no need for try/catch since we already tested this
          try {
            return { x, y: BigInt(y) };
          } catch(e) {
            return false;
          }
        }
      },
    ],
  },
  {
    cond: isType('string', 'bigint'),
    do: (x, y) => ({ x: y, y: x }),
  },
  {
    cond: (x, _y) => getType(x) === 'boolean',
    do: (x, y) => ({ x: Number(x), y }),
  },
  {
    cond: (_x, y) => getType(y) === 'boolean',
    do: (x, y) => ({ x, y: Number(y) }),
  },
  {
    cond: (x, y) => ['string', 'number', 'bigint', 'symbol'].includes(getType(x)) && getType(y) === 'object',
    do: (x, y) => ({ x, y: toPrimitive(y) }),
  },
  {
    cond: (x, y) => getType(x) === 'object' && ['string', 'number', 'bigint', 'symbol'].includes(getType(y)),
    do: (x, y) => ({ x: toPrimitive(x), y }),
  },
  {
    cond: (x, y) => ['number', 'bigint'].includes(getType(x)) && ['number', 'bigint'].includes(getType(y)),
    do: [
      {
        cond: (x, y) => {
          const vals = [NaN, Infinity, -Infinity];
          return vals.includes(x) || vals.includes(y);
        },
        do: False,
      },
      {
        cond: (x, y) => x === BigInt(y),
        do: True,
      },
      {
        cond: True,
        do: False,
      },
    ],
  },
  {
    cond: True,
    do: False, 
  },
];

const hasFunc = (obj: object) => (prop: keyof never) => 
  typeof obj[prop] === 'function';
const isObj = (val: any) => 
  ['object', 'function'].includes(typeof val);

function toPrimitive(obj: object) {
  const has = hasFunc(obj);

  if (has(Symbol.toPrimitive)) {
    const val = obj[Symbol.toPrimitive]('default');
    if (isObj(val)) {
      throw new TypeError('Cannot convert object to primitive value');
    }
    return val;
  }

  let val: any = obj;
  if (has('valueOf')) val = obj.valueOf();
  if (isObj(val) && has('toString')) val = obj.toString();
  
  if (isObj(val)) {
    throw new TypeError('Cannot convert object to primitive value');
  }

  return val;
}