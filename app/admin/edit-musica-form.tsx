"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditMusicaFormData, editMusicaschema } from "@/schemas/musica.schema";
import { useEditarMusica } from "@/hooks/useMusicas";
import { Musica } from "../../types/musica";

type Props = {
  musica: Musica;
  onCancel: () => void;
};

export default function EditMusicaForm({ musica, onCancel }: Props) {
  const { mutate, isPending } = useEditarMusica();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditMusicaFormData>({
    resolver: zodResolver(editMusicaschema),
    defaultValues: {
      titulo: musica.titulo,
      youtube_url: musica.youtube_url,
    },
  });

  const onSubmit = (data: EditMusicaFormData) => {
    mutate(
      {
        id: musica.id,
        ...data,
      },
      {
        onSuccess: () => {
          onCancel();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
      {/* TÍTULO */}
      <div className="mb-3">
        <input
          {...register("titulo")}
          className="w-full border rounded-lg p-2"
        />
        {errors.titulo && (
          <p className="text-red-500 text-sm">
            {errors.titulo.message}
          </p>
        )}
      </div>

      {/* LINK */}
      <div className="mb-3">
        <input
          {...register("youtube_url")}
          className="w-full border rounded-lg p-2"
        />
        {errors.youtube_url && (
          <p className="text-red-500 text-sm">
            {errors.youtube_url.message}
          </p>
        )}
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          {isPending ? "Salvando..." : "Salvar"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="border px-3 py-1 rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}