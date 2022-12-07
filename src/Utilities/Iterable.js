export function getIterableKeys(map) {
    return {
        [Symbol.iterator]: function* () {
            for (const [key, _] of map) {
                yield key;
            }
        }
    };
}

export function getIterableValues(map) {
    return {
        [Symbol.iterator]: function* () {
            for (const [_, value] of map) {
                yield value;
            }
        }
    };
}