// Complexity: O(1) time, O(1) space
// Gauss formula. Most efficient as time and space complexity are constant
const sumToNA = (n: number): number => {
  return (n * (n + 1)) / 2;
};

// Complexity: O(n) time, O(1) space
// Simple loop, we iterate from 1 to n numbers. This has linear time complexity and space complexity is constant since we only use two variables to store values.
const sumToNB = (n: number): number => {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// Complexity: O(n) time, O(n) space.
// Recursion. This has a linear time complexity due to recursion and due to recursion call stack this also has linear time complexity

const sumToNC = (n: number): number => {
  if (n <= 1) {
    return n;
  }

  return n + sumToNC(n - 1);
};
