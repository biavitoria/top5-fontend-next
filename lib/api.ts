export async function apiFetch(path: string, options?: RequestInit) {
    const res = await fetch(`https://127.0.0.1:8000/api${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options?.headers || {}),
        },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Erro na requisição");
    }

    return data;
}