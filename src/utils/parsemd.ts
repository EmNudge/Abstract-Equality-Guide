// turns x and y into tokens for later
const maybeTokenize = (str: string) => str.replace(
  /(^|\(| )([xy])( |\)|$)/g, 
  `$1<var class="token-$2">$2</var>$3`
);

// gets links, does not support escapes
const getLinks = (str: string) => str.replace(
  /\[(.+?)\]\((.+?)\)/g, 
  `<a href="$2">$1</a>`
);

export function parse(substep: string): string {
  return getLinks(substep).replace(
    /`(.+?)`/g, 
    (_match, code) => `<code>${maybeTokenize(code)}</code>`
  );
}