import { ThemeToggle } from "../theme/theme-toggle";

export const NavBar = () => {
  return (
    <nav className="container py-2 flex items-center justify-between">
      <h1 className="font-medium">NEET Result</h1>
      <ThemeToggle />
    </nav>
  );
};
