let x = JSON.parse(localStorage.getItem("x"));
let sourceMap = x || [
	{
		logo:"A",
		name:"acfun.cn",
		site:"https://www.acfun.cn"
	},
	{
		logo:"B./image/bili.png",
		name:"bilibili.com",
		site:"https://www.bilibili.com/"
	}
];

function render() {
	sourceMap.forEach((item) => {
		$(`<li>
            <a href="${item.site}">
                <div class="siteList">
                    <div class="top">${item["logo"][0]}</div>
                    <div class="down">${item["name"]}</div>
                </div>
            </a>
        </li>`).insertBefore($(".addList"));
	});
}

render();

$(".addBtn").on("click", () => {
	let url = window.prompt("添加的网址是");
	let obj = {};
	if (url === null) {
		return; 
	}
	if (url.length !== 0) {
		let n = url.indexOf("http") + 1;
		
		if (!n) {
			url = "https://" + url;
		}
		obj.logo = url[0];
		obj.name = url;
		obj.site = url;
		$(`<li>
            <a href="${url}">
                <div class="siteList">
                    <div class="top">${url[0]}</div>
                    <div class="down">${url}</div>
                </div>
            </a>
        </li>`).insertBefore($(".addList"));
		sourceMap.push(obj);
		localStorage.setItem("x", JSON.stringify(sourceMap));
	}
	
});