const form = document.getElementById("form");
const input = document.getElementById("input");
const github = document.getElementById("github");
const header = document.getElementById("header");
const info = document.getElementById("info");
const name = document.getElementById("name");
const username = document.getElementById("username");
const joined = document.getElementById("joined");
const text = document.getElementById("text");
const dataElement = document.getElementById("data");
const textCont = document.getElementById("textCont");
const numbContent = document.getElementById("numbContent");
const moreInfo = document.getElementById("moreInfo");
const locationText = document.getElementById("location");
const link = document.getElementById("link");
const aplication = document.getElementById("aplication");
const avatarD = document.getElementById("avatarD");
const avatarM = document.getElementById("avatarM");
const repos = document.getElementById("repos");
const followers = document.getElementById("followers");
const following = document.getElementById("following");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getdata();
});

async function getdata() {
  try {
    let username = input.value;
    if (username === null) {
      addError("No results");
      return;
    }

    const fetchdata = await fetch(`https://api.github.com/users/${username}`);
    const data = await fetchdata.json();
    console.log(data);
    scriptToHtml(data);
  } catch (error) {
    console.log(error);
    addError("No results");
  }
}

function scriptToHtml(data) {
  removeError();
  repos.textContent = data.public_repos;
  followers.textContent = data.followers;
  following.textContent = data.following;

  if (data.avatar_url === null) {
    avatarD.src = `./img/images (1).jpg`;
  } else {
    avatarD.src = data.avatar_url;
  }

  if (data.avatar_url === null) {
    avatarM.src = `./img/images (1).jpg`;
  } else {
    avatarM.src = data.avatar_url;
  }

  if (data.name === null) {
    name.textContent = "No name";
  } else {
    name.textContent = data.name;
  }

  if (data.login === null) {
    username.textContent = "not available";
  } else {
    username.textContent = `@${data.login}`;
  }

  if (data.created_at === null) {
    joined.textContent = "not available";
  } else {
    joined.textContent = new Date(data.created_at);
  }

  if (data.bio === null) {
    text.textContent = "This profile has no bio";
  } else {
    text.textContent = data.bio;
  }

  if (data.location === null) {
    locationText.textContent = "not available";
  } else {
    locationText.textContent = data.location;
  }

  if (data.twitter_username === null) {
    aplication.textContent = "not available";
  } else {
    aplication.textContent = data.twitter_username;
  }

  if (data.blog === null) {
    link.textContent = "not available";
  } else {
    link.href = data.blog;
  }
}

function addError(message) {
  let span = document.createElement("span");
  span.textContent = message;
  span.classList.add("span");
  span.textContent = "No results";
  const parent = input.parentElement;
  parentElement.appendChild(span);
}

function removeError() {
  if (errorSpan) errorSpan.remove();
}
