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
	
	// Slider output
var slider = document.getElementById("activitySlider");
var output = document.getElementById("sliderValue");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle) & display with 0 DP
slider.oninput = function() {
	output.innerHTML = (this.value/1).toFixed(0);
}


// Filter button for free

document.getElementById('moneyFilter').onclick = () => {
	renderBlocks('0');
	document.getElementById('moneyFilter').classList.toggle('free');
  };
  
  function renderBlocks(costsMoney) {
	fetch('assets/data.json') 
	  .then(response => response.json()) // Parse the response as JSON
	  .then(data => {
		const container = document.getElementById('data-list');
		container.innerHTML = ''; // Clear previous content
	
		data.forEach((block) => {
		  if (block.costsMoney === costsMoney) {
			// Add the block
			let listItem =
			  `
				<li>
				  <p>${block.emoji}</p>
				  <h2>${block.itemName}</h2>
				  <p><em>Do I have to leave the neighborhood?</em></p>
				  <p>${block.requiresTransit}</p>
				  <p><em>Activity Rating</em></p>
				  <p>${block.activityRating} / 10</p>
				</li>
			  `;
	
			container.insertAdjacentHTML('beforeend', listItem);
		  }
		});
	  })
  }
  
  // Filter button for transit

document.getElementById('transitFilter').onclick = () => {
	renderBlocks('1');
	document.getElementById('transitFilter').classList.toggle('trains');
  };
  
  function renderBlocks(requiresTransit) {
	fetch('assets/data.json')
	  .then(response => response.json()) // Parse the response as JSON
	  .then(data => {
		const container = document.getElementById('data-list');
		container.innerHTML = ''; // Clear previous content
	
		data.forEach((block) => {
		  if (block.requiresTransit === requiresTransit) {
			// Add the block
			let listItem =
			  `
				<li>
				  <p>${block.emoji}</p>
				  <h2>${block.itemName}</h2>
				  <p>Suitable if you're broke?</p>
				  <p>${block.costsMoney}</p>
				  <p><em>Activity Rating</em></p>
				  <p>${block.activityRating} / 10</p>
				</li>
			  `;
	
			container.insertAdjacentHTML('beforeend', listItem);
		  }
		});
  });
}

  // Filter button for produtivity

document.getElementById('productiveFilter').onclick = () => {
	renderBlocks('1');
	document.getElementById('productiveFilter').classList.toggle('potato');
  };
  
  function renderBlocks(productive) {
	fetch('assets/data.json')
	  .then(response => response.json()) // Parse the response as JSON
	  .then(data => {
		const container = document.getElementById('data-list');
		container.innerHTML = ''; // Clear previous content
	
		data.forEach((block) => {
		  if (block.productive === productive) {
			// Add the block
			let listItem =
			  `
				<li>
				  <p>${block.emoji}</p>
				  <h2>${block.itemName}</h2>
				  <p>Suitable if you're broke?</p>
				  <p>${block.costsMoney}</p>
				  <p><em>Do I have to leave the neighborhood?</em></p>
				  <p>${block.requiresTransit}</p>
				  <p><em>Activity Rating</em></p>
				  <p>${block.activityRating} / 10</p>
				</li>
			  `;
	
			container.insertAdjacentHTML('beforeend', listItem);
		  }
		});
	  })
  }