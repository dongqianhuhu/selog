const { Console } = require('console');
const util = require('util');

module.exports = function Logger(config = {}) {
    if (!(this instanceof Logger)) {
        return new Logger();
    }
    const {
        stdout = process.stdout,
        stderr = process.stderr,
        ignoreErrors = true,
    } = config;
    this.stdout = stdout;
    this.stderr = stderr;
    this.ignoreErrors = ignoreErrors;

    this.colorMap_font = ['', 'black', 'red', 'green', 'yellow', 'blue', 'purple', 'sky', 'white'];
    this.colorMap_back = ['', 'Black', 'Red', 'Green', 'Yellow', 'Blue', 'Purple', 'Sky', 'White'];

    Console.call(this, this.stdout, this.stderr, ignoreErrors);
    colorFuncAdd.call(this);
    titleFuncAdd.call(this);
}

util.inherits(Logger, Console);

Logger.prototype.colorify = function (str, fontc, backc) {
    str = '\033[%BACK%;%FONT%m' + str + '\033[0m';
    switch (fontc) {
        case undefined:
        str = str.replace(';%FONT%', '');
        break;
        case '':
        str = str.replace(';%FONT%', '');
        break;
        case 'black':
        str = str.replace('%FONT%', '30');
        break;
        case 'red':
        str = str.replace('%FONT%', '31');
        break;
        case 'green':
        str = str.replace('%FONT%', '32');
        break;
        case 'yellow':
        str = str.replace('%FONT%', '33');
        break;
        case 'blue':
        str = str.replace('%FONT%', '34');
        break;
        case 'purple':
        str = str.replace('%FONT%', '35');
        break;
        case 'sky':
        str = str.replace('%FONT%', '36');
        break;
        case 'white':
        str = str.replace('%FONT%', '37');
        break;
        default:
        str = str.replace('%FONT%', fontc);
    }
    switch (backc) {
        case undefined:
        str = str.replace('%BACK%;', '');
        break;
        case '':
        str = str.replace('%BACK%;', '');
        break;
        case 'Black':
        str = str.replace('%BACK%', '40');
        break;
        case 'Red':
        str = str.replace('%BACK%', '41');
        break;
        case 'Green':
        str = str.replace('%BACK%', '42');
        break;
        case 'Yellow':
        str = str.replace('%BACK%', '43');
        break;
        case 'Blue':
        str = str.replace('%BACK%', '44');
        break;
        case 'Purple':
        str = str.replace('%BACK%', '45');
        break;
        case 'Sky':
        str = str.replace('%BACK%', '46');
        break;
        case 'White':
        str = str.replace('%BACK%', '47');
        break;
        default:
        str = str.replace('%BACK%', backc);
    }
    return str;
}

function colorFuncAdd() {
    for (let i = 0; i < this.colorMap_font.length; i ++) {
        const fontc = this.colorMap_font[i];
        for (let j = 0; j < this.colorMap_back.length; j ++) {
            const backc = this.colorMap_back[j];
            const funcName = fontc + backc;
            this[funcName] = function (str) {
                this.log(this.colorify(str, fontc, backc));
            }
        }
    }
}

function titleFuncAdd() {
    this.ok = function () {
        let title = 'OK', content = Array.prototype.join.call(arguments, ',');
        this.log(this.colorify(' ' + title + ' ', '', 'Green') + ' ' + content);
    }
    this.info = function () {
        let title = 'INFO', content = Array.prototype.join.call(arguments, ',');
        this.log(this.colorify(' ' + title + ' ', '', 'Yellow') + ' ' + content);
    }
    this.warn = function () {
        let title = 'WARN', content = Array.prototype.join.call(arguments, ',');
        this.log(this.colorify(' ' + title + ' ', '', 'Red') + ' ' + content);
    }
    this.err = function () {
        let title = 'ERR', content = Array.prototype.join.call(arguments, ',');
        this.log(this.colorify(' ' + title + ' ', '', 'Red') + ' ' + this.colorify(content, 'red'));
    }
}

// global.logger = Logger();

// logger.warn('res', 'sssss');
// logger.red('res');
