import { ReactNode } from 'react';
import { Group, Item, AutoCompleteOptionListItem } from '@/components/AutoComplete';

interface Props {
  options: Array<AutoCompleteOptionListItem>;
  id: string;
}
const AutoCompleteOptionList = ({ options, id }: Props): ReactNode =>
  options.map((props, index) => {
    if ('options' in props) {
      const { options: itemList = [], ...groupProps } = props;
      return (
        <Group
          key={`autocomplete-${id}-group-${index}`}
          {...groupProps}
        >
          {itemList.map(({ label, ...itemProps }, itemIndex: number) => (
            <Item
              key={`autocomplete-${id}-group-${index}-item-${itemIndex}`}
              {...itemProps}
            >
              {label}
            </Item>
          ))}
        </Group>
      );
    } else {
      return (
        <Item
          key={`autocomplete-${id}-item-${index}`}
          {...props}
        />
      );
    }
  });

export default AutoCompleteOptionList;
