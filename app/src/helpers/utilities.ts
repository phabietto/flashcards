export function generateId(prefix:string) {
    return prefix + (this + (Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9*Math.pow(10, 12)).toString(36)));
}