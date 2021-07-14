export const concat = (...inputs: (string | [string | undefined, any] | undefined)[]) => inputs.filter((p) => {
    if (p === undefined || p === null) return false;
    if (typeof p === "string") return true;
    if (!!p.pop()) return true;
    return false;
}).join(" ")

export const parseDate = (date: number | Date, text = false) => {
    const d = typeof date === "number" ? new Date(date) : date;

    return `${d.getMinutes()}:${d.getSeconds().toString().padStart(2, "0")}${text ? " min" : ""}`.padStart(4, "0")
}

export const readableNumber = (n: number | string, delimiter: string = " ") => {
    const a = typeof n === "number" ? new String(n) : n;

    let b = [];

    for (let i = a.length; i >= 0; i--) {
        b.push(a[i]);
        if ((a.length - i) % 3 === 0) b.push(delimiter);
    }

    return b.reverse().join("");
}