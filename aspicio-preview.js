(() => {
  "use strict";

  const preview = document.getElementById("aspicio-preview");
  const frame = document.getElementById("aspicio-preview-frame");
  const status = document.getElementById("aspicio-preview-status");
  const message = document.getElementById("aspicio-preview-message");
  const retry = document.getElementById("aspicio-preview-retry");
  const open = document.getElementById("aspicio-preview-open");
  const origin = "https://aspicio.app";
  const pageLoad = new Date();
  pageLoad.setUTCSeconds(0, 0);
  const instant = pageLoad.toISOString();
  const chartUrl = new URL("/chart", origin);
  chartUrl.search = new URLSearchParams({
    date: instant.slice(0, 10),
    time: instant.slice(11, 16),
    tz: "UTC",
    lat: "51.4779",
    lng: "0",
    loc: "Greenwich",
  }).toString();
  open.href = chartUrl.href;

  let timeout;
  let attempt = 0;

  function loadPreview() {
    window.clearTimeout(timeout);
    preview.hidden = false;
    preview.classList.remove("is-ready", "has-error");
    preview.setAttribute("aria-busy", "true");
    frame.setAttribute("aria-hidden", "true");
    frame.tabIndex = -1;
    status.hidden = false;
    retry.hidden = true;
    message.textContent = "Opening Aspicio for this moment...";

    const url = new URL(chartUrl);
    if (attempt > 0) url.searchParams.set("previewRetry", String(attempt));
    attempt += 1;
    frame.src = url.href;

    timeout = window.setTimeout(() => {
      preview.classList.add("has-error");
      preview.setAttribute("aria-busy", "false");
      message.textContent = "The preview is taking a little longer. Try again or open Aspicio below.";
      retry.hidden = false;
    }, 20000);
  }

  frame.addEventListener("load", () => {
    window.clearTimeout(timeout);
    preview.classList.remove("has-error");
    preview.classList.add("is-ready");
    preview.setAttribute("aria-busy", "false");
    frame.removeAttribute("aria-hidden");
    frame.removeAttribute("tabindex");
    status.hidden = true;
  });

  retry.addEventListener("click", loadPreview);
  loadPreview();
})();
