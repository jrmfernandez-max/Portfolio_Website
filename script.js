/* =========================================================
   PROJECTS CAROUSEL
   Add, remove or reorder items in the `projects` list below.

   type: "image" | "video" | "file"
   src:  path to the file (put your files in a "projects" folder)
   title / description: text shown under the media
   link: for images/videos it is an optional "View project" button;
         for "file" slides it is REQUIRED: paste the share link where the
         file lives (Google Drive, OneDrive, GitHub...) and visitors are
         sent there in a new tab.
   ========================================================= */
const projects = [
  {
    type: "image",
    src: "projects/project-1.png",
    title: "Cisco Packet Tracer Network Topology",
    description: "Created a basic network infrastructure using Cisco Packet Tracer, connecting multiple devices through a router and switch, with an enrollment system server and wireless access point. Applied basic IP addressing and network topology design concepts.",
    link: ""
  },
  {
    type: "file",
    src: "projects/project-1.pkt",
    title: "Cisco Packet Tracer Network Topology File",
    description: "Opens the Google Drive for the Cisco Packet Tracer file.",
    link: "https://drive.google.com/drive/folders/16NZAjbnZnn8R2JfhmlYNBXDZJwEEt4TI?usp=sharing"
  },
  {
    type: "image",
    src: "projects/project-2.png",
    title: "IT Department Network Infrastructure - Enrollment System",
    description: "A Cisco Packet Tracer project designed to establish a local area network (LAN) for an IT Department. The network connects multiple office computers, laptops, switches, wireless access points, and an Enrollment System server. It includes IP address configuration, wireless network setup using WPA2-PSK security, and wired and wireless connectivity to allow authorized devices to access the Enrollment System through a web browser.",
    link: ""
  },
  {
    type: "file",
    src: "projects/project-2.pkt",
    title: "IT Department Network Infrastructure - Enrollment System File",
    description: "Opens the Google Drive for the Cisco Packet Tracer file.",
    link: "https://drive.google.com/drive/folders/1qB5MoyL8n4uUR3Fcsn4lAoX1Iv3ML4fT?usp=sharing"
  },
  {
    type: "image",
    src: "projects/project-3.png",
    title: "VLAN Network Configuration with Enrollment System - Cisco Packet Tracer",
    description: "A Cisco Packet Tracer project demonstrating Virtual Local Area Network (VLAN) configuration using a Cisco 2960-24TT switch. The network connects multiple PCs and an Enrollment System server, with devices organized into separate logical network segments using VLANs. The project demonstrates VLAN implementation, IP addressing using the 192.168.0.0/24 network, and basic network connectivity to support organized and efficient communication within the local area network.",
    link: ""
  },
  {
    type: "file",
    src: "projects/project-3.pkt",
    title: "VLAN Network Configuration with Enrollment System - Cisco Packet Tracer File",
    description: "Opens the Google Drive for the Cisco Packet Tracer file.",
    link: "https://drive.google.com/drive/folders/1a5s9gLUy1rj51gsh7aE8iipavqFdum4y?usp=sharing"
  },
  {
    type: "image",
    src: "projects/project-4.png",
    title: "VLAN Configuration and Inter-Switch Connectivity - Cisco Packet Tracer",
    description: "A Cisco Packet Tracer project demonstrating VLAN implementation using three Cisco 2960 switches. The network is divided into two VLANs, VLAN 100 (Blue) and VLAN 200 (Green), to logically separate connected computers. Trunk ports are configured to carry VLAN traffic between switches, with an Enrollment System server connected to the network. The project focuses on VLAN creation, switch port assignment, trunk configuration, IP addressing, and connectivity testing within and between VLANs.",
    link: ""
  },
  {
    type: "file",
    src: "projects/project-4.pkt",
    title: "VLAN Configuration and Inter-Switch Connectivity - Cisco Packet Tracer File",
    description: "Opens the Google Drive for the Cisco Packet Tracer file.",
    link: "https://drive.google.com/drive/folders/1rstyjijiGRIEoam24Ntv0ZylBXtRv7b2?usp=sharing"
  }
];

/* ---------- Carousel code (no need to edit below) ---------- */
const track = document.getElementById("carouselTrack");
const dotsBox = document.getElementById("carouselDots");
const countEl = document.getElementById("carouselCount");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let current = 0;

function esc(text) {
  const d = document.createElement("div");
  d.textContent = text || "";
  return d.innerHTML;
}

function fileExt(path) {
  const m = /\.([a-z0-9]+)(?:\?|#|$)/i.exec(path || "");
  return m ? m[1].toUpperCase() : "FILE";
}

function mediaHTML(p) {
  if (p.type === "image") {
    return `<img src="${esc(p.src)}" alt="${esc(p.title)}" loading="lazy">`;
  }
  if (p.type === "video") {
    return `<video src="${esc(p.src)}" ${p.poster ? `poster="${esc(p.poster)}"` : ""} controls preload="metadata" playsinline></video>`;
  }
  // File slides link out to where the file is hosted (no download button).
  const ext = fileExt(p.src);
  return `
    <div class="file-card">
      <div class="file-icon">${ext}</div>
      <div class="file-actions">
        ${p.link
          ? `<a class="btn btn-primary" href="${esc(p.link)}" target="_blank" rel="noopener">Open file</a>`
          : `<span class="btn btn-ghost" style="opacity:.6;cursor:default">Link coming soon</span>`}
      </div>
    </div>`;
}

function render() {
  track.innerHTML = "";
  dotsBox.innerHTML = "";

  projects.forEach((p, i) => {
    const slide = document.createElement("article");
    slide.className = "slide";
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${i + 1} of ${projects.length}`);
    slide.innerHTML = `
      <div class="slide-media">${mediaHTML(p)}</div>
      <div class="slide-info">
        <span class="slide-tag">${esc(p.type)}</span>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.description)}</p>
        ${p.link && p.type !== "file" ? `<a class="btn btn-ghost" href="${esc(p.link)}" target="_blank" rel="noopener">View project</a>` : ""}
      </div>`;

    // If the file is missing, show a friendly placeholder instead of a broken icon
    const media = slide.querySelector("img, video");
    if (media) {
      media.addEventListener("error", () => {
        slide.querySelector(".slide-media").innerHTML =
          `<div class="placeholder">Add your file at<br><code>${esc(p.src)}</code></div>`;
      });
    }
    track.appendChild(slide);

    const dot = document.createElement("button");
    dot.className = "dot";
    dot.setAttribute("aria-label", `Go to project ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsBox.appendChild(dot);
  });

  update(0);
}

function goTo(i) {
  const n = projects.length;
  const index = (i + n) % n; // loop around
  track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
}

function update(index) {
  current = index;
  [...dotsBox.children].forEach((d, i) => d.classList.toggle("active", i === index));
  countEl.textContent = `${index + 1} / ${projects.length}`;
  // pause any video that is no longer on screen
  track.querySelectorAll("video").forEach((v, _i, all) => {
    const slideIndex = [...track.children].indexOf(v.closest(".slide"));
    if (slideIndex !== index) v.pause();
  });
}

track.addEventListener("scroll", () => {
  const index = Math.round(track.scrollLeft / track.clientWidth);
  if (index !== current) update(index);
}, { passive: true });

prevBtn.addEventListener("click", () => goTo(current - 1));
nextBtn.addEventListener("click", () => goTo(current + 1));

track.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") goTo(current - 1);
  if (e.key === "ArrowRight") goTo(current + 1);
});

window.addEventListener("resize", () => {
  track.scrollTo({ left: current * track.clientWidth });
});

render();