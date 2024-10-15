import SearchQueryBuilder, { Field } from '@/components/advanceSearch/SearchQueryBuilder';
import UseApi from '@/hooks/UseApi';
import PageBox from '@/components/common/PageBox';

const Search = () => {
  const { data } = UseApi('/advanced_search/advanced_search_info/');

  //Type Assertion
  // const fields = data as Field[];

  //Type Guard
  const isFieldArray = (data: any): data is Field[] => {
    return Array.isArray(data) && data.every((item) => 'label' in item && 'value' in item);
  };
  const fields: Field[] = isFieldArray(data) ? data : [];

  return (
    <PageBox title={'جستجو'}>
      {fields?.length > 0 && <SearchQueryBuilder fields={fields} advancedSearch />}
    </PageBox>
  );
};

export default Search;
