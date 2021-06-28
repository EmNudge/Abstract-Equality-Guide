export interface Step {
  name: string;
  substeps?: Step[];
}

export const steps: Step[] = [
  { 
    name: "If `Type(x)` is the same as `Type(y)`, then",
    substeps: [
      { name: "Return the result of performing Strict Equality Comparison `x === y`" }
    ]
  },
  { 
    name: "If `x` is `null` and `y` is `undefined`, then",
    substeps: [
      { name: "Return `true`." }
    ]
  },
  { 
    name: "If `y` is `null` and `x` is `undefined`, then",
    substeps: [
      { name: "Return `true`." }
    ]
  },
  { 
    name: "If `Type(x)` is `Number` and `Type(y)` is `String`, then",
    substeps: [
      { name: "Return the result of the comparison `x == Number(y)`." }
    ]
  },
  { 
    name: "If `Type(x)` is `String` and `Type(y)` is `Number`, then",
    substeps: [
      { name: "Return the result of the comparison `Number(x) == y`." }
    ]
  },
  { 
    name: "If `Type(x)` is `BigInt` and `Type(y)` is `String`, then",
    substeps: [
      { name: "Let `n` be `BigInt(y)`." },
      { 
        name: "If `n` is `NaN`, then",
        substeps: [
          { name: "Return `false`." },
        ]
      },
      { name: "Return the result of the comparison `x == n`." },
    ]
  },
  { 
    name: "If `Type(x)` is `String` and `Type(y)` is `BigInt`, then",
    substeps: [
      { name: "Return the result of the comparison `y == x`." }
    ]
  },
  { 
    name: "If `Type(x)` is `Boolean`, then",
    substeps: [
      { name: "Return the result of the comparison `Number(x) == y`." }
    ]
  },
  { 
    name: "If `Type(y)` is `Boolean`, then",
    substeps: [
      { name: "Return the result of the comparison `x == Number(y)`." }
    ]
  },
  { 
    name: "If `Type(x)` is either `String`, `Number`, `BigInt`, or `Symbol` and `Type(y)` is `Object`, then",
    substeps: [
      { name: "Return the result of the comparison `x == [ToPrimitive](https://jsitor.com/5ktE3jQzt8)(y)`." }
    ]
  },
  { 
    name: "If `Type(x)` is `Object` and `Type(y)` is either `String`, `Number`, `BigInt`, or `Symbol`, then",
    substeps: [
      { name: "Return the result of the comparison `[ToPrimitive](https://jsitor.com/5ktE3jQzt8)(x) == y`." }
    ]
  },
  { 
    name: "If `Type(x)` is `BigInt` and `Type(y)` is `Number`, or if `Type(x)` is `Number` and `Type(y)` is BigInt, then",
    substeps: [
      { 
        name: "If `x` or `y` are any of `NaN`, `+∞`, or `-∞`, then",
        substeps: [
          { name: "Return `false`." }
        ]
      },
      { 
        name: "If the mathematical value of `x` is equal to the mathematical value of `y`, then",
        substeps: [
          { name: "Return `true`." }
        ]
      },
      { name: "Return `false`." }
    ]
  },
  { name: "Return `false`." }
]