"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "@/schemas/auth.schema";
import { useRegister } from "@/hooks/useRegister";

export default function RegisterPage() {
    const { mutate, isPending, error } = useRegister();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RegisterFormData>({
            resolver: zodResolver(registerSchema),
        });

    const onSubmit = (data: RegisterFormData) => {
        mutate(data, {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#3e2723] to-[#8B4513] px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

                <h1 className="text-3xl font-bold text-center text-[#3e2723] mb-2">
                    Criar Conta
                </h1>

                <p className="text-center text-gray-500 mb-6">
                    Cadastre-se para sugerir músicas
                </p>

                {/* ERRO GLOBAL */}
                {error && (
                    <div className="mb-4 text-red-500 text-sm text-center">
                        {(error as Error).message}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* NOME */}
                    <div className="mb-4">
                        <input type="text" placeholder="Nome" disabled={isPending} {...register("name")}
                        className="w-full border p-3 rounded-lg text-black"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* EMAIL */}
                    <div className="mb-4">
                        <input type="email" placeholder="Email" disabled={isPending} {...register("email")}
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
                        <input type="password" placeholder="Senha" disabled={isPending} {...register("password")}
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
                        {isPending ? "Cadastrando..." : "Cadastrar"}
                    </button>
                </form>
            </div>
        </div>
    );
}