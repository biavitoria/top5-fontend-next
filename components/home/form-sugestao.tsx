"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SugestaoFormData, sugestaoSchema } from "@/schemas/musica.schema";
import { useEnviarMusica } from "@/hooks/useHome";

export default function SugestaoForm() {
  const { mutate, isPending } = useEnviarMusica();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SugestaoFormData>({
    resolver: zodResolver(sugestaoSchema),
  });

  const onSubmit = (data: SugestaoFormData) => {
    mutate(
      { youtube_url: data.youtube_url },
      {
        onSuccess: () => {
          reset();
          alert("Música enviada!");
        },
        onError: () => {
          alert("Erro ao enviar");
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-xl shadow mb-6"
    >
      <p className="mb-2 font-medium">Sugerir nova música</p>

      <div className="flex gap-2 flex-col sm:flex-row">
        <input {...register("youtube_url")} placeholder="Link do YouTube"
          className="flex-1 border rounded-lg p-3"
        />

        <button type="submit" disabled={isPending}
          className="bg-[#6d4c41] text-white px-4 rounded-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {isPending ? "Enviando..." : "Enviar"}
        </button>
      </div>

      {errors.youtube_url && (
        <p className="text-red-500 text-sm mt-1">
          {errors.youtube_url.message}
        </p>
      )}
    </form>
  );
}