"use client";

import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";

export function useLogin() {
    const router = useRouter();

    return useMutation({
        mutationFn: async (data: { email: string; password: string }) => {
            return apiFetch("/login", {
                method: "POST",
                body: JSON.stringify(data),
            });
        },

        onSuccess: (res) => {
            localStorage.setItem("token", res.token);
            localStorage.setItem("user", JSON.stringify(res.user));

            router.push("/");
            router.refresh();
        },
    });
}