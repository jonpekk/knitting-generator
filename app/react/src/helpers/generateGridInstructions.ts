export function generateGridInstructions(grid: any, rowLength = 50) {
  const instructions = [];
  let gridIndex = 0;
  let rowNumber = 1;

  while (gridIndex < grid.length) {
    const row = grid.slice(gridIndex, gridIndex + rowLength);
    let currentInstruction = { knitBefore: 0, pearl: 0, knitAfter: 0 };
    let inPearlSection = false;
    let rowInstructions = []; // Array to store instruction *objects*

    for (let j = 0; j < row.length; j++) {
      if (row[j].active) {
        if (!inPearlSection) {
          currentInstruction.knitBefore = j;
          inPearlSection = true;
        }
        currentInstruction.pearl++;
      } else {
        if (inPearlSection) {
          currentInstruction.knitAfter = row.length - (currentInstruction.knitBefore + currentInstruction.pearl);
          rowInstructions.push(currentInstruction); // Push the *object*
          currentInstruction = { knitBefore: 0, pearl: 0, knitAfter: 0 };
          inPearlSection = false;
        }
      }
    }

    if (inPearlSection) {
      currentInstruction.knitAfter = 0;
      rowInstructions.push(currentInstruction); // Push the *object*
    }

    let rowInstructionStrings = rowInstructions.map(({ knitBefore, pearl, knitAfter }) => `${knitBefore} knit, ${pearl} pearl, ${knitAfter} knit`);

    if (rowInstructionStrings.length === 0 && row.every((cell: any) => !cell.active)) {
      instructions.push(`Row ${rowNumber}: ${rowLength} knit, 0 pearl, 0 knit`);
    } else if (rowInstructionStrings.length === 0) {
      instructions.push(`Row ${rowNumber}: ${rowLength} knit, 0 pearl, 0 knit`); //Handles empty rows
    }
    else {
      instructions.push(`Row ${rowNumber}: ${rowInstructionStrings.join('; ')}`);
    }

    gridIndex += rowLength;
    rowNumber++;
  }

  return instructions;
}
