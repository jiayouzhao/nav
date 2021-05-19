/* 
 */
let $searchInput = $(".searchInput");
let x = JSON.parse(localStorage.getItem("x"));
let sourceMap = x || [
	{
		logo:"A",
		name:"acfun.cn",
		site:"https://www.acfun.cn"
	},
	{
		logo:"B",
		name:"bilibili.com",
		site:"https://www.bilibili.com/"
	}
];

function render() {
	$(".webSite").remove();
	sourceMap.forEach((item, index) => {
		let $li = $(`<li class="webSite">
            <a href="${item.site}">
                <div class="siteList">
                    <div class="top"><i class="iconfont icon-${item.logo}"></i></div>
                    <div class="down">${item["name"]}</div>
                </div>
            </a>
            <div class="close">
                <i class="iconfont icon-xx"></i>
            </div>
        </li>`);
		$li.insertBefore($(".addList"));
		$li.on("click", ".close", () => {
			
			sourceMap.splice(index, 1);
			localStorage.setItem("x", JSON.stringify(sourceMap));
			render();
		});
	});
}

render();

$(".addBtn").on("click", () => {
	let url = window.prompt("添加的网址是");
	let obj = {};
	if (url === null) {
		return; 
	}
	let regex = /^(((http|https):\/\/)?\w+\.\w+)$/gi;

	if (!regex.test(url)) {
		return alert("请输入正确网址");
	}
	if (url.length !== 0) {
		
		if (/^\s*\w+\.\w+$/.test(url)) {
			obj.name = url.trim();
			obj.site = "https://" + url.trim();
			obj.logo = /[A-Z]/.test(obj.name[0].toLocaleUpperCase()) ? obj.name[0].toLocaleUpperCase() : "_img";
		
		} else if (/^(http|https):\/\/\w+\.\w+$/.test(url)) {
			obj.site = url;
			obj.name = url.replace(/(https|http):\/\//gi, "");
			let initName = obj.name.trim()[0].toLocaleUpperCase();
			obj.logo = /[A-Z]/.test(initName) ? initName : "_img";
		}

		sourceMap.push(obj);
		render();
		
		localStorage.setItem("x", JSON.stringify(sourceMap));
	}
	
});

$(".searchBtn").on("click", (e) => {
	let $val = $(".searchInput").val();
	if ($val.length === 0) {
		e.preventDefault();
		$searchInput.focus();
	}
});
$(".searchInput").on("focus", (e) => {
	e.stopPropagation();
});
$(document).keypress((e) => {
	if (document.activeElement === $searchInput[0]) {
		return; 
	} else {
		let { key } = e;
		
		sourceMap.forEach((item) => {
            
			if (item.logo.toLocaleLowerCase() === key) {
				//console.log(item);
				window.open(item.site);
			}
		});
	}
});
