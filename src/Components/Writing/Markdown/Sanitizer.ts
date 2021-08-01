interface IRow {}

function splitBetweenTwo(
  input: string[],
  firstOccurrence: string,
  secondOccurrence: string
) {
  const startIndex = input.findIndex(
    (element) => element.trim() === firstOccurrence
  );
  const endIndex = input.findIndex(
    (element) =>
      element.trim() === secondOccurrence || element.trim() === "||end"
  );

  return {
    result: input.slice(startIndex + 1, endIndex),
    index: { startIndex, endIndex },
  };
}

function getLines(input: string) {
  let lines = input.split("\n");
  const occurrences = [
    { first: "||input", second: "||output" },
    { first: "||output", second: "||description" },
    { first: "||description", second: "||input" },
  ];
  let iterator = 0;
  let row: string[] = [],
    inputTable: string[][] = [];

  while (iterator < 1000) {
    const firstOccurrence = occurrences[iterator % 3].first;
    const secondOccurrence = occurrences[iterator % 3].second;
    const { result, index } = splitBetweenTwo(
      lines,
      firstOccurrence,
      secondOccurrence
    );
    if (index.startIndex === -1 || index.endIndex === -1) break;
    lines = lines.slice(index.endIndex);
    console.log(result);
    if (iterator !== 0 && iterator % 3 === 0) {
      inputTable.push(row);
      row = [];
    }
    row.push(result.reduce((text, line) => (text += line + "\n"), ""));
    iterator++;
  }
  inputTable.push(row);
  return inputTable;
}
export const sanitize = (input: string) => {
  const lines = getLines(input);
  console.log(lines);
  return input.replaceAll("$$", "\n$$$$\n");
};
