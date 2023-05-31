"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const urlInput = document.getElementById('url');
const alertBox = document.getElementById("alert-box");
const statusblock = document.getElementById("status");
const urlInfoBlock = document.getElementById('url-info-card');
const PATTERN = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
urlInput.addEventListener('input', processURL);
const thorottleURL = handleRequest(checkExistence, 3000);
function processURL() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!URLChecker(this.value)) {
            urlInfoBlock.style.display = 'none';
            alertBox.style.display = 'block';
            statusblock.textContent = "Invalid URL provided";
            return;
        }
        alertBox.style.display = 'none';
        try {
            yield thorottleURL(this.value);
        }
        catch (error) {
        }
    });
}
const URLChecker = (url) => {
    return PATTERN.test(url);
};
function handleRequest(func, limit) {
    let inThrottle = false;
    return function (url) {
        return __awaiter(this, arguments, void 0, function* () {
            const args = arguments;
            const context = url;
            if (!inThrottle) {
                yield func(context);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), limit);
            }
        });
    };
}
function checkExistence(url) {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise((resolve) => setTimeout(resolve, 1000));
        let message = '';
        let heading = '';
        const exists = Math.random() < 0.5;
        if (exists) {
            message = "The entered URL found on the server";
            heading = "Healthy URL";
            urlInfoBlock.children[0].children[1].classList.add('bg-teal-100');
            urlInfoBlock.children[0].children[1].classList.add('border-teal-500');
            urlInfoBlock.children[0].children[1].classList.remove('bg-red-100');
            urlInfoBlock.children[0].children[1].classList.remove('border-red-500');
            urlInfoBlock.children[0].children[1].children[0].children[0].children[0].classList.remove('text-red-500');
            urlInfoBlock.children[0].children[1].children[0].children[0].children[0].classList.add('text-teal-500');
        }
        else {
            message = "Sorry! the entred URL is not found";
            heading = "BAD URL";
            urlInfoBlock.children[0].children[1].classList.remove('bg-teal-100');
            urlInfoBlock.children[0].children[1].classList.remove('border-teal-500');
            urlInfoBlock.children[0].children[1].classList.add('bg-red-100');
            urlInfoBlock.children[0].children[1].classList.add('border-red-500');
            urlInfoBlock.children[0].children[1].children[0].children[0].children[0].classList.remove('text-teal-500');
            urlInfoBlock.children[0].children[1].children[0].children[0].children[0].classList.add('text-red-500');
        }
        urlInfoBlock.style.display = 'flex';
        urlInfoBlock.children[0].children[1].children[0].children[1].children[0].textContent = heading;
        urlInfoBlock.children[0].children[1].children[0].children[1].children[1].textContent = message;
    });
}
