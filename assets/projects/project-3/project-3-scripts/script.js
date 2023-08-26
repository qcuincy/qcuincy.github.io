const imageList = ['img (1).jpg', 'img (2).jpg', 'img (3).jpg', 'img (4).jpg', 'img (5).jpg']
function showResults(queryImage, folderIndex) {
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = ''; // Clear previous results

    const results = getResultsForQuery(queryImage, folderIndex);

    results.forEach(result => {
        // create span for result image
        const resultSpan = document.createElement('span');
        resultSpan.className = 'result-image-holder';
        resultContainer.appendChild(resultSpan);
        
        // create image for result image
        const resultImage = document.createElement('img');
        resultImage.src = result;
        resultImage.className = 'result-image';
        resultSpan.appendChild(resultImage);
        
        

        // const resultImage = document.createElement('img');
        // resultImage.src = result;
        // resultImage.className = 'result-image';
        // resultContainer.appendChild(resultImage);
    });
}

function getResultsForQuery(queryImage, folderIndex) {
    const folderPath = 'project-3-data/results/imgs (' + folderIndex + ')/';
    const imagesInFolder = imageList
    const queryImageName = queryImage;

    const results = [];
    imagesInFolder.forEach(image => {
      if (image !== queryImageName) {
        results.push(folderPath + image);
      }
    });
  
    return results;
}