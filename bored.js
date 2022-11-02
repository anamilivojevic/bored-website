/* TO DO: 
 - arrange activity buttons in flex divs
 - create accept, pending and declined list and push objects
 - create dashboard to display the lists
 - in the pending list in dashboard add the done option
 - stats for types of activities of each list
 - stats for activities per day?
 */

const body = document.querySelector("body");
const container = document.querySelector(".container");
const change = document.createElement("p");
change.innerHTML = "Well let's change that!";
change.className = "fs-2 mt-4";
let activityNumber = 0;
function createButton(innerText, classes, eventOnClick) {
  const btn = document.createElement("button");
  btn.innerHTML = innerText;
  btn.className = classes;
  btn.addEventListener("click", eventOnClick);
  return btn;
}

const alrightBtn = createButton(
  "Alright!",
  "btn btn-outline-success fade-in fast-ani",
  changeLayout
);

setTimeout(() => {
  container.appendChild(change);
  container.appendChild(alrightBtn);
}, 7000);

function changeLayout() {
  body.className = "nebula";
  container.classList.add("text-white");
  container.classList.add("fade-in");
  container.innerHTML = `<div class='col-12 col-md-8'>
  <p>I have some cool activities for you! They can be
  recreational, educational, social, busywork or cooking activities.
  You can accept the activity, reject it or put it in the pending list.</p>
  <p>Ready to start?</p>
  <button id='btn-start-game' class='btn btn-outline-light'>Let's do it!</button>
  </div>`;

  document
    .getElementById("btn-start-game")
    .addEventListener("click", startActivities);

  body.classList.add("dark-layer");
}

function startActivities() {
  container.innerHTML = "<div id='activity-div'></div>";
  getActivity();

  container.appendChild(
    createButton("ACCEPT", "btn btn-light mt-3 me-2", addToDone)
  );
  container.appendChild(
    createButton("DO LATER", "btn btn-secondary mt-3 me-2", addToPending)
  );
  container.appendChild(
    createButton("DECLINE", "btn btn-dark mt-3 me-2", addToDeclined)
  );
  container.appendChild(
    createButton(
      "NEXT ACTIVITY <i class='fa-solid fa-arrow-right-long'></i>",
      "btn c-btn-pink mt-3",
      getActivity
    )
  );
  const dashboard = document.createElement("div");
  dashboard.id = "dashboard";
  container.appendChild(dashboard);
}

function getActivity() {
  let xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", () => callbackGetactivity(xhr));
  xhr.open("GET", "https://www.boredapi.com/api/activity");
  xhr.send();
}

function callbackGetactivity(xhr) {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const activity = JSON.parse(xhr.responseText);

    activityNumber++;
    const activityDiv = document.querySelector("#activity-div");
    activityDiv.innerHTML = `<h2>Activity ${activityNumber}</h2>
                              <p class='fs-5 fw-light'>Type: ${activity.type}</p>
                              <p class='fs-4'>${activity.activity}</p>`;
    container.insertBefore(activityDiv, container.firstChild);
  }
}

function addToDeclined() {}
function addToPending() {}
function addToDone() {}
