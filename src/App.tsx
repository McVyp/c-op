import { useEffect, useState } from "react";
import "./App.css";
import { Cursors } from "./components/cursors";
import { Tracker } from "./components/tracker";
import { Provider } from "./providers";
import { GitHubIcon, PauseIcon, PlayIcon } from "./components/icons";
import Loop from "./components/loop";

function App() {
  const [isActive, setIsActive] = useState(true);
  const Icon = isActive ? PauseIcon : PlayIcon;

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === " " && e.target === document.body) {
        setIsActive((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive]);
  return (
    <>
      <div className="bg-gray-900 selection:bg-violet-600/90 ">
        <svg
          className="pointer-events-none fixed isolate z-50 opacity-70 mix-blend-soft-light"
          width="100%"
          height="100%"
        >
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.80"
              numOctaves="4"
              stitchTiles="stitch"
            ></feTurbulence>
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)"></rect>
        </svg>
        <Provider>
          <div>
            <Cursors />
            <Tracker isActive={isActive} />
            <div className="flex min-h-[100svh] flex-col items-center justify-center p-12 text-center">
              <Loop />
              <div className="isolate items-center justify-center gap-4 rounded-lg bg-gray-950 p-2 hidden">
                <button
                  className="text-gray-200 transition-colors hover:text-indigo-500"
                  onClickCapture={() => setIsActive(!isActive)}
                  type="button"
                >
                  <span className="sr-only">{isActive ? "Pause" : "Play"}</span>
                  <Icon className="h-8 w-8" />
                </button>

                <a
                  className="text-gray-200 transition-colors hover:text-indigo-500"
                  href=""
                >
                  <span className="sr-only">View source on GitHub</span>
                  <GitHubIcon className="h-8 w-8" />
                </a>
              </div>
            </div>
          </div>
        </Provider>
      </div>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="h-full bg-[url('./assets/bg.jpeg')] bg-top bg-no-repeat w-full opacity-[0.3] bg-cover"></div>
      </div>
    </>
  );
}

export default App;
