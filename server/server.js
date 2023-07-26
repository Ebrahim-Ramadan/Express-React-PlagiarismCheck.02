const express = require('express');
const { makeCancelable } = require('cancelable-promise');
// const { CosineSimilarity } = require('cosine-similarity');
// const TfIdf = require('tf-idf');
// const natural = require('natural');
// const tokenizer = new natural.WordTokenizer();
const puppeteer = require('puppeteer');
const NodeCache = require('node-cache');
const cors = require('cors');
const app = express();
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 }); // TTL set to 60 seconds (cache expires after 60 seconds):
//////// explaining the params:
// the standard ttl as number in seconds for every generated cache element. 0 = unlimited.
// checkperiod: (default: 600) The period in seconds, as a number, used for the automatic delete check interval. 0 = no periodic check.


const PORT = 3000;
app.use(cors())
app.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
 // Check if the data is present in the cache
 const cachedData = cache.get(query);
 if (cachedData) {
   console.log('Data was cached,  retrieved from cache.');
   res.json(cachedData);
 }
 else {
   const start = performance.now()

  //  const searchPromise = makeCancelable(googleSearch(query));
  //     const scrapePromise = makeCancelable(scrapeTopResults(searchPromise.promise));


   
  const searchResults = await googleSearch(query);
  const top5Results = searchResults.slice(0, 5);
  const scrapedData = await scrapeTopResults(top5Results);
  //  const cosinePercetange = calculateCosineSimilarity(query, scrapedData)
  // req.on('aborted', () => {
  //   console.log('Request was aborted, canceling promises.');
  //   searchPromise.cancel(); // Cancel the search promise
  //   scrapePromise.cancel(); // Cancel the scrape promise
  // });
   

  const end = performance.now();
  const totalTime = end - start;
   
  // console.log(scrapedData)
  // console.log('cosinePercetange ', cosinePercetange);
  console.log('Total Time (ms):', totalTime);
  // Store the scraped data in the cache
  cache.set(query, scrapedData);
  res.json(scrapedData);
}
  } catch (error) {
    console.error('An error occurred:', error);
    // res.status(500).json({ error: 'An error occurred' });
      res.status(500).json({ error: 'Internal Server Error' });
  }

});


async function googleSearch(query) {
  const browser = await puppeteer.launch({
          headless: 'new',
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
          defaultViewport: null,
          userAgent:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
        });
  const page = await browser.newPage();

  //avoiding loading nay type of other non-text
  // await page.setRequestInterception(true);
  // page.on('request', (request) => {
  //   if (request.resourceType() === 'image' || request.resourceType() === 'stylesheet' || request.resourceType() === 'font') {
  //     request.abort();
  //   } else {
  //     request.continue();
  //   }
  // });
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  await page.goto(searchUrl);

  // Wait for the search results to load (I adjusted the selector (P) depending on the Google search page layouts I checked)
  await page.waitForSelector('h3');

  const searchResults = await page.evaluate(() => {
    const results = [];
    const searchElements = document.querySelectorAll('h3');
    for (let i = 0; i < Math.min(searchElements.length, 5); i++) {
      results.push(searchElements[i].parentElement.href);
    }
    return results;
  });

  await browser.close();
  console.log(searchResults)
  return searchResults;
}


async function scrapeTopResults(topResults) {
  const scrapedData = [];

  for (const result of topResults) {
    try {
      if (!result) {
        console.log('Skipping null URL...');
        continue;
      }

      console.log('Processing URL:', result);
        const browser = await puppeteer.launch({
          //headless:new >> modern headless puppeteer
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: null,
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
      });
      const page = await browser.newPage();
      await page.goto(result);

      const contentText = await page.evaluate(() => {
        // Sample code to extract content text from the page (p selector for paragraphs hwowever some modern sites go with main and article selectors, but basically they end up with paragraphs)
        const paragraphs = Array.from(document.querySelectorAll('p'));
        return paragraphs.map(p => p.innerText).join('\n');
      });

      scrapedData.push({ url: result, content: contentText });

      await browser.close();
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      // Handle errors gracefully if any of the pages fail to load or scrape.
      console.error('Error scraping page:', error);
    }
  }
console.log(scrapedData)
  return scrapedData;
}


// cosineCalc - text similarity metric:
//This func calcs the cosine similarity between two text documents -both scrapped and the query- using the "Term Frequency-Inverse Document Frequency" (TF-IDF) algorithm, which represents the importance of each word in the text. 
// function calculateCosineSimilarity(query, scrapedData) {
//   try {
//     // Extract the content from scrapedData array and join it as a single string
//     const scrapedText = scrapedData.map(data => data.content).join('\n');

//     // Tokenize the query and scrapedText
//     const tokens1 = query.split(/\s+/);
//     const tokens2 = scrapedText.split(/\s+/);
//     console.log('token1', tokens1);
//     console.log('token2', tokens2);
//     // Initialize tf-idf vectors
//     const tfidf = new TfIdf();
//     tfidf.addDocument(tokens1);
//     tfidf.addDocument(tokens2);

//     // Get the vectors and calculate cosine similarity
//     const vector1 = tfidf.getVector(0);
//     const vector2 = tfidf.getVector(1);
//     const similarity = new CosineSimilarity().getSimilarity(vector1, vector2);

//     console.log('Cosine Similarity:', similarity); // Log the cosine similarity
//     return similarity;
//   } catch (err) {
//     console.log('Error calculating cosine similarity:', err);
//     return 0; // Or any default value indicating the calculation failed
//   }
// }




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});