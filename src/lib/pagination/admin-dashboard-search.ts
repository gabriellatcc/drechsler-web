import { isPerPageOption } from "./constants";

export type AdminDashboardSearch = {
  contact_page?: number;
  contact_per_page?: number;
  blog_page?: number;
  blog_per_page?: number;
};

function parseOptionalInt(value: unknown): number | undefined {
  if (value === undefined || value === null || value === "") return undefined;

  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) return undefined;

  return Math.floor(parsed);
}

export function validateAdminDashboardSearch(
  search: Record<string, unknown>,
): AdminDashboardSearch {
  const contactPage = parseOptionalInt(search.contact_page);
  const blogPage = parseOptionalInt(search.blog_page);
  const contactPerPage = parseOptionalInt(search.contact_per_page);
  const blogPerPage = parseOptionalInt(search.blog_per_page);

  return {
    contact_page: contactPage !== undefined && contactPage >= 1 ? contactPage : undefined,
    blog_page: blogPage !== undefined && blogPage >= 1 ? blogPage : undefined,
    contact_per_page:
      contactPerPage !== undefined && isPerPageOption(contactPerPage)
        ? contactPerPage
        : undefined,
    blog_per_page:
      blogPerPage !== undefined && isPerPageOption(blogPerPage) ? blogPerPage : undefined,
  };
}
