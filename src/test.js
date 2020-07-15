

// const A = [1,2,3,4,5]

// const addOne = (total, n) => total + n

// const total = A.reduce((total, newNumber) => total + newNumber, 0)

// console.log(total)
// console.log(A)


function solution(A) {
    const makeIntegerOccurrencesMap = (map, nextInteger) => {
        const isMissingKey = key => map[key] === undefined;
        
        if(isMissingKey(nextInteger)) {
            map[nextInteger] = 0;
        }
        
        map[nextInteger] = map[nextInteger] + 1;
        
        console.log(map)

        return map;
    }
    
    const isOdd = number => (number % 2) !== 0;
    const integerOccurrencesMap = A.reduce(makeIntegerOccurrencesMap, {});
    

    return Object.keys(integerOccurrencesMap)
        .find(integer => isOdd(integerOccurrencesMap[integer]));
}

console.log(solution([9,3,5,3,5]))