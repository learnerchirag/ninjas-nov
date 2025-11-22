import { useGlobal } from './context/GlobalContext';
import { DataTable } from './components/ninjas/data-table';
import { columns } from './components/ninjas/columns';

function App() {
  const { ninjas, isLoading, error } = useGlobal();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Ninja Database</h1>
      <DataTable
        columns={columns}
        data={ninjas || []}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

export default App;
