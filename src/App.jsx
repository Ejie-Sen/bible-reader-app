import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SettingsProvider } from "./context/SettingsContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Reader from "./pages/Reader";
import Chapters from "./pages/Chapters";
import Favorites from "./pages/Favorites"; // <--- IMPORT THIS

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="book/:book" element={<Chapters />} />
              <Route path="read/:book/:chapter" element={<Reader />} />
              <Route path="favorites" element={<Favorites />} /> {/* <--- ADD THIS */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SettingsProvider>
    </QueryClientProvider>
  );
}

export default App;