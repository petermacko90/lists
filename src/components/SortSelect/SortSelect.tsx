import { Dispatch, SetStateAction, useContext } from 'react';
import { LocaleContext } from '../../context';

export type SortValue = 'dateAsc' | 'dateDesc' | 'titleAsc' | 'titleDesc';

type SelectOption = {
  value: SortValue;
  label: string;
};

export default function SortSelect({
  value,
  setValue,
}: {
  value: SortValue;
  setValue: Dispatch<SetStateAction<SortValue>>;
}) {
  const translation = useContext(LocaleContext).translations;

  const options: SelectOption[] = [
    { value: 'dateAsc', label: translation.SORT_BY_DATE_ASC },
    { value: 'dateDesc', label: translation.SORT_BY_DATE_DESC },
    { value: 'titleAsc', label: translation.SORT_BY_TITLE_ASC },
    { value: 'titleDesc', label: translation.SORT_BY_TITLE_DESC },
  ];

  return (
    <label>
      {translation.SORT_BY}
      <select
        name="sort-select"
        onChange={(event) => setValue(event.target.value as SortValue)}
        value={value}
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </label>
  );
}
