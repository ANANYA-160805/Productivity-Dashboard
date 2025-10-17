function openFeatures() {
  let allElem = document.querySelectorAll(".elem");
  let FullElemsPage = document.querySelectorAll(".fullElem");
  let FullElemsPageBackbtn = document.querySelectorAll(".fullElem .back");

  allElem.forEach(function (elem) {
    elem.addEventListener("click", function () {
      FullElemsPage[elem.id].style.display = "block";
    });
  });

  FullElemsPageBackbtn.forEach(function (back) {
    back.addEventListener("click", function () {
      FullElemsPage[back.id].style.display = "none";
    });
  });
}

openFeatures();

function todoList() {
  let currenttask = [];

  if (localStorage.getItem("currentTask")) {
    currenttask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("task is empty");
  }

  function renderTask() {
    let allTask = document.querySelector(".allTask");

    let sum = "";

    currenttask.forEach(function (elem, idx) {
      sum =
        sum +
        `<div class="task">
              <h5>${elem.task} <span class =${elem.imp}>imp</span></h5>
              <button id=${idx}>Mark as completed</button>
            </div>`;
    });

    allTask.innerHTML = sum;
    localStorage.setItem("currentTask", JSON.stringify(currenttask));

    document.querySelectorAll(".task button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currenttask.splice(btn.id, 1);
        renderTask();
      });
    });
  }

  renderTask();

  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form #task-input");
  let taskDetailsInput = document.querySelector(".addTask form textarea");
  let taskCheckbox = document.querySelector(".addTask form #check");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    currenttask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheckbox.checked,
    });
    renderTask();
    taskCheckbox.checked = false;
    taskInput.value = "";
    taskDetailsInput.value = "";
  });
}

todoList();

function dailyplanner() {
  var dayplandata = JSON.parse(localStorage.getItem("dayplandata")) || {};
  var dayplanner = document.querySelector(".day-planner");

  var hours = Array.from({ length: 18 }, (_, idx) => {
    return `${6 + idx}:00-${7 + idx}:00`;
  });
  var dayplannerinput = document.querySelectorAll(".day-planner input");

  var WholeDaySum = " ";

  hours.forEach(function (elem, idx) {
    var savedData = dayplandata[idx] || "";
    WholeDaySum =
      WholeDaySum +
      ` <div class="day-planner-time">
          <p>${elem}</p>
          <input id=${idx} type="text" placeholder="..." value ='${savedData}'>
        </div>`;
  });

  dayplanner.innerHTML = WholeDaySum;

  var dayplannerinput = document.querySelectorAll(".day-planner input");

  dayplannerinput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayplandata[elem.id] = elem.value;

      localStorage.setItem("dayplandata", JSON.stringify(dayplandata));
    });
  });
}

dailyplanner();

function motivationalQuote() {
  const motivationQuoteContent = document.querySelector(".motivation-2 h1");
  const motivationAuthor = document.querySelector(".motivation-3 h2");

  async function fetchQuote() {
    try {
      const response = await fetch("https://quotes-api-self.vercel.app/quote");
      const data = await response.json();

      motivationQuoteContent.innerHTML = data.quote;
      motivationAuthor.innerHTML = `- ${data.author}`;
    } catch (error) {
      console.error(error);
    }
  }
  fetchQuote();
}

motivationalQuote();

function pomodoroTimer() {
  let timer = document.querySelector(".pomo-timer h1");
  let startBtn = document.querySelector(".pomo-timer .start-timer");
  let pauseBtn = document.querySelector(".pomo-timer .pause-timer");
  let resetBtn = document.querySelector(".pomo-timer .reset-timer");
  let session = document.querySelector(".pomodoro-fullpage .session");
  let isWorkSession = true;

  let timerinterval = null;
  let totalseconds = 25 * 60;

  function updatetimer() {
    let minutes = Math.floor(totalseconds / 60);
    let seconds = totalseconds % 60;

    timer.innerHTML = `${String(minutes).padStart("2", "0")}:${String(
      seconds
    ).padStart("2", "0")}`;
  }
  function startTimer() {
    clearInterval(timerinterval);
    if (isWorkSession) {
      timerinterval = setInterval(function () {
        if (totalseconds > 0) {
          totalseconds--;
          updatetimer();
        } else {
          isWorkSession = false;
          clearInterval(timerinterval);
          timer.innerHTML = "05:00";
          session.innerHTML = "Take a Break";
          session.style.backgroundColor = "var(--blue)";
          totalseconds = 5 * 60;
        }
      }, 1000);
    } else {
      timerinterval = setInterval(function () {
        if (totalseconds > 0) {
          totalseconds--;
          updatetimer();
        } else {
          isWorkSession = true;
          clearInterval(timerinterval);
          timer.innerHTML = "25:00";
          session.innerHTML = "Work Session";
          session.style.backgroundColor = "var(--tri1)";
          totalseconds = 25 * 60;
        }
      }, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(timerinterval);
  }

  function resetTimer() {
    totalseconds = 25 * 60;
    clearInterval(timerinterval);
    updatetimer();
  }

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}

pomodoroTimer();

function dailyGoals() {
  let currentGoals = JSON.parse(localStorage.getItem("dailyGoals")) || [];

  const allGoalsDiv = document.querySelector(".allGoals");
  const form = document.querySelector(".addGoal form");
  const goalInput = document.querySelector("#goal-input");
  const goalDetails = document.querySelector("#goal-details");

  function renderGoals() {
    let sum = "";

    currentGoals.forEach((goal, idx) => {
      sum += `
        <div class="goal">
          <div>
            <h5>${goal.title}</h5>
            <p style="color:#381c0a; font-size:16px;">${goal.details || ""}</p>
          </div>
          <div>
            <button class="complete" data-id="${idx}">Done</button>
            <button class="delete" data-id="${idx}">Delete</button>
          </div>
        </div>`;
    });

    allGoalsDiv.innerHTML = sum;
    localStorage.setItem("dailyGoals", JSON.stringify(currentGoals));

    document.querySelectorAll(".goal .delete").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = btn.getAttribute("data-id");
        currentGoals.splice(id, 1);
        renderGoals();
      });
    });

    document.querySelectorAll(".goal .complete").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = btn.getAttribute("data-id");
        currentGoals[id].completed = true;
        btn.parentElement.parentElement.style.opacity = "0.5";
        btn.innerText = "Completed";
        localStorage.setItem("dailyGoals", JSON.stringify(currentGoals));
      });
    });
  }

  renderGoals();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (goalInput.value.trim() === "") return;

    currentGoals.push({
      title: goalInput.value.trim(),
      details: goalDetails.value.trim(),
      completed: false,
    });

    renderGoals();
    goalInput.value = "";
    goalDetails.value = "";
  });
}

