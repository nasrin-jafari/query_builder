import axiosMethod from '@/api';
import { ConfirmationDialog, CustomForm, CustomIconButton } from '@/components';
import CustomTooltip from '@/components/common/CustomToolTip';
import { UseAceessBtn } from '@/hooks/UseAceessBtn';
import CardBox from '@/layout/CardBox';
import { ConvertDates } from '@/utils/ConvertDates';
import { exportFiles } from '@/utils/DownloadFiles';
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
  PaginationItem,
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
import React, { ChangeEvent, useEffect, useState } from 'react';
import { BiSortDown, BiSortUp } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
  IoIosMore,
  IoMdClose,
} from 'react-icons/io';
import { MdOutlineAdd } from 'react-icons/md';
import { PiDownloadSimpleFill } from 'react-icons/pi';
import { RiComputerLine } from 'react-icons/ri';
import { TbExternalLink } from 'react-icons/tb';
import { TiTick } from 'react-icons/ti';
import * as yup from 'yup';
import CopyValue from '../common/CopyValue';
import { Field } from '../form/CustomForm';
import TableRowSkeleton from './TableSkeleton';

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
  selectableRows?: boolean;
  itemSelectRowParam?: string;
  selectedRowsButtons?: {
    label: string;
    actionType: string;
  }[];
  onAction?: (actionType: string, selectedRows: any[]) => void;
  handleSwitch?: (fieldValue: boolean, rowId: number) => void;
  downloadFile?: { path: string; fileName?: string; type?: 'file' | 'excel' };
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

const isFalsyExceptZero = (value: any) => value === '' || (value == null && value !== 0);

