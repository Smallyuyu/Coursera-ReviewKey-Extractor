chrome.webRequest.onCompleted.addListener(
  function(details) {
    try {
      // 解析請求 URL
      let urlObj = new URL(details.url);
      // 取得 peerSubmissionId query 參數，例如：
      // "5fjDBd9oEeuTww4ta8ZJrw~ux3vL~cUFtYfjvEe-vfQ7dFiK1Pw"
      let peerSubmissionParam = urlObj.searchParams.get("peerSubmissionId");
      if (peerSubmissionParam) {
         let lastTilde = peerSubmissionParam.lastIndexOf("~");
         if (lastTilde !== -1) {
            let extractedKey = peerSubmissionParam.substring(lastTilde + 1);
            console.log("Extracted key:", extractedKey);
            // 儲存到 chrome.storage，供 content script 讀取
            chrome.storage.local.set({ peerSubmissionId: extractedKey });
         } else {
            console.log("沒有在 peerSubmissionId 裡找到 '~' 字符。");
         }
      } else {
         console.log("URL 中找不到 peerSubmissionId 參數。");
      }
    } catch (err) {
      console.error("background.js 發生錯誤:", err);
    }
  },
  // 注意：這裡的 URL pattern 要符合實際請求，例如:
  { urls: ["*://www.coursera.org/api/onDemandPeerComments.v1/*"] }
);
