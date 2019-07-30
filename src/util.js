// utils.js
import { Converter } from "showdown";

const mdrender = new Converter();

export const truncateString = (str, length) => {
    const ending = "...";
    if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
    } else {
        return str;
    }
};

export const renderMD = input => {
    return mdrender.makeHtml(input);
};
