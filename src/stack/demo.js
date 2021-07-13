const Stack = require('./index');

function mulBase(num, base) {
    const s = new Stack();
    const numMap = {
        '10': 'a',
        '11': 'b',
        '12': 'c',
        '13': 'd',
        '14': 'e',
        '15': 'f'
    }

    while(num > 0) {
        const rest = num % base;
        s.push(rest > 9 ? numMap[rest] : rest);
        num = Math.floor(num / base);
    }
    let str = '';
    while(s.length()) {
        str += s.pop()
    }

    return str;
}

function isPalindrome(word) {
    const s = new Stack();
    for (let i = 0; i < word.length; i++) {
        s.push(word[i])
    }
    let newWord = '';
    while(s.length()) {
        newWord += s.pop()
    }

    return word === newWord;
}

function add(num) {
    const s = new Stack();
    for (let i = 0; i <= num; i++) {
        s.push(i)
    }
    let result = 0;
    while(s.length()) {
        result += s.pop()
    }

    return result;
}


function isPair(str) {
    const s = new Stack();
    const a = new Set(['(', '{', '['])
    const aMap = {
        '(': ')',
        '{': '}',
        '[': ']'
    }
    const b = new Set([']', '}', ')'])
    for (let i = 0; i < str.length; i++) {
        if (a.has(str[i])) {
            s.push(str[i])
        } else if (b.has(str[i])) {
            if (aMap[s.pop()] !== str[i]) {
                console.log(str[i]);
                return false;
            }
        }
    }

    return !s.length();
}



console.log('mulBase', mulBase(100, 16));
console.log('43 isPalindrome', isPalindrome('123211'));
console.log('add', add(5));
console.log('80 isPair', isPair('ad(sdf)['));
