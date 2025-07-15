'use client';

import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

type Transaction = {
  description: string;
  amount: number;
};

export default function FinancialTracker() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() === '' || amount === '') return;

    setTransactions([...transactions, { description, amount: Number(amount) }]);
    setDescription('');
    setAmount('');
  };

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income + expenses;

  const chartData = [
    { name: 'Income', value: income },
    { name: 'Expenses', value: Math.abs(expenses) }
  ];

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">💰 Financial Tracker</h1>

      <div className="bg-white shadow rounded-xl p-4 space-y-2">
        <div className="text-lg">
          <strong>Income:</strong> ${income.toFixed(2)}{' '}
          <strong className="ml-4">Expenses:</strong> ${Math.abs(expenses).toFixed(2)}{' '}
          <strong className="ml-4">Balance:</strong> ${balance.toFixed(2)}
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-4 space-y-4"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="flex-1 p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value === '' ? '' : Number(e.target.value))
            }
            required
            className="w-40 p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
      </form>

      <div className="bg-white shadow rounded-xl p-4 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="border-b border-gray-300">
            <tr>
              <th className="p-2">Description</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="p-2">{tx.description}</td>
                <td className="p-2">${tx.amount.toFixed(2)}</td>
                <td className="p-2">
                  {tx.amount >= 0 ? (
                    <span className="text-green-600 font-medium">Income</span>
                  ) : (
                    <span className="text-red-600 font-medium">Expense</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


