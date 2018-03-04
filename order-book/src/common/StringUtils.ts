function escapeRegExp(s: string) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function replaceAll(str: string, term: string, replacement: string) {
    return str.replace(new RegExp(escapeRegExp(term), "g"), replacement);
}
