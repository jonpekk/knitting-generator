
export function generateGridInstructions(
  filledCells: Set<string>,
  rowLength = 50
): string[] {
  const instructions: string[] = [];

  const cellArray = Array.from(filledCells).map((key) => {
    const [row, col] = key.split(',').map(Number);
    return { row, col };
  });

  const maxRow = Math.max(...cellArray.map((cell) => cell.row), 0);

  for (let rowNumber = 0; rowNumber <= maxRow; rowNumber++) {
    const row = new Array(rowLength).fill(false);

    for (const cell of cellArray) {
      if (cell.row === rowNumber && cell.col < rowLength) {
        row[cell.col] = true;
      }
    }

    let currentInstruction = { knitBefore: 0, pearl: 0, knitAfter: 0 };
    let inPearlSection = false;
    const rowInstructions = [];

    for (let j = 0; j < row.length; j++) {
      if (row[j]) {
        if (!inPearlSection) {
          currentInstruction.knitBefore = j;
          inPearlSection = true;
        }
        currentInstruction.pearl++;
      } else {
        if (inPearlSection) {
          currentInstruction.knitAfter =
            row.length - (currentInstruction.knitBefore + currentInstruction.pearl);
          rowInstructions.push({ ...currentInstruction });
          currentInstruction = { knitBefore: 0, pearl: 0, knitAfter: 0 };
          inPearlSection = false;
        }
      }
    }

    if (inPearlSection) {
      currentInstruction.knitAfter = 0;
      rowInstructions.push({ ...currentInstruction });
    }

    const rowInstructionStrings = rowInstructions.map(
      ({ knitBefore, pearl, knitAfter }) =>
        `${knitBefore} knit, ${pearl} pearl, ${knitAfter} knit`
    );

    if (rowInstructionStrings.length === 0) {
      instructions.push(`Row ${rowNumber + 1}: ${rowLength} knit, 0 pearl, 0 knit`);
    } else {
      instructions.push(
        `Row ${rowNumber + 1}: ${rowInstructionStrings.join('; ')}`
      );
    }
  }

  return instructions;
}
