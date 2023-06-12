// Create a dictionary of operator functions
var ops = {
    '+': function(a, b) { return a + b; },
    '-': function(a, b) { return a - b; },
    '*': function(a, b) { return a * b; },
    '/': function(a, b) { return a / b; }  // Note that division might produce fractions
};

// Define a function to get all permutations of an array
function getAllPermutations(array) {
    var results = [];

    if (array.length === 1) {
        results.push(array);
        return results;
    }

    for (var i = 0; i < array.length; i++) {
        var firstChar = array[i];
        var charsLeft = array.slice(0, i).concat(array.slice(i + 1));
        var innerPermutations = getAllPermutations(charsLeft);
        for (var j = 0; j < innerPermutations.length; j++) {
            results.push([firstChar].concat(innerPermutations[j]));
        }
    }
    return results;
}

// Define the function to brute force solutions
function bruteForceNYTDigits(numbers, target) {
    var closest = Infinity;  // Initialize closest to infinity
    var closestExpression = '';  // Initialize closest_expression to an empty string

    var perms = getAllPermutations(numbers);

    // Go through all permutations
    for (var i = 0; i < perms.length; i++) {
        var numPerm = perms[i];

        // Go through all possible combinations of operators for each permutation
        var opKeys = Object.keys(ops);
        for (var j = 0; j < Math.pow(opKeys.length, numPerm.length - 1); j++) {
            var opComb = [];
            var tempJ = j;
            for (var k = 0; k < numPerm.length - 1; k++) {
                opComb.push(opKeys[tempJ % opKeys.length]);
                tempJ = Math.floor(tempJ / opKeys.length);
            }

            try {
                var result = numPerm[0];
                for (var l = 0; l < opComb.length; l++) {
                    result = ops[opComb[l]](result, numPerm[l+1]);
                }

                // Only accept results that are integers and positive
                if (result === Math.floor(result) && result >= 0 && Math.abs(target - result) < Math.abs(target - closest)) {
                    closest = result;
                    closestExpression = numPerm.slice(0, opComb.length).map(function(num, idx) { return num + ' ' + opComb[idx]; }).join(' ') + ' ' + numPerm[opComb.length] + ' = ' + closest;
                }
            } catch(e) {
                // Skip division by zero
                continue;
            }
        }
    }
    return closestExpression;
}

function solve() {
    var numbers = document.getElementById('numbers').value.split(',').map(Number);
    var target = Number(document.getElementById('target').value);
    document.getElementById('result').textContent = bruteForceNYTDigits(numbers, target);
}