import { json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Rental App" },
    { name: "description", content: "Welcome to Rental!" },
  ];
};

export const loader = async () => {
  const apiPath = process.env.RENTAL_API || "http://localhost:3000/cars";
  const response = await fetch(apiPath);
  const cars = await response.json();

  return json({ cars });
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
  const { cars } = useLoaderData<typeof loader>() as {
    cars: Car[];
    q: string;
  };

  return (
    // <div className="flex items-center flex-col">
    //   <h1 className="mb-4 text-4xl leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl font-semibold">
    //     Rental Web
    //   </h1>
    //   <div className="container mx-auto px-4 py-8">
    <div className="relative rounded-xl overflow-auto p-8">
      <div className="text-gray-700 grid md:grid-cols-2 grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 gap-4 text-sm leading-6 bg-stripes-fuchsia rounded-lg">
        {cars.map((car) => (
          <Car {...car} key={car.id} />
        ))}
      </div>
    </div>
    //   </div>
    // </div>
  );
}

function Car({ make, model, year, colour, price, id }: Car) {
  return (
    <div className="text-left mb-3 relative">
      <Link className="absolute inset-0" to={`/cars/${String(id)}`}></Link>
      <img
        src="https://via.placeholder.com/300"
        alt="Toyota - Land Cruiser - 2016"
        className="w-full h-48 object-cover mb-2"
      />
      <div className="font-medium mb-1">
        {make} {model} . {year}
      </div>
      <div className="font-medium mb-1 capitalize">{colour}</div>
      <div>
        {price.toLocaleString("en-NG", {
          style: "currency",
          currency: "NGN",
        })}{" "}
        / day
      </div>
    </div>
  );
}
