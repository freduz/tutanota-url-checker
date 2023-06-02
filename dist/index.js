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
const checkResult = document.getElementById("check-status");
const PATTERN = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
urlInput.addEventListener('input', processURL);
const thorottleURL = debounceAndThrottle(checkExistence, 300, 1000);
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
            thorottleURL(this.value);
        }
        catch (error) {
        }
    });
}
const URLChecker = (url) => {
    return PATTERN.test(url);
};
function debounceAndThrottle(func, delay, limit) {
    let timerId;
    let lastCallTime = 0;
    let isThrottled = false;
    return (...args) => {
        const currentTime = Date.now();
        clearTimeout(timerId);
        if (currentTime - lastCallTime >= limit) {
            func(args);
            lastCallTime = currentTime;
        }
        else {
            timerId = setTimeout(() => {
                func(args);
                lastCallTime = currentTime;
            }, delay);
        }
    };
}
function checkExistence(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const status = yield checkingServer(url);
            const result = status.exists ? (status.isFile ? 'File exists' : 'Folder exists') : 'URL does not exist';
            urlInfoBlock.style.display = "flex";
            checkResult.textContent = result;
        }
        catch (error) {
            alert(error);
        }
    });
}
function checkingServer(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const response = { exists: Math.random() >= 0.5, isFile: Math.random() >= 0.5 };
            resolve(response);
        }, 1000);
    });
}
