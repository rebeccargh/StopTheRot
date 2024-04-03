// Function to render your items
const renderItems = (data) => {
	// The `ul` where the items will be inserted
	const dataList = document.getElementById('data-list')

	// Loop through each item in the data array
	data.forEach((item) => {
		let conditionalClass = '' // Set an empty class variable

		// if (!item.alsoWasWriter) { // Conditional if this is `false` (“not true”)
		// 	conditionalClass = 'faded' // Update the variable
		// }

		// Make a “template literal” as we have before, inserting your data (and maybe the class)
		let listItem =
			`
				<li class="${conditionalClass}">
					<p>${item.emoji}</p>
					<h2>${item.itemName}</h2>
					<p>Suitable if you're broke?</p>
						<p>${item.costsMoney}</p>
					<p><em>Do I have to leave the neighborhood?</em></p>
						<p>${item.requiresTransit}</p>
					<p><em>Activity Rating</em></p>
						<p>${item.activityRating} / 10</p>
					</a>
				</li>
			`

		dataList.insertAdjacentHTML('beforeend', listItem) // Add it to the `ul`!
	})
}

// 					// <img src="${item.posterImage}"> img tag goes below h2 if necessary

// Fetch gets your (local) JSON file…
fetch('assets/data.json')
	.then(response => response.json())
	.then(data => {
		// And passes the data to the function, above!
		renderItems(data)
	})

	// slider output

	var slider = document.getElementById("activitySlider");
var output = document.getElementById("sliderValue");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}

// if a value is false, add hidden class on button click - will filter by values?