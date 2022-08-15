// functions to simplify Id selection
function gId(id) {
  return document.getElementById(id);
}

function dosearch() {
  // regex expression to find elements with "!+word"
  // and "!+sentence" until next search request
  // it uses bangs from duckduckgo
  const bang = /!\w+/g;
  const bigBang = /!(.*?)(?=!)|!(.*?)$/g;

  // naming of elements
  const sTerms = gId("searchForm").searchTerms;
  const sEngine = gId("searchForm").searchEngine;

  // detect and allow to use multiple bangs in one line
  if (bang.test(sTerms.value)) {
    sTerms.value.match(bigBang).forEach((e) => {
      window.open(sEngine[1].value + e, "_blank");
    });
    // if no bang then use terms with search engines selected
    // and open multiple tabs if needed
  } else {
    sEngine.forEach((e) => {
      if (e.checked) {
        window.open(e.value + sTerms.value, "_blank");
      }
    });
  }
}

// var to store first key
let key1 = {};

// keyboard shortcuts
window.addEventListener(
  "keydown",
  (e) => {
    if (e.defaultPrevented) {
      return;
    }

    // set first key to active
    key1[e.key] = true;
    key2 = e.key;

    switch (true) {
      // first key is stored as active in key1
      // so a second one can be used at the same time
      case key1[" "] && key2 == "0":
        gId("searchForm").searchEngine.forEach((i) => {
          i.checked = false;
        });
        break;
      case key1[" "] && key2 == "1":
        gId("searchForm").searchEngine.forEach((i) => {
          i.checked = true;
        });
        break;
      case key1["d"] && key2 == "g":
        if (gId("Duckduckgo").checked) {
          gId("Duckduckgo").checked = false;
        } else {
          gId("Duckduckgo").checked = true;
        }
        break;
      case key1["q"] && key2 == "w":
        if (gId("Qwant").checked) {
          gId("Qwant").checked = false;
        } else {
          gId("Qwant").checked = true;
        }
        break;
      case key1["s"] && key2 == "p":
        if (gId("StartPage").checked) {
          gId("StartPage").checked = false;
        } else {
          gId("StartPage").checked = true;
        }
        break;
      default:
        return;
    }
    e.preventDefault();
  },
  true
);

// on release the first key stored disabled
document.addEventListener("keyup", (e) => {
  key1[e.key] = false;
});
