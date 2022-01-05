// load the Items data
function loadItems() {
	return fetch('./data/data.json')
		.then(response => response.json())
		.then(json => json.items);
}

// create Items list
function displayItems(items) {
	const container = document.querySelector('.items');
	container.innerHTML = items.map(item => setHTMLString(item)).join('');
}

function setHTMLString(item) {
	return `
	<li class="item">
		<a href="#">
			<img src="${item.image}" alt="${item.type}">
			<span class="description">${item.gender}, ${item.size}</span>
		</a>
	</li>
	`
}

// setEventListener
function setEventListener(items) {
	const logo = document.querySelector('.logo');
	const buttons = document.querySelector('.buttons');
	const itemList = document.querySelectorAll('.item');

	logo.addEventListener('click', () => {
		itemList.forEach(item => {
			item.classList.remove('invisible');
		})
	});
	buttons.addEventListener('click', (event) => onButtonClick(event, items));
}

function onButtonClick(event, items) {
	const key = event.target.dataset.key;
	const value = event.target.dataset.value;

	if (key == null || value == null) {
		return;
	}
	// displayItems(items.filter(item => item[key] === value))
	setItemsFilter(items, key, value);
}

function setItemsFilter(items, key, value) {
	const itemList = document.querySelectorAll('.item');
	items.forEach((item, index) => {
		if (item[key] == value)
			itemList[index].classList.remove('invisible');
		else
			itemList[index].classList.add('invisible');
	});
}

// main
loadItems()
	.then(items => {
		displayItems(items);
		setEventListener(items);
	})
	.catch(console.log);
