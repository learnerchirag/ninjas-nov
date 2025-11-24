import { type ColumnDef } from "@tanstack/react-table"
import { type Ninja } from "@/api/ninjas"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Filter, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const columns: ColumnDef<Ninja>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "location",
        header: "Location",
    },
    {
        accessorKey: "power",
        header: ({ column }) => {
            const isSorted = column.getIsSorted();
            return (
                <div className="flex items-center space-x-2">
                    <span>Power</span>
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="h-8 w-8 p-0"
                    >
                        {isSorted === "asc" ? (
                            <ChevronUp className="h-4 w-4 text-primary" />
                        ) : isSorted === "desc" ? (
                            <ChevronDown className="h-4 w-4 text-primary" />
                        ) : (
                            <ChevronsUpDown className="h-4 w-4 opacity-50" />
                        )}
                    </Button>
                </div>
            )
        },
    },
    {
        accessorKey: "health",
        header: ({ column }) => {
            const uniqueValues = ["Healthy", "Injured", "Critical"];
            const selectedValues = (column.getFilterValue() as string[]) || [];

            return (
                <div className="flex items-center space-x-2">
                    <span>Health</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Filter className={`h-4 w-4 ${selectedValues.length > 0 ? "text-primary" : "opacity-50"}`} />
                                <span className="sr-only">Filter</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="glass-popover">
                            {uniqueValues.map((value) => (
                                <DropdownMenuCheckboxItem
                                    key={value}
                                    checked={selectedValues.includes(value)}
                                    onCheckedChange={(checked) => {
                                        const newValues = checked
                                            ? [...selectedValues, value]
                                            : selectedValues.filter((v) => v !== value);
                                        column.setFilterValue(newValues.length ? newValues : undefined);
                                    }}
                                >
                                    {value}
                                </DropdownMenuCheckboxItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
        cell: ({ row }) => {
            const health = row.getValue("health") as string;
            const healthClass =
                health === "Critical" ? "health-critical" :
                    health === "Injured" ? "health-injured" :
                        "health-healthy";

            return <span className={`${healthClass}`}>{health}</span>;
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
]
