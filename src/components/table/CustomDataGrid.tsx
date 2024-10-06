const CustomDataGrid = ({
  columns,
  rows = [],
  loading,
  buttons,
  pageTotal = 1,
  linkOverview = '',
  notExtra = false,
  handleAdd,
  handleForm,
  editForm,
  editState,
  fields,
  selectableRows = false,
  itemSelectRowParam = '',
  selectedRowsButtons = [],
  onAction,
  handleSwitch,
  downloadFile,
}: any) => {
  console.log(
    columns,
    rows,
    loading,
    buttons,
    pageTotal,
    linkOverview,
    notExtra,
    handleAdd,
    handleForm,
    editForm,
    editState,
    fields,
    selectableRows,
    itemSelectRowParam,
    selectedRowsButtons,
    onAction,
    handleSwitch,
    downloadFile
  );
  return <div>CustomDataGrid</div>;
};

export default CustomDataGrid;
