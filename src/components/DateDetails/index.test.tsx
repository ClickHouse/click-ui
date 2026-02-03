import { DateDetails } from '@/components/DateDetails';
import { renderCUI } from '@/utils/test-utils';
import { fireEvent } from '@testing-library/react';

describe('DateDetails', () => {
  const actualTZ = process.env.TZ;

  beforeAll(() => {
    global.ResizeObserver = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));

    process.env.TZ = 'America/New_York';
  });

  afterAll(() => {
    process.env.TZ = actualTZ;
  });

  it('renders the DateDetails component with relevant timezone information', () => {
    const baseDate = new Date('2024-12-24T11:45:00');
    const systemTimeZone = 'America/Los_Angeles';
    vi.setSystemTime(baseDate);

    const fiveMinutesAgo = new Date('2024-12-24T11:40:00');

    const { getByText } = renderCUI(
      <DateDetails
        date={fiveMinutesAgo}
        systemTimeZone={systemTimeZone}
      />
    );

    const trigger = getByText('5 minutes ago');
    expect(trigger).toBeInTheDocument();

    fireEvent.click(trigger);

    expect(getByText(/Dec 24, 11:40 a\.m\..*(EST|GMT-5)/)).toBeInTheDocument();
    expect(getByText(/Dec 24, 8:40 a\.m\..*(PST|GMT-8)/)).toBeInTheDocument();
    expect(getByText('Dec 24, 4:40 p.m.')).toBeInTheDocument();
    expect(getByText(String(fiveMinutesAgo.getTime() / 1000))).toBeInTheDocument();
  });

  it('allows for not passing in a system timezone', () => {
    const baseDate = new Date('2024-12-24T11:45:00');
    vi.setSystemTime(baseDate);

    const fiveMinutesAgo = new Date('2024-12-24T11:40:00');

    const { getByText, queryByText } = renderCUI(<DateDetails date={fiveMinutesAgo} />);

    const trigger = getByText('5 minutes ago');
    fireEvent.click(trigger);

    expect(getByText(/Dec 24, 11:40 a\.m\..*(EST|GMT-5)/)).toBeInTheDocument();
    expect(getByText('Dec 24, 4:40 p.m.')).toBeInTheDocument();
    expect(queryByText('System')).not.toBeInTheDocument();
    expect(getByText(String(fiveMinutesAgo.getTime() / 1000))).toBeInTheDocument();
  });

  it("only shows the date if the previous date isn't in this year", () => {
    const baseDate = new Date('2025-02-07T11:45:00');
    const systemTimeZone = 'America/Los_Angeles';
    vi.setSystemTime(baseDate);

    const oneYearAgo = new Date('2024-02-07T11:45:00');

    const { getByText } = renderCUI(
      <DateDetails
        date={oneYearAgo}
        systemTimeZone={systemTimeZone}
      />
    );

    const trigger = getByText('1 year ago');
    fireEvent.click(trigger);

    expect(getByText('Feb 7, 2024, 4:45 p.m.')).toBeInTheDocument();
    expect(getByText(/Feb 7, 2024, 11:45 a\.m\..*(EST|GMT-5)/)).toBeInTheDocument();
    expect(getByText(/Feb 7, 2024, 8:45 a\.m\..*(PST|GMT-8)/)).toBeInTheDocument();
    expect(getByText(String(oneYearAgo.getTime() / 1000))).toBeInTheDocument();
  });

  it('handles Daylight Savings Time', () => {
    const baseDate = new Date('2024-07-04T11:45:00');
    const systemTimeZone = 'America/Los_Angeles';
    vi.setSystemTime(baseDate);

    const fiveMinutesAgo = new Date('2024-07-04T11:40:00');

    const { getByText } = renderCUI(
      <DateDetails
        date={fiveMinutesAgo}
        systemTimeZone={systemTimeZone}
      />
    );

    const trigger = getByText('5 minutes ago');
    fireEvent.click(trigger);

    expect(getByText(/Jul 4, 11:40 a\.m\..*(EDT|GMT-4)/)).toBeInTheDocument();
    expect(getByText(/Jul 4, 8:40 a\.m\..*(PDT|GMT-7)/)).toBeInTheDocument();
    expect(getByText('Jul 4, 3:40 p.m.')).toBeInTheDocument();
    expect(getByText(String(fiveMinutesAgo.getTime() / 1000))).toBeInTheDocument();
  });
});
