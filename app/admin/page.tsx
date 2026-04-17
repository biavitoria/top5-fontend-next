"use client";

import { useEffect } from "react";
import { useMusicasPendentes } from "@/hooks/useMusicas";
import MusicaCard from "./musica-card";
import { getToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  const token = getToken();
  const { data: musicas, isLoading } = useMusicasPendentes();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  return (
    <div className="min-h-screen bg-[#f6f1eb] px-4 py-6">

      <h1 className="text-2xl font-bold mb-6 text-center">
        Painel Administrativo
      </h1>

      {isLoading && (
        <p className="text-center">Carregando...</p>
      )}

      {!isLoading && musicas?.length === 0 && (
        <p className="text-center">
          Nenhuma música pendente
        </p>
      )}

      {musicas?.map((m) => (
        <MusicaCard key={m.id} musica={m} />
      ))}

    </div>
  );
}