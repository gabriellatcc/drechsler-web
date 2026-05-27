const COMPONENT_KEY_PATTERN = /^[a-zA-Z0-9.\-_]+$/;

const COMPONENT_SECTIONS = [
  "schemas",
  "responses",
  "parameters",
  "requestBodies",
  "headers",
  "examples",
  "links",
  "callbacks",
  "securitySchemes",
  "pathItems",
] as const;

function sanitizeComponentKey(key: string): string {
  return key.replace(/\s+/g, "").replace(/[^a-zA-Z0-9.\-_]/g, "");
}

function replaceRefs(
  value: unknown,
  replacements: Map<string, string>,
): unknown {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => replaceRefs(item, replacements));
  }

  const record = value as Record<string, unknown>;
  const result: Record<string, unknown> = {};

  for (const [key, nestedValue] of Object.entries(record)) {
    if (key === "$ref" && typeof nestedValue === "string") {
      result[key] = replacements.get(nestedValue) ?? nestedValue;
      continue;
    }

    result[key] = replaceRefs(nestedValue, replacements);
  }

  return result;
}

function repairOpenApiSchema(value: unknown): unknown {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => repairOpenApiSchema(item));
  }

  const record = value as Record<string, unknown>;
  const result: Record<string, unknown> = {};

  for (const [key, nestedValue] of Object.entries(record)) {
    result[key] = repairOpenApiSchema(nestedValue);
  }

  if (record.type === "null") {
    delete result.type;
    result.nullable = true;
    result.enum = [null];
  }

  return result;
}

function buildComponentKeyReplacements(
  spec: Record<string, unknown>,
): Map<string, string> {
  const replacements = new Map<string, string>();
  const components = spec.components;

  if (!components || typeof components !== "object") {
    return replacements;
  }

  for (const section of COMPONENT_SECTIONS) {
    const sectionComponents = (components as Record<string, unknown>)[section];
    if (!sectionComponents || typeof sectionComponents !== "object") {
      continue;
    }

    const sanitizedComponents: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(sectionComponents)) {
      if (COMPONENT_KEY_PATTERN.test(key)) {
        sanitizedComponents[key] = value;
        continue;
      }

      const sanitizedKey = sanitizeComponentKey(key);
      sanitizedComponents[sanitizedKey] = value;

      replacements.set(
        `#/components/${section}/${encodeURIComponent(key)}`,
        `#/components/${section}/${sanitizedKey}`,
      );
      replacements.set(
        `#/components/${section}/${key}`,
        `#/components/${section}/${sanitizedKey}`,
      );
    }

    (components as Record<string, unknown>)[section] = sanitizedComponents;
  }

  return replacements;
}

export default function sanitizeInvalidComponentKeys(
  spec: Record<string, unknown>,
): Record<string, unknown> {
  const replacements = buildComponentKeyReplacements(spec);
  const withFixedRefs = replaceRefs(spec, replacements);
  return repairOpenApiSchema(withFixedRefs) as Record<string, unknown>;
}
