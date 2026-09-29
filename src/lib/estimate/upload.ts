import { FILE_UPLOAD_EXTENSIONS, FILE_UPLOAD_MAX_BYTES, FILE_UPLOAD_MAX_FILES, FILE_UPLOAD_MIME_TYPES, type UploadedFile } from "./types";

export type UploadResult =
  | { ok: true; files: UploadedFile[]; batchToken: string }
  | { ok: false; error: string };

function extensionOf(filename: string): string {
  const dot = filename.lastIndexOf(".");
  return dot === -1 ? "" : filename.slice(dot).toLowerCase();
}

/** Client-side pre-check only -- the real boundary is server-side in /api/estimate/upload. */
export function validateFileForSelection(file: File): string | null {
  const extension = extensionOf(file.name);
  if (!FILE_UPLOAD_EXTENSIONS.includes(extension as (typeof FILE_UPLOAD_EXTENSIONS)[number])) {
    return `"${file.name}" is not an accepted file type (jpg, jpeg, gif, png, pdf only).`;
  }
  if (file.type && !FILE_UPLOAD_MIME_TYPES.includes(file.type as (typeof FILE_UPLOAD_MIME_TYPES)[number])) {
    return `"${file.name}" is not an accepted file type.`;
  }
  if (file.size > FILE_UPLOAD_MAX_BYTES) {
    return `"${file.name}" is over the ${FILE_UPLOAD_MAX_BYTES / (1024 * 1024)}MB limit.`;
  }
  if (file.size === 0) {
    return `"${file.name}" is empty.`;
  }
  return null;
}

export function validateSelectionCount(existing: number, adding: number): string | null {
  if (existing + adding > FILE_UPLOAD_MAX_FILES) {
    return `You can upload up to ${FILE_UPLOAD_MAX_FILES} files.`;
  }
  return null;
}

/** Uploads the given files (0 allowed) plus a Turnstile token to R2, via our own server route. */
export async function uploadFiles(files: File[], turnstileToken: string): Promise<UploadResult> {
  const form = new FormData();
  form.append("turnstileToken", turnstileToken);
  for (const file of files) form.append("files", file);

  try {
    const res = await fetch("/api/estimate/upload", { method: "POST", body: form });
    const json = (await res.json().catch(() => null)) as UploadResult | null;

    if (!res.ok || !json || json.ok !== true) {
      return { ok: false, error: json && "error" in json ? json.error : "File upload failed. Please try again." };
    }

    return json;
  } catch {
    return { ok: false, error: "Network error while uploading files. Please try again." };
  }
}

/** Best-effort cleanup of an upload batch's own R2 objects after a later step (Web3Forms) fails. */
export async function cleanupUploadedFiles(files: UploadedFile[], batchToken: string): Promise<void> {
  if (files.length === 0) return;
  try {
    await fetch("/api/estimate/cleanup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keys: files.map((f) => f.key), batchToken }),
    });
  } catch {
    // Best-effort only -- an orphaned R2 object left behind by a failed retry
    // is a minor storage cost, not something worth surfacing to the visitor.
  }
}
