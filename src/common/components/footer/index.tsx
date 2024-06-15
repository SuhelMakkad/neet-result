import Link from "next/link";
import { githubRepo, herkiratGitHub, suhelGithub } from "@/utils/constants";
import { Dot } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t">
      <section className="flex items-center flex-wrap gap-3 md:gap-0 py-3 text-muted-foreground justify-center container md:text-xs text-sm">
        <p>
          Developed by{" "}
          <Link href={suhelGithub} className="underline underline-offset-2">
            Suhel Makkad
          </Link>
        </p>

        <Dot className="hidden md:block" />

        <p>
          Data from{" "}
          <Link href={herkiratGitHub} className="underline underline-offset-2">
            Herkirat
          </Link>
        </p>

        <p className="md:ml-auto">
          Contribute at{" "}
          <Link href={githubRepo} className="underline underline-offset-2">
            GitHub
          </Link>
        </p>
      </section>
    </footer>
  );
};
