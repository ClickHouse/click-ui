export interface DatePickerProps {
  allowOnlyDatesList?: Array<Date>;
  date?: Date;
  disabled?: boolean;
  futureDatesDisabled?: boolean;
  onSelectDate: (selectedDate: Date) => void;
  placeholder?: string;
  responsivePositioning?: boolean;
}
