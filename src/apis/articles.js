// 获取精彩文章列表
export async function getArticles() {
  const res = await fetch("https://navapi.chanriver.dpdns.org/api/list");
  return await res.json();
}

// 删除文章
export async function deleteArticle(url) {
  return fetch("https://navapi.chanriver.dpdns.org/api/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  });
}

// 添加文章（可选，如果前端直接调用）
export async function addArticle(article) {
  return fetch("https://navapi.chanriver.dpdns.org/api/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(article)
  });
}
