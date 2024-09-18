import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import SearchGroup from './SearchGroup';
import CardBox from '@/layout/CardBox';

export interface Field {
  label: string;
  value: string;
  selectOptions?: Field[];
  dataType?: 'text' | 'date' | 'number' | 'checkbox';
  headerName?: string;
  field?: string;
}

export interface Rule {
  type: 'primary' | 'rule' | 'group';
  field: string;
  operator: string;
  value: string | number | boolean;
  rules?: Rule[];
  subField?: string;
  dataType?: 'text' | 'date' | 'number' | 'checkbox'; // Add this line
}

interface SearchQueryBuilderProps {
  fields: Field[];
  advancedSearch?: boolean | undefined;
  firstRule?: number;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

function updateTitlesToLabels(fieldsWithoutId: Field[]): Field[] {
  return fieldsWithoutId;
}

const useFieldOptions = (fields: Field[], advancedSearch: boolean | undefined): Field[] => {
  const fieldDefault: Field[] = advancedSearch
    ? [
        { label: 'parent', value: 'parent', dataType: 'text' },
        { label: 'target', value: 'target', dataType: 'text' },
        { label: 'time', value: 'time', dataType: 'date' },
      ]
    : [];
  return [...fieldDefault, ...fields];
};

const convertValuesToAppropriateType = (rules: Rule[], fieldOptions: Field[]): Rule[] => {
  return rules.map((rule) => {
    if (rule.type === 'group' && rule.rules) {
      return {
        ...rule,
        rules: convertValuesToAppropriateType(rule.rules, fieldOptions),
      };
    }

    const fieldOption = fieldOptions.find((option) => option.value === rule.field);
    const subFieldOption = fieldOption?.selectOptions?.find(
      (option) => option.value === rule.subField
    );

    if (fieldOption || subFieldOption) {
      const option = subFieldOption || fieldOption;

      if (option?.dataType) {
        rule.dataType = option.dataType;
        if (
          option.dataType === 'number' &&
          rule.operator !== 'between' &&
          rule.operator !== 'notBetween'
        ) {
          rule.value = parseFloat(rule.value as string);
        } else if (
          option.dataType === 'date' &&
          rule.operator !== 'between' &&
          rule.operator !== 'notBetween'
        ) {
          rule.value = +rule.value;
        } else if (option.dataType === 'checkbox') {
          rule.value = rule.value === 'true' || rule.value === true; // Ensure boolean value
        }
      }
    }
    return rule;
  });
};

// Recursive function to remove subField key if its value is empty
const filterEmptySubFieldRules = (rules: Rule[]): Rule[] => {
  return rules.map((rule) => {
    if (rule.type === 'group' && rule.rules) {
      return {
        ...rule,
        rules: filterEmptySubFieldRules(rule.rules),
      };
    } else if (rule.subField === '') {
      const { subField, ...rest } = rule; // Remove subField key
      return rest;
    }
    return rule;
  });
};

const SearchQueryBuilder: React.FC<SearchQueryBuilderProps> = ({
  fields,
  advancedSearch,
  firstRule,
  setOpen,
}) => {
  const fieldsWithoutId = fields.filter((item) => item.value !== 'id');
  const isSearch = fieldsWithoutId.length === 1;
  const formatField = updateTitlesToLabels(fieldsWithoutId);
  const router = useRouter();
  const fieldOptions = useFieldOptions(formatField, advancedSearch);
  const ruleSchema = yup.object().shape({
    field: yup.string().required('این فیلد اجباری است!'),
    operator: yup.string().required('عملگر اجباری است!'),
    value: yup.lazy((_, context) => {
      const { operator, field, subField } = context.parent;
      const fieldOption = fieldOptions.find((option) => option.value === field);

      const subFieldOption = (fieldOption as Field)?.selectOptions?.find(
        (option: Field) => option.value === subField
      );

      if (
        (subFieldOption && subFieldOption.dataType === 'checkbox') ||
        (fieldOption && fieldOption.dataType === 'checkbox')
      ) {
        return yup.mixed().notRequired();
      }

      if (operator === 'between' || operator === 'notBetween') {
        return yup
          .string()
          .required('هر دو مقدار اجباری هستند!')
          .test('is-between', 'ورودی نامعتبر برای بازه', (value) => {
            const parts = value.split(',');
            return parts.length === 2 && parts.every((part) => !isNaN(parseFloat(part)));
          });
      } else {
        return yup.string().required('مقدار اجباری است!');
      }
    }),
    subField: yup.lazy((value, context) => {
      const { field } = context.parent;
      const fieldOption = fieldOptions.find((option) => option.value === field);
      if (fieldOption && (fieldOption as Field).selectOptions && value === '') {
        return yup.string().required('انتخاب فیلد فرعی اجباری است!');
      }

      return yup.mixed().notRequired();
    }),
  });

  const createGroupSchema = (): yup.ObjectSchema<any> => {
    return yup.object().shape({
      combinator: yup.string().required('Combinator is required'),
      rules: yup
        .array()
        .of(yup.lazy((value) => (value.type === 'group' ? createGroupSchema() : ruleSchema))),
    });
  };

  const createSchema = (advancedSearch: boolean | undefined) =>
    yup.object().shape({
      combinator: yup.string().required('Combinator is required'),
      ...(advancedSearch ? { key: yup.string().required('Key is required') } : {}),
      rules: yup
        .array()
        .of(yup.lazy((value) => (value.type === 'group' ? createGroupSchema() : ruleSchema))),
    });

  const fixedRules: Rule[] = fieldOptions
    .filter((option) => ['parent', 'target', 'time'].includes(option.value))
    .map((option) => ({
      type: 'primary',
      field: option.value,
      operator: 'equal',
      value: '',
    }));

  const firstRules: Rule[] = fieldOptions
    .slice(
      advancedSearch ? 3 : 0,
      firstRule ? firstRule + (advancedSearch ? 3 : 0) : advancedSearch ? 4 : 3
    )
    .map((option) => ({
      type: 'rule',
      field: option.value,
      operator: isSearch ? 'between' : 'equal',
      value: '',
    }));

  const defaultRules: Rule[] = [...fixedRules, ...firstRules];
  const defaultValues = {
    type: 'group',
    combinator: 'and',
    rules: defaultRules,
    ...(advancedSearch && { key: 'target' }),
  };

  const methods = useForm({
    resolver: yupResolver(createSchema(advancedSearch)),
    defaultValues,
    // mode: 'onBlur',
  });

  useEffect(() => {
    if (typeof router.query.filters === 'string') {
      try {
        const parsedFilters = JSON.parse(router.query.filters);
        methods.reset(parsedFilters);
      } catch (error) {
        console.error('Failed to parse query parameters:', error);
      }
    }
  }, [router.query.filters, methods]);

  const exportQuery = useCallback(
    (data: any) => {
      const filteredData = {
        ...data,
        rules: filterEmptySubFieldRules(data.rules),
      };
      const convertedData = {
        ...filteredData,
        rules: convertValuesToAppropriateType(filteredData.rules, fieldOptions),
      };
      const output = JSON.stringify(convertedData);
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, filters: output },
        },
        undefined,
        { shallow: true }
      );
      if (setOpen) {
        setOpen(false);
      }
    },
    [router, fieldOptions]
  );
  const resetForm = useCallback(() => {
    methods.reset(defaultValues);
    router.push(
      {
        pathname: router.pathname,
        query: {},
      },
      undefined,
      { shallow: true }
    );
  }, [methods, router, defaultValues]);

  return (
    <FormProvider {...methods}>
      <CardBox>
        <form
          onSubmit={methods.handleSubmit(exportQuery)}
          style={{
            // border: '1px solid #585f67',
            borderRadius: '8px',
            // margin: '30px 0',
            display: isSearch ? 'flex' : '',
            position: 'relative',
          }}
        >
          <SearchGroup
            name="rules"
            combinatorName="combinator"
            keyName="key"
            fieldOptions={fieldOptions}
            errors={methods.formState.errors}
            canAddGroup={true}
            isMainGroup={true}
            fixedRules={fixedRules}
            advancedSearch={advancedSearch}
            defaultRules={defaultRules}
            isSearch={isSearch}
          />
          <Box
            sx={{
              paddingLeft: 2,
              padding: '10px  0 16px 16px',
              ...(isSearch && {
                position: 'absolute',
                right: '0',
                top: '40px',
                paddingRight: '20px',
              }),
            }}
          >
            <Button
              type="submit"
              variant="contained"
              size={!isSearch ? 'medium' : 'small'}
              sx={{ marginRight: '10px' }}
              style={{ color: '#fff' }}
            >
              جستجو
            </Button>
            {!isSearch && (
              <Button
                size="small"
                onClick={resetForm}
                variant="contained"
                style={{ color: '#fff' }}
              >
                ریست
              </Button>
            )}
          </Box>
        </form>
      </CardBox>
    </FormProvider>
  );
};

export default SearchQueryBuilder;
