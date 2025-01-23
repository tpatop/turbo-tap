document.getElementById("start").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["content.js"]
      });
    });
  });
  
  document.getElementById("stop").addEventListener("click", () => {
    console.log("Остановка скрипта пока не реализована!");
  });
  