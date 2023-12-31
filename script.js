const loadingIndicator = document.getElementById('loadingIndicator');
const copyBtn = document.getElementById('copyBtn');
const requestInput = document.getElementById('requestInput');
const responseOutput = document.getElementById('responseOutput');
let toneSelect = document.getElementById('toneSelect');
copyBtn.style.display="none";

const API_TOKEN ="Your open APi Key " // Define your Key Here
let messagesToAPi =[];
async function generateResponse(inputText) {

  if (API_TOKEN=="Your open APi Key "){

    alert ( "Update your API key ")
  }

  const message =
  
    inputText;

  console.log("message", message);
  toneSelect = document.getElementById('toneSelect').value;
  console.log("toneSelect",toneSelect)
  messagesToAPi =[
    {
      role: "system",
      content: "You are a professional Email writter . you are in tasked to write in  " + toneSelect +" tone , also do not Include I hope this message finds you well",
    },
    {
      role: "user",
      content: message,
    },
  ];

  console.log("message",messagesToAPi)
  

  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer " +API_TOKEN //add your token Here
  );
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: messagesToAPi,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", requestOptions);
    const result_1 = await response.text();
    console.log(result_1);

    restObj = JSON.parse(result_1);
    console.log("response", restObj.choices[0].message.content);
    return restObj.choices[0].message.content;
  } catch (error) {
    return console.log("error", error);
  }
}

function copyResponse() {
  const responseText = responseOutput.innerText;

  // Create a temporary textarea element
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = responseText;

  // Append the textarea to the body
  document.body.appendChild(tempTextArea);

  // Select and copy the text
  tempTextArea.select();
  document.execCommand("copy");

  // Remove the temporary textarea
  document.body.removeChild(tempTextArea);

  // Provide visual feedback
  copyBtn.innerText = "Copied!";
  setTimeout(() => {
    copyBtn.innerText = "Copy";
  }, 2000);
}

// Toggle Dark Mode
function toggleDarkMode() {
  const body = document.querySelector("body");
  const container = document.querySelector(".container");
  const inputs = document.querySelectorAll("textarea, input, button, select");

  body.classList.toggle("dark-mode");
  container.classList.toggle("dark-mode");

  inputs.forEach((input) => {
    input.classList.toggle("dark-mode");
  });
}

// Add event listeners
document.getElementById("submitBtn").addEventListener("click", () => {
  // Display loading indicator
  loadingIndicator.style.display = "block";
  const request = requestInput.value;
  responseOutput.innerText = "";
  copyBtn.style.display = "none";
  generateResponse(request).then((response) => {
    responseOutput.innerText = response;
    loadingIndicator.style.display = "none";
    copyBtn.style.display = "block";
  });
});

document.getElementById("copyBtn").addEventListener("click", copyResponse);
