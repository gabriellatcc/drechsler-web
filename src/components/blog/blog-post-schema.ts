import { z } from "zod";

import { BlogCreatePostBodyStatus } from "@/generated/api/models/blogCreatePostBodyStatus";

const statusSchema = z.enum([
  BlogCreatePostBodyStatus.DRAFT,
  BlogCreatePostBodyStatus.PUBLISHED,
]);

export const blogPostFormSchema = z.object({
  title: z.string().min(1, "Informe o título.").max(255),
  excerpt: z.string().min(1, "Informe o resumo.").max(500),
  content: z.string().min(1, "Informe o conteúdo."),
  coverImage: z.string().min(1, "Informe a URL da imagem de capa."),
  status: statusSchema,
});

export type BlogPostFormValues = z.infer<typeof blogPostFormSchema>;

export const blogPostFormDefaultValues: BlogPostFormValues = {
  title: "",
  excerpt: "",
  content: "",
  coverImage: "",
  status: BlogCreatePostBodyStatus.DRAFT,
};
