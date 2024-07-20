import { LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Rental App" },
    { name: "description", content: "Welcome to Rental!" },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const apiPath = process.env.RENTAL_API || `http://localhost:3000`;
  const response = await fetch(`${apiPath}/cars/${params.id}`);
  const car = await response.json();

  return json({ car });
};

type Car = {
  id: number;
  make: string;
  model: string;
  year: number;
  colour: string;
  price: number;
};

export default function Index() {
  const { car } = useLoaderData<typeof loader>() as { car: Car };

  return (
    <div className="relative rounded-xl overflow-auto p-8">
      <pre>{JSON.stringify(car, null, 2)}</pre>
    </div>
  );
}
