"use client";

import { useEffect } from "react";
import { ANALYTICS_CONFIG } from "@/lib/analytics";

export default function ThirdPartyScripts() {
  useEffect(() => {
    let timerId;
    let scriptsLoaded = false;

    const loadScripts = () => {
      if (scriptsLoaded) return;
      scriptsLoaded = true;
      cleanup();

      // 1. Google Tag Manager
      const gtmScript = document.createElement("script");
      gtmScript.id = "gtm-script";
      gtmScript.async = true;
      gtmScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${ANALYTICS_CONFIG.GTM_ID}');`;
      document.head.appendChild(gtmScript);

      // 2. Facebook Pixel
      if (!window.fbq) {
        const fbScript = document.createElement("script");
        fbScript.id = "facebook-pixel";
        fbScript.async = true;
        fbScript.innerHTML = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${ANALYTICS_CONFIG.FACEBOOK_PIXEL_ID}');
fbq('track', 'PageView');`;
        document.head.appendChild(fbScript);
      }

      // 3. Microsoft Clarity
      const clarityScript = document.createElement("script");
      clarityScript.id = "clarity-script";
      clarityScript.async = true;
      clarityScript.innerHTML = `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${ANALYTICS_CONFIG.CLARITY_ID}");`;
      document.head.appendChild(clarityScript);

      // 4. Zoho Widget
      const zohoScript = document.createElement("script");
      zohoScript.id = "zsiqscript";
      zohoScript.async = true;
      zohoScript.defer = true;
      zohoScript.src = `https://salesiq.zohopublic.com/widget?wc=${ANALYTICS_CONFIG.ZOHO_WIDGET_CODE}`;
      zohoScript.onerror = () => {
        console.error("Failed to load Zoho script. Check the widget code or domain.");
      };
      document.body.appendChild(zohoScript);

      // Initialize Zoho SalesIQ
      window.$zoho = window.$zoho || {};
      window.$zoho.salesiq = window.$zoho.salesiq || { ready: function() {} };
    };

    const cleanup = () => {
      if (timerId) clearTimeout(timerId);
      window.removeEventListener("scroll", loadScripts, { passive: true });
      window.removeEventListener("mousedown", loadScripts, { passive: true });
      window.removeEventListener("mousemove", loadScripts, { passive: true });
      window.removeEventListener("touchstart", loadScripts, { passive: true });
      window.removeEventListener("keydown", loadScripts, { passive: true });
    };

    // Load on user interaction
    window.addEventListener("scroll", loadScripts, { passive: true });
    window.addEventListener("mousedown", loadScripts, { passive: true });
    window.addEventListener("mousemove", loadScripts, { passive: true });
    window.addEventListener("touchstart", loadScripts, { passive: true });
    window.addEventListener("keydown", loadScripts, { passive: true });

    // Or after 10000ms delay (10s - well after LCP)
    timerId = setTimeout(loadScripts, 10000);

    return cleanup;
  }, []);

  return null;
}
