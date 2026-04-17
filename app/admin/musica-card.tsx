"use client";

import { useState } from "react";
import EditMusicaForm from "./edit-musica-form";
import { useAprovarMusica, useReprovarMusica, } from "@/hooks/useMusicas";
import { Musica } from "../../types/musica";

type Props = {
  musica: Musica;
};

export default function MusicaCard({ musica }: Props) {
  const [editando, setEditando] = useState(false);

  const aprovar = useAprovarMusica();
  const reprovar = useReprovarMusica();

  return (
    <div className="bg-white p-6 mb-4 rounded-xl shadow hover:shadow-lg transition">
      {editando ? (
        <EditMusicaForm
          musica={musica}
          onCancel={() => setEditando(false)}
        />
      ) : (
        <>
          <h2 className="text-lg font-semibold">
            {musica.titulo}
          </h2>

          <p className="text-sm text-yellow-600 mt-1">
            Sugestão pendente
          </p>

          <a
            href={musica.youtube_url}
            target="_blank"
            className="text-blue-600 text-sm block mt-2"
          >
            {musica.youtube_url}
          </a>

          <p className="text-sm text-gray-500 mt-2">
            Sugerido por:{" "}
            {musica.user?.name || "Usuário desconhecido"}
          </p>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => aprovar.mutate(musica.id)}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition"
            >
              Aprovar
            </button>

            <button
              onClick={() => reprovar.mutate(musica.id)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Reprovar
            </button>

            <button
              onClick={() => setEditando(true)}
              className="border px-4 py-2 rounded-lg"
            >
              Editar
            </button>
          </div>
        </>
      )}
    </div>
  );
}