
chrome.action.onClicked.addListener((tab) => {
  // Clear previous results before running a new scan
  chrome.storage.local.set({ domains: [], error: null }, () => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    }, (injectionResults) => {
      // You can check for errors during injection here if needed
      if (chrome.runtime.lastError) {
        console.error('Script injection failed: ' + chrome.runtime.lastError.message);
        chrome.storage.local.set({ error: 'Failed to scan the page.' });
      }
    });
  });
});
