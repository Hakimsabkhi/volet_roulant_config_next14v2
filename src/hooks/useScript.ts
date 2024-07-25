// hooks/useScript.ts
import { useEffect, useState } from 'react';

const useScript = (src: string, onLoadCallback: () => void) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const scriptId = 'sketchfab-script';
    const existingScript = document.getElementById(scriptId);

    if (existingScript) {
      setLoaded(true);
      onLoadCallback();
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = src;
    script.async = true;

    script.onload = () => {
      setLoaded(true);
      onLoadCallback();
    };

    script.onerror = () => {
      console.error(`Failed to load script ${src}`);
    };

    document.body.appendChild(script);

    return () => {
      if (script) {
        script.remove();
      }
    };
  }, [src, onLoadCallback]);

  return loaded;
};

export default useScript;
