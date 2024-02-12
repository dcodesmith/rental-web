import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getSession } from "~/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Rental App" },
    { name: "description", content: "Welcome to Rental!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const apiPath = process.env.RENTAL_API || "http://localhost:3000";
  const response = await fetch(apiPath);
  const data = await response.json();

  const session = await getSession(request.headers.get("cookie"));
  const isSignedIn = session.has("accessToken") && session.has("refreshToken");

  return json({ data, q, isSignedIn });
};

export default function Index() {
  const { data, q, isSignedIn } = useLoaderData<typeof loader>();

  return (
    <div className="flex items-center flex-col">
      <h1 className="mb-4 text-4xl leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl font-semibold">
        Rental Web
      </h1>
      <div className="flex-col text-center">
        <code className="flex">{JSON.stringify(data, null, 2)}</code>
        {q && `query string = ${q}`}
      </div>

      {isSignedIn && (
        <Form method="post" action="/logout">
          <button>Logout</button>
        </Form>
      )}
    </div>
  );
}
