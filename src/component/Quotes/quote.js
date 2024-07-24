import React, { useState, useEffect } from 'react';
import './quote.css'

function Quote({ quote, author }) {
  return (
    <div className='quote-container'>
      <p className='quote'>{quote}</p>
      <p className='quote'>- {author}</p>
    </div>
  );
}

function NewQuoteButton({ onClick }) {
  return <button className='new-quote-button' onClick={onClick}>Fetch New Quote</button>;
}

function QuoteContainer() {
  const [quoteData, setQuoteData] = useState(null);
  const fetchQuote = async () => {
      try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        
        const randomIndex = Math.floor(Math.random() * data.length);
        
        setQuoteData(randomIndex);
      } catch (error) {
        console.error('Error fetching quote:', error);
        // Handle errors here, like displaying an error message
      }
    };
  useEffect(() => {
    fetchQuote();
  }, []);

  const handleNewQuote = (data) => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setQuoteData(data[randomIndex]);
    
  };

  if (!quoteData) {
    return <p>Loading quote...</p>;
  }

  const { content: quote, author } = quoteData;

  return (
    <div>
      <Quote quote={quote} author={author} />
      <NewQuoteButton onClick={handleNewQuote} />
    </div>
  );
}

export default QuoteContainer;