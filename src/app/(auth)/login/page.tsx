import AuthForm from "@/components/AuthForm";
import H1 from "@/components/H1";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <H1 className="text-center mb-5">Log in</H1>

      <AuthForm type="login" />

      <p className="mt-6 text-sm text-zinc-500">
        No account yet?{" "}
        <Link className="font-medium" href="/signup">
          Sign up
        </Link>
      </p>
    </main>
  );
}
