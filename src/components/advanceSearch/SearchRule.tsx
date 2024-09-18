import React, { useMemo } from 'react';
import { Field, Rule } from './SearchQueryBuilder';
import { Controller, useFormContext } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';
import { Box, Card, IconButton } from '@mui/material';
import FieldSelector from './FieldSelector';
import { SubFieldSelector } from './SubFieldSelector';
import OperatorSelector from './OperatorSelector';
import ValueInput from './ValueInput';
import { MdDeleteForever } from 'react-icons/md';

interface SearchRuleProps {
  name: string;
  fieldOptions: Field[];
  subFieldOptions?: Field[];
  errors: Record<string, any>;
  remove: () => void;
  disableDelete: boolean;
  fixedRules: Rule[];
  handleFieldChange: (newValue: string) => void;
  isSearch: boolean;
}

const numberOperators = [
  'equal',
  'not_equal',
  'greater_than',
  'greater_than_equal',
  'less_than',
  'less_than_equal',
  'between',
  'notBetween',
];

const timeOperators = ['between'];

const textOperators = [
  'equal',
  'not_equal',
  'beginsWith',
  'endsWith',
  'contains',
  'doesNotBeginWith',
  'doesNotEndWith',
  'doesNotContain',
];

const checkboxOperators = ['equal', 'not_equal'];

const SearchRule: React.FC<SearchRuleProps> = ({
  name,
  fieldOptions,
  subFieldOptions = [],
  // errors,
  remove,
  disableDelete,
  // fixedRules,
  handleFieldChange,
  isSearch,
}) => {
  const theme = useTheme();
  const { control, watch, setValue } = useFormContext();

  const currentField = watch(`${name}.field`) as string;
  const currentSubField = watch(`${name}.subField`) as string;
  const currentOperator = watch(`${name}.operator`) as string;

  const currentFieldData = fieldOptions.find((option) => option.value === currentField) as
    | Field
    | undefined;
  const currentSubFieldData = subFieldOptions.find((option) => option.value === currentSubField) as
    | Field
    | undefined;

  const getFieldLabel = () => {
    if (currentSubFieldData && currentSubFieldData.label) {
      return currentSubFieldData.label;
    }
    return currentFieldData?.label || 'وضعیت';
  };

  const operatorOptions = useMemo(() => {
    if (isSearch) {
      return timeOperators;
    }
    if (currentSubFieldData?.dataType === 'number' || currentSubFieldData?.dataType === 'date') {
      return numberOperators;
    } else if (currentSubFieldData?.dataType === 'checkbox') {
      return checkboxOperators;
    } else if (currentFieldData?.dataType === 'number' || currentFieldData?.dataType === 'date') {
      return numberOperators;
    } else if (currentFieldData?.dataType === 'checkbox') {
      return checkboxOperators;
    } else {
      return textOperators;
    }
  }, [isSearch, currentFieldData, currentSubFieldData]);

  const onFieldChange = (selectedField: string) => {
    setValue(`${name}.operator`, 'equal');
    setValue(`${name}.value`, '');
    handleFieldChange(selectedField);
  };

  const onOperatorChange = (newOperator: string) => {
    if (
      newOperator === 'between' ||
      newOperator === 'notBetween' ||
      ['between', 'notBetween'].includes(currentOperator)
    ) {
      setValue(`${name}.value`, '');
    }
  };

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 2,
        backgroundColor: 'transparent',
        // background :  theme.palette.background.default,
        // border : '1px solid #585f67' ,
        p: 2,
        pb: 3,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {!isSearch && (
          <>
            <FieldSelector
              control={control}
              name={`${name}.field`}
              fieldOptions={fieldOptions}
              onFieldChange={onFieldChange}
              disableDelete={disableDelete}
            />
            {currentFieldData?.selectOptions && (
              <SubFieldSelector
                control={control}
                name={`${name}.subField`}
                subFieldOptions={subFieldOptions}
              />
            )}
            <OperatorSelector
              control={control}
              name={`${name}.operator`}
              operatorOptions={operatorOptions}
              onOperatorChange={onOperatorChange}
            />
          </>
        )}

        <Controller
          name={`${name}.value`}
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <ValueInput
              field={field}
              error={error}
              currentOperator={currentOperator}
              getFieldLabel={getFieldLabel}
              currentFieldData={currentFieldData}
              currentSubFieldData={currentSubFieldData}
            />
          )}
        />
      </Box>
      {!disableDelete && !isSearch && (
        <IconButton>
          <MdDeleteForever
            onClick={remove}
            style={{ fontSize: '24px', color: theme.palette.grey[800] }}
          />
        </IconButton>
      )}
    </Card>
  );
};

export default SearchRule;
