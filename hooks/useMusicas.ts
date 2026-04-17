"use client"

import { Musica } from "@/types/musica";
import { apiFetch } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useMusicasPendentes() {
  return useQuery<Musica[]>({
    queryKey: ["musicas"],
    queryFn: async () => {
      const token = getToken();

      const res = await apiFetch("/musicas/pendentes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data || res;
    },
  });
}

export function useAprovarMusica() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const token = getToken();

      await apiFetch(`/musicas/${id}/aprovar`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["musicas"] });
      queryClient.invalidateQueries({ queryKey: ["top5"] });
      queryClient.invalidateQueries({ queryKey: ["outras"] });
    },
  });
}

export function useReprovarMusica() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const token = getToken();

      await apiFetch(`/musicas/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["musicas"] });
      queryClient.invalidateQueries({ queryKey: ["top5"] });
      queryClient.invalidateQueries({ queryKey: ["outras"] });
    },
  });
}

export function useEditarMusica() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, titulo, youtube_url,} : {
      id: number;
      titulo: string;
      youtube_url: string;
    }) => {
      const token = getToken();

      await apiFetch(`/musicas/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ titulo, youtube_url }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["musicas"] });
      queryClient.invalidateQueries({ queryKey: ["top5"] });
      queryClient.invalidateQueries({ queryKey: ["outras"] });
    },
  });
}