export type ApiRecord = {
  id: number;
  filename: string;
  summary: string | null;
  created_at: string;
};

export type UploadResponse = {
  id: number;
  filename: string;
  summary: string;
};

export type AskResponse = {
  answer: string;
};

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/$/, "");

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {...options?.headers},
    });
  } catch {
    throw new ApiError(
      "The AI Health Vault API is unavailable. Demo data is still available.",
    );
  }

  if (!response.ok) {
    let message = "The request could not be completed.";
    try {
      const errorBody = (await response.json()) as {detail?: string};
      message = errorBody.detail || message;
    } catch {
      // Keep the user-friendly fallback when the API does not return JSON.
    }
    throw new ApiError(message, response.status);
  }

  return response.json() as Promise<T>;
}

export const api = {
  getRecords: () =>
    request<ApiRecord[]>("/records", {
      cache: "no-store",
    }),

  uploadRecord: (
    file: File,
    onProgress?: (progress: number) => void,
  ): Promise<UploadResponse> =>
    new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${API_URL}/records/upload`);
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          onProgress?.(Math.round((event.loaded / event.total) * 100));
        }
      });
      xhr.addEventListener("load", () => {
        try {
          const payload = JSON.parse(xhr.responseText) as
            | UploadResponse
            | {detail?: string};
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(payload as UploadResponse);
          } else {
            reject(
              new ApiError(
                "detail" in payload && payload.detail
                  ? payload.detail
                  : "The file could not be uploaded.",
                xhr.status,
              ),
            );
          }
        } catch {
          reject(new ApiError("The upload returned an unexpected response."));
        }
      });
      xhr.addEventListener("error", () => {
        reject(new ApiError("The backend is unavailable. Please try again later."));
      });
      xhr.send(formData);
    }),

  askQuestion: (question: string) =>
    request<AskResponse>("/ask", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({question}),
    }),
};
