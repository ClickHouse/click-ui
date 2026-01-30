import { styled } from 'styled-components';
import { Container } from '@/components/Container/Container';

const TruncatorContainer = styled(Container)`
  white-space: nowrap;
  font: ${({ theme }) => theme.click.fileUpload.typography.description.default};
  color: ${({ theme }) => theme.click.fileUpload.color.title.default};
`;

const TruncatorStart = styled.span`
  flex-shrink: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TruncatorEnd = styled.span`
  flex-shrink: 0;
  white-space: nowrap;
`;

export const MiddleTruncator = ({
  text,
  trailingChars = 10,
}: {
  text: string;
  trailingChars?: number;
}) => {
  const startText = text.slice(0, -trailingChars);
  const endText = text.slice(-trailingChars);

  return (
    <TruncatorContainer
      title={text}
      aria-label={text}
      fillWidth={false}
      minWidth="0"
      overflow="hidden"
    >
      <TruncatorStart>{startText}</TruncatorStart>
      <TruncatorEnd>{endText}</TruncatorEnd>
    </TruncatorContainer>
  );
};
