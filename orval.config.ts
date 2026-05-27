import { defineConfig, defineTransformer } from "orval";
import sanitizeInvalidComponentKeys from "./orval-input-transformer";

export default defineConfig({
  drechsler: {
    input: {
      target: "./swagger.json",
      override: {
        transformer: defineTransformer(sanitizeInvalidComponentKeys),
      },
    },
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
