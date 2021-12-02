const input = document.getElementById("search");
var timeId = null;

input.addEventListener("keyup", (e) => {
  query = e.target.value;
  //console.log(query);

  throttel(query, 300);
});

const fetchData = async (query) => {
  const ts = 1;
  const hash = "9bfbbf792cf52a84fbab5c77a72abc67";
  const res = await fetch(
    `https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=${query}&ts=${ts}&apikey=418c2ce3fa0575902fa8f24b5c404d97&hash=${hash}`
  );

  const data = await res.json();
  return data;
};

const throttel = (q, d) => {
  if (!timeId) {
    timeId = setTimeout(async () => {
      var data = await fetchData(q);
      let { results } = data.data;
      console.log(results);

      var search_results = document.getElementById("search-results");
      search_results.innerHTML = null;
      if (q !== "") {
        search_results.style.display = "block";

        for (let i = 0; i < results.length; i++) {
          const div = document.createElement("div");
          div.classList.add("result-div");

          let { title, id, thumbnail } = results[i];
          div.addEventListener("click", () => {
            populate_movie_data(id);
          });

          const titleDiv = document.createElement("p");
          const image = document.createElement("img");
          titleDiv.innerHTML = title;
          image.src = `${thumbnail.path}/portrait_small.jpg`;
          image.alt = "imgae";
          div.appendChild(image);
          div.appendChild(titleDiv);
          search_results.appendChild(div);
        }
        clearTimeout(timeId);
        timeId = null;
      }
    }, d);
  } else {
    return;
  }
};

const populate_movie_data = async (id) => {
  const ts = 1;
  const hash = "9bfbbf792cf52a84fbab5c77a72abc67";
  const res = await fetch(
    `https://gateway.marvel.com:443/v1/public/comics/${id}?ts=${ts}&apikey=418c2ce3fa0575902fa8f24b5c404d97&hash=${hash}`
  );

  const data = await res.json();
  const results = data.data.results[0];
  console.log("data:", results);

  localStorage.setItem("movie", JSON.stringify(results));
  window.location.href = "./movie.html";
};
