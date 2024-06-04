export type DataType = "int" | "varchar" | "bit" | "datetime" | "decimal";
export type ColumnType = "text" | "number" | "checkbox" | "date" | "select" | "time" | "custom";

export type BaseMeta = {
  type: ColumnType;
  isDisabled: boolean;
  className: string;
  inline: boolean;
};

export type NumberMeta = BaseMeta & {
  type: "number";
  allowNegative?: boolean;
  fixedDecimalScale?: boolean;
  decimalScale?: number;
};

export type Meta = BaseMeta | NumberMeta;

export type Column = {
  enableSorting: boolean;
  accessorKey: string;
  header: string;
  editable: boolean;
  meta: Meta;
  exclude: boolean;
} & {
  editable: false;
  dataType?: ColumnType;
};

export type DbColumn = {
  columnName: string;
  isNullable: boolean;
  dataType: DataType;
};
