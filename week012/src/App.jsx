import React, { useState } from 'react';

function LiteraryCard(props) {
  return (
    <article className="p-8 rounded-2xl border-2 bg-white shadow-sm flex flex-col h-full space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{props.emoji}</span>
        <div>
          <h2 className="font-serif font-bold text-xl">{props.name}</h2>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900">
            {props.badge}
          </span>
        </div>
      </div>
      <blockquote className="space-y-2">
        <p className="font-serif italic text-lg break-words">"{props.quote}"</p>
        <cite className="block text-xs text-stone-500 font-sans break-words">— {props.source}</cite>
      </blockquote>
    </article>
  );
}

export default function App() {
  const [newCards, setNewCards] = useState([]);
  const [quoteInput, setQuoteInput] = useState('');
  const [sourceInput, setSourceInput] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!quoteInput) return;

    const addedCard = {
      id: Date.now(),
      name: "Guest",
      badge: "User Submitted",
      emoji: "✨",
      quote: quoteInput,
      source: sourceInput || "Unknown"
    };

    setNewCards([addedCard, ...newCards]);
    setQuoteInput('');
    setSourceInput('');
  };

  return (
    <div className="min-h-screen bg-stone-100">
      
      <header className="bg-indigo-900 text-stone-100 p-8 text-center shadow-md">
        <h1 className="text-3xl font-serif font-bold">Literary Collection</h1>
        <p className="text-indigo-200 mt-2">Read my favorites, or add your own to the board.</p>
      </header>

      <main className="p-8 flex flex-col items-center">
        
        <form onSubmit={handleAdd} className="bg-white p-4 rounded-xl shadow-sm border-2 w-full max-w-2xl mb-8 flex flex-col sm:flex-row gap-2">
          <input 
            className="border-2 p-2 rounded flex-1 outline-none focus:border-indigo-500"
            placeholder="Type a quote..." 
            value={quoteInput}
            onChange={(e) => setQuoteInput(e.target.value)}
          />
          <input 
            className="border-2 p-2 rounded flex-1 outline-none focus:border-indigo-500"
            placeholder="Author / Source..." 
            value={sourceInput}
            onChange={(e) => setSourceInput(e.target.value)}
          />
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2 rounded transition-colors">
            Add
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">

          <LiteraryCard
            name="Jas James"
            badge="Bios "
            emoji="🔥"
            quote="Go not where the path may lead, go instead where there is no path and leave a trail"
            source="Ralph Waldo Emerson"
          />

          <LiteraryCard
            name="Shane Fleming"
            badge="Science fiction"
            emoji="🚀"
            quote="I want to spend the rest of my life studying...but I have to save humanity first. Stupid humanity. Getting in the way of my hobbies."
            source="Andy Weir, Project Hail Mary"
          />

          {newCards.map(card => (
            <LiteraryCard key={card.id} {...card} />
          ))}
        </div>

      </main>
    </div>
  );
}