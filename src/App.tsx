import { ThemeToggle } from "./components/app/ThemeToggle";
import { ThemeProvider } from "./components/providers/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <ThemeToggle />
    </ThemeProvider>
  );
}
