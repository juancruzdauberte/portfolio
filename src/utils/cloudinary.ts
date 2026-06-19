/**
 * Inserts Cloudinary auto-format and auto-quality transforms into an
 * existing upload URL, after /upload/ and before the optional version string.
 *
 * Input:  .../upload/v1772760104/juan-link_kfglqp.jpg
 * Output: .../upload/f_auto,q_auto/v1772760104/juan-link_kfglqp.jpg
 */
export function cloudinaryOptimize(
  url: string,
  options?: { quality?: "auto" | "good" }
): string {
  const q = options?.quality === "good" ? "q_auto:good" : "q_auto";
  const transform = `f_auto,${q}`;
  return url.replace(
    /\/upload\/((?:v\d+\/)?)/,
    `/upload/${transform}/$1`
  );
}
