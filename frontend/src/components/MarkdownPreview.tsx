// frontend/src/components/MarkdownPreview.tsx
import { useState } from 'react';
import { 
  Paper, 
  Box, 
  ToggleButtonGroup, 
  ToggleButton, 
  useTheme,
  IconButton,
  styled
} from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useColorMode } from '../theme/ThemeProvider';

interface MarkdownPreviewProps {
  content: string;
}

type ViewMode = 'preview' | 'code';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f5f5f5',
  '& .MuiToggleButton-root': {
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    borderColor: theme.palette.mode === 'dark' ? '#555' : '#ddd',
    '&.Mui-selected': {
      backgroundColor: theme.palette.mode === 'dark' ? '#555' : '#e0e0e0',
      color: theme.palette.mode === 'dark' ? '#fff' : '#000',
      '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? '#666' : '#d5d5d5',
      },
    },
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' ? '#444' : '#e8e8e8',
    },
  },
}));

const MarkdownPreview = ({ content }: MarkdownPreviewProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>('preview');
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  const handleViewChange = (event: React.MouseEvent<HTMLElement>, newMode: ViewMode | null) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        mb: 2 
      }}>
        <StyledToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewChange}
          aria-label="view mode"
          size="small"
        >
          <ToggleButton value="preview" aria-label="preview">
            プレビュー
          </ToggleButton>
          <ToggleButton value="code" aria-label="code">
            Markdownコード
          </ToggleButton>
        </StyledToggleButtonGroup>

        <IconButton onClick={toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Box>

      <Paper 
        sx={{ 
          p: 2, 
          minHeight: '200px', 
          maxHeight: '600px', 
          overflow: 'auto',
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        {content ? (
          viewMode === 'preview' ? (
            <Box sx={{
              '& table': {
                borderCollapse: 'collapse',
                width: '100%',
                margin: '16px 0'
              },
              '& th, & td': {
                border: `1px solid ${theme.palette.divider}`,
                padding: '8px',
                textAlign: 'left'
              },
              '& th': {
                backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f5f5f5'
              },
              '& h1, & h2, & h3, & h4, & h5, & h6': {
                margin: '16px 0 8px 0',
                color: theme.palette.text.primary
              },
              '& p': {
                margin: '8px 0',
                color: theme.palette.text.primary
              },
              '& hr': {
                margin: '16px 0',
                border: 'none',
                borderTop: `1px solid ${theme.palette.divider}`
              },
              '& a': {
                color: theme.palette.primary.main
              },
              '& code': {
                backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f5f5f5',
                padding: '2px 4px',
                borderRadius: '4px',
                color: theme.palette.mode === 'dark' ? '#fff' : '#000',
              }
            }}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={theme.palette.mode === 'dark' ? oneDark : oneLight}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {content}
              </ReactMarkdown>
            </Box>
          ) : (
            <pre style={{ 
              margin: 0,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
              fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace',
              fontSize: '14px',
              lineHeight: 1.5,
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.paper,
            }}>
              {content}
            </pre>
          )
        ) : (
          <p style={{ color: theme.palette.text.secondary }}>
            変換されたMarkdownがここに表示されます
          </p>
        )}
      </Paper>
    </Box>
  );
};

export default MarkdownPreview;