dailyGoals();

function WeatherFunctionality() {
  var apiKey = "ed341029b78848718b5141749251610";
  var city = "Bhopal";

  let header1city = document.querySelector(".header1 h4");
  let header1Date = document.querySelector(".header1 h2");
  let header1Day = document.querySelector(".header1 h1");

  let header2Temp = document.querySelector(".header2 h2");
  let header2Condition = document.querySelector(".header2 h4");
  let header2Precipitation = document.querySelector(".header2 h3:nth-child(3)");
  let header2Humidity = document.querySelector(".header2 h3:nth-child(4)");
  let header2Wind = document.querySelector(".header2 h3:nth-child(5)");

  var data = null;

  async function weatherAPICall() {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      data = await response.json();

      header1city.innerHTML = `${data.location.name} (${data.location.region})`;
      header2Temp.innerHTML = `${data.current.temp_c}°C`;
      header2Condition.innerHTML = `${data.current.condition.text}`;
      header2Precipitation.innerHTML = `Heat Index : ${data.current.heatindex_c}%`;
      header2Humidity.innerHTML = `humidity:${data.current.humidity}%`;
      header2Wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`;
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  }

  weatherAPICall();

  function timeDate() {
    const totalDaysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var date = new Date();
    var dayOfWeek = totalDaysOfWeek[date.getDay()];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    hours = hours == 0 ? 12 : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    var tarikh = date.getDate();
    var month = monthNames[date.getMonth()];
    var year = date.getFullYear();

    header1Date.innerHTML = `${tarikh}/${month}/${year}`;

    if (hours > 12) {
      header1Day.innerHTML = `${dayOfWeek}, ${
        hours - 12
      }:${minutes}:${seconds} PM`;
    } else {
      header1Day.innerHTML = `${dayOfWeek}, ${hours}:${minutes}:${seconds} AM`;
    }
  }

  setInterval(() => {
    timeDate();
  }, 1000);

  function backgroundImg() {
    const header = document.querySelector("header");
    const hour = new Date().getHours(); // current hour
    let timeOfDay;

    if (hour >= 6 && hour < 12) {
      timeOfDay = "morning";
    } else if (hour >= 12 && hour < 18) {
      timeOfDay = "afternoon";
    } else {
      timeOfDay = "night";
    }

    if (timeOfDay === "morning") {
      header.style.backgroundImage =
        "url('https://plus.unsplash.com/premium_photo-1675314799565-eb8074e036da?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1944')";
    } else if (timeOfDay === "afternoon") {
      header.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1577257108037-e85032e84049?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1174')";
    } else {
      header.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1572176280695-fc4a0c245b02?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1203')";
    }

    header.style.backgroundSize = "cover";
    header.style.backgroundPosition = "center";
    header.style.objectFit = "cover";
  }

  backgroundImg();
}
WeatherFunctionality();

function themeToggle() {
  var theme = document.querySelector(".theme");
  var rootElement = document.documentElement;
  var flag = 0;
  theme.addEventListener("click", function () {
    if (flag == 0) {
      rootElement.style.setProperty("--pri", "#F8F4E1");
      rootElement.style.setProperty("--sec", "#222831");
      rootElement.style.setProperty("--tri1", "#948979");
      rootElement.style.setProperty("--tri2", "#393E46");
      flag = 1;
    } else if (flag == 1) {
      rootElement.style.setProperty("--pri", "#F1EFEC");
      rootElement.style.setProperty("--sec", "#110b39ff");
      rootElement.style.setProperty("--tri1", "#34ce1cff");
      rootElement.style.setProperty("--tri2", "#123458");
      flag = 2;
    } else if (flag == 2) {
      rootElement.style.setProperty("--pri", "#F8F4E1");
      rootElement.style.setProperty("--sec", "#381c0a");
      rootElement.style.setProperty("--tri1", "#FEBA17");
      rootElement.style.setProperty("--tri2", "#74512D");
      flag = 0;
    }
  });
}
themeToggle();
