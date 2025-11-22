import { useGlobal } from './context/GlobalContext';
import { DataTable } from './components/ninjas/data-table';
import { columns } from './components/ninjas/columns';

function App() {
  const { ninjas, isLoading, error } = useGlobal();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Ninja Database</h1>
      {ninjas && <DataTable columns={columns} data={ninjas} />}
    </div>
  );
}

export default App;
