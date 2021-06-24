export const csvToTable = (data) => {
  if (data === "") return [];
  if (data === undefined) return [];
  const rows = data.replace(/['"]+/g, "").trim().split("\n");

  const table = rows.map((row) => {
    return row.split(",");
  });
  return table;
};
