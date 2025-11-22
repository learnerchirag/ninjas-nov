import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useGlobal } from './context/GlobalContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const fetchQuote = async () => {
  const res = await fetch('https://api.quotable.io/random');
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
};

function App() {
  const { count, increment, decrement } = useGlobal();
  const [name, setName] = useState('');

  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ['quote'],
    queryFn: fetchQuote,
  });

  return (
    <div className="min-h-screen bg-background text-foreground p-8 flex flex-col items-center justify-center space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold"
      >
        React Starter Demo
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Counter Section (Global State + Shadcn) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Global State Counter</CardTitle>
              <CardDescription>Managed via React Context</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="text-6xl font-bold">{count}</div>
              <div className="flex space-x-4">
                <Button onClick={decrement} variant="outline">-</Button>
                <Button onClick={increment}>+</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* API Section (React Query) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Random Quote</CardTitle>
              <CardDescription>Fetched via React Query</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-between h-[200px]">
              {isLoading ? (
                <p>Loading...</p>
              ) : isError ? (
                <p className="text-red-500">Error fetching quote</p>
              ) : (
                <blockquote className="italic text-center">
                  "{data.content}"
                  <footer className="text-sm mt-2 font-semibold">- {data.author}</footer>
                </blockquote>
              )}
              <Button onClick={() => refetch()} className="mt-4" variant="secondary">
                New Quote
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Input Section (Shadcn Input) */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader>
            <CardTitle>Interactive Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Type something..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              You typed: <span className="font-bold text-primary">{name}</span>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default App;
