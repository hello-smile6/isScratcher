// Code from https://stackoverflow.com/questions/4434076/best-way-to-alphanumeric-check-in-javascript
function isAlphanumeric(string) {
    for (let i = 0; i < string.length; i++) {
        let char1 = string.charAt(i);
        let cc = char1.charCodeAt(0);
        if ((cc > 47 && cc < 58) || (cc > 64 && cc < 91) || (cc > 96 && cc < 123)) {
        } else {
            return false;
        }
    }

    return true;
}
module.exports=isAlphanumeric;