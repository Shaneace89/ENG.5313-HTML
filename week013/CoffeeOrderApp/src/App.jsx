import React, { useState } from 'react';

export default function CoffeeOrderApp() {
  // 1. Declare 3 State Variables
  const [customerName, setCustomerName] = useState("");
  const [shots, setShots] = useState(1);
  const [isDecaf, setIsDecaf] = useState(false);

  // 2. Calculate Derived Data (Total Price)
  const basePrice = 3.50;
  const totalPrice = (basePrice + (shots - 1) * 0.75).toFixed(2);

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-xl font-sans">
      {/* App Header */}
      <div className="flex items-center space-x-3 mb-6">
        <span className="text-3xl">☕</span>
        <div>
          <h1 className="text-lg font-bold text-slate-900">Campus Café Customizer</h1>
          <p className="text-xs text-slate-500">Practice React State with your coffee order!</p>
        </div>
      </div>

      {/* Control 1: Text Input for Customer Name */}
      <div className="mb-4">
        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
          Customer Name:
        </label>
        <input
          type="text"
          placeholder="e.g. Alex"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
        />
      </div>

      {/* Control 2: Number State (Shots Counter) */}
      <div className="mb-4 p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-700">Espresso Shots (+ $0.75):</span>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShots(shots - 1)}
            disabled={shots <= 1}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 disabled:opacity-40 font-bold text-sm text-slate-700 flex items-center justify-center transition"
          >
            -
          </button>
          <span className="font-bold text-sm text-slate-900 w-4 text-center">{shots}</span>
          <button
            onClick={() => setShots(shots + 1)}
            className="w-8 h-8 rounded-full bg-sky-500 hover:bg-sky-600 font-bold text-sm text-white flex items-center justify-center transition"
          >
            +
          </button>
        </div>
      </div>

      {/* Control 3: Boolean Toggle (Decaf) */}
      <div className="mb-6">
        <button
          onClick={() => setIsDecaf(!isDecaf)}
          className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold transition flex items-center justify-between ${
            isDecaf
              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
              : "bg-slate-200 text-slate-700"
          }`}
        >
          <span>{isDecaf ? "🌿 Decaf Beans Selected" : "⚡ Regular Espresso Beans"}</span>
          <span className="text-[10px] uppercase font-bold bg-white px-2 py-0.5 rounded shadow-sm">
            {isDecaf ? "Decaf ON" : "Toggle"}
          </span>
        </button>
      </div>

      {/* Real-Time Receipt Preview */}
      <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2 border border-slate-800">
        <div className="text-[10px] font-bold text-sky-400 uppercase tracking-widest border-b border-slate-800 pb-1">
          Live Order Ticket (State Preview)
        </div>
        <div className="text-sm font-bold text-slate-100">
          Order for: <span className="text-sky-300">{customerName || "___"}</span>
        </div>
        <div className="text-xs text-slate-300 flex justify-between">
          <span>{shots}x Espresso Shot ({isDecaf ? "Decaf" : "Regular"})</span>
          <span className="font-mono text-emerald-400 font-bold">${totalPrice}</span>
        </div>
      </div>
    </div>
  );
}