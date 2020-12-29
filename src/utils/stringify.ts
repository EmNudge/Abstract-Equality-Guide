// probably doesn't have to be a Map, just a 2d array
const typeMappings: Map<string, (val: any) => string> = new Map([
  // bigint will throw an error via JSON.stringify
  ['bigint', (val: any) => String(val as BigInt) + 'n'],
  // following 2 cannot be serialized and will return undefined
  ['symbol', (val: any) => (val as Symbol).toString()],
  ['undefined', (_val: any) => 'undefined'], 
]);

export function stringify(val: any): string {
  const type = typeof val;
  for (const [currType, func] of typeMappings) {
    if (type !== currType) continue;
    return func(val);
  }

  // NaN is serialized as null using JSON.stringify
  if (Number.isNaN(val)) return 'NaN';

  let str: string = null;
  try {
    str = JSON.stringify(val);
  } catch(e) {
    str = 'UNSERIALIZABLE';
  }

  return str.length < 20
    ? str
    : `${str[0]} ... ${str[str.length-1]}`;
}