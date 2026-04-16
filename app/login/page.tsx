"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/auth.schema";
import { useLogin } from "@/hooks/useLogin";
import { LoginFormData } from "@/schemas/auth.schema";

export default function LoginPage() {

    const { mutate, isPending, error } = useLogin();

    const {
        register, 
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormData) => {
        mutate(data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#3e2723] to-[#8B4513] px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                
                <h1 className="text-3xl font-bold text-center text-[#3e2723]">
                    Bem-vindo
                </h1>

                <p className="text-center text-gray-500 mb-6">
                    Faça login para continuar
                </p>

                {error && (
                <div className="mb-4 text-red-500 text-sm text-center">
                    Email ou senha inválidos
                </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    {/* EMAIL */}
                    <div className="mb-4">
                        <input type="email" placeholder="Email" {...register("email")}
                        className="w-full border p-3 rounded-lg text-black"
                        />
                        {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </p>
                        )}
                    </div>

                    {/* SENHA */}
                    <div className="mb-4">
                        <input type="password" placeholder="Senha" {...register("password")}
                        className="w-full border p-3 rounded-lg text-black"
                        />
                        {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                        </p>
                        )}
                    </div>

                    {/* BOTÃO */}
                    <button type="submit" disabled={isPending}
                    className="w-full bg-[#6d4c41] text-white py-3 rounded-lg hover:bg-[#3e2723] border border-black cursor-pointer"
                    >
                        {isPending ? "Entrando..." : "Entrar"}
                    </button>
                </form>
            </div>
        </div>
    );
}