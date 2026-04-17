import { z } from "zod";

export const editMusicaschema = z.object({
  titulo: z.string().min(2, "Titulo muito curto"),
  youtube_url: z.string().url("URL inválida"),
});

export const sugestaoSchema = z.object({
  youtube_url: z.string().url("Link inválido"),
});


export type EditMusicaFormData = z.infer<typeof editMusicaschema>;
export type SugestaoFormData = z.infer<typeof sugestaoSchema>;
