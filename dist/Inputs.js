import promptSync from "prompt-sync";
const prompt = promptSync();
export function pedirId(mensaje) {
    const id = (prompt(mensaje) ?? "").trim();
    if (id.length <= 0 || id === "") {
        console.log("⚠️ No ingresaste ningún ID.");
        return "";
    }
    return id;
}
//# sourceMappingURL=inputs.js.map