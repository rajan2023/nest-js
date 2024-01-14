export const removeNullValuesFromObject = (object: Object) => {
    return Object.keys(object).forEach(key => {
        if (object[key] === null) {
            delete object[key];
        }
    });
}