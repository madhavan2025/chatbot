(function () {
  let isOpen = false;
  let isExpanded = false;

  const isMobile = () => window.innerWidth <= 640;

  // CHAT BUTTON
  const button = document.createElement("button");
  button.innerHTML = `
    <img
      src="https://chatbot-woad-six.vercel.app/images/chat.png"
      style="width:60px;height:60px;object-fit:contain;"
    />
  `;

  Object.assign(button.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "transparent",
    border: "none",
    padding: "0",
    cursor: "pointer",
    zIndex: "9999",
    boxShadow: "0 5px 15px rgba(0,0,0,.2)"
  });

  document.body.appendChild(button);

  // IFRAME
  const iframe = document.createElement("iframe");

  Object.assign(iframe.style, {
    position: "fixed",
    bottom: "90px",
    right: "20px",
    width: "380px",
    height: "600px",
    maxWidth: "92vw",
    maxHeight: "80vh",
    border: "none",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,.2)",
    display: "none",
    zIndex: "9999",
    background: "#fff",
    transition: "all .25s ease"
  });

  iframe.allow = "clipboard-write; microphone";

  document.body.appendChild(iframe);

  function applyWidgetSize() {
    iframe.style.width = "380px";
    iframe.style.height = "600px";
    iframe.style.bottom = "90px";
    iframe.style.right = "20px";
    iframe.style.borderRadius = "12px";
  }

  function applyFullScreen() {
    iframe.style.width = "100vw";
    iframe.style.height = "100vh";
    iframe.style.bottom = "0";
    iframe.style.right = "0";
    iframe.style.borderRadius = "0";
  }

  const openChat = () => {
    if (!iframe.src) {
      iframe.src = "https://chatbot-woad-six.vercel.app/?embed=true";
    }

    iframe.style.display = "block";
    isOpen = true;

    // MOBILE DEFAULT FULLSCREEN
    if (isMobile()) {
      applyFullScreen();
      isExpanded = true;
    } else {
      applyWidgetSize();
    }
  };

  const closeChat = () => {
    iframe.style.display = "none";
    isOpen = false;
    isExpanded = false;
  };

  // MESSAGE LISTENER
  window.addEventListener("message", (event) => {

    if (event.data === "closeChat") {
      closeChat();
    }

    if (event.data?.type === "toggleExpand") {
      isExpanded = event.data.value;

      if (isExpanded) {
        applyFullScreen();
      } else {
        applyWidgetSize();
      }
    }

  });

  button.onclick = () => {
    isOpen ? closeChat() : openChat();
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) {
      closeChat();
    }
  });

  // RESPONSIVE
  window.addEventListener("resize", () => {
    if (!isOpen) return;

    if (isMobile()) {
      applyFullScreen();
    } else if (!isExpanded) {
      applyWidgetSize();
    }
  });

})();