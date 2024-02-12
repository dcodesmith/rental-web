import { z } from "zod";

const apiPath = process.env.RENTAL_API || "http://localhost:3000";

export const login = async (email: string, password: string) => {
  const response = await fetch(`${apiPath}/authentication/sign-in`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  return z
    .object({ accessToken: z.string(), refreshToken: z.string() })
    .promise()
    .parse(response.json());
};

export const refresh = async (refreshToken: string) => {
  const response = await fetch(`${apiPath}/authentication/refresh-tokens`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });

  return response.json();
};

export const logout = async () => {};

export const signUp = async (email: string, password: string) => {
  const response = await fetch(`${apiPath}/authentication/sign-up`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  return response.json();
};
