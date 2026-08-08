import { Dispatch, SetStateAction } from 'react';

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
  const options: SelectOption[] = [
    { value: 'dateAsc', label: 'Earliest' },
    { value: 'dateDesc', label: 'Most Recent' },
    { value: 'titleAsc', label: 'Title A-Z' },
    { value: 'titleDesc', label: 'Title Z-A' },
  ];

  return (
    <label>
      Sort By:{' '}
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
