export default function contextWindow(length,data) {
    const system = data[0];
    const recent = data.filter(m => m.role != "system").slice(length)

    return {
        messages: system ? [system, ...recent] : recent
    }

}