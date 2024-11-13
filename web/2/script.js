const baseUrl = "https://web-6-production.up.railway.app";

let fetchedData = "";

window.addEventListener("load", function () {
  let triggers = Array.from(
    document.querySelectorAll('[data-toggle="collapse"]')
  );
  const facts = document.getElementById("facts");
  const fnmap = {
    toggle: "toggle",
    show: "add",
    hide: "remove",
  };

  const collapse = (selector, cmd) => {
    const targets = Array.from(document.querySelectorAll(selector));
    targets.forEach((target) => {
      target.classList[fnmap[cmd]]("show");
    });
  };

  const fetchRecords = () => {
    fetch(`${baseUrl}/records`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (JSON.stringify(data) === fetchedData) {
          return;
        }
        fetchedData = JSON.stringify(data);
        facts.innerHTML = "";
        data.forEach((record) => {
          const li = document.createElement("li");
          li.innerHTML = `
          <button 
            class="collapse-button" 
            data-toggle="collapse"
            data-target=".collapse.id-${record.id}"
            data-text="${record.title}"
            >
              ${record.id}. ${record.title}     
            </button>
          <br />
          <div class="block collapse id-${record.id}">
            <div class="block__content">
              ${record.description}
            </div>
          </div>
          `;
          facts.appendChild(li);
        });
        triggers = Array.from(
          document.querySelectorAll('[data-toggle="collapse"]')
        );
      });
  };

  fetchRecords();

  setInterval(() => {
    console.log("Refreshing records...");
    fetchRecords();
  }, 5000);

  window.addEventListener(
    "click",
    (ev) => {
      const elm = ev.target;
      if (triggers.includes(elm)) {
        const selector = elm.getAttribute("data-target");
        collapse(selector, "toggle");
      }
    },
    false
  );
});
