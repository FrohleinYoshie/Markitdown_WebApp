// frontend/src/components/ConversionResult.tsx
import { Paper, Typography } from '@mui/material';

interface ConversionResultProps {
  convertedText: string;
}

const ConversionResult = ({ convertedText }: ConversionResultProps) => {
  return (
    <Paper sx={{ p: 2, mt: 2, minHeight: '200px' }}>
      {convertedText ? (
        <Typography component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
          {convertedText}
        </Typography>
      ) : (
        <Typography color="text.secondary">
          変換されたテキストがここに表示されます
        </Typography>
      )}
    </Paper>
  );
};

export default ConversionResult;
