export interface DatePickerProps {
  allowOnlyDatesList?: Date[];
  date?: Date;
  disabled?: boolean;
  futureDatesDisabled?: boolean;
  onSelectDate: (selectedDate: Date) => void;
  placeholder?: string;
  responsivePositioning?: boolean;
}
