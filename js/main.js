// DARK MODE

function invertTheme() {
  if (document.documentElement.getAttribute("data-theme") == "invert") {
    document.documentElement.setAttribute("data-theme", null);
  } else {
    document.documentElement.setAttribute("data-theme", "invert");
  }
}

// SEARCH

const searchEngine = Array.from(document.getElementsByClassName("select-engine"));
const searchBar = document.getElementById("search-input");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");

// save and get the state of checkboxes
// in browser's LocalStorage

function saveCheckbox() {
  searchEngine.forEach((element) => {
    localStorage.setItem(element.id, JSON.stringify(element.checked));
  });
}

function loadCheckbox() {
  searchEngine.forEach((element) => {
    if (localStorage.getItem(element.id) == "true") {
      element.checked = true;
    } else {
      element.checked = false;
    }
  });
}

// function to search multiple thing
// in one line, or with engines checked
function doSearch() {
  // regex expression to find elements with "!+word"
  // and "!+sentence" until next search request
  // it uses bangs from duckduckgo
  const bang = /!\w+/g;
  const bigBang = /!(.*?)(?=!)|!(.*?)$/g;

  // detect and allow to use multiple bangs in one line
  if (bang.test(searchBar.value)) {
    searchBar.value
      .match(bigBang)
      .reverse()
      .forEach((searchQuery) => {
        return window.open(searchEngine[1].value + searchQuery, "_blank");
      });

    // if no bang then use terms with search engines selected
    // and open multiple tabs if needed
  } else {
    searchEngine.forEach((selectEngine) => {
      if (selectEngine.checked) {
        return window.open(selectEngine.value + searchBar.value, "_blank");
      }
      return null;
    });
  }
  return null;
}

document.body.onload = () => {
  loadCheckbox();
  // searchBar.focus();
};

searchEngine.forEach((element) => {
  element.addEventListener("click", () => {
    saveCheckbox();
    searchBar.focus();
  });
});

submitButton.addEventListener("click", (element) => {
  element.preventDefault();
  searchBar.blur();
  doSearch();
  setTimeout(() => {
    searchBar.focus();
  }, 200);
});

resetButton.addEventListener("click", () => {
  searchBar.focus();
});

// var to store first key
let key1 = {};

// keyboard shortcuts
window.addEventListener(
  "keydown",
  (event) => {
    if (event.defaultPrevented) {
      return;
    }
    // set first key to active
    key1[event.key] = true;
    let key2 = event.key;

    switch (true) {
      case searchBar !== document.activeElement && key2 === "Enter":
        searchBar.focus();
        break;
      case searchBar === document.activeElement && key1[" "] && key2 === "Enter":
        searchBar.blur();
        break;
      // first key is stored as active in key1
      // so a second one can be used at the same time
      case key1[" "] && key2 === "0":
        searchEngine.forEach((i) => {
          i.checked = false;
        });
        break;
      case key1[" "] && key2 === "1":
        searchEngine.forEach((i) => {
          i.checked = true;
        });
        break;
      case key1["d"] && key2 === "g":
        const duckduckgo = document.getElementById("duckduckgo");
        if (duckduckgo.checked) {
          duckduckgo.checked = false;
        } else {
          duckduckgo.checked = true;
        }
        break;
      case key1["q"] && key2 === "w":
        const qwant = document.getElementById("qwant");
        if (qwant.checked) {
          qwant.checked = false;
        } else {
          qwant.checked = true;
        }
        break;
      case key1["s"] && key2 === "p":
        const startpage = document.getElementById("startpage");
        if (startpage.checked) {
          startpage.checked = false;
        } else {
          startpage.checked = true;
        }
        break;
      default:
        return;
    }
    event.preventDefault();
  },
  true
);

// on release the first key stored disabled
document.addEventListener("keyup", (event) => {
  key1[event.key] = false;
});
