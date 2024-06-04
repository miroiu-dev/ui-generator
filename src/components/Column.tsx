import { Checkbox, DataList, Select, TextField } from "@radix-ui/themes";
import type { Column, ColumnType, NumberMeta } from "../lib/types";
import { useConfiguration } from "../providers/useConfiguration";

type ColumnProps = {
  column: Column;
};

const datatypes: ColumnType[] = ["checkbox", "custom", "date", "number", "select", "text", "time"];

export function Column({ column }: ColumnProps) {
  const { updateColumn, updateColumnMeta } = useConfiguration();

  return (
    <DataList.Root size="2">
      <DataList.Item>
        <DataList.Label>Header</DataList.Label>
        <DataList.Value>
          <TextField.Root
            size="1"
            value={column.header}
            onChange={(ev) =>
              updateColumn(column.accessorKey, {
                header: ev.target.value,
              })
            }
          />
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Exclude</DataList.Label>
        <DataList.Value>
          <Checkbox
            checked={column.exclude}
            onCheckedChange={(checked) =>
              updateColumn(column.accessorKey, {
                exclude: checked as boolean,
              })
            }
          />
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Is Link</DataList.Label>
        <DataList.Value>
          <Checkbox
            checked={column.isLink}
            onCheckedChange={(checked) =>
              updateColumn(column.accessorKey, {
                isLink: checked as boolean,
              })
            }
          />
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Enable Sorting</DataList.Label>
        <DataList.Value>
          <Checkbox
            checked={column.enableSorting}
            onCheckedChange={(checked) =>
              updateColumn(column.accessorKey, {
                enableSorting: checked as boolean,
              })
            }
          />
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Is Editable</DataList.Label>
        <DataList.Value>
          <Checkbox
            checked={column.editable}
            onCheckedChange={(checked) =>
              updateColumn(column.accessorKey, {
                editable: checked as boolean extends true ? true : false,
              })
            }
          />
        </DataList.Value>
      </DataList.Item>
      {!column.editable && (
        <DataList.Item>
          <DataList.Label>Data Type</DataList.Label>
          <DataList.Value>
            <Select.Root
              defaultValue={column.dataType}
              onValueChange={(value) => updateColumn(column.accessorKey, { dataType: value as ColumnType })}
            >
              <Select.Trigger />
              <Select.Content>
                {datatypes.map((type) => (
                  <Select.Item key={`datatype-${type}`} value={type}>
                    {type}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </DataList.Value>
        </DataList.Item>
      )}
      {column.editable && (
        <>
          <DataList.Item>
            <DataList.Label>Meta: Type</DataList.Label>
            <DataList.Value>
              <Select.Root
                defaultValue={column.meta.type}
                onValueChange={(value) => updateColumnMeta(column.accessorKey, { type: value as ColumnType })}
              >
                <Select.Trigger />
                <Select.Content>
                  {datatypes.map((type) => (
                    <Select.Item key={`meta-type-${type}`} value={type}>
                      {type}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Meta: Is Disabled</DataList.Label>
            <DataList.Value>
              <Checkbox
                checked={column.meta.isDisabled}
                onCheckedChange={(checked) =>
                  updateColumnMeta(column.accessorKey, {
                    isDisabled: checked as boolean,
                  })
                }
              />
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Meta: Inline</DataList.Label>
            <DataList.Value>
              <Checkbox
                checked={column.meta.inline}
                onCheckedChange={(checked) =>
                  updateColumnMeta(column.accessorKey, {
                    inline: checked as boolean,
                  })
                }
              />
            </DataList.Value>
          </DataList.Item>
          {column.meta.type === "number" && (
            <>
              <DataList.Item>
                <DataList.Label>Meta: Allow Negative Numbers</DataList.Label>
                <DataList.Value>
                  <Checkbox
                    checked={(column.meta as NumberMeta).allowNegative}
                    onCheckedChange={(checked) =>
                      updateColumnMeta(column.accessorKey, {
                        allowNegative: checked as boolean,
                      })
                    }
                  />
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Meta: Fixed Decimal Scale</DataList.Label>
                <DataList.Value>
                  <Checkbox
                    checked={(column.meta as NumberMeta).fixedDecimalScale}
                    onCheckedChange={(checked) =>
                      updateColumnMeta(column.accessorKey, {
                        fixedDecimalScale: checked as boolean,
                      })
                    }
                  />
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Meta: Decimal Scale</DataList.Label>
                <DataList.Value>
                  <TextField.Root
                    size="1"
                    type="number"
                    value={(column.meta as NumberMeta).decimalScale}
                    onChange={(ev) =>
                      updateColumnMeta(column.accessorKey, {
                        decimalScale: ev.target.valueAsNumber,
                      })
                    }
                  />
                </DataList.Value>
              </DataList.Item>
            </>
          )}
        </>
      )}
    </DataList.Root>
  );
}
