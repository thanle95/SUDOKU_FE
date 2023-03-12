const EMPTY = "0";
const MAX_ITEMS = 9;

/**
 *
 * @param {Array} matrix Array of MAX_ITEMS*MAX_ITEMS matrix
 * @returns {String} Non-empty is the error message, else there isn't any error
 */
export const checkError = (matrix) => {
  //step 1.1: every row contains exactly one instance of the digits from 1 to MAX_ITEMS.
  for (let row = 0; row < MAX_ITEMS; row++) {
    const array = getRow(matrix, row).filter((f) => f !== EMPTY);
    const set = new Set(array);
    if (array.length != 0 && array.length != set.size) {
      return "Identical numbers in a row";
    }
  }

  //step 1.2: every column contains exactly one instance of the digits from 1 to MAX_ITEMS.
  for (let col = 0; col < MAX_ITEMS; col++) {
    const array = getColumn(matrix, col).filter((f) => f !== EMPTY);
    const set = new Set(array);
    if (array.length != 0 && array.length != set.size) {
      return "Identical numbers in a column";
    }
  }

  //step 1.3: every sub-grid contains exactly one instance of the digits from 1 to MAX_ITEMS.
  for (let subMatrix = 0; subMatrix < MAX_ITEMS; subMatrix++) {
    const array = getSubMatrix(matrix, subMatrix).filter((f) => f !== EMPTY);
    const set = new Set(array);
    if (array.length != 0 && array.length != set.size) {
      return "Identical numbers in a box";
    }
  }
  return "";
};

/**
 *
 * @param {Array} matrix Array of MAX_ITEMS*MAX_ITEMS matrix
 * @param {Number} index index of the row
 * @returns the array of row in the matrix
 */
const getRow = (matrix, index) => {
  const startIndex = index * MAX_ITEMS;
  const endIndex = startIndex + MAX_ITEMS;
  return matrix.slice(startIndex, endIndex);
};

/**
 *
 * @param {Array} matrix Array of MAX_ITEMS*MAX_ITEMS matrix
 * @param {Number} index index of the column
 * @returns the array of column in the matrix
 */
const getColumn = (matrix, index) => {
  const column = [];
  for (let row = 0; row < MAX_ITEMS; row++) {
    let number = matrix[index + row * MAX_ITEMS];
    column.push(number);
  }
  return column;
};

/**
 * 
 * @param {Array} matrix Array of MAX_ITEMS*MAX_ITEMS matrix
 * @param {Number} index index of the sub matrix
 * @returns 
 */
const getSubMatrix = (matrix, index) => {
  const subMatrix = [];
  const N = 3; // numberOfNumberCellPerRowInASubMatrix
  for (let cellIndex = 0; cellIndex < MAX_ITEMS; cellIndex++) {
    const colIndex = (cellIndex % N) + (index % N) * N;
    const rowIndex = N * Math.floor(index / N) + Math.floor(cellIndex / N);
    subMatrix.push(matrix[rowIndex * MAX_ITEMS + colIndex]);
  }
  return subMatrix;
};

/**
 * Solve the sudoku problem with back-tracking
 * @param {Array} matrix Array of MAX_ITEMS*MAX_ITEMS matrix
 * @returns true if the matrix is not empty
 */
export const solveSudoku = (matrix) => {
  let index = -1;
  let isEmpty = true;
  for (let i = 0; i < MAX_ITEMS * MAX_ITEMS; i++) {
    if (matrix[i] == EMPTY) {
      index = i;
      isEmpty = false;
      break;
    }
  }

  // No empty space left
  if (isEmpty) {
    //solved!!!
    return true;
  }

  // Else for each-row backtrack
  for (let num = 1; num <= MAX_ITEMS; num++) {
    matrix[index] = num.toString();
    if (checkError(matrix) == "") {
      if (solveSudoku(matrix)) {
        //solved!!!
        return true;
      } else {
        // Replace it
        matrix[index] = EMPTY;
      }
      
    }
    else {
        matrix[index] = EMPTY;
    }
  }
  return false;
};
