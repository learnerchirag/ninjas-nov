import { useGlobal } from './context/GlobalContext';
import { DataTable } from './components/ninjas/data-table';
import { columns } from './components/ninjas/columns';

function App() {
  const { ninjas, isLoading, error } = useGlobal();

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header with glassmorphism */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent mb-2">
            Ninja Database
          </h1>
          <p className="text-muted-foreground text-lg">
            Elite warriors and their vital statistics
          </p>
        </div>

        {/* Data table with glassmorphism */}
        <div className="glass-card rounded-2xl p-6">
          <DataTable
            columns={columns}
            data={ninjas || []}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
