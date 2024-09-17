import axiosMethod from '@/api';
import { ConfirmationDialog, CustomForm, CustomIconButton } from '@/components';
import CustomTooltip from '@/components/common/CustomToolTip';
import { ConvertDates } from '@/utils/ConvertDates';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Collapse,
  IconButton,
  MenuItem,
  Pagination,
  Popover,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp, IoIosMore, IoMdClose } from 'react-icons/io';
import { TbExternalLink } from 'react-icons/tb';
import { TiTick } from 'react-icons/ti';
import * as yup from 'yup';
import CopyValue from '../common/CopyValue';
import { Field } from '../form/CustomForm';
import TableRowSkeleton from './TableSkeleton';
import CardBox from '@/layout/CardBox';
import { UseAceessBtn } from '@/hooks/UseAceessBtn';

interface RowData {
  [key: string]: any;
}

export interface HeaderCol {
  field?: string;
  headerName?: string;
  dataType?: string;
  isHeader?: boolean;
}

interface ReusableDataGridProps {
  columns: HeaderCol[];
  rows: RowData[];
  pageTotal: number;
  loading: boolean;
  linkOverview?: string;
  notExtra?: boolean;
  fields?: Field[];
  editForm?: Field[];
  editState?: any;
  handleAdd?: {
    urlApi: string;
    fields: Field[];
  };
  handleForm?: (data: any) => void;
  buttons?: {
    label: string;
    type: string;
    icon?: JSX.Element | undefined;
    onClick?: (formData: any, rowData: any) => void;
    fields?: Field[];
    validation?: yup.ObjectSchema<any>;
  }[];
  selectableRows?: boolean; // New prop to control row selection
  itemSelectRowParam?: string; // New prop to specify which key to return
  selectedRowsButtons?: {
    label: string;
    actionType: string;
  }[]; // New prop to specify action buttons for selected rows
  onAction?: (actionType: string, selectedRows: any[]) => void; // New prop to handle actions
  handleSwitch?: (fieldValue: boolean, rowId: number) => void;
}

interface ButtonType {
  label: string;
  type: string;
  icon?: any;
  onClick?: (formData: any, rowData: RowData) => void;
  urlApi?: string;
  params?: string;
  fields?: Field[];
  validation?: yup.ObjectSchema<any>;
}

