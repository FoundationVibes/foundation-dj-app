// page.tsx or FinancialTracker.tsx
'use client'; // Only for Next.js App Router

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

