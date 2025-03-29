export function setDefaultEnvVar(key, defaultValue) {
    const value = process.env[key];
    if (value === undefined) {
        process.env[key] = defaultValue;
    }
}
export function getRequiredEnvVar(key) {
    const value = process.env[key];
    if (value === undefined) {
        throw Error(`${key} env var does not exist!`);
    }
    return value;
}
//# sourceMappingURL=envHelpers.js.map