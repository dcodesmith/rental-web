import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Rental App" },
    { name: "description", content: "Welcome to Rental!" },
  ];
};

export const loader = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const apiPath = process.env.RENTAL_API || "http://localhost:3000"
  const res = await fetch(apiPath);
  const data = await res.json()
  return json({ data, q });
};

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div className="flex justify-center">
      <h1 className="mb-4 text-4xl leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl font-semibold">Rental Web</h1>
      <div className="flex-col">
        <pre className="flex">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
}
