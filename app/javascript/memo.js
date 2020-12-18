function memo() {
  const submit = document.getElementById("submit");
  // 投稿するボタンを「click」した場合に実行される関数を定義
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();//XHLHttpRequestのメソッドを使用するためにオブジェクト生成
    XHR.open("POST", "/posts", true);//リクエスト方法を指定
    XHR.responseType = "json";//レスポンスのデータ形式を指定
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;//レスポンスとして返却されたメモのレコードデータを取得
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
             投稿日時：${item.created_at}
          </div>
          <div class="post-content">
            ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);
      formText.value = "";
    };
    e.preventDefault();
  });
}
window.addEventListener("load", memo);