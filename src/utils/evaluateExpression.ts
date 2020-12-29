export function evaluateExpression(
  itemExpr: string, 
  onSuccess: (val: any) => void, 
  onFailure: () => void
): any {
  try {
    const func = new Function(`return ${itemExpr}`);
    const val = func();
    
    onSuccess(val);
  } catch (e) {
    onFailure();
  }
}
