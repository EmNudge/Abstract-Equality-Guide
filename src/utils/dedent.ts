const getWhitespace = (str: string) => str.match(/^((?:\t| )+)\S/m)?.[1];

export function dedent(str: string) {
  const mainWhitespace = getWhitespace(str);
  if (!mainWhitespace) return str;
  
  return str
    .split('\n')
    .map(line => {
      const whitespace = getWhitespace(line);
      if (!whitespace) return line;

      const num = Math.min(whitespace.length, mainWhitespace.length);
      return line.slice(num);
    })
    .join('\n');
}