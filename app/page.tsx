"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useTop5, useOutras } from "@/hooks/useHome";
import MusicaItem from "@/components/home/musica-item";
import { getToken } from "@/lib/auth";

const SugestaoForm = dynamic(
  () => import("@/components/home/form-sugestao"),
  { ssr: false }
);

export default function HomePage() {
  const [page, setPage] = useState(1);

  const { data: top5, isLoading: loadingTop5 } = useTop5();
  const { data: outras, isLoading: loadingOutras } = useOutras(page);

  const token = getToken();

  return (
    <div className="min-h-screen bg-[#f6f1eb]">

      <div className="h-64 flex items-center justify-center bg-[#3e2723] text-white">
        <h1 className="text-2xl font-bold text-center">
          Top 5 Músicas Mais Tocadas
        </h1>
      </div>

      <div className="max-w-3xl mx-auto mt-6 px-4">

        {/* FORM */}
        {token ? (
          <SugestaoForm />
        ) : (
          <div className="bg-white p-6 rounded-xl text-center shadow mb-5">
            Faça login para sugerir música
          </div>
        )}

        {/* LOADING */}
        {(loadingTop5 || loadingOutras) && (
          <p className="text-center mt-4">Carregando...</p>
        )}

        {/* TOP 5 */}
        {top5?.map((m) => (
          <MusicaItem key={m.id} musica={m} />
        ))}

        {/* OUTRAS */}
        <h2 className="mt-6 mb-2 font-semibold">
          Outras músicas
        </h2>

        {outras?.data?.map((m) => (
          <MusicaItem key={m.id} musica={m} />
        ))}

        {/* PAGINAÇÃO */}
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
          {Array.from({ length: outras?.last_page || 1 }).map((_, i) => {
            const pageNumber = i + 1;

            return (
              <button key={pageNumber} onClick={() => setPage(pageNumber)}
                className={`px-3 py-1 border rounded transition ${
                  page === pageNumber ? "bg-black text-white" : "bg-white"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}