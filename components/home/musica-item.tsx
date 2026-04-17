"use client";

import { useState } from "react";
import EditMusicaForm from "@/app/admin/edit-musica-form";
import { useReprovarMusica } from "@/hooks/useMusicas";
import { getUser } from "@/lib/auth";
import { Musica } from "@/types/musica";

type Props = {
  musica: Musica;
};

export default function MusicaItem({ musica }: Props) {
  const [editando, setEditando] = useState(false);

  const excluir = useReprovarMusica();

  const user = getUser();
  const isAdmin = !!user?.is_admin;

  const getYoutubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com.*v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : null;
  };

  const youtubeId = getYoutubeId(musica.youtube_url);

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-2 flex gap-3 items-center flex-wrap">

      {/* THUMB */}
      {youtubeId ? (
        <img
          src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
          className="w-24 rounded-lg"
          alt={musica.titulo}
        />
      ) : (
        <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
          sem thumb
        </div>
      )}

      {/* TITUL */}
      <div className="flex-1">
        {editando ? (
          <EditMusicaForm
            musica={musica}
            onCancel={() => setEditando(false)}
          />
        ) : (
          <p className="font-medium text-gray-900">
            {musica.titulo}
          </p>
        )}
      </div>

      {/* PLAY */}
      <a
        href={musica.youtube_url}
        target="_blank"
        className="bg-[#6d4c41] text-white px-3 py-1 rounded hover:opacity-90 transition"
      >
        ▶
      </a>
{/* 
      {isAdmin && !editando && (
        <div className="flex gap-2">
          <button
            onClick={() => setEditando(true)}
            className="text-blue-600 hover:underline"
          >
            Editar
          </button>

          <button
            onClick={() => excluir.mutate(musica.id)}
            disabled={excluir.isPending}
            className="text-red-600 hover:underline disabled:opacity-50"
          >
            Excluir
          </button>
        </div>
      )}  
*/}

    </div>
  );
}