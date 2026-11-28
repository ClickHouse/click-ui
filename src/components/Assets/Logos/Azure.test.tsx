import { Logo } from '@/components/Assets/Logos/system/Logo';
import { renderCUI } from '@/utils/test-utils';

describe('Azure logo', () => {
  it('gives each instance its own gradient ids', () => {
    const { getAllByRole } = renderCUI(
      <>
        <Logo name="azure" />
        <Logo name="azure" />
      </>
    );
    const [first, second] = getAllByRole('img');

    const idsOf = (svg: HTMLElement) =>
      Array.from(svg.querySelectorAll('linearGradient')).map(gradient => gradient.id);

    expect(idsOf(first)).toHaveLength(3);
    expect(idsOf(first).some(id => idsOf(second).includes(id))).toBe(false);
  });

  it('points every gradient fill at a gradient inside the same svg', () => {
    const { getByRole } = renderCUI(<Logo name="azure" />);
    const svg = getByRole('img');
    const ownIds = Array.from(svg.querySelectorAll('linearGradient')).map(
      gradient => gradient.id
    );

    const referenced = Array.from(svg.querySelectorAll('path'))
      .map(path => path.getAttribute('fill') ?? '')
      .filter(fill => fill.startsWith('url(#'))
      .map(fill => fill.slice('url(#'.length, -1));

    expect(referenced).toHaveLength(3);
    expect(referenced.every(id => ownIds.includes(id))).toBe(true);
  });
});
