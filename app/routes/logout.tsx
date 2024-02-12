import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { Form } from "@remix-run/react";
import { logout } from "~/models/auth.server";
import { getSession } from "~/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("cookie"));
  const isSignedIn = session.has("accessToken") && session.has("refreshToken");

  if (!isSignedIn) return redirect("/");
  return json(null);
}

export async function action({ request }: ActionFunctionArgs) {
  await logout(request);
}

export default function Component() {
  return (
    <Form method="post">
      <button>Logout</button>
    </Form>
  );
}
