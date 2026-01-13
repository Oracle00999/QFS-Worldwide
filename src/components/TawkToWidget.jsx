// components/TawkToWidget.jsx
import { useEffect } from 'react';

const TawkToWidget = () => {
  useEffect(() => {
    // Tawk.to embed code
    const s1 = document.createElement('script');
    const s0 = document.getElementsByTagName('script')[0];
    
    s1.async = true;
    s1.src = 'https://embed.tawk.to/YOUR_WIDGET_ID/default';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    
    s0.parentNode.insertBefore(s1, s0);
    
    return () => {
      // Optional cleanup
      if (s1.parentNode) {
        s1.parentNode.removeChild(s1);
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

export default TawkToWidget;