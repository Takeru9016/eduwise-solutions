export const GTM_ID = "GTM-WLRDT2SQ";

export function GoogleTagManagerNoScript() {
  return (
    <noscript>
      <iframe
        height="0"
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
        width="0"
      />
    </noscript>
  );
}
