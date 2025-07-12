export function arraysAreEqual(a: number[], b: number[]): boolean {
    if (a.length !== b.length) return false;
    const sortedA = [...a].sort((a, b) => a - b);
    const sortedB = [...b].sort((a, b) => a - b);
    return sortedA.every((val, index) => val === sortedB[index]);
}