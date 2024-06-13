import { ThemeToggle } from "../theme/theme-toggle";

export const NavBar = () => {
  return (
    <nav className="container py-2">
      <ThemeToggle />
    </nav>
  );
};
