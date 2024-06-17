// TO check whether the arrays are equal or not 
export function arrayAreEqual(rsArray, jsArray) {
    if (rsArray.length !== jsArray.length) {
        return false;
    }
    
    for (let i = 0; i < rsArray.length; i++) {
        if (rsArray[i] !== jsArray[i]) {
            return false;
        }
    }
    return true;
}