export function getExtraSectionsByType<T extends { section_type: string }>(sections: T[]) {
  return sections
    .map((section, index) => ({ section, index }))
    .sort((left, right) => {
      const leftType = left.section.section_type.trim();
      const rightType = right.section.section_type.trim();
      const leftNumber = Number(leftType);
      const rightNumber = Number(rightType);

      if (!leftType) return rightType ? 1 : left.index - right.index;
      if (!rightType) return -1;
      if (Number.isFinite(leftNumber) && Number.isFinite(rightNumber) && leftNumber !== rightNumber) {
        return leftNumber - rightNumber;
      }
      return leftType.localeCompare(rightType, undefined, { numeric: true }) || left.index - right.index;
    });
}

export function getNextExtraSectionType(sections: Array<{ section_type: string }>) {
  const highestType = sections.reduce((highest, section) => {
    const typeNumber = Number(section.section_type.trim());
    return Number.isInteger(typeNumber) ? Math.max(highest, typeNumber) : highest;
  }, 0);

  return String(highestType + 1);
}
