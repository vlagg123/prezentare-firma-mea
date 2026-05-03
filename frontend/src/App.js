import { useEffect, useState } from "react";
import "@/App.css";
import Experience from "@/components/Experience";
import Sections from "@/components/Sections";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import { Toaster } from "sonner";

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="App" data-testid="app-root">
      <CustomCursor />
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "rgba(10,10,24,0.9)",
            border: "1px solid rgba(168, 85, 247, 0.4)",
            color: "#e7e9ff",
            backdropFilter: "blur(16px)",
          },
        }}
      />

      {/* Fixed full-screen 3D scene */}
      <div className="canvas-fixed">
        <Experience />
      </div>

      {/* Vignette overlay between canvas and text */}
      <div className="vignette" />

      {/* Grain texture */}
      <div className="grain" style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }} />

      {/* Foreground content */}
      <div className="content-layer">
        <Navbar />
        <Sections ready={ready} />
      </div>
    </div>
  );
}

export default App;
