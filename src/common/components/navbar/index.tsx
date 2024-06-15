import Link from "next/link";
import { ThemeToggle } from "../theme/theme-toggle";

export const NavBar = () => {
  return (
    <nav className="container py-2 flex items-center justify-between">
      <Link href="/">
        <span className="font-medium">NEET Result</span>
      </Link>
      <ThemeToggle />
    </nav>
  );
};
