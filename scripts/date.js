const now = new Date();
const today = document.querySelector("h1");
const da = new Intl.DateTimeFormat("en", { day: "numeric" }).format(now);
const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(now);
const daOfTheWeek = new Intl.DateTimeFormat("en", { weekday: "long" }).format(
  now
);
today.innerHTML = `${daOfTheWeek} ${da} ${mo}.`;
