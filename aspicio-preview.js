(() => {
  "use strict";

  const projects = [
    {
      id: "summoner", name: "Summoner Spell Generator", date: "July 2021", datetime: "2021-07",
      stage: "Summer after 1st year of college", kind: "Restored web app",
      description: "A randomizer for League of Legends. Choose a map, filter the available spells, and roll a pair for your next match.",
      technologies: ["JavaScript", "Express"],
      note: "The restored browser demo preserves the original 2021 spell-selection rules and artwork.",
      views: [{ name: "Spell generator", url: "./summoner-spell-generator.html" }],
      links: [{ name: "Original source", url: "https://github.com/Colbyco/summoner-spell-generator" }]
    },
    {
      id: "weather", name: "Weather Database", date: "August 2021", datetime: "2021-08",
      stage: "Summer after 1st year of college", kind: "Restored web app",
      description: "A city lookup that turns a weather API response into a saved observation. A server-rendered table lets you look back through earlier searches.",
      technologies: ["Express", "EJS", "PostgreSQL"],
      note: "The original interface uses a browser adapter for weather lookup and local history in this preview.",
      views: [{ name: "Weather lookup", url: "./weather-preview.html" }],
      links: [{ name: "Original source", url: "https://github.com/Colbyco/weather-database-website" }]
    },
    {
      id: "chatbot", name: "OpenAI Chatbot", date: "June 2022", datetime: "2022-06",
      stage: "Summer after 2nd year of college", kind: "Original interface · sample conversation",
      description: "An early chatbot built around OpenAI’s text-davinci-002 completion model. The Vue client shows how I connected a conversational interface to a language model API.",
      technologies: ["Vue", "Vuetify", "Vite"],
      note: "The original model has been retired. This preview demonstrates the interface with a labeled sample conversation.",
      views: [{ name: "Chat interface", url: "./chatbot-preview.html" }],
      links: [{ name: "Original source", url: "https://github.com/Colbyco/OpenAI-Chat-Bot" }]
    },
    {
      id: "library", name: "Library Relational Database API", date: "July 2022", datetime: "2022-07",
      stage: "Summer after 2nd year of college", kind: "API explorer · sample data",
      description: "A service for a library catalog. Book and author endpoints expose the relationships in a PostgreSQL database, with Knex migrations to reproduce the schema.",
      technologies: ["Express", "Knex", "PostgreSQL"],
      note: "Explore the original routes, seed data and source in a browser-based API exhibit.",
      views: [{ name: "API explorer", url: "./library-preview.html" }],
      links: [{ name: "Original source", url: "https://github.com/Colbyco/library-relational-database-api" }]
    },
    {
      id: "proshop", name: "ProShop course project", date: "April 2024", datetime: "2024-04",
      stage: "4th year of college", kind: "Original storefront · local demo",
      description: "A college course project extending Brad Traversy’s ProShop e-commerce starter. My work included refactoring React components to address 10 code smells and prototyping Google and Facebook sign-in.",
      technologies: ["MERN", "Redux Toolkit"],
      note: "Browse the original storefront and try the local cart. Account, payment and social sign-in services are represented by preview notices.",
      views: [{ name: "Storefront", url: "./proshop-preview.html" }],
      links: [
        { name: "Course project source", url: "https://github.com/Colbyco/proshop-v2" },
        { name: "My refactoring", url: "https://github.com/Colbyco/proshop-v2/pull/1" },
        { name: "My sign-in work", url: "https://github.com/Colbyco/proshop-v2/commit/704b9f6" }
      ]
    },
    {
      id: "music", name: "Music Search App", date: "December 2024", datetime: "2024-12",
      stage: "First year as a software engineer", kind: "Command-line project",
      description: "A command-line prototype that recursively scans a music folder and indexes MP3 titles and artists. It reads both ID3v1 and ID3v2 metadata.",
      technologies: ["Java", "Maven", "mp3agic"],
      note: "Inspect the original code and an example of its terminal output inside the viewer.",
      views: [{ name: "Code and output", url: "./music-preview.html" }],
      links: [{ name: "Original source", url: "https://github.com/Colbyco/music-search-app" }]
    },
    {
      id: "aspicio", name: "Aspicio", date: "July 2026", datetime: "2026-07",
      stage: "Third year as a software engineer", kind: "Live app",
      description: "I built interactive birth charts, a 3D sky, and relocation maps, with NASA JPL ephemeris calculations and rules-based readings.",
      technologies: ["Next.js", "TypeScript", "Three.js"],
      note: "The live site starts with the current time at page load and Greenwich as the chart location.",
      views: [
        { name: "Chart", url: "https://aspicio.app/chart" },
        { name: "Sky", url: "https://aspicio.app/sky" },
        { name: "Places", url: "https://aspicio.app/places" }
      ],
      links: [{ name: "Open full site", url: "https://aspicio.app/" }]
    },
    {
      id: "spotify", name: "Spotify Classic Lyrics", date: "October 2026", datetime: "2026-10",
      stage: "Third year as a software engineer", kind: "Original desktop interface · simulation",
      description: "A desktop utility that changes Spotify’s local preferences to restore the classic lyrics view. Users can inspect diagnostics and undo the change.",
      technologies: ["Electron", "Windows", "macOS"],
      note: "The original desktop interface runs against sample state here. Fix and Undo affect the preview’s state only.",
      views: [{ name: "Desktop interface", url: "./spotify-preview.html" }],
      links: [
        { name: "Release v1.0.4", url: "https://github.com/Colbyco/spotify-classic-lyrics/releases/tag/v1.0.4" },
        { name: "Original source", url: "https://github.com/Colbyco/spotify-classic-lyrics" }
      ]
    }
  ];

  const preview = document.getElementById("project-preview");
  const frameHost = document.getElementById("frame-host");
  const status = document.getElementById("preview-status");
  const message = document.getElementById("preview-message");
  const retry = document.getElementById("preview-retry");
  const title = document.getElementById("featured-name");
  const date = document.getElementById("project-date");
  const stage = document.getElementById("project-stage");
  const kind = document.getElementById("project-kind");
  const select = document.getElementById("project-select");
  const previous = document.getElementById("previous-project");
  const next = document.getElementById("next-project");
  const viewButtons = document.getElementById("project-views");
  const reload = document.getElementById("preview-reload");
  const announcement = document.getElementById("project-announcement");
  const contexts = document.querySelectorAll("[data-project-context]");
  const navigation = document.querySelectorAll("[data-project]");
  const legacyHashes = { y2021: "summoner", y2022: "chatbot", y2024: "proshop", y2026: "aspicio", "featured-name": "aspicio" };
  const pageLoad = new Date();
  pageLoad.setUTCSeconds(0, 0);
  const instant = pageLoad.toISOString();
  let currentProject;
  let currentView = 0;
  let generation = 0;
  let timeout;

  function previewUrl() {
    const url = new URL(currentProject.views[currentView].url, window.location.href);
    if (currentProject.id === "aspicio" && currentView !== 1) {
      url.search = new URLSearchParams({
        date: instant.slice(0, 10), time: instant.slice(11, 16), tz: "UTC",
        lat: "51.4779", lng: "0", loc: "Greenwich"
      }).toString();
      if (currentView === 0) url.searchParams.set("scroll", "chart");
    }
    return url.href;
  }

  function loadPreview() {
    window.clearTimeout(timeout);
    const token = ++generation;
    const frame = document.createElement("iframe");
    frame.title = `${currentProject.name} — ${currentProject.views[currentView].name}`;
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    frame.allow = "clipboard-write";
    frame.setAttribute("aria-hidden", "true");
    frame.tabIndex = -1;
    preview.classList.remove("is-ready", "has-error");
    preview.setAttribute("aria-busy", "true");
    status.hidden = false;
    retry.hidden = true;
    message.textContent = `Opening ${currentProject.name}…`;
    frame.addEventListener("load", () => {
      if (generation !== token) return;
      window.clearTimeout(timeout);
      preview.classList.remove("has-error");
      preview.classList.add("is-ready");
      preview.setAttribute("aria-busy", "false");
      frame.removeAttribute("aria-hidden");
      frame.removeAttribute("tabindex");
      status.hidden = true;
    });
    frame.src = previewUrl();
    frameHost.replaceChildren(frame);
    timeout = window.setTimeout(() => {
      if (generation !== token) return;
      preview.classList.add("has-error");
      preview.setAttribute("aria-busy", "false");
      message.textContent = "The preview is taking longer than expected. You can try loading it again.";
      retry.hidden = false;
    }, 20000);
  }

  function renderContext(container) {
    const description = document.createElement("p");
    description.className = "project-description";
    description.textContent = currentProject.description;
    const technologies = document.createElement("ul");
    technologies.className = "project-tech";
    technologies.setAttribute("aria-label", "Technologies and platforms");
    for (const technology of currentProject.technologies) {
      const item = document.createElement("li");
      item.textContent = technology;
      technologies.append(item);
    }
    const note = document.createElement("p");
    note.className = "preview-note";
    note.textContent = currentProject.note;
    const links = document.createElement("div");
    links.className = "project-links";
    for (const source of currentProject.links) {
      const link = document.createElement("a");
      link.href = source.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = `${source.name} ↗`;
      links.append(link);
    }
    if (container.classList.contains("compact-context")) {
      container.replaceChildren(description, technologies);
      document.getElementById("compact-details").replaceChildren(note, links);
    } else {
      container.replaceChildren(description, technologies, note, links);
    }
  }

  function showProject(id, updateHistory = false) {
    const project = projects.find(item => item.id === id);
    if (!project || project === currentProject) return;
    currentProject = project;
    currentView = 0;
    title.textContent = project.name;
    date.textContent = project.date;
    date.dateTime = project.datetime;
    stage.textContent = project.stage;
    kind.textContent = project.kind;
    select.value = id;
    const index = projects.indexOf(project);
    previous.disabled = index === 0;
    next.disabled = index === projects.length - 1;
    previous.title = index > 0 ? projects[index - 1].name : "First project";
    next.title = index < projects.length - 1 ? projects[index + 1].name : "Latest project";
    previous.setAttribute("aria-label", `Previous project, ${previous.title}`);
    next.setAttribute("aria-label", `Next project, ${next.title}`);
    for (const link of navigation) {
      if (link.dataset.project === id) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    }
    for (const context of contexts) renderContext(context);
    viewButtons.replaceChildren();
    viewButtons.hidden = project.views.length < 2;
    project.views.forEach((view, viewIndex) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = view.name;
      button.setAttribute("aria-pressed", String(viewIndex === 0));
      button.addEventListener("click", () => {
        if (currentView === viewIndex) return;
        currentView = viewIndex;
        for (const tab of viewButtons.children) tab.setAttribute("aria-pressed", String(tab === button));
        loadPreview();
      });
      viewButtons.append(button);
    });
    if (updateHistory) window.history.pushState(null, "", `#${id}`);
    announcement.textContent = `${project.name}, ${project.date}. ${project.kind}.`;
    loadPreview();
  }

  function readLocation() {
    const hash = window.location.hash.slice(1);
    const id = legacyHashes[hash] || hash || "aspicio";
    showProject(projects.some(project => project.id === id) ? id : (currentProject?.id || "aspicio"));
  }

  for (const link of navigation) link.addEventListener("click", event => {
    event.preventDefault();
    showProject(link.dataset.project, true);
  });
  select.addEventListener("change", () => showProject(select.value, true));
  previous.addEventListener("click", () => showProject(projects[projects.indexOf(currentProject) - 1]?.id, true));
  next.addEventListener("click", () => showProject(projects[projects.indexOf(currentProject) + 1]?.id, true));
  retry.addEventListener("click", loadPreview);
  reload.addEventListener("click", loadPreview);
  window.addEventListener("popstate", readLocation);
  window.addEventListener("hashchange", readLocation);
  readLocation();
})();
