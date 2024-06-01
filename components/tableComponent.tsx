import { useEffect, useState } from "react";
import { TablePagination } from "@mui/base/TablePagination";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

type TableHeaderType = {
  label: string;
  accessor: string;
  CellRenderer?: (data: any) => JSX.Element | string;
  headerClass?: string;
  bodyClass?: string;
};

type TableComponentProps = {
  totalPages: number;
  tableHeaders: TableHeaderType[];
  defaultSortBy: string;
  defaultSortDirection: "asc" | "desc";
  defaultLimit: number;
  defaultSkip: number;
  onTableStateChange: (
    sortBy: string,
    onTableStateChange: "asc" | "desc",
    limit: number,
    skip: number
  ) => void;
  tableData: {
    [key: string]: string | number;
  }[];
};

export default function TableComponent({
  defaultSortBy,
  defaultSortDirection,
  defaultLimit,
  defaultSkip,
  totalPages,
  tableHeaders,
  tableData,
  onTableStateChange,
}: TableComponentProps) {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    defaultSortDirection
  );
  const [sortBy, setSortBy] = useState<string>(defaultSortBy);
  const [limit, setLimit] = useState<number>(defaultLimit);
  const [skip, setSkip] = useState<number>(defaultSkip);

  const handleSortChange = (header: TableHeaderType) => {
    if (header.accessor === sortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(header.accessor);
      setSortDirection("asc");
    }
  };

  useEffect(() => {
    onTableStateChange(sortBy, sortDirection, limit, skip);
  }, [sortBy, sortDirection, limit, skip]);

  const iconsConfig = { asc: "▲", desc: "▼" };

  return (
    <div className="tableContainer">
      <table>
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th
                onClick={() => handleSortChange(header)}
                className={`tableHeader w-60 ${header?.headerClass}`}
                key={header.accessor}
              >
                {header.label}

                <span>
                  {sortBy === header.accessor && iconsConfig[sortDirection]}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData?.map(
            (data) =>
              data && (
                <tr key={data.id}>
                  {tableHeaders.map((header) => (
                    <td
                      className={`tableBody w-60 ${header?.bodyClass}`}
                      key={header.accessor}
                    >
                      {header.CellRenderer
                        ? header.CellRenderer(data[header.accessor])
                        : data[header.accessor]}
                    </td>
                  ))}
                </tr>
              )
          )}
        </tbody>
        <tfoot>
          <tr>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              count={totalPages}
              rowsPerPage={limit}
              page={skip / limit}
              slotProps={{
                root: {
                  className: "p-2 relative bg-[#dcdcdc] rounded-md gap-3",
                },
                toolbar: {
                  className: "flex justify-content-between",
                },
                displayedRows: {
                  className: "m-0 mr-2 md:ml-auto",
                },
                select: {
                  "aria-label": "rows per page",
                  className: "mr-2 ml-2 bg-[#f4f4f4]",
                },
                actions: {
                  className: "flex text-center",
                  showFirstButton: true,
                  showLastButton: true,
                  slots: {
                    firstPageIcon: FirstPageRoundedIcon,
                    lastPageIcon: LastPageRoundedIcon,
                    nextPageIcon: ChevronRightRoundedIcon,
                    backPageIcon: ChevronLeftRoundedIcon,
                  },
                },
              }}
              onPageChange={(e: any, page) => {
                setSkip(page * limit);
              }}
              onRowsPerPageChange={(e, ...val) => {
                setLimit(parseInt(e.target.value));
              }}
            />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
