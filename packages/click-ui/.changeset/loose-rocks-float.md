---
'@clickhouse/click-ui': minor
---

Enable keyboard date picker selection

Added keyboard navigation support to the DatePicker component, allowing users to select dates without using a mouse. This improves accessibility and provides a faster workflow for power users.

**Keyboard Navigation**

- Arrow keys (Up/Down/Left/Right) to navigate between days
- Arrow keys (Left/Right) to navigate between header controls (chevron buttons and title)
- Enter or Space to select a date
- Tab to navigate to previous/next month chevrons
- Current day, month, or year temporarily reverts to default styling when keyboard focused to make the yellow focus ring clearly visible

**How to use?**

To select a date using only your keyboard:

1. Tab to the date picker input and press Enter to open the calendar
2. Use Arrow keys to navigate to your desired day:
   - Left/Right arrows move between days
   - Up/Down arrows move between weeks
3. Press Enter or Space to select the highlighted date
4. The calendar will close automatically upon selection

To navigate months and years:

1. Tab to the month/year header and press Enter to open the year/month selector
2. Use Arrow keys to navigate the year grid
3. Press Enter to select a year
4. Use Arrow keys to navigate the month grid
5. Press Enter to select a month
6. Navigate days and press Enter to select the final date

To navigate header controls:

1. When focused on a chevron button or the title, use Left/Right arrow keys to cycle between them
2. In days view: navigate between prev chevron → title → next chevron
3. In years view: navigate between the two visible chevron buttons

**Implementation Changes**

- Replaced Dropdown with Popover component for better focus management
- Added focus management with refs to track keyboard position
- Implemented keyboard event handlers for Arrow keys, Enter, and Space
- Added horizontal navigation for header controls (chevron buttons and title)
- Active elements (today's date, selected date) temporarily revert to default styling when keyboard focused to ensure the yellow focus ring is always visible
