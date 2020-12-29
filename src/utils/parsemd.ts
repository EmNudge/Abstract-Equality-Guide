export function parse(substep: string): string {
  return substep.replace(
    /`(.+?)`/g, 
    '<code>$1</code>'
  );
}