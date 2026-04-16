"use client";

import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";

export function useRegister() {
    const router = useRouter();
    
    return useMutation({
        mutationFn: async (data: {
            name: string;
            email: string;
            password: string;
        }) => {
            return apiFetch("/register", {
                method: "POST",
                body: JSON.stringify(data),
            });
        },

        onSuccess: () => {
            router.push("/login");
        },
    });
}