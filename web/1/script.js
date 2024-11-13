const baseUrl = "https://web-6-production.up.railway.app";

window.addEventListener("load", function () {
  const form = document.getElementById("form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const data = { title, description };
    fetch(`${baseUrl}/records`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`Record added with id: ${data.id}`);
        form.reset();
      });
  });

  const reset = document.getElementById("reset");
  reset.addEventListener("click", function () {
    fetch(`${baseUrl}/flush-all`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((response) => alert("All records deleted"));
  });
});
