const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const quoteAuthor=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');

let apiQuotes=[];


function showLoadingSpinner(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}


function removeLoadingSpinner(){
    loader.hidden=true;
    quoteContainer.hidden=false;
}

// funtion that shows a new quote 
function newQuote(){
    showLoadingSpinner();
    const quote=apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
    // if author text is blank, replace it with 'uknown'
    if(!quote.author){
        quoteAuthor.textContent='Unknown';
    }else{
    quoteAuthor.textContent=quote.author;
    
}

// if quote is too long, apply a different style
if(quote.text.length>120){
    quoteText.classList.add('long-quote');
}else{
    quoteText.classList.remove('long-quote');
}
    quoteText.textContent=quote.text;
    // set quote,hide loader
    removeLoadingSpinner();
}

// Get quotes from  API

async function getQuotes(){
    showLoadingSpinner();
    const apiUrl='https:type.fit/api/quotes';
    try {
        const response=await fetch(apiUrl);
        apiQuotes=await response.json();
        newQuote();
    
    }catch(error){
        getQuotes();

    }
}

function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent}-${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}

// event listeners

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();

// tweet a quote
// template string uses backticks, query parameter is a text, template string converts a variable into a string

