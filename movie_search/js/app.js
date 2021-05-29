const container = document.querySelector(".container");
const reset = document.querySelector(".reset");
const search = document.querySelector(".search");
const movie_name = document.querySelector(".movie_name");
const message = document.querySelector(".message");
const redirect = document.querySelector(".redirect");
redirect.addEventListener("click", () => {
  location.href = "js/person_search.html";
});

function removeAllChildNodes() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function removeTags(str) {
  if (str === null || str === "") return false;
  else str = str.toString();
  return str.replace(/(<([^>]+)>)/gi, "");
}

const creation = (response, i) => {
  const movie_division = document.createElement("div");
  const ul = document.createElement("ul");
  const li1 = document.createElement("li");
  const li2 = document.createElement("li");
  const li3 = document.createElement("li");
  const li4 = document.createElement("li");
  const li5 = document.createElement("li");
  // const li6 = document.createElement("li");
  const link = document.createElement("a");
  link.href = response?.data[i]?.show?.officialSite;
  link.textContent = "officialSite";
  li5.append(link);
  const movie_image = document.createElement("img");
  if (response?.data[i]?.show?.image?.medium === undefined) {
    movie_image.src = "css/image-not-found.jpg";
    movie_image.classList.add("image_class");
  } else {
    movie_image.src = response?.data[i]?.show?.image?.medium;
  }

  li1.textContent = `Name: ${response?.data[i]?.show?.name}`;
  li2.textContent = `Language: ${response?.data[i]?.show?.language}`;
  li3.textContent = `Score: ${response?.data[i]?.score}`;
  li4.textContent = `Rating Average ${response?.data[i]?.show?.rating?.average}`;
  // const summary = removeTags(response.data[i].show.summary);
  // li6.textContent = `Summary: ${summary}`;
  movie_division.append(movie_image);
  ul.append(li1, li2, li3, li4, li5);
  movie_division.append(ul);
  container.append(movie_division);
};

const movie_search = async () => {
  removeAllChildNodes();
  if (!movie_name.value) {
    message.textContent = "please enter movie name!!!";
  } else {
    try {
      await axios

        .get(`http://api.tvmaze.com/search/shows?q=${movie_name.value}`)
        .then((response) => {
          const size = response.data.length;
          if (size === 0) {
            message.textContent = `No matching is Found for "${movie_name.value}"`;
          } else {
            message.textContent = `Matching results for "${movie_name.value}"`;
            for (let i = 0; i < size; i++) {
              creation(response, i);
            }
          }
        });
    } catch (e) {
      console.log("error");
    }
  }
};

const display_movie = async () => {
  const name = "batman";
  try {
    await axios
      .get(`http://api.tvmaze.com/search/shows?q=${name}`)
      .then((response) => {
        console.log(response.data);
        const size = response.data.length;
        for (let i = 0; i < size; i++) {
          creation(response, i);
        }
      });
  } catch (e) {
    console.log(e);
  }
};

display_movie();
reset.addEventListener("click", () => {
  removeAllChildNodes();
  display_movie();
  message.textContent = "";
  movie_name.value = "";
});
search.addEventListener("click", () => {
  movie_search();
});