const CustomDataGrid: React.FC<ReusableDataGridProps> = ({
  columns = [],
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
}) => {
  const [collapsedRows, setCollapsedRows] = useState<Record<number, boolean>>({});
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
  console.log('rows', rows);
  console.log('columns', columns);
  const extraButtons = buttons?.filter((button) => button.type === 'extra');
  const isCodeModal =
    editForm &&
    editForm.length > 0 &&
    editForm.find((item) => item.type === 'code') &&
    dialogState.type === 'edit';

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

    setSelectedRowIds((prevSelectedIds) =>
      prevSelectedIds.includes(rowId)
        ? prevSelectedIds.filter((id) => id !== rowId)
        : [...prevSelectedIds, rowId]
    );

    if (itemSelectRowParam && rowToToggle) {
      const value = rowToToggle[itemSelectRowParam];
      setSelectedRowValues((prevSelectedValues) =>
        prevSelectedValues.includes(value)
          ? prevSelectedValues.filter((v) => v !== value)
          : [...prevSelectedValues, value]
      );
    }
  };
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false); // وضعیت چک‌باکس انتخاب همه

  const handleSelectAllRows = (isChecked: boolean) => {
    if (isChecked) {
      const rowIdsToAdd = rows
        .map((row) => row[itemSelectRowParam])
        .filter((id) => !selectedRowIds.includes(id)); // فقط idهای جدید

      const rowValuesToAdd = rows
        .map((row) => row[itemSelectRowParam])
        .filter((value) => !selectedRowValues.includes(value)); // فقط valueهای جدید

      // به روزرسانی selectedRowIds و selectedRowValues
      setSelectedRowIds((prevSelectedIds) => [...prevSelectedIds, ...rowIdsToAdd]);
      setSelectedRowValues((prevSelectedValues) => [...prevSelectedValues, ...rowValuesToAdd]);
    } else {
      const rowIdsToRemove = rows.map((row) => row[itemSelectRowParam]);
      const rowValuesToRemove = rows.map((row) => row[itemSelectRowParam]);

      // عدم انتخاب همه سطرها
      setSelectedRowIds((prevSelectedIds) =>
        prevSelectedIds.filter((id) => !rowIdsToRemove.includes(id))
      );

      setSelectedRowValues((prevSelectedValues) =>
        prevSelectedValues.filter((value) => !rowValuesToRemove.includes(value))
      );
    }

    setIsSelectAllChecked(isChecked);
  };

  // ریست کردن چک‌باکس انتخاب همه هنگام تغییر مسیر
  useEffect(() => {
    setIsSelectAllChecked(false);
  }, [router.query.page]); // زمانی که page در مسیر تغییر کند، چک‌باکس ریست می‌شود
  const handleActionClick = (actionType: string) => {
    if (onAction) {
      onAction(actionType, selectedRowValues);
    }
  };

  const handleSwitchChange = (fieldValue: boolean, rowId: number) => {
    if (handleSwitch) {
      handleSwitch(fieldValue, rowId);
    }
  };

  const handleSort = (sortKey: string) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;

    let updatedQuery = { ...currentQuery };

    if (updatedQuery.sort == sortKey) {
      delete updatedQuery.sort;
    } else {
      updatedQuery.sort = sortKey;
    }

    router.push(
      {
        pathname: currentPath,
        query: updatedQuery,
      },
      undefined,
      { shallow: true }
    );
  };

  const renderDefaultContent = (value: any) =>
    isFalsyExceptZero(value) ? (
      '-'
    ) : value.length > 30 ? (
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
    );

  return (
    <>
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
      {(downloadFile || handleForm || handleAdd) && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            justifyContent: 'flex-end',
            mb: '16px',
          }}
        >
          {downloadFile && (
            <Button
              variant="contained"
              onClick={() => {
                if (downloadFile) {
                  exportFiles(downloadFile);
                }
              }}
              endIcon={<PiDownloadSimpleFill style={{ fontSize: '20px', marginRight: '10px' }} />}
            >
              دانلود خروجی اکسل
            </Button>
          )}
          {(handleForm || handleAdd) && showBtnCreate ? (
            <Box sx={{ textAlign: 'right' }}>
              <Button
                variant="contained"
                onClick={() => setDialogState({ open: true, type: 'add' })}
                endIcon={<MdOutlineAdd style={{ fontSize: '20px' }} />}
              >
                افزودن{' '}
              </Button>
            </Box>
          ) : null}
        </Box>
      )}
      <CardBox sx={{ mt: linkOverview ? 0 : 2 }}>
        {linkOverview ? (
          <Box sx={{ direction: 'rtl' }}>
            <CustomTooltip title="نمایش همه">
              <IconButton onClick={() => router.push(linkOverview)}>
                <TbExternalLink />
              </IconButton>
            </CustomTooltip>
          </Box>
        ) : null}
        <TableContainer sx={{ pb: pageTotal <= 10 ? '14px' : 2 }}>
          <Table>
            <TableHead
              sx={{
                '&  th': { fontWeight: 'bold', fontSize: 16 },
                background: theme.palette.grey[300],
              }}
            >
              <TableRow>
                {selectableRows && (
                  <TableCell align="center" sx={{ width: 50 }}>
                    <Checkbox
                      checked={isSelectAllChecked}
                      indeterminate={
                        selectedRowIds.length > 0 && selectedRowIds.length < rows.length
                      }
                      onChange={(e) => handleSelectAllRows(e.target.checked)}
                    />
                  </TableCell>
                )}
                <TableCell align="center" sx={{ width: 10 }}>
                  ردیف
                </TableCell>
                {headerColumns &&
                  headerColumns?.map((column) => (
                    <TableCell
                      key={column.field}
                      align="center"
                      sx={{ fontWeight: 'bold', fontSize: 16 }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography> {column.headerName}</Typography>
                        {column.dataType === 'date' || column.dataType === 'number' ? (
                          router.query.sort !== column.field ? (
                            <BiSortUp
                              size="20px"
                              style={{
                                marginRight: '10px',
                                cursor: 'pointer',
                              }}
                              onClick={() => handleSort(column.field ? column.field : '')}
                            />
                          ) : (
                            <BiSortDown
                              onClick={() => handleSort(column.field ? column.field : '')}
                              size="20px"
                              style={{ color: '#e57b2d', marginRight: '10px', cursor: 'pointer' }}
                            />
                          )
                        ) : (
                          ''
                        )}
                      </Box>
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
                  {rows &&
                    rows?.map((row, rowIndex) => (
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
                              isFalsyExceptZero(value) ? '-' : ConvertDates(value, true);

                            const renderScoreContent = (value: number) =>
                              isFalsyExceptZero(value) ? (
                                '-'
                              ) : (
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
                                const stringValue = String(value);
                                if (
                                  stringValue === 'فعال' ||
                                  stringValue === 'Clean' ||
                                  stringValue === 'سالم'
                                ) {
                                  return theme.palette.success.main;
                                }
                                if (
                                  stringValue === 'غیرفعال' ||
                                  stringValue.includes('Malware') ||
                                  stringValue === 'حاوی بدافزار'
                                ) {
                                  return theme.palette.error.main;
                                }
                                if (stringValue === 'شناخته نشده') {
                                  return theme.palette.primary.main;
                                }
                                return theme.palette.text.primary;
                              };

                              return isFalsyExceptZero(value) ? (
                                '-'
                              ) : (
                                <Typography
                                  sx={{
                                    fontSize: '14px',
                                    color: getColor(value),
                                  }}
                                >
                                  {value}
                                </Typography>
                              );
                            };

                            const renderIconContent = (value: boolean | null | undefined) =>
                              isFalsyExceptZero(value) ? (
                                '-'
                              ) : (
                                <Typography>
                                  {value ? (
                                    <TiTick color={theme.palette.success.main} size={24} />
                                  ) : (
                                    <IoMdClose color={theme.palette.error.main} size={24} />
                                  )}
                                </Typography>
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
                              case ['status', 'infected'].some((key) =>
                                column.field?.includes(key)
                              ):
                                content = renderStatusContent(fieldValue);
                                break;
                              case column.field?.includes('_is_'):
                                content = renderIconContent(fieldValue);
                                break;
                              default:
                                content = renderDefaultContent(fieldValue);
                                break;
                            }

                            const displayContent =
                              column.field?.includes('enabled') ||
                              ['status', 'infected'].some((key) => column.field?.includes(key)) ? (
                                content
                              ) : (
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
                              );

                            return (
                              <TableCell
                                key={column.field}
                                align="center"
                                sx={{
                                  width: '250px',
                                  fontSize: 16,
                                }}
                              >
                                {displayContent}
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
                                      onClick={() => {
                                        handleButtonClick(button, row);
                                      }}
                                    />
                                  ) : null;

                                switch (button.type) {
                                  case 'delete':
                                    return showButton('delete', showBtnDelete ?? false);
                                  case 'edit':
                                    return showButton('edit', showBtnUpdate ?? false);
                                  case 'allowAccess':
                                    return showButton('allowAccess', true);
                                  case 'content_type':
                                    const componentMap: {
                                      [key in RowData['content_type']]: JSX.Element;
                                    } = {
                                      OU: (
                                        <CustomIconButton
                                          key={index}
                                          icon={button.icon && button.icon.type}
                                          label={button.label}
                                          type={button.type}
                                          onClick={() => handleButtonClick(button, row)}
                                        />
                                      ),
                                      Computer: (
                                        <RiComputerLine
                                          key={index}
                                          style={{
                                            fontSize: '19px',
                                          }}
                                        />
                                      ),
                                      User: (
                                        <FaUser
                                          key={index}
                                          style={{
                                            fontSize: '16px',
                                          }}
                                        />
                                      ),
                                    };

                                    return componentMap[row.component_type] || null;

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
              renderItem={(item) => (
                <PaginationItem
                  {...item}
                  components={{ previous: IoIosArrowForward, next: IoIosArrowBack }}
                />
              )}
            />
          </Stack>
        )}

        {dialogState.open && (
          <ConfirmationDialog
            open={dialogState.open}
            maxWidth={isCodeModal ? 'lg' : undefined}
            title={
              dialogState.type === 'delete'
                ? 'آیا مطمئن هستید که میخواهید این مورد را حذف کنید؟'
                : dialogState.type === 'edit'
                ? 'آیا می‌خواهید این مورد را ویرایش کنید؟'
                : 'افزودن آیتم جدید'
            }
            content={
              dialogState.type === 'delete' ? (
                <Typography textAlign="center">حذف این مورد قابل بازگشت نیست</Typography>
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
