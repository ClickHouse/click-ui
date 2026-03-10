import { forwardRef } from 'react';

import { TextField, type TextFieldProps } from '@/components/TextField';
import { Icon } from '@/components/Icon';

export interface SearchFieldProps extends Omit<
  TextFieldProps,
  'type' | 'startContent' | 'endContent'
> {
  isFilter?: boolean;
}

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  ({ isFilter = false, clear = true, ...props }, ref) => {
    return (
      <TextField
        startContent={
          <Icon
            name={isFilter ? 'filter' : 'search'}
            size="sm"
          />
        }
        clear={clear}
        ref={ref}
        {...props}
      />
    );
  }
);
