import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, InputLabel, styled, Tabs, Tab, Box } from '@mui/material';
import React, { ReactNode, useEffect, useState } from 'react';
import { Control, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  CustomTextField,
  CustomSwitch,
  CustomSelectField,
  CustomDatePicker,
  CustomCodeMirror,
  CustomTextarea,
} from './';
import { UseAceessBtn } from '@/hooks/UseAceessBtn';

export interface FormData {
  [key: string]: any;
}

interface SelectField {
  options?: { label: string; value: string | number }[];
  multiple?: boolean;
}

interface SwitchField {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface Field extends SelectField, SwitchField {
  label: string;
  name: string;
  type: string;
  col?: number;
  tab?: string; // New tab property
  onChange?: (value: string | number) => void;
}

interface FormProps {
  allowAccess?: boolean;
  fields?: Field[];
  onSubmit: SubmitHandler<FormData>;
  validationSchema?: yup.ObjectSchema<any> | yup.Lazy<any>;
  data?: FormData | null;
  txtButton?: string;
  widthButton?: string;
  children?: ReactNode;
}

const CustomForm: React.FC<FormProps> = ({
  allowAccess,
  fields = [],
  validationSchema,
  onSubmit,
  data = {},
  txtButton = 'افزودن',
  widthButton = '100%',
  children,
}) => {
  const methods = useForm({
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
  });

  const StyledInputLabel = styled(InputLabel)(() => ({
    textAlign: 'left',
    fontSize: '14px',
  }));
  const { showBtnCreate, showBtnUpdate } = UseAceessBtn();
  const keywordsCreate = ['افزودن', 'ایجاد', 'ثبت'];
  const keywordsUpdate = ['اعمال', 'ویرایش'];

  const shouldRenderForm =
    allowAccess ||
    (showBtnCreate && keywordsCreate.some((keyword) => txtButton.includes(keyword))) ||
    (showBtnUpdate && keywordsUpdate.some((keyword) => txtButton.includes(keyword)));

  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = fields
    .map((field) => field.tab)
    .filter((tab, index, self) => tab && self.indexOf(tab) === index);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const renderField = (field: Field, control: Control) => {
    switch (field.type) {
      case 'select':
        return <CustomSelectField field={field} control={control} onChange={field.onChange} />;
      case 'switch':
        return <CustomSwitch field={field} control={control} />;
      case 'code':
        return <CustomCodeMirror field={field} control={control} />;
      case 'date':
        return <CustomDatePicker field={field} control={control} />;
      case 'textarea':
        return <CustomTextarea field={field} control={control} />;
      default:
        return <CustomTextField field={field} />;
    }
  };

  useEffect(() => {
    const flattenedData = {
      ...data,
      ...data?.extra_information,
    };
    delete flattenedData.extra_information;
    if (data) {
      Object.entries(flattenedData).forEach(([name, value]) => {
        methods.setValue(name, value);
      });
    }
  }, [data, methods.setValue]);

  const handleFormSubmit: SubmitHandler<FormData> = (data) => {
    // Filter data to include only fields related to the active tab
    const activeTabFields = fields
      .filter((field) => field.tab === tabs[selectedTab])
      .map((field) => field.name);

    const filteredData = Object.keys(data)
      .filter((key) => activeTabFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {} as FormData);

    onSubmit(filteredData); // Call the provided onSubmit function with filtered data
    methods.reset();
    Object.entries(filteredData).forEach(([name, _]) => {
      methods.setValue(name, '');
    });
  };
  return (
    <>
      {shouldRenderForm ? (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleFormSubmit)} autoComplete="off">
            {tabs.length > 0 && (
              <Tabs value={selectedTab} onChange={handleTabChange}>
                {tabs.map((tab, index) => (
                  <Tab key={index} label={tab} />
                ))}
              </Tabs>
            )}
            {tabs.length > 0 ? (
              tabs.map((tab, tabIndex) => (
                <Box key={tabIndex} hidden={selectedTab !== tabIndex}>
                  <Grid container spacing={2}>
                    {fields
                      .filter((field) => field.tab === tab)
                      .map((field, index) => (
                        <Grid item xs={field.col || 12} key={index}>
                          <StyledInputLabel shrink sx={{ mt: 2, fontSize: 18 }}>
                            {field.label}
                          </StyledInputLabel>
                          {renderField(field, methods.control)}
                        </Grid>
                      ))}
                  </Grid>
                </Box>
              ))
            ) : (
              <>
                <Grid
                  container
                  spacing={2}
                  sx={{ alignItems: 'flex-end', justifyContent: 'space-between' }}
                >
                  {fields.map((field, index) => (
                    <Grid item xs={field.col || 12} key={index}>
                      <StyledInputLabel shrink sx={{ mt: 2, fontSize: 18 }}>
                        {field.label}
                      </StyledInputLabel>
                      {renderField(field, methods.control)}
                    </Grid>
                  ))}
                  <Box>{children}</Box>
                </Grid>
              </>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: '2rem', width: widthButton }}
            >
              {txtButton}
            </Button>
          </form>
        </FormProvider>
      ) : null}
    </>
  );
};

export default CustomForm;
