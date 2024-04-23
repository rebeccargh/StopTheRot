// Render items
const renderItems = (data) => {
    // The <ul> target
    const dataList = document.getElementById('data-list')

    // Loop each item
    data.forEach((item) => {
        let conditionalClass = '' // Set an empty class variable - necessary?

        let moneyIcon = item.costsMoney === 1 ? '❌' : '✅'
        let transitIcon = item.requiresTransit === 1 ? '✅' : '❌'
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

        dataList.insertAdjacentHTML('beforeend', listItem) // Insert as <li>
    })
}

// Fetch database JSON
fetch('assets/data.json')
	.then(response => response.json())
	.then(data => {
		// Passes to above format
		renderItems(data)
	})

var slider = document.getElementById("activitySlider")
var output = document.getElementById("sliderValue")
output.innerHTML = slider.value // Default output value

// Fetch & render blocks based on activityRating
function fetchDataAndRenderBlocks(activityRating) {
    fetch('assets/data.json') 
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('data-list')
            container.innerHTML = '' // Clear previous content
        
            data.forEach((block) => {
                // Check if activityRating matches slider value
                if (Math.round(block.activityRating) === parseInt(activityRating)) {
					let moneyIcon = block.costsMoney === 1 ? '❌' : '✅'
					let transitIcon = block.requiresTransit === 1 ? '✅' : '❌'
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
                        `
        
                    container.insertAdjacentHTML('beforeend', listItem)
                }
            })
        })
}

// Update the current slider value & display with 0 DP
slider.oninput = function() {
    output.innerHTML = (this.value/1).toFixed(0)
    fetchDataAndRenderBlocks(this.value) // Render based on slider value
}

// Free filter
document.getElementById('moneyFilter').onclick = () => {
    const moneyFilter = document.getElementById('moneyFilter')
    const isFree = moneyFilter.classList.toggle('free')
    
    if (!isFree) {
        renderAllBlocks() // Render all with free off
    } else {
        renderFreeBlocks('0') // Render only free
    }
}


// Render blocks for free
  function renderFreeBlocks(costsMoney) {
	fetch('assets/data.json') 
	  .then(response => response.json())
	  .then(data => {
		const container = document.getElementById('data-list')
		container.innerHTML = ''
	
		data.forEach((block) => {
			if (parseInt(block.costsMoney) === parseInt(costsMoney)) {

			let transitIcon = block.requiresTransit === 1 ? '✅' : '❌'
			let listItem =
			  `
				<li>
					<p class="emoji">${block.emoji}</p>
					<h3>${block.itemName}</h3>
					<p><em>Do I have to leave the neighborhood?</em> | ${transitIcon}</p>
					<p><em>Activity Rating</em></p>
					<p>${block.activityRating} / 10</p>
				</li>
			  `
	
			container.insertAdjacentHTML('beforeend', listItem)
		  }
		})
	  })
  }
  
  // Transit filter
  document.getElementById('transitFilter').onclick = () => {
    const transitFilter = document.getElementById('transitFilter')
    const needsTransit = transitFilter.classList.toggle('trains')
    
    if (!needsTransit) {
        renderAllBlocks() // Render all with transit off
    } else {
        renderTrainsBlocks('1') // Render only transit
    }
}

  function renderTrainsBlocks(requiresTransit) {
	fetch('assets/data.json')
	  .then(response => response.json())
	  .then(data => {
		const container = document.getElementById('data-list')
		container.innerHTML = ''
	
		data.forEach((block) => {
			if (parseInt(block.requiresTransit) === parseInt(requiresTransit)) {
			let moneyIcon = block.costsMoney === 1 ? '❌' : '✅'
			let listItem =
			  `
				<li>
					<p class="emoji">${block.emoji}</p>
					<h3>${block.itemName}</h3>
					<p><em>Suitable if you're broke?</em> | ${moneyIcon}</p>
					<p><em>Activity Rating</em></p>
					<p>${block.activityRating} / 10</p>
				</li>
			  `
	
			container.insertAdjacentHTML('beforeend', listItem)
		  }
		})
  })
}

  // Productivity filter
document.getElementById('productiveFilter').onclick = () => {
	renderBlocks('1')
	document.getElementById('productiveFilter').classList.toggle('potato')
  }

  document.getElementById('productiveFilter').onclick = () => {
    const productiveFilter = document.getElementById('productiveFilter')
    const productive = productiveFilter.classList.toggle('potato')
    
    if (!productive) {
        renderAllBlocks() // Render all with potato off
    } else {
        renderProductiveBlocks('1') // Render only potato
    }
}
  
  function renderProductiveBlocks(productive) {
	fetch('assets/data.json')
	  .then(response => response.json())
	  .then(data => {
		const container = document.getElementById('data-list')
		container.innerHTML = ''
	
		data.forEach((block) => {
			if (parseInt(block.productive) === parseInt(productive)) {
			let moneyIcon = block.costsMoney === 1 ? '❌' : '✅'
			let transitIcon = block.requiresTransit === 1 ? '✅' : '❌'
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
			  `
	
			container.insertAdjacentHTML('beforeend', listItem)
		  }
		})
	  })
  }

//   Render ALL blocks to reset on filters off
  function renderAllBlocks() {
    fetch('assets/data.json') 
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('data-list')
            container.innerHTML = ''
    
            data.forEach((block) => {
				let moneyIcon = block.costsMoney === 1 ? '❌' : '✅'
				let transitIcon = block.requiresTransit === 1 ? '✅' : '❌'
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
                    `
    
                container.insertAdjacentHTML('beforeend', listItem)
            })
        })
}

document.getElementById('menu').querySelector('.nav').addEventListener('click', function() {
	event.preventDefault()
    renderAllBlocks()
    document.getElementById('moneyFilter').classList.remove('free')
    document.getElementById('transitFilter').classList.remove('trains')
    document.getElementById('productiveFilter').classList.remove('potato')
})

window.onload = function() {
    openLightbox()
}

function closeLightbox() {
    document.getElementById('overlay').style.display = 'none'
}

function openLightbox() {
    document.getElementById('overlay').style.display = 'block'
}

document.getElementById('closeButton').addEventListener('click', closeLightbox)
document.getElementById('okay').addEventListener('click', closeLightbox)