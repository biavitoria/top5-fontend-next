"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const registroUserSchema = z.object({
  nome: z.string().regex(/^[A-Za-zÀ-ÿ\s]{3,}$/, "Nome deve conter somente letras").min(3, "Nome precisa ter no mínimo 3 caracteres"),
  email: z.string().min(1, "Email obrigatório").email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
})

export type RegistroUserFormData = z.infer<typeof registroUserSchema>

export default function RegistroForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistroUserFormData>({
    resolver: zodResolver(registroUserSchema),
  });

  async function onSubmit(data: RegistroUserFormData) {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
      <div>
        <input {...register("nome")} type="text" placeholder="Nome" className="w-full border p-3 rounded-lg text-black" />
          {errors.nome && (<p className="text-red-500 text-sm">{errors.nome.message}</p>)}
      </div>

      <div>
        <input 
          {...register("email")} type="email" placeholder="Email" className="w-full border p-3 rounded-lg text-black" />
          {errors.email && (<p className="text-red-500 text-sm">{errors.email.message}</p>)}
        </div>

        <div>
          <input {...register("senha")} type="password" placeholder="Senha" className="w-full border p-2 text-black" />
          {errors.senha && (<p className="text-red-500 text-sm">{errors.senha.message}</p>)}
        </div>

        <button disabled={isSubmitting} type="submit" className="w-full bg-[#6b473b] text-white py-3 rounded-lg hover:bg-[#573b32] transition disabled:opacity-50"
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
  )

}