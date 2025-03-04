function displayReviewLink(key) {
  if (!key) return;

  // 取得當前網址
  let currentUrl = window.location.href;

  // 解析出 `/submit` 之前的部分
  let baseUrl = currentUrl.replace("/submit", "");

  // 建立完整的評分網址
  let reviewUrl = `${baseUrl}/review/${key}`;

  // 檢查是否已經存在顯示區塊
  let keyDisplay = document.getElementById("key-display");
  if (!keyDisplay) {
    keyDisplay = document.createElement("div");
    keyDisplay.id = "key-display";
    keyDisplay.style.position = "fixed";
    keyDisplay.style.top = "10px";
    keyDisplay.style.right = "10px";
    keyDisplay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    keyDisplay.style.color = "#fff";
    keyDisplay.style.padding = "8px 12px";
    keyDisplay.style.borderRadius = "4px";
    keyDisplay.style.zIndex = "10000";
    document.body.appendChild(keyDisplay);
  }

  // 更新顯示的內容
  keyDisplay.innerHTML = `📌 <a href="${reviewUrl}" target="_blank" style="color: #00ffcc; text-decoration: none;">評分連結</a>`;
}

// 讀取儲存的 key 並顯示完整的網址
chrome.storage.local.get("peerSubmissionId", (data) => {
  if (data.peerSubmissionId) {
    console.log("content.js 讀到 key:", data.peerSubmissionId);
    displayReviewLink(data.peerSubmissionId);
  } else {
    console.log("content.js 沒有在 storage 找到 peerSubmissionId。");
  }
});

// 監聽 storage 變更，若 key 更新則重新顯示
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === "local" && changes.peerSubmissionId) {
    const newKey = changes.peerSubmissionId.newValue;
    console.log("content.js 偵測到 key 更新:", newKey);
    displayReviewLink(newKey);
  }
});
