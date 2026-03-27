export const generateUniqueNumbers = (count = 5, min = 1, max = 50) => {
  const set = new Set();
  while (set.size < count) {
    set.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(set);
};

export const shuffleArray = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

// Create row items: { id, value, matched }
export const createRow = (numbers, prefix) => {
  return numbers.map((val, idx) => ({
    id: `${prefix}-${idx}`,
    value: val,
    matched: false
  }));
};

// Shuffle only unmatched cards in a row
export const shuffleUnmatched = (row) => {
  const unmatchedIndices = [];
  const unmatchedValues = [];
  row.forEach((card, idx) => {
    if (!card.matched) {
      unmatchedIndices.push(idx);
      unmatchedValues.push(card.value);
    }
  });
  const shuffled = shuffleArray(unmatchedValues);
  const newRow = [...row];
  unmatchedIndices.forEach((idx, pos) => {
    newRow[idx] = { ...newRow[idx], value: shuffled[pos] };
  });
  return newRow;
};