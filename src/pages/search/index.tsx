import SearchQueryBuilder, { Field } from '@/components/advanceSearch/SearchQueryBuilder';
import PageBox from '@/components/common/PageBox';
import  {fields as fieldsQuery} from "@/components/advanceSearch/fields"
const Search = () => {
  // const { data } = UseApi('/advanced_search/info/');

  //Type Assertion
  // const fields = data as Field[];

  //Type Guard
  const isFieldArray = (fieldsQuery: any): fieldsQuery is Field[] => {
    return Array.isArray(fieldsQuery) && fieldsQuery.every((item) => 'label' in item && 'value' in item);
  };
  const fields: Field[] = isFieldArray(fieldsQuery) ? fieldsQuery : [];

  return (
    <PageBox title={'جستجو'}>
      {fields?.length > 0 && <SearchQueryBuilder fields={fields} advancedSearch />}
    </PageBox>
  );
};

export default Search;
