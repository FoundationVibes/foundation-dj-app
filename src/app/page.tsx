'use client';

import React, { useState } from 'react';

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

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
      <h1>💰 Financial Tracker</h1>

      <div style={{ marginBottom: '1rem' }}>
        <strong>Income:</strong> ${income.toFixed(2)} |{' '}
        <strong>Expenses:</strong> ${Math.abs(expenses).toFixed(2)} |{' '}
        <strong>Balance:</strong> ${balance.toFixed(2)}
      </div>

      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ marginRight: '0.5rem', padding: '0.5rem' }}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
          required
          style={{ marginRight: '0.5rem', padding: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Add
        </button>
      </form>

      <table width="100%" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ccc', padding: '0.5rem' }}>Description</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '0.5rem' }}>Amount</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '0.5rem' }}>Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={index}>
              <td style={{ padding: '0.5rem' }}>{tx.description}</td>
              <td style={{ padding: '0.5rem' }}>${tx.amount.toFixed(2)}</td>
              <td style={{ padding: '0.5rem' }}>
                {tx.amount >= 0 ? 'Income' : 'Expense'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
