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
					<h2>${item.emoji} ${item.itemName}</h2>
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