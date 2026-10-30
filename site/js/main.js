(function () {
  "use strict";
  var cfg = window.CONFIG;
  var phone = String(cfg.whatsapp || "").replace(/\D/g, "");
  var waUrl = function (text) {
  var w = String(cfg.whatsapp || "");
  if (/^https?:\/\//.test(w)) return w;
  return "https://wa.me/" + w.replace(/\D/g, "") + "?text=" + encodeURIComponent(text);
};
  var el = function (tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  };

  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = waUrl(a.dataset.wa);
    a.target = "_blank";
    a.rel = "noopener";
  });

  var dlg = document.getElementById("dlg");
  var big = document.getElementById("big");
  dlg.querySelector("button").addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });

  cfg.produtos.forEach(function (p) {
    var grid = document.querySelector('[data-modelo="' + p.modelo + '"]');
    if (!grid) return;

    var card = el("article", "card");

    var ph = el("button", "ph");
    ph.type = "button";
    ph.setAttribute("aria-label", "Ampliar foto: " + p.nome);
    var img = el("img");
    img.src = p.img; img.alt = p.nome; img.loading = "lazy";
    img.width = 900; img.height = 1125;
    ph.appendChild(img);
    ph.addEventListener("click", function () {
      big.src = p.img; big.alt = p.nome; dlg.showModal();
    });

    var info = el("div", "info");
    info.appendChild(el("h3", "", p.nome));
    info.appendChild(el("small", "", "Ref. " + p.modelo));
    info.appendChild(p.preco ? el("div", "price", p.preco) : el("div", "price empty", "Preço: a definir"));

    var buy = el("a", "btn btn-wa", "Encomendar");
    buy.href = waUrl("Olá! Quero encomendar: " + p.nome + (p.preco ? " (" + p.preco + ")" : ""));
    buy.target = "_blank"; buy.rel = "noopener";
    info.appendChild(buy);

    card.appendChild(ph);
    card.appendChild(info);
    grid.appendChild(card);
  });
})();
