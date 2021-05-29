const container = document.querySelector(".container");
const reset = document.querySelector(".reset");
const search = document.querySelector(".search");
const actor_name = document.querySelector(".actor_name");
const message = document.querySelector(".message");

function removeAllChildNodes() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

const creation = (response, i) => {
  const actor_division = document.createElement("div");
  const ul = document.createElement("ul");
  const li1 = document.createElement("li");
  const li2 = document.createElement("li");
  const li3 = document.createElement("li");
  const li4 = document.createElement("li");
  const li5 = document.createElement("li");
  const link = document.createElement("a");
  link.href = response?.data[i]?.person?.url;
  link.textContent = "Url";
  li4.append(link);
  const actor_image = document.createElement("img");
  if (response?.data[i]?.person?.image?.medium === undefined) {
    actor_image.src = "css/image-not-found.jpg";
    actor_image.classList.add("image_class");
  } else {
    actor_image.src = response?.data[i]?.person?.image?.medium;
  }

  li1.textContent = `Name: ${response?.data[i]?.person?.name}`;
  if (
    response?.data[i]?.person?.gender === null ||
    response?.data[i]?.person?.gender === undefined
  ) {
    li2.textContent = `Gender: Unknown`;
  } else {
    li2.textContent = `Gender: ${response?.data[i]?.person?.gender}`;
  }

  li3.textContent = `Score: ${response?.data[i]?.score}`;
  if (
    response.data[i]?.person?.birthday === null ||
    response.data[i]?.person?.birthday === undefined
  ) {
    li5.textContent = `Birthday: Unknown`;
  } else {
    li5.textContent = `Birthday: ${response.data[i]?.person?.birthday}`;
  }

  actor_division.append(actor_image);
  ul.append(li1, li2, li3, li4, li5);
  actor_division.append(ul);
  container.append(actor_division);
};

const display_movie = async () => {
  const name = "priyanka";
  try {
    await axios
      .get(`http://api.tvmaze.com/search/people?q=${name}`)
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

const movie_search = async () => {
  removeAllChildNodes();

  if (!actor_name.value) {
    message.textContent = "please enter actor name!!!";
  } else {
    try {
      await axios
        .get(`http://api.tvmaze.com/search/people?q=${actor_name.value}`)
        .then((response) => {
          message.textContent = "";
          const size = response.data.length;
          if (size === 0) {
            message.textContent = `No matching is Found for "${actor_name.value}"`;
          } else {
            message.textContent = `Matching results for "${actor_name.value}"`;
            for (let i = 0; i < size; i++) {
              creation(response, i);
            }
          }
        });
    } catch (e) {
      console.log("error", e);
    }
  }
};

reset.addEventListener("click", () => {
  removeAllChildNodes();
  display_movie();
  message.textContent = "";
  actor_name.value = "";
});

display_movie();
search.addEventListener("click", () => {
  movie_search();
});