const CustomDataGrid: React.FC<ReusableDataGridProps> = ({
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
  selectableRows = false, // Default to false if not provided
  itemSelectRowParam = '',
  selectedRowsButtons = [], // Default to empty array if not provided
  onAction,
  handleSwitch,
}) => {
  const [collapsedRows, setCollapsedRows] = useState<Record<number, boolean>>({});
  const [selectedRows, setSelectedRows] = useState<number[]>([]); // State to manage selected rows
  const [selectedRowValues, setSelectedRowValues] = useState<any[]>([]);
  const { showBtnUpdate, showBtnDelete, showBtnCreate } = UseAceessBtn();

  const headerColumns = columns?.filter((header) => header?.isHeader);
  const router = useRouter();
  const theme = useTheme();
  const [dialogState, setDialogState] = useState<{
    open: boolean;
    type: 'delete' | 'edit' | 'add' | null;
    button?: ButtonType;
  }>({ open: false, type: null });
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);

  const [anchorEls, setAnchorEls] = useState<Array<null | HTMLElement>>([]);

  const extraButtons = buttons?.filter((button) => button.type === 'extra');

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>, rowIndex: number) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[rowIndex] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };

  const handleClose = (rowIndex: number) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[rowIndex] = null;
    setAnchorEls(newAnchorEls);
  };

  const open = (rowIndex: number) => Boolean(anchorEls[rowIndex]);
  const id = (rowIndex: number) => (open(rowIndex) ? `simple-popover-${rowIndex}` : undefined);

  const handleChangePagination = async (_: ChangeEvent<unknown>, value: number) => {
    const queryParams = { page: value };
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, ...queryParams },
      },
      undefined,
      { shallow: true }
    );
    await new Promise<void>((resolve) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      resolve();
    });
  };

  const handleConfirmation = async (confirm: boolean, data: RowData | null = null) => {
    if (editState) editState(false);
    if (confirm && selectedRow && dialogState.button) {
      const { onClick } = dialogState.button;
      if (onClick) {
        onClick(data, selectedRow);
      }
    } else if (confirm && dialogState.type === 'add' && data) {
      if (handleAdd) {
        await axiosMethod.post(handleAdd?.urlApi, data);
        const { pathname, query } = router;
        router.replace({ pathname, query }, undefined, { shallow: true });
      }
      if (handleForm) {
        handleForm(data);
      }
    }

    setDialogState({ open: false, type: null });
  };

  const toggleRow = (rowId: number) => {
    setCollapsedRows((prevState) => ({
      ...prevState,
      [rowId]: !prevState[rowId],
    }));
  };

  const handleButtonClick = (button: ButtonType, rowData: RowData) => {
    setSelectedRow(rowData);
    if (button.type === 'delete' || button.type === 'edit') {
      setDialogState({ open: true, type: button.type, button: button });
    } else {
      if (button.onClick) {
        button.onClick(button, rowData);
      }
    }
  };

  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

  const handleSelectRow = (rowId: string, rowIndex: number) => {
    const rowToToggle = rows[rowIndex];

    // تغییر وضعیت selectedRowIds
    setSelectedRowIds((prevSelectedIds) =>
      prevSelectedIds.includes(rowId)
        ? prevSelectedIds.filter((id) => id !== rowId)
        : [...prevSelectedIds, rowId]
    );

    // تغییر وضعیت selectedRows
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(rowIndex)
        ? prevSelectedRows.filter((index) => index !== rowIndex)
        : [...prevSelectedRows, rowIndex]
    );

    // تغییر وضعیت selectedRowValues اگر itemSelectRowParam وجود داشته باشد
    if (itemSelectRowParam && rowToToggle) {
      const value = rowToToggle[itemSelectRowParam];
      setSelectedRowValues((prevSelectedValues) =>
        prevSelectedValues.includes(value)
          ? prevSelectedValues.filter((v) => v !== value)
          : [...prevSelectedValues, value]
      );
    }
  };

  const handleActionClick = (actionType: string) => {
    if (onAction) {
      const selectedData = selectedRows.map((index) => rows[index]);
      onAction(actionType, selectedData);
    }
  };

  // const handleDeleteItem = (value: any) => {
  //   // حذف مقدار از selectedRowValues
  //   setSelectedRowValues((prevSelectedValues) => {
  //     const updatedValues = prevSelectedValues.filter((v) => v !== value);
  //     return updatedValues;
  //   });

  //   if (itemSelectRowParam) {
  //     // پیدا کردن ایندکس ردیف برای حذف تیک
  //     const indexToUncheck = rows.findIndex((row) => row[itemSelectRowParam] === value);

  //     if (indexToUncheck > -1) {
  //       // حذف ایندکس از selectedRows
  //       setSelectedRows((prevSelected) => {
  //         const updatedRows = prevSelected.filter((index) => index !== indexToUncheck);
  //         return updatedRows;
  //       });

  //       // حذف شناسه ردیف از selectedRowIds
  //       setSelectedRowIds((prevSelectedIds) => {
  //         const rowIdToRemove = rows[indexToUncheck][itemSelectRowParam as keyof (typeof rows)[0]];
  //         const updatedIds = prevSelectedIds.filter((id) => id !== rowIdToRemove);
  //         return updatedIds;
  //       });
  //     }
  //   }
  // };
  const handleSwitchChange = (fieldValue: boolean, rowId: number) => {
    if (handleSwitch) {
      handleSwitch(fieldValue, rowId);
    }
  };
  return (
    <>
      {(handleForm || handleAdd) && showBtnCreate ? (
        <Box sx={{ textAlign: 'right' }}>
          <Button
            variant="contained"
            onClick={() => setDialogState({ open: true, type: 'add' })}
            sx={{ width: '10%' }}
          >
            افزودن
          </Button>
        </Box>
      ) : null}
      {selectedRowValues.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Card
            sx={{
              backgroundColor: theme.palette.grey[300],
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>
                لیست انتخابی
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                {selectedRowValues.map((value, index) => (
                  <Chip
                    key={index}
                    label={value}
                    variant="outlined"
                    color="primary"
                    sx={{ fontSize: '14px' }}
                    // onDelete={() => handleDeleteItem(value)}
                    // deleteIcon={<IoMdClose />}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>

          {selectedRowsButtons.length > 0 && (
            <Box sx={{ mt: 2 }}>
              {selectedRowsButtons.map((button, index) => (
                <Button
                  key={index}
                  variant="contained"
                  color="primary"
                  onClick={() => handleActionClick(button.actionType)}
                  sx={{ mr: 1 }}
                >
                  {button.label}
                </Button>
              ))}
            </Box>
          )}
        </Box>
      )}

      <CardBox sx={{ mt: linkOverview ? 0 : 2 }}>
        <TableContainer sx={{ pb: pageTotal <= 10 ? '14px' : 2 }}>
          {linkOverview ? (
            <Box sx={{ direction: 'rtl' }}>
              <CustomTooltip title="نمایش همه">
                <IconButton onClick={() => router.push(linkOverview)}>
                  <TbExternalLink />
                </IconButton>
              </CustomTooltip>
            </Box>
          ) : null}

          <Table>
            <TableHead sx={{ '&  th': { fontWeight: 'bold', fontSize: 16 } }}>
              <TableRow>
                {selectableRows && (
                  <TableCell align="center" sx={{ width: 50 }}>
                    انتخاب
                  </TableCell>
                )}
                <TableCell align="center" sx={{ width: 10 }}>
                  ردیف
                </TableCell>
                {headerColumns?.map((column) => (
                  <TableCell
                    key={column.field}
                    align="center"
                    sx={{ fontWeight: 'bold', fontSize: 16 }}
                  >
                    {column.headerName}
                  </TableCell>
                ))}
                {buttons && (
                  <TableCell align="center" sx={{ width: 150 }}>
                    عملیات
                  </TableCell>
                )}
                {!notExtra && <TableCell align="right">جزئیات</TableCell>}
              </TableRow>
            </TableHead>

            <TableBody
              sx={{
                '& td': {
                  borderBottom: loading ? 'none' : '1px solid rgba(81, 81, 81,0.51)',
                },
              }}
            >
              {loading ? (
                <TableRowSkeleton />
              ) : (
                <>
                  {rows?.map((row, rowIndex) => (
                    <React.Fragment key={row.id}>
                      <TableRow>
                        {selectableRows && (
                          <TableCell align="center">
                            <Checkbox
                              checked={selectedRowIds.includes(row[itemSelectRowParam])}
                              onChange={() => handleSelectRow(row[itemSelectRowParam], rowIndex)}
                            />
                          </TableCell>
                        )}
                        <TableCell align="center">{rowIndex + 1}</TableCell>
                        {headerColumns?.map((column) => {
                          const fieldValue = column.field ? row[column.field] : undefined;
                          let content: React.ReactNode;
                          const renderTimeContent = (value: number) =>
                            value ? ConvertDates(value, true) : '-';
                          const renderScoreContent = (value: number) =>
                            value !== null && value !== undefined ? (
                              <Typography
                                sx={{
                                  color:
                                    value >= 8
                                      ? theme.palette.error.main
                                      : value >= 6
                                      ? theme.palette.primary.main
                                      : theme.palette.warning.main,
                                }}
                              >
                                {value}
                              </Typography>
                            ) : (
                              '-'
                            );
                          const renderSwitchHandlerContent = (fieldValue: boolean) => {
                            return (
                              <Switch
                                checked={fieldValue}
                                onChange={() => handleSwitchChange(fieldValue, row.id)}
                                inputProps={{ 'aria-label': 'controlled' }}
                              />
                            );
                          };
                          const renderStatusContent = (value: any) => {
                            const getColor = (value: string) => {
                              const stringValue = String(value); // تبدیل مقدار به رشته
                              if (stringValue === 'فعال' || stringValue === 'Clean') {
                                return theme.palette.success.main;
                              }
                              if (stringValue === 'غیرفعال' || stringValue.includes('Malware')) {
                                return theme.palette.error.main;
                              }
                              return theme.palette.text.primary; // مقدار پیش‌فرض در صورت نداشتن شرایط
                            };

                            return value ? (
                              <Typography
                                sx={{
                                  fontSize: '14px',
                                  color: getColor(value),
                                }}
                              >
                                {value}
                              </Typography>
                            ) : (
                              '-'
                            );
                          };

                          const renderIconContent = (value: boolean) =>
                            value !== null && value !== undefined ? (
                              <Typography>
                                {value ? (
                                  <TiTick color={theme.palette.success.main} size={24} />
                                ) : (
                                  <IoMdClose color={theme.palette.error.main} size={24} />
                                )}
                              </Typography>
                            ) : (
                              '-'
                            );

                          const renderDefaultContent = (value: any) =>
                            value ? (
                              value.length > 30 ? (
                                <CustomTooltip title={value}>
                                  <Typography
                                    sx={{
                                      width: '250px',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      fontSize: '16px',
                                    }}
                                  >
                                    {value}
                                  </Typography>
                                </CustomTooltip>
                              ) : (
                                value
                              )
                            ) : (
                              '-'
                            );

                          switch (true) {
                            case column.field?.includes('time'):
                              content = renderTimeContent(fieldValue);
                              break;
                            case column.field?.includes('score'):
                              content = renderScoreContent(fieldValue);
                              break;
                            case column.field?.includes('enabled'):
                              content = renderSwitchHandlerContent(fieldValue);
                              break;
                            case ['status', 'infected'].some((key) => column.field?.includes(key)):
                              content = renderStatusContent(fieldValue);
                              break;

                            case column.field?.includes('_is_'):
                              content = renderIconContent(fieldValue);
                              break;
                            default:
                              content = renderDefaultContent(fieldValue);
                              break;
                          }

                          return (
                            <TableCell
                              key={column.field}
                              align="center"
                              sx={{
                                width: '250px',
                                fontSize: 16,
                              }}
                            >
                              <CopyValue
                                textCopy={
                                  React.isValidElement(content) &&
                                  content.props &&
                                  'title' in content.props
                                    ? content.props.title
                                    : content
                                }
                              >
                                {content}
                              </CopyValue>
                            </TableCell>
                          );
                        })}

                        {buttons && (
                          <TableCell align="center">
                            {buttons?.map((button, index) => {
                              const showButton = (_: string, condition: boolean) =>
                                condition ? (
                                  <CustomIconButton
                                    key={index}
                                    icon={button.icon && button.icon.type}
                                    label={button.label}
                                    type={button.type}
                                    onClick={() => handleButtonClick(button, row)}
                                  />
                                ) : null;

                              switch (button.type) {
                                case 'delete':
                                  return showButton('delete', showBtnDelete ?? false);
                                case 'edit':
                                  return showButton('edit', showBtnUpdate ?? false);
                                default:
                                  return null;
                              }
                            })}
                            {extraButtons && extraButtons.length > 0 && (
                              <IconButton onClick={(event) => handleMoreClick(event, rowIndex)}>
                                <IoIosMore />
                              </IconButton>
                            )}
                            <Popover
                              id={id(rowIndex)}
                              open={open(rowIndex)}
                              anchorEl={anchorEls[rowIndex]}
                              onClose={() => handleClose(rowIndex)}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                              }}
                            >
                              {extraButtons?.map((button, index) => (
                                <MenuItem
                                  key={index}
                                  onClick={() => {
                                    handleButtonClick(button, row);
                                    handleClose(rowIndex);
                                  }}
                                  sx={{ fontSize: '16px', direction: 'ltr' }}
                                >
                                  {button.label}
                                </MenuItem>
                              ))}
                            </Popover>
                          </TableCell>
                        )}
                        {!notExtra && (
                          <TableCell align="right">
                            <IconButton onClick={() => toggleRow(rowIndex)}>
                              {collapsedRows[rowIndex] ? (
                                <IoIosArrowUp color={theme.palette.primary.main} />
                              ) : (
                                <IoIosArrowDown color={theme.palette.primary.main} />
                              )}
                            </IconButton>
                          </TableCell>
                        )}
                      </TableRow>
                      {collapsedRows[rowIndex] && (
                        <TableRow>
                          <TableCell colSpan={columns.length + 3}>
                            <Collapse in={collapsedRows[rowIndex]} timeout="auto" unmountOnExit>
                              <pre
                                style={{
                                  textAlign: 'left',
                                  direction: 'ltr',
                                  justifySelf: 'flex-start',
                                  fontFamily: 'vazir',
                                  padding: '25px',
                                  fontSize: 16,
                                }}
                              >
                                {JSON.stringify(row.extra_information, null, 2)}
                              </pre>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {pageTotal <= 10 ? null : (
          <Stack spacing={2} sx={{ mt: 2, '& ul': { justifyContent: 'center' } }}>
            <Pagination
              count={Math.ceil(pageTotal / 10)}
              page={router.query.page ? parseInt(router.query.page as string) : 1}
              shape="rounded"
              color="primary"
              onChange={handleChangePagination}
            />
          </Stack>
        )}

        {dialogState.open && (
          <ConfirmationDialog
            open={dialogState.open}
            title={
              dialogState.type === 'delete'
                ? 'آیا مطمئن هستید که میخواهید این مورد را حذف کنید؟'
                : dialogState.type === 'edit'
                ? 'آیا می‌خواهید این مورد را ویرایش کنید؟'
                : 'افزودن آیتم جدید'
            }
            content={
              dialogState.type === 'delete' ? (
                'حذف این مورد قابل بازگشت نیست.'
              ) : (
                <CustomForm
                  data={dialogState.type === 'edit' ? selectedRow : {}}
                  fields={
                    dialogState.type === 'edit'
                      ? editForm || []
                      : handleAdd
                      ? handleAdd?.fields
                      : fields || []
                  }
                  validationSchema={dialogState.button?.validation}
                  onSubmit={(data) => handleConfirmation(true, data)}
                  txtButton={dialogState.type === 'edit' ? 'ویرایش' : 'افزودن'}
                />
              )
            }
            onConfirm={dialogState.type === 'delete' ? () => handleConfirmation(true) : undefined}
            onClose={() => handleConfirmation(false)}
            type={dialogState.type}
          />
        )}
      </CardBox>
    </>
  );
};

export default CustomDataGrid;
