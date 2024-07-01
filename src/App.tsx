import { ThemeProvider } from "./components/providers/ThemeProvider";
import Index from "./views/Index";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Index />
    </ThemeProvider>
  );
}
