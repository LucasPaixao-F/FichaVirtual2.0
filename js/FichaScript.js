const tabButtons = document.querySelectorAll(".tab-button");
const pages = document.querySelectorAll(".sheet-page");

const setActivePage = (targetId) => {
	pages.forEach((page) => {
		const isActive = page.id === targetId;
		page.classList.toggle("is-active", isActive);
		page.hidden = !isActive;
	});

	tabButtons.forEach((button) => {
		const isActive = button.dataset.target === targetId;
		button.classList.toggle("is-active", isActive);
	});
};

const initialId = (() => {
	const hash = window.location.hash.replace("#", "");
	if (hash && document.getElementById(hash)) {
		return hash;
	}
	return pages[0]?.id;
})();

if (initialId) {
	setActivePage(initialId);
}

tabButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const targetId = button.dataset.target;
		if (!targetId) {
			return;
		}
		setActivePage(targetId);
		window.location.hash = targetId;
		window.scrollTo({ top: 0, behavior: "smooth" });
	});
});

const abilityBoxes = document.querySelectorAll(".attribute-box");
abilityBoxes.forEach((box) => {
	const scoreInput = box.querySelector(".ability-score");
	const modInput = box.querySelector(".mod-score");

	if (!scoreInput || !modInput) {
		return;
	}

	modInput.readOnly = true;
	modInput.classList.add("is-readonly");

	const updateModifier = () => {
		const value = Number.parseInt(scoreInput.value, 10);
		if (Number.isNaN(value)) {
			modInput.value = "";
			return;
		}
		const modifier = Math.floor((value - 10) / 2);
		modInput.value = `${modifier >= 0 ? "+" : ""}${modifier}`;
	};

	scoreInput.addEventListener("input", updateModifier);
	updateModifier();
});
