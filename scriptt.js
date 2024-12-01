const form = document.getElementById("form");
const input = document.getElementById("input");
const github = document.getElementById("github");
const name = document.getElementById("name");
const username = document.getElementById("username");
const joined = document.getElementById("joined");
const text = document.getElementById("text");
const repos = document.getElementById("repos");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const locationText = document.getElementById("location");
const link = document.getElementById("link");
const aplication = document.getElementById("aplication");
const avatarD = document.getElementById("avatarD");
const avatarM = document.getElementById("avatarM");
const moon = document.getElementById("moon");
const darkmode = document.getElementById("darkmode");
const darkText = document.getElementById("dark");
const whole = document.querySelector(".whole");
const datael = document.getElementById("dataElement");
const container = document.querySelector(".container");
const search = document.querySelector(".search");
const devfinder = document.getElementById("devfinder");

const body = document.body;

let isDarkMode = true;

darkmode.addEventListener("click", () => {
  isDarkMode = !isDarkMode;

  console.log(isDarkMode);

  document.body.classList.toggle("darkMode", isDarkMode);

  const mode = isDarkMode ? "DARK" : "LIGHT";

  darkText.textContent = mode;

  moon.src = isDarkMode ? "./img/moon (2).png" : "./img/sun.png";
  moon.alt = isDarkMode ? "sun" : "moon";

  devfinder.style.color = isDarkMode ? "#222731" : "white";
  github.style.backgroundColor = isDarkMode ? "white" : "#1E2A47";
  whole.style.backgroundColor = isDarkMode ? "white" : "#1E2A47";
  datael.style.backgroundColor = isDarkMode ? "white" : "#141D2F";
  document.body.style.backgroundColor = isDarkMode ? "white" : "#141D2F";
  container.style.backgroundColor = isDarkMode ? "white" : "#141D2F";
  search.style.backgroundColor = isDarkMode ? "white" : "#141D2F";
  input.style.backgroundColor = isDarkMode ? "white" : "#141D2F";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getdata();
});

async function getdata() {
  try {
    const username = input.value.trim();
    if (!username) {
      addError("No results");
      return;
    }

    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      addError("No results");
      return;
    }

    const data = await response.json();
    scriptToHtml(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    addError("No results");
  }
}

function scriptToHtml(data) {
  removeError();

  repos.textContent = data.public_repos ?? 0;
  followers.textContent = data.followers ?? 0;
  following.textContent = data.following ?? 0;

  avatarD.src = data.avatar_url ?? `./img/images (1).jpg`;
  avatarM.src = data.avatar_url ?? `./img/images (1).jpg`;

  name.textContent = data.name ?? "No name";
  username.textContent = data.login ? `@${data.login}` : "not available";

  joined.textContent = data.created_at
    ? new Date(data.created_at).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "not available";

  text.textContent = data.bio ?? "This profile has no bio";
  locationText.textContent = data.location ?? "not available";
  aplication.textContent = data.twitter_username ?? "not available";

  if (data.blog) {
    link.href = data.blog;
    link.textContent = data.blog;
  } else {
    link.href = "#";
    link.textContent = "not available";
  }
}

function addError(message) {
  removeError();
  const parent = input.parentElement;

  const span = document.createElement("span");
  span.textContent = message;
  span.classList.add("span");
  parent.appendChild(span);
}

function removeError() {
  const errorSpan = input.parentElement.querySelector(".span");
  if (errorSpan) {
    errorSpan.remove();
  }
}
