export function* findWithRegex(regex, contentBlock) {
  const text = contentBlock.getText()
  let matchArr, start
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index
    yield [start, start + matchArr[0].length]
  }
}
