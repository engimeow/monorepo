const allowedOrigins = [
  "https://engimeow-puppy-ti.vercel.app",
  "http://localhost:3000",
];

export const isOriginAllowed = (requestOrigin: string | null): boolean => {
  return !!requestOrigin && allowedOrigins.includes(requestOrigin);
};

export const cors = (requestOrigin: string | null): Record<string, string> => {
  const baseHeaders: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
  };

  if (requestOrigin && isOriginAllowed(requestOrigin)) {
    return {
      ...baseHeaders,
      "Access-Control-Allow-Origin": requestOrigin, // 이제 string이 보장됩니다.
      "Access-Control-Allow-Credentials": "true",
    };
  }

  return baseHeaders; // 조건에 맞지 않을 경우 기본 헤더만 반환
};
