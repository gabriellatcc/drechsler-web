import { defineConfig } from "orval";

export default defineConfig({
  drechsler: {
    input: "./swagger.json",
    output: {
      mode: "tags-split",
      target: "./src/generated/api",
      schemas: "./src/generated/api/models",
      client: "react-query",
      httpClient: "axios",
      override: {
        mutator: {
          path: "./src/lib/api-client.ts",
          name: "apiClient",
        },
      },
    },
  },
});
