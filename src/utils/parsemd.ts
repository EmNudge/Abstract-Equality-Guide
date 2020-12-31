// turns x and y into tokens for later
const maybeTokenize = (str: string) => str.replace(
  /(^|\(| )([xy])( |\)|$)/g, 
  `$1<var class="token-$2">$2</var>$3`
);

export function parse(substep: string): string {
  return substep.replace(
    /`(.+?)`/g, 
    (_match, code) => `<code>${maybeTokenize(code)}</code>`
  );
}