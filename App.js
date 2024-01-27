// Function to fetch news data from the API
async function fetchNews() {
    try {
      const response = await fetch('https://content.newtonschool.co/v1/pr/64e3d1b73321338e9f18e1a1/inshortsnews');
      const data = await response.json();
       
      return data; 
      
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
  function storeData(data) {
  // Check if local storage is supported
  if (typeof Storage !== 'undefined') {
    // Retrieve existing data from local storage or initialize an empty array
    const storedData = JSON.parse(localStorage.getItem('storedData')) || [];
    
    // Add the new data to the array
    if (data !== null) {
    storedData.push(data);
    }
    const filteredData = storedData.filter(item => item !== null);
    // Save the updated array back to local storage
    localStorage.setItem('storedData', JSON.stringify(filteredData));
    
   
  } else {
    console.error('Local storage is not supported');
  }
}
  async function dispalycategories() {

    
    const newsContainer = document.getElementById('news-container');
    const categoryContainer = document.getElementById('category-container');
    const headache = document.getElementById('headache');

    newsContainer.innerHTML = '';
    categoryContainer.innerHTML = '';
    headache.innerHTML=' ';
    const newsData = await fetchNews();
    var uniqueCategories = [];
    var uniqueNewsData = [];

    newsData.map(function(news) {
        if (uniqueCategories.indexOf(news.category) === -1) {
            uniqueCategories.push(news.category);
            uniqueNewsData.push(news);
        }
    });
    const anotherdiv= document.createElement('div');
    anotherdiv.innerHTML=`
    <div class="line-container">
    <div class="line-element">
        <h3 id="custom-h3" class="cpp">MY NEWSFEED</h3>
    </div>
    <div class="line-element">
        <p class="cpp" id="custom-p1">NEW NEWS</p>
    </div>
    </div>
<div class="line-element">
    <p id="custom-p2" class="cpp">SELECT CATEGORY</p>
</div>

    `;
    headache.appendChild(anotherdiv);
    anotherdiv.id="headache";
    anotherdiv.className = "loadnew";
    uniqueCategories.forEach(function(category) {
        const categoryDiv = document.createElement('div');
       
        categoryDiv.innerHTML = `<h3>${category}</h3>`;
        categoryContainer.appendChild(categoryDiv);
        categoryDiv.className="loadnews";
        
        categoryDiv.addEventListener('click', async function () {
          const selectedCategory = category;
          const newsDataForCategory = uniqueNewsData.filter(news => news.category === selectedCategory);
  
          // Display the news data in a separate div
          const newsContainer = document.createElement('div');
            newsContainer.className = 'news-container';
   
          for (let i = 0; i < 2; i++) {
            const newsDiv = document.createElement('div');
            newsDiv.className ="newsdivvv";
            const news = newsDataForCategory[i];
            if (news) {
                newsDiv.innerHTML = `
                <p class ="pcategory">By: <b>${news.author.toUpperCase()}</b></p>
                    <p class ="hcategory"> CATEGORY: <b>${news.category.toUpperCase()}<b></p>
                   
                    <p class ="p2category">${news.content}</p>
                    <a  class ="acategory" href="${news.url}" target="_blank">Read more</a><br/>
                    <i class="fa-regular fa-heart heartIcon"></i> 
                `;
                const heartIcon = newsDiv.querySelector('.heartIcon');

                // Attach a click event listener to the heart icon
                heartIcon.addEventListener('click', function() {
                    // Toggle the 'redHeart' class to change the color
                    heartIcon.classList.toggle('redHeart');
        
                    // Call the storeData function with the news content
                    storeData(JSON.stringify(news));
                });
              newsContainer.appendChild(newsDiv);

          }}
          headache.appendChild(newsContainer);
        });
        categoryContainer.appendChild(categoryDiv);
        
        categoryContainer.className = "loadnews";
        headache.appendChild(categoryContainer);
      });
      // Assuming you have a function named storeData


    }
    function displaySavedNews() {
      const storedData = JSON.parse(localStorage.getItem('storedData')) || [];
    
      // Display the stored data in a separate div
      const savedNewsContainer = document.createElement('div');
      savedNewsContainer.className = 'news-container';
      savedNewsContainer.innerHTML=`<div class="line-container">
      <div class="line-element">
          <h3 id="custom-h3" class="cpp">MY NEWSFEED</h3>
      </div>
      <div class="line-element">
          <p class="cpp" id="custom-p1">NEW NEWS</p>
      </div>
      </div>

      `;
      storedData.forEach((savedNews, index) => {
        
        const savedNewsDiv = document.createElement('div');
        savedNewsDiv.className = 'newsdivvv';
        const { category, author, content, url } = JSON.parse(savedNews);
        savedNewsDiv.innerHTML = 
        
        savedNewsDiv.innerHTML = `
        <p class="pcategory">By: <b>${author.toUpperCase()}</b></p>
        <p class="hcategory">CATEGORY: <b>${category.toUpperCase()}</b></p>
        <p class="p2category">${content}</p>
        <a class="acategory" href="${url}" target="_blank">Read more</a><br/>
        <i class="fa-regular fa-heart heartIcon" data-index="${index}"></i>
      
        `;
        savedNewsContainer.appendChild(savedNewsDiv);
    
        // Add click event listener to the heart icon for deletion
        const heartIcon = savedNewsDiv.querySelector('.heartIcon');
        heartIcon.addEventListener('click', function () {
          removeFromLocalStorage(index);
          displaySavedNews(); // Refresh the display after deletion
        });
      });
    
      // Replace the existing content with the saved news
      const headache = document.getElementById('headache');
      headache.innerHTML = '';
      headache.appendChild(savedNewsContainer);
    }
    
    // Function to remove an item from local storage by index
    function removeFromLocalStorage(index) {
      const storedData = JSON.parse(localStorage.getItem('storedData')) || [];
      storedData.splice(index, 1);
      localStorage.setItem('storedData', JSON.stringify(storedData));
    }
    

    document.getElementById('btn2').addEventListener('click', dispalycategories);



document.getElementById('btn1').addEventListener('click', displaySavedNews);



