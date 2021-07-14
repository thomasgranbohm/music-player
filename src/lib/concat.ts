type Props = string | [string | undefined, any] | undefined;

const concat = (...inputs: Props[]) => inputs.filter((p) => {
    if (p === undefined || p === null) return false;
    if (typeof p === "string") return true;
    if (!!p.pop()) return true;
    return false;
}).join(" ")

export default concat;