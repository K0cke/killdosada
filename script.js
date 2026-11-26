let poljeZaPretragu = document.getElementById("searchInput");

poljeZaPretragu.addEventListener("keydown", function(dogadjaj) {
    if (dogadjaj.key === "Enter") {
        let tekst = poljeZaPretragu.value.trim();

        if (tekst !== "") {
            alert("Tražiš pojmove za: ".concat(tekst));
        } else {
            alert("Unesi nešto za pretragu!");
        }
    }
});

// hamburger meni
let burgerDugme = document.getElementById("burgerBtn");
let burgerMeni = document.getElementById("burgerMeni");

function popuniMobilniMeni() {
    burgerMeni.innerHTML = "";

    let jeUlogovan = localStorage.getItem("ulogovan") === "1";

    let stavke = [
        { tekst: "Randomizer", href: "#" },
        { tekst: "O nama", href: "#" },
        { tekst: "Feedback", href: "#" }
    ];

    stavke.forEach(function(s) {
        let a = document.createElement("a");
        a.href = s.href;
        a.textContent = s.tekst;
        burgerMeni.appendChild(a);
    });

    if (jeUlogovan) {
        let nalog = document.createElement("a");
        nalog.href = "#";
        nalog.textContent = "Nalog";
        burgerMeni.appendChild(nalog);

        let odjava = document.createElement("a");
        odjava.href = "#";
        odjava.textContent = "Odjavi se";
        odjava.classList.add("odjava");
        odjava.setAttribute("data-logout", "");
        burgerMeni.appendChild(odjava);
    } else {
        let login = document.createElement("a");
        login.href = "#";
        login.textContent = "Log in";
        login.setAttribute("data-open", "loginModal");
        burgerMeni.appendChild(login);
    }
}

popuniMobilniMeni();

burgerDugme.addEventListener("click", function() {
    popuniMobilniMeni();
    let otvoren = burgerMeni.classList.toggle("open");
    burgerDugme.setAttribute("aria-expanded", otvoren);
});

document.addEventListener("click", function(dogadjaj) {
    if (!burgerMeni.contains(dogadjaj.target) && !burgerDugme.contains(dogadjaj.target)) {
        burgerMeni.classList.remove("open");
        burgerDugme.setAttribute("aria-expanded", "false");
    }
});

// pop up-ovi
let dijalozi = document.querySelectorAll("dialog");

document.addEventListener("click", function(dogadjaj) {
    let otvarac = dogadjaj.target.closest("[data-open]");
    if (otvarac) {
        dogadjaj.preventDefault();
        dijalozi.forEach(function(d) { d.close(); });
        burgerMeni.classList.remove("open");
        burgerDugme.setAttribute("aria-expanded", "false");
        document.getElementById(otvarac.dataset.open).showModal();
    }
});

// zatvaranje pop-up-a na x, esc ili klikom sa strane
dijalozi.forEach(function(d) {
    d.addEventListener("click", function(dogadjaj) {
        if (dogadjaj.target === d || dogadjaj.target.hasAttribute("data-close")) d.close();
    });
    d.addEventListener("close", function() {
        let forma = d.querySelector("form");
        forma.reset();
        forma.lozinka.type = "password";
    });
});

// prikazi/sakrij lozinku
document.querySelectorAll(".prikazi").forEach(function(kvacica) {
    kvacica.addEventListener("change", function() {
        kvacica.form.lozinka.type = kvacica.checked ? "text" : "password";
    });
});

// ulogovan/neulogovan (za sad samo preko localStorage)
function osveziNavigaciju() {
    document.body.classList.toggle("ulogovan", localStorage.getItem("ulogovan") === "1");
    popuniMobilniMeni();
}
osveziNavigaciju();

document.querySelectorAll("form").forEach(function(forma) {
    forma.addEventListener("submit", function(dogadjaj) {
        dogadjaj.preventDefault();
        // TODO: ovde ide Auth servis
        localStorage.setItem("ulogovan", "1");
        forma.closest("dialog").close();
        osveziNavigaciju();
    });
});

// Odjava
document.addEventListener("click", function(dogadjaj) {
    let odjavaLink = dogadjaj.target.closest("[data-logout]");
    if (odjavaLink) {
        dogadjaj.preventDefault();
        // TODO: odjava preko Auth servisa
        localStorage.removeItem("ulogovan");
        burgerMeni.classList.remove("open");
        osveziNavigaciju();
    }
});