import { Dispatch, PropsWithChildren, SetStateAction, createContext } from "react";
import { Column, Meta } from "../lib/types";
import { useLocalStorage } from "../hooks";

export type ConfigurationContext = {
  name: string;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  setName: Dispatch<SetStateAction<string>>;
  setIsDeletable: Dispatch<SetStateAction<boolean>>;
  isDeletable: boolean;
  columns: Column[];
  setColumns: Dispatch<SetStateAction<Column[]>>;
  updateColumn: (columnName: string, data: Partial<Column>) => void;
  updateColumnMeta: (columnName: string, data: Partial<Meta>) => void;
  makeEditable: (checked: boolean) => void;
  isEditable: boolean;
};

const example = `{ columnName: 'CustomerID',  isNullable: false,  dataType: 'int',  len: '0' },
{ columnName: 'FirstName',  isNullable: true,  dataType: 'varchar',  len: '255'},
{ columnName: 'LastName',  isNullable: false,  dataType: 'varchar',  len: '255' },`;

export const ConfigurationContext = createContext<ConfigurationContext | undefined>(undefined);

export function ConfigurationProvider({ children }: PropsWithChildren) {
  const [text, setText] = useLocalStorage("text", example);
  const [isDeletable, setIsDeletable] = useLocalStorage("isDeletable", true);
  const [name, setName] = useLocalStorage("name", "Customer");
  const [columns, setColumns] = useLocalStorage<Column[]>("columns", []);
  const [isEditable, setIsEditable] = useLocalStorage<boolean>("isEditable", false);

  const updateColumn = (columnName: string, data: Partial<Column>) => {
    const updatedColumns = columns.map((column) => {
      if (column.accessorKey === columnName) {
        return { ...column, ...data };
      }

      return column;
    });

    setColumns(updatedColumns);
  };

  const updateColumnMeta = (columnName: string, data: Partial<Meta>) => {
    const updatedColumns = columns.map((column) => {
      if (column.accessorKey === columnName) {
        return {
          ...column,
          meta: {
            ...column.meta,
            ...data,
          },
        };
      }

      return column;
    });

    setColumns(updatedColumns);
  };

  const makeEditable = (checked: boolean) => {
    setIsEditable(checked);
    const updatedColumns = columns.map((column) => {
      return { ...column, editable: checked as boolean extends true ? true : false };
    });

    setColumns(updatedColumns);
  };

  return (
    <ConfigurationContext.Provider
      value={{
        name,
        text,
        setText,
        setName,
        columns,
        setColumns,
        updateColumn,
        updateColumnMeta,
        makeEditable,
        isEditable,
        isDeletable,
        setIsDeletable,
      }}
    >
      {children}
    </ConfigurationContext.Provider>
  );
}
