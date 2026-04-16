import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
    password: z.string().min(1, "Senha é obrigatório")
});

export const registerSchema = z.object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 letras").regex(/^[A-Za-zÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),
    email: z.string().min(1, "Email obrigatório").email("Email inválido"),

    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;