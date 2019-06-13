// utils.js

export const truncateString = (str, length) => {
    const ending = "...";
    if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
    } else {
        return str;
    }
};
