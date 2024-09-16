import React, { useCallback, useMemo } from 'react';
import { Field, Rule } from './SearchQueryBuilder';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import SearchRule from './SearchRule';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import CardBox from '@/layout/CardBox';

interface SearchGroupProps {
  name: string;
  combinatorName: string;
  keyName: string;
  fieldOptions: Field[];
  errors: Record<string, any>;
  canAddGroup: boolean;
  isMainGroup: boolean;
  fixedRules: Rule[];
  advancedSearch?: boolean;
  defaultRules: Rule[];
  isSearch: boolean;
  removeGroup?: () => void;
}
interface RuleWithId extends Rule {
  id: string; // اضافه کردن id به تایپ Rule
}
const SearchGroup: React.FC<SearchGroupProps> = ({
  name,
  combinatorName,
  keyName,
  fieldOptions,
  errors,
  canAddGroup,
  isMainGroup,
  fixedRules,
  advancedSearch,
  defaultRules,
  isSearch,
  removeGroup,
}) => {
  const { control, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name });

  const currentGroup = (watch(name) as Rule[]) || [];
  const currentCombinator = (watch(combinatorName) as string) || 'and';

  const extractedFixedFields = useMemo<string[]>(
    () => fixedRules.map((rule) => rule.field),
    [fixedRules]
  );

  const handleFieldChange = useCallback(
    (index: number, newValue: string) => {
      const newFields = currentGroup.map((rule, idx) => {
        if (idx === index) {
          return { ...rule, field: newValue, subField: '' };
        }
        return rule;
      });
      setValue(name, newFields); // Update react-hook-form state
    },
    [currentGroup, name, setValue]
  );

  const getAvailableFields = useCallback(
    (currentIndex: number): Field[] => {
      const usedFields = currentGroup
        .filter(
          (rule, index) =>
            (rule.type === 'rule' || rule.type === 'primary') && index !== currentIndex
        )
        .map((rule) => rule.field);

      return fieldOptions.filter((option) => {
        if (currentCombinator === 'or') {
          return !extractedFixedFields.includes(option.value) || !usedFields.includes(option.value);
        }

        if (!option.selectOptions) {
          return !usedFields.includes(option.value);
        }

        const usedCount = usedFields.filter((field) => field === option.value).length;
        return usedCount < (option.selectOptions?.length || 0);
      });
    },
    [currentCombinator, currentGroup, extractedFixedFields, fieldOptions]
  );

  const getAvailableSubFields = useCallback(
    (currentIndex: number, currentField: string): Field[] | undefined => {
      const usedSubFields = currentGroup
        .filter(
          (rule, index) =>
            (rule.type === 'rule' || rule.type === 'primary') && index !== currentIndex
        )
        .map((rule) => rule.subField);

      const field = fieldOptions.find((option) => option.value === currentField);

      return field?.selectOptions?.filter((option) =>
        currentCombinator === 'or' ? true : !usedSubFields.includes(option.value)
      );
    },
    [currentCombinator, currentGroup, fieldOptions]
  );

  const addRule = useCallback(() => {
    append({ type: 'rule', field: '', operator: 'equal', value: '' });
  }, [append]);

  const addGroup = useCallback(() => {
    append({
      type: 'group',
      combinator: 'and',
      ...(advancedSearch && { key: 'target' }),
      rules: defaultRules,
    });
  }, [append, advancedSearch, defaultRules]);

  const getTotalFieldsAndSubfieldsCount = useMemo<number>(() => {
    return fieldOptions.reduce((acc, field) => {
      if (field.selectOptions) {
        return acc + field.selectOptions.length;
      }
      return acc + 1;
    }, 0);
  }, [fieldOptions]);

  const canAddMoreRules = useMemo<boolean>(() => {
    if (currentCombinator === 'and') {
      const totalAvailableFields = getTotalFieldsAndSubfieldsCount;
      return (
        currentGroup.filter((rule) => rule.type === 'rule' || rule.type === 'primary').length <
        totalAvailableFields
      );
    }
    return true;
  }, [currentCombinator, currentGroup, getTotalFieldsAndSubfieldsCount]);

  //   const countRules = currentGroup.filter(
  //     (rule) => rule.type === 'rule' || rule.type === 'primary'
  //   ).length;
  const content = (
    <Box
      sx={{
        borderRadius: '8px',
        p: 2,
        pb: 0,
        backgroundColor: 'transparent',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
        <Box>
          {!isSearch && (
            <FormControl variant="outlined" sx={{ width: '130px', mr: '8px' }}>
              <InputLabel>ترکیب کننده</InputLabel>
              <Controller
                name={combinatorName}
                control={control}
                defaultValue="and"
                render={({ field }) => (
                  <Select {...field} label="Combinator">
                    <MenuItem value="and">AND</MenuItem>
                    <MenuItem value="or">OR</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          )}
          {advancedSearch && (
            <FormControl variant="outlined" sx={{ width: '130px' }}>
              <InputLabel>کلید</InputLabel>
              <Controller
                name={keyName}
                control={control}
                defaultValue="target"
                render={({ field }) => (
                  <Select {...field} label="Key">
                    <MenuItem value="parent">parent</MenuItem>
                    <MenuItem value="target">target</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          )}
        </Box>
        <Box>
          {currentCombinator === 'or' ? (
            <Button variant="contained" size="small" onClick={addRule} style={{ color: '#fff' }}>
              اضافه کردن قانون
            </Button>
          ) : canAddMoreRules ? (
            <Button variant="contained" size="small" onClick={addRule} style={{ color: '#fff' }}>
              اضافه کردن قانون
            </Button>
          ) : null}

          {canAddGroup && !isSearch && (
            <Button
              variant="contained"
              size="small"
              onClick={addGroup}
              style={{ marginRight: '10px', color: '#fff' }}
            >
              اضافه کردن گروه
            </Button>
          )}
          {!isMainGroup && removeGroup && (
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={removeGroup}
              style={{ marginRight: '10px', color: '#fff' }}
            >
              حذف گروه{' '}
            </Button>
          )}
        </Box>
      </Box>
      {fields?.map((field, index) =>
        (field as RuleWithId).type === 'rule' || (field as RuleWithId).type === 'primary' ? (
          <SearchRule
            key={field.id}
            name={`${name}[${index}]`}
            fieldOptions={getAvailableFields(index)}
            subFieldOptions={getAvailableSubFields(index, (field as RuleWithId).field)}
            errors={errors.rules ? errors.rules[index] : {}}
            remove={() => remove(index)}
            disableDelete={index < fixedRules.length}
            fixedRules={fixedRules}
            handleFieldChange={(newValue: string) => handleFieldChange(index, newValue)}
            isSearch={isSearch}
          />
        ) : (
          <SearchGroup
            key={field.id}
            name={`${name}[${index}].rules`}
            combinatorName={`${name}[${index}].combinator`}
            keyName={`${name}[${index}].key`}
            fieldOptions={fieldOptions}
            errors={errors[index] || {}}
            canAddGroup={true}
            removeGroup={() => remove(index)}
            fixedRules={fixedRules}
            defaultRules={defaultRules}
            advancedSearch={advancedSearch}
            isSearch={isSearch}
            isMainGroup={false}
          />
        )
      )}
    </Box>
  );
  return !isMainGroup ? <CardBox>{content}</CardBox> : content;
};

export default SearchGroup;
