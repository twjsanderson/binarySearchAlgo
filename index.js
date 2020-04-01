const performance = require('perf_hooks').performance;
const largeArray = require('./constant');

const sortedArray = [1, 2, 3, 4, 30, 54, 67, 89, 100];
// we can sort an unsorted array with the .sort() method before feeding it to a Binary Search Function
const newlySortedArray = largeArray.sort((a, b) => { return  a - b });


/**
 * Binary Search Function
 * Version 1
 * Iterative
 * @param {array} (sorted) 
 * @param {number} (element to find)
 * @return {number} (index of element in array)
 */
const binaryWhile = (sortedArr, target) => {
    let leftIndex = 0;
    let midIndex = 0;
    let rightIndex = sortedArr.length - 1;

    while (leftIndex <= rightIndex) {
        midIndex = Math.floor((leftIndex + rightIndex) / 2);
        if (sortedArr[midIndex] === target) {
            // console.log('While: ', midIndex)
            return midIndex;
        } else if (target < sortedArr[midIndex]) {
            rightIndex = midIndex - 1;
        } else {
            leftIndex = midIndex + 1;
        }
    }
    return null;
};

/**
 * Binary Search Function
 * Version 2
 * Recursive
 * @param {array} (sorted) 
 * @param {number} (element to find)
 * @return {number} (index of element in array)
 */
const binaryRecursive = (sortedArr, target) => {
    let leftIndex = 0;
    let rightIndex = sortedArr.length - 1;

    const binarySearch = (left, right, arr, tar) => {
        // 2 options to create mid variables 
        // they differ because the 2nd one helps
        // prevent a memory overflow in Java int[] declarations

        let mid = Math.floor((left + right) / 2);  
        // let mid = left + Math.floor((right - left) / 2);

        if (left <= right) {
            if (arr[mid] === tar) {
                // console.log('Recursive: ', mid);
                return mid;
            } else if (tar > arr[mid]) {
                return binarySearch(mid + 1, right, arr, tar);
            } else {
                return binarySearch(left, mid - 1, arr, tar);
            }
        };
        return null;
    };

    binarySearch(leftIndex, rightIndex, sortedArr, target);
}


let t0 = performance.now();
binaryWhile(newlySortedArray, 10009)
let t1 = performance.now();

let t2 = performance.now();
binaryRecursive(newlySortedArray, 10009);
let t3 = performance.now();

console.log('while: ', t1-t0);
console.log('recursive: ', t3-t2);

// results: both algorithms are so much faster than a linear search and consistently finishing in under 0.1 ms 
// the time complexity is O(log n)