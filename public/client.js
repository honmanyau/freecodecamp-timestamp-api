'use strict'
// client-side js
// run by the browser each time your view template is loaded

// add other scripts at the bottom of index.html
// const dreams = document.getElementById("#dreams");

const xhr = new XMLHttpRequest();
const outputContainer = document.getElementById("output-text");
const form = document.getElementById("convert-form");
const inputText = document.getElementById("input-text");

/* Post request */
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let text = inputText.value;
  
  if (text !== "") {
    xhr.open("POST", "?=" + text, true);
    xhr.setRequestHeader("Content-Type", "text/plain");
    xhr.onload = (event) => {
      outputContainer.innerHTML = "--Converting--";
    }
    xhr.send(); 
    
    xhr.open("GET", "/" + text, true);
    xhr.onload = (event) => {
      let getData = event.target.response;
      
      console.log(getData);
      
      outputContainer.innerHTML = getData;
    }
    xhr.send();
  }
  else {
    outputContainer.innerHTML = "<span style=\"color: crimson\">Please enter a valid unix timestamp or a correctly formatted date.</span>"
  }
});