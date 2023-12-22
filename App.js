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
    anotherdiv.innerHTML=`<h3 id="custom-h3"class="cpp">MY NEWSFEED<h3/><p class ="cpp" id="custom-p1">NEW NEWS<p/><p>SELECT CATEGORY<p/>`;
    headache.appendChild(anotherdiv);
    anotherdiv.id="headache";
    anotherdiv.className = "loadnew";
    // let firstH1 = anotherdiv.querySelector('h3');

    // if (firstH1) {
    // firstH1.style.color = "black"; // This will change the text color to red
    // firstH1.style.backgroundColor = "white"; // This will change the background color to blue
    // firstH1.style.display="inline-flex";
    // }
    // let div99 = anotherdiv.querySelector('p');
    // if(div99){
    //   div99.style.backgroundColor="khaki";
    //   div99.style.color="black";
    //   div99.style.borderRadius="1px solid black";
    //   firstH1.style.display="inline-block";
    // }

    uniqueCategories.forEach(function(category) {
        const categoryDiv = document.createElement('div');
       
        categoryDiv.innerHTML = `<h2>${category}</h2>`;
        categoryContainer.appendChild(categoryDiv);
        categoryDiv.className="loadnew";
        categoryDiv.id="category-container";
    });

   
}

document.getElementById('btn2').addEventListener('click', dispalycategories);
  