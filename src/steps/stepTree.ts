function getType(val: any) {
  if (val === null) return 'null';
  const type = typeof val;
  
  if (type === 'function') return 'object';
  return type;
}
function isType(type: typeofType | typeofType[], item: any) {
  const itemType = getType(item);
  if (typeof type === 'string') return itemType === type;

  return type.includes(itemType);
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

const areTypes = (type1: typeofType | typeofType[], type2: typeofType | typeofType[]) => 
  (x: any, y: any) => isType(type1, x) && isType(type2, y);

const are = (item1: any, item2: any) => 
  (x: any, y: any) => Object.is(item1, x) && Object.is(item2, y);

export const stepTree: Step[] = [
  {
    cond: (x, y) => getType(x) === getType(y),
    do: (x, y) => x === y,
  },
  {
    cond: are(null, undefined),
    do: True,
  },
  {
    cond: are(undefined, null),
    do: True,
  },
  {
    cond: areTypes('number', 'string'),
    do: (x, y) => ({ x, y: Number(y) }),
  },
  {
    cond: areTypes('string', 'number'),
    do: (x, y) => ({ x: Number(x), y }),
  },
  {
    cond: areTypes('bigint', 'string'),
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
    cond: areTypes('string', 'bigint'),
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
    cond: areTypes(['string', 'number', 'bigint', 'symbol'], 'object'),
    do: (x, y) => ({ x, y: toPrimitive(y) }),
  },
  {
    cond: areTypes('object', ['string', 'number', 'bigint', 'symbol']),
    do: (x, y) => ({ x: toPrimitive(x), y }),
  },
  {
    // if they were the same type this exits on step 1, so by this point they must be different
    // i.e. this checks for number==bigint or bigint==number
    cond: areTypes(['number', 'bigint'], ['number', 'bigint']),
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

const isCallable = (obj: object, prop: any) => typeof obj[prop] === 'function';

const isObject = (val: any) => ['object', 'function'].includes(typeof val);

function toPrimitive(obj: object) {
  if (isCallable(obj, Symbol.toPrimitive)) {
    const val = obj[Symbol.toPrimitive]('default');
    if (isObject(val)) {
      throw new TypeError('Cannot convert object to primitive value');
    }
    
    return val;
  }

  let val: any = obj;
  if (isCallable(obj, 'valueOf')) val = obj.valueOf();
  if (isObject(val) && isCallable(obj, 'toString')) val = obj.toString();

  if (isObject(val)) {
    throw new TypeError('Cannot convert object to primitive value');
  }

  return val;
}