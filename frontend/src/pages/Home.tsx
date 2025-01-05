// frontend/src/pages/Home.tsx
import { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import FileUploader from '../components/FileUploader';
import MarkdownPreview from '../components/MarkdownPreview';

const Home = () => {
  const [convertedText, setConvertedText] = useState<string>('');

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          MarkItDown 変換ツール
        </Typography>
        <Typography variant="body1" gutterBottom>
          サポートされているファイル形式:
          <ul>
            <li>PDF (.pdf)</li>
            <li>PowerPoint (.pptx)</li>
            <li>Word (.docx)</li>
            <li>Excel (.xlsx)</li>
            <li>Images (.jpg, .png) - EXIF metadata and OCR</li>
            <li>Audio - EXIF metadata and speech transcription</li>
            <li>HTML (.html)</li>
            <li>Text-based formats (CSV, JSON, XML)</li>
          </ul>
        </Typography>
        <FileUploader setConvertedText={setConvertedText} />
        <MarkdownPreview content={convertedText} />
      </Box>
    </Container>
  );
};

export default Home;
