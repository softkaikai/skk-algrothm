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

function calc(expression) {
    const s = new Stack();
    expression = expression.replace(/\s/g, '');
    const items = expression.split(/(\+|\*|\-|\%|\/|\(|\))/)

    const highPriorityOperators = ['*', '/', '%'];
    const lowPriorityOperators = ['+', '-']

    if (expression.includes('(')) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i]
            if (item === ')') {
                let newExpression = item;
                let newItem = '';

                do {
                    newItem = s.pop();
                    newExpression = newItem + newExpression;
                } while(newItem !== '(')

                newExpression = newExpression.replace(/\(|\)/g, '')
                s.push(calc(newExpression) + '')
            } else {
                s.push(item)
            }
        }
        
        return calc(s.toString())
    } else if (highPriorityOperators.some(operator => expression.includes(operator))) { // 到这里的表达式不包含括号，只用考虑操作符优先级
        for(let i = 0; i < items.length;) {
            const item = items[i]

            if (highPriorityOperators.includes(item)) {
                const firstNum = Number(s.pop());
                const secondNum = Number(items[i + 1])
                switch(item) {
                    case '*':
                        s.push(firstNum * secondNum + '')
                        break;
                    case '/':
                        s.push(firstNum / secondNum + '')
                        break;
                    case '%':
                        s.push(firstNum % secondNum + '')
                        break;
                    default:
                        break;
                }

                i += 2;
            } else {
                s.push(item)
                i++;
            }
        }

        return calc(s.toString())

    } else { // 到这里的表达式只包含+, -了
        let result = 0;
        items.forEach((item, index) => {
            if (!lowPriorityOperators.includes(item)) {
                if (index === 0) {
                    result += Number(item);
                } else {
                    const operator = items[index - 1];
                    switch(operator) {
                        case '+':
                            result += Number(item);
                            break;
                        case '-':
                            result -= Number(item);
                            break;
                        default:
                            result += Number(item);
                            break;
                    }
                }
            }
        })

        return result;
    }

    
}



console.log('mulBase', mulBase(100, 16));
console.log('43 isPalindrome', isPalindrome('123211'));
console.log('add', add(5));
console.log('80 isPair', isPair('ad(sdf)['));
console.log('calc', calc('1 - (2 * 3 - (3 - 1) )/ 4 + 2 % 3'));
