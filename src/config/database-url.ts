type DatabaseEnv = {
  DATABASE_URL?: string;
  DB_HOST?: string;
  DB_USER?: string;
  DB_PASSWORD?: string;
  DB_NAME?: string;
  DB_PORT?: string;
  DB_SSL?: string;
};

export function resolveDatabaseUrl(source: DatabaseEnv): string | undefined {
  if (source.DATABASE_URL) {
    return source.DATABASE_URL;
  }

  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = source;

  if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
    return undefined;
  }

  const port = source.DB_PORT || "5432";
  const url = new URL(`postgresql://${DB_HOST}:${port}/${DB_NAME}`);
  url.username = DB_USER;
  url.password = DB_PASSWORD;

  if (source.DB_SSL === "true" || source.DB_SSL === "require") {
    url.searchParams.set("sslmode", "require");
    url.searchParams.set("uselibpqcompat", "true");
  }

  return url.toString();
}
