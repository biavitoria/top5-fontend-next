"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Musica } from "@/types/musica";

type OutrasResponse = {
  data: Musica[];
  last_page: number;
};

export function useTop5() {
  return useQuery<Musica[]>({
    queryKey: ["top5"],
    queryFn: async () => {
      const data = await apiFetch("/musicas/top5");
      return data.data ?? data;
    },
  });
}

export function useOutras(page: number) {
  return useQuery<OutrasResponse>({
    queryKey: ["outras", page],
    enabled: !!page,
    queryFn: async () => {
      const data = await apiFetch(`/musicas/outras?page=${page}`);

      return {
        data: data.data ?? data,
        last_page: data.last_page ?? 1,
      };
    },
  });
}

export function useEnviarMusica() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ youtube_url }: { youtube_url: string }) => {
      const token = getToken();

      await apiFetch("/musicas", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ youtube_url }),
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["top5"] });
      queryClient.invalidateQueries({ queryKey: ["outras"] });
    },
  });
}