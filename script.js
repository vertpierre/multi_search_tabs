function dosearch() {
  const sForm = document.searchForm;
  const sTerms = sForm.searchTerms.value;
  const bang = /!\w+/g;
  const bigBang = /!(.*?)(?=!)|!(.*?)$/g;

  if (bang.test(sTerms)) {
    const sMultiTerms = sTerms.match(bigBang);
    for (i = 0; i < sMultiTerms.length; i++) {
      window.open(sForm.sEngine[1].value + sMultiTerms[i], "_blank");
    }
  } else {
    for (i = 0; i < sForm.sEngine.length; i++) {
      if (sForm.sEngine[i].checked) {
        window.open(sForm.sEngine[i].value + sTerms, "_blank");
      }
    }
  }

  // // console.log(sTerms);
  // // console.log(bang.test(sTerms));

  // const sMultiTerms = sTerms.match(bigBang);
  // console.log(sMultiTerms);
}

// document.onkeydown = function (e) {
//   e = e || window.event;
//   k = e.which || e.charCode || e.keyCode;
//   // Shorcut : Alt + ...
//   if (k == 71 && e.altKey && !e.ctrlKey && !e.shiftKey) {
//     // q
//     document.getElementById("Duckduckgo").checked = true;
//   } else if (k == 83 && e.altKey && !e.ctrlKey && !e.shiftKey) {
//     // s
//     document.getElementById("StartPage").checked = true;
//   } else {
//     return true;
//   }
//   return false;
// };
