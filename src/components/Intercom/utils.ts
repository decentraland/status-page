export function insertScript({
  type = "text/javascript",
  async = true,
  ...props
}) {
  const script = document.createElement("script");
  Object.assign(script, { type, async: async, ...props }); // WARN: babel breaks on `{ async }`

  document.body.appendChild(script);

  return script;
}

export function isMobile() {
  // WARN: Super naive mobile device check.
  // we're using it on low-stake checks, where failing to detect some browsers is not a big deal.
  // If you need more specificity you may want to change this implementation.
  const navigator = window.navigator;

  return (
    !!navigator &&
    (/Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent))
  );
}

export function isErrorWithMessage(error: unknown): error is Error {
  return (
    error !== undefined &&
    error !== null &&
    typeof error === "object" &&
    "message" in error
  );
}
