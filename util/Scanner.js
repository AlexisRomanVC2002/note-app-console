import readLine from "node:readline"

const scanner = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

export function requestData(textToShow) {

    return new Promise((resolve, reject) => {
        scanner.question(`\n${textToShow}`, (input) => {
            resolve(input);
        })
    });
}
