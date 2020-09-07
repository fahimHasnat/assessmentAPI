const { shuffle } = require('./util');

test('Shuffled Array should have the same value as the original', () => {
    expect(arraysEqual([1, 2, 3], shuffle([1, 2, 3]))).toBe(true);
});

test('Given Array should be shuffled', () => {
    expect(arrayEquals([1, 2, 3], shuffle([1, 2, 3]))).toBe(false);
});

function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

function arraysEqual(_arr1, _arr2) {

    if (!Array.isArray(_arr1) || !Array.isArray(_arr2) || _arr1.length !== _arr2.length)
        return false;

    var arr1 = _arr1.concat().sort();
    var arr2 = _arr2.concat().sort();

    for (var i = 0; i < arr1.length; i++) {

        if (arr1[i] !== arr2[i])
            return false;

    }
    return true;
}