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
		let moneyIcon = item.costsMoney === 1 ? '✅' : '❌';
		let transitIcon = item.requiresTransit === 1 ? '✅' : '❌';
		let listItem =
			`
				<li class="${conditionalClass}">
					<p class="emoji">${item.emoji}</p>
					<h3>${item.itemName}</h3>
					<p><em>Suitable if you're broke?</em> | ${moneyIcon}</p>
					<p><em>Do I have to leave the neighborhood?</em> | ${transitIcon}</p>
					<p><em>Activity Rating</em></p>
						<p>${item.activityRating} / 10</p>
					</a>
				</li>
			`

		dataList.insertAdjacentHTML('beforeend', listItem) // Add it to the `ul`!
	})
}

// Fetch gets your (local) JSON file…
fetch('assets/data.json')
	.then(response => response.json())
	.then(data => {
		// And passes the data to the function, above!
		renderItems(data)
	})

var slider = document.getElementById("activitySlider");
var output = document.getElementById("sliderValue");
output.innerHTML = slider.value; // Display the default slider value

// Function to fetch data and render blocks based on activityRating
function fetchDataAndRenderBlocks(activityRating) {
    fetch('assets/data.json') 
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
            const container = document.getElementById('data-list');
            container.innerHTML = ''; // Clear previous content
        
            data.forEach((block) => {
                // Check if the activityRating matches the slider value
                if (Math.round(block.activityRating) === parseInt(activityRating)) {
                    // Add the block
					let moneyIcon = block.costsMoney === 1 ? '✅' : '❌';
					let transitIcon = block.requiresTransit === 1 ? '✅' : '❌';
					let listItem =
                        `
                        <li>
							<p class="emoji">${block.emoji}</p>
							<h3>${block.itemName}</h3>
							<p><em>Suitable if you're broke?</em> | ${moneyIcon}</p>
							<p><em>Do I have to leave the neighborhood?</em> | ${transitIcon}</p>
                            <p><em>Activity Rating</em></p>
                            <p>${block.activityRating} / 10</p>
                        </li>
                        `;
        
                    container.insertAdjacentHTML('beforeend', listItem);
                }
            });
        });
}

// Update the current slider value  & display with 0 DP
slider.oninput = function() {
    output.innerHTML = (this.value/1).toFixed(0);
    fetchDataAndRenderBlocks(this.value); // Call fetchDataAndRenderBlocks with the slider value
};

// Initially render blocks based on the default slider value
renderAllBlocks(slider.value);


// Filter button for free
document.getElementById('moneyFilter').onclick = () => {
    const moneyFilter = document.getElementById('moneyFilter');
    const isFree = moneyFilter.classList.toggle('free');
    
    if (!isFree) {
        renderAllBlocks(); // Render all blocks when 'free' class is toggled off
    } else {
        renderFreeBlocks('0'); // Render only free blocks when 'free' class is toggled on
    }
};


// Render blocks for free items
  function renderFreeBlocks(costsMoney) {
	fetch('assets/data.json') 
	  .then(response => response.json()) // Parse the response as JSON
	  .then(data => {
		const container = document.getElementById('data-list');
		container.innerHTML = ''; // Clear previous content
	
		data.forEach((block) => {
		  if (block.costsMoney === costsMoney) {
			// Add the block
			let transitIcon = block.requiresTransit === 1 ? '✅' : '❌';
			let listItem =
			  `
				<li>
					<p class="emoji">${block.emoji}</p>
					<h3>${block.itemName}</h3>
					<p><em>Do I have to leave the neighborhood?</em> | ${transitIcon}</p>
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
    const transitFilter = document.getElementById('transitFilter');
    const needsTransit = transitFilter.classList.toggle('trains');
    
    if (!needsTransit) {
        renderAllBlocks(); // Render all blocks when 'trains' class is toggled off
    } else {
        renderTrainsBlocks('1'); // Render only free blocks when 'trains' class is toggled on
    }
};

  function renderTrainsBlocks(requiresTransit) {
	fetch('assets/data.json')
	  .then(response => response.json()) // Parse the response as JSON
	  .then(data => {
		const container = document.getElementById('data-list');
		container.innerHTML = ''; // Clear previous content
	
		data.forEach((block) => {
		  if (block.requiresTransit === requiresTransit) {
			// Add the block
			let moneyIcon = block.costsMoney === 1 ? '✅' : '❌';
			let listItem =
			  `
				<li>
					<p class="emoji">${block.emoji}</p>
					<h3>${block.itemName}</h3>
					<p><em>Suitable if you're broke?</em> | ${moneyIcon}</p>
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

  document.getElementById('productiveFilter').onclick = () => {
    const productiveFilter = document.getElementById('productiveFilter');
    const productive = productiveFilter.classList.toggle('potato');
    
    if (!productive) {
        renderAllBlocks(); // Render all blocks when 'trains' class is toggled off
    } else {
        renderProductiveBlocks('1'); // Render only free blocks when 'trains' class is toggled on
    }
};
  
  function renderProductiveBlocks(productive) {
	fetch('assets/data.json')
	  .then(response => response.json()) // Parse the response as JSON
	  .then(data => {
		const container = document.getElementById('data-list');
		container.innerHTML = ''; // Clear previous content
	
		data.forEach((block) => {
		  if (block.productive === productive) {
			// Add the block
			let moneyIcon = block.costsMoney === 1 ? '✅' : '❌';
			let transitIcon = block.requiresTransit === 1 ? '✅' : '❌';
			let listItem =
			  `
				<li>
					<p class="emoji">${block.emoji}</p>
					<h3>${block.itemName}</h3>
					<p><em>Suitable if you're broke?</em> | ${moneyIcon}</p>
					<p><em>Do I have to leave the neighborhood?</em> | ${transitIcon}</p>
					<p><em>Activity Rating</em></p>
					<p>${block.activityRating} / 10</p>
				</li>
			  `;
	
			container.insertAdjacentHTML('beforeend', listItem);
		  }
		});
	  })
  }

//   Render ALL blocks to reset when filters are toggled off
  function renderAllBlocks() {
    fetch('assets/data.json') 
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
            const container = document.getElementById('data-list');
            container.innerHTML = ''; // Clear previous content
    
            data.forEach((block) => {
                // Add the block
				let moneyIcon = block.costsMoney === 1 ? '✅' : '❌';
				let transitIcon = block.requiresTransit === 1 ? '✅' : '❌';
				let listItem =
                    `
                    <li>
						<p class="emoji">${block.emoji}</p>
                        <h3>${block.itemName}</h3>
						<p><em>Suitable if you're broke?</em> | ${moneyIcon}</p>
						<p><em>Do I have to leave the neighborhood?</em> | ${transitIcon}</p>
                        <p><em>Activity Rating</em>
                        <p>${block.activityRating} / 10</p>
                    </li>
                    `;
    
                container.insertAdjacentHTML('beforeend', listItem);
            });
        })
}