declare module "sanitize-markdown" {
  function sanitizeMarkdown(
    html: string,
    options?: object,
    strict?: boolean
  ): string;
  export = sanitizeMarkdown;
}
