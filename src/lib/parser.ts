import { Column, ColumnType, DataType, DbColumn } from "./types";

export function stripSingleQuotes(str: string) {
  return str.substring(1, str.length - 1);
}

export function toCamelCase(str: string): string {
  return str[0].toLowerCase() + str.substring(1, str.length);
}

function sqlTypeToColumnType(sqlType: DataType): ColumnType {
  switch (sqlType) {
    case "decimal":
    case "int":
      return "number";
    case "varchar":
      return "text";
    case "bit":
      return "checkbox";
    case "datetime":
      return "date";
    default:
      return "custom";
  }
}

export function parse(text: string) {
  const columns = parseText(text);
  return mapToTableColumns(columns);
}

function parseText(text: string) {
  const columns = text.split("\n").filter((s) => typeof s === "string" && s.length > 0);

  const parsedColumns: DbColumn[] = [];

  columns.forEach((c) => {
    c = c.trim();
    c = c.substring(1, c.length - 2).trim();

    const column: DbColumn = {
      columnName: "",
      dataType: "int",
      isNullable: false,
    };

    c.split(",").forEach((p) => {
      p = p.trim();
      const [name, value] = p.split(":");
      const key = name.trim() as keyof DbColumn;
      const trimmedValue = value.trim();

      if (key === "isNullable") {
        column[key] = trimmedValue === "true";
      } else if (key === "columnName") {
        column[key] = toCamelCase(stripSingleQuotes(trimmedValue));
      } else if (key === "dataType") {
        column[key] = stripSingleQuotes(trimmedValue) as DataType;
      }
    });

    parsedColumns.push(column);
  });

  return parsedColumns;
}

function mapToTableColumns(columns: DbColumn[]): Column[] {
  return columns.map((column) => {
    const dataType = sqlTypeToColumnType(column.dataType);

    return {
      accessorKey: column.columnName,
      editable: false,
      enableSorting: false,
      header: column.columnName,
      dataType,
      exclude: false,
      meta: {
        type: dataType,
        isDisabled: false,
        inline: false,
        className: "",
        allowNegative: false,
        fixedDecimalScale: false,
        decimalScale: 2,
      },
    };
  });
}

export function toSlug(str: string) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
