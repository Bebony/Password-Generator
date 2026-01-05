const lowers = "abcdefghijklmnopqrstuvwxyz";
const uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const specials = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

const slider = document.getElementById("length");
let sliderOutput = document.getElementById("len-val");
let firstPassword = document.getElementById("password-1");
let secondPassword = document.getElementById("password-2");

function passwordLen() {
	sliderOutput.textContent = slider.value;
}

function getRandLower() {
	let index = Math.floor(Math.random() * lowers.length);
	return lowers[index];
}

function getRandUpper() {
	let index = Math.floor(Math.random() * uppers.length);
	return uppers[index];
}

function getRandNum() {
	let index = Math.floor(Math.random() * numbers.length);
	return numbers[index];
}

function getRandSpecial() {
	let index = Math.floor(Math.random() * specials.length);
	return specials[index];
}

function shuffle(list) {
	let currentIndex = list.length;
	while (currentIndex != 0) {
		let randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		[list[currentIndex], list[randomIndex]] = [list[randomIndex], list[currentIndex]];
	}
}

function randomPassword() {
	let passLen = Number(slider.value);
	let isNumber = Number(document.getElementById("numbers").checked);
	let isLower = Number(document.getElementById("lowers").checked);
	let isUpper = Number(document.getElementById("uppers").checked);
	let isSpecial = Number(document.getElementById("specials").checked);
	let modesNum = isNumber + isLower + isUpper + isSpecial;

	if (modesNum === 0) {
		return "";
	}

	let password = [];
    let partLen = [];
	let remainingLen = passLen;
	let remainingModes = modesNum;
    while (remainingModes > 1) {
        let len = Math.floor(Math.random() * (remainingLen - remainingModes + 1)) + 1;
        partLen.push(len);
        remainingModes -= 1;
        remainingLen -= len;
    }

    partLen.push(remainingLen)

    let indexLen = 0;

	if (isLower) {
		for (let i = 0; i < partLen[indexLen]; i += 1) {
			password.push(getRandLower());
		}
        indexLen += 1;
	}

	if (isUpper) {
		for (let i = 0; i < partLen[indexLen]; i += 1) {
			password.push(getRandUpper());
		}
		indexLen += 1
	}

	if (isNumber) {
		for (let i = 0; i < partLen[indexLen]; i += 1) {
			password.push(getRandNum());
		}
		indexLen += 1;
	}

	if (isSpecial) {
		for (let i = 0; i < partLen[indexLen]; i += 1) {
			password.push(getRandSpecial());
		}
		indexLen += 1;
	}

	shuffle(password)
	return password.join("");
}

function newPasswords() {
	firstPassword.textContent = randomPassword();
	secondPassword.textContent = randomPassword();
}
