![alt text](image.png)

## サービスの思い
このプロジェクトはMicroSoft社が公開したMarkitDownを使用して開発したアプリです。
PowerPointやExcelなどOffice365サービスやHTMLや画像ファイルなど様々なファイル形式をMarkDownに変換できます。
2025年1月の時点でファイルをアップロードすることでMarkDownコードの表示やプレビューを見ることができます。
今後はMDファイルのダウンロード機能やコピー機能、複数のファイルアップロード機能など追加していきたいと考えています。

## 機能一覧
### pptxファイルのMarkDown化
| 初期画面 | 使用するpptxファイル |
| --- | --- |
|![alt text](image-4.png)|![alt text](image-1.png)|
|初期画面です|公式リポジトリのpptxファイルを使用します|

|プレビュー画面|MDコード画面|
| --- | --- |
|![alt text](image-5.png)|![alt text](image-6.png)|
|MarkDown化した時のプレビューが表示されます|MarkDown化した時のコードが表示されます|

### xlsxファイルのMarkDown化
| 初期画面 | 使用するxlsxファイル |
| --- | --- |
|![alt text](image-4.png)|![alt text](image-1.png)|![alt text](image-7.png)|
|初期画面です|公式リポジトリのxlsxファイルを使用します|

|プレビュー画面|MDコード画面|
| --- | --- |
|![alt text](image-8.png)|![alt text](image-9.png)|
|MarkDown化した時のプレビューが表示されます|MarkDown化した時のコードが表示されます|

## 使用技術
|カテゴリー|フレームワーク・言語・技術|
| --- | --- |
|フロントエンド|React+Vite, TypeScript|
|バックエンド|Python, flask, MarkitDown|
|デザイン|Figma|

## 構成図
```mermaid
erDiagram
    Frontend ||--o{ Pages : ""
    Frontend ||--o{ Components : ""
    Pages ||--|{ Components : ""
    Frontend }|--|| Backend : ""
    Backend ||--|| MarkItDown : ""
    MarkItDown ||--o{ FileConverters : ""
    
    Frontend {
        string framework "フロントエンド: React"
        string language "開発言語: TypeScript"
        string styling "UIライブラリ: MaterialUI"
        string state "状態管理: useState"
    }
    
    Pages {
        string main "メインページ: Home.tsx"
        string routing "ルーティング: ReactRouter"
    }
    
    Components {
        string uploader "ファイルアップローダー"
        string preview "マークダウンプレビュー"
        string ui "UIコンポーネント"
    }
    
    Backend {
        string framework "バックエンド: Flask"
        string language "開発言語: Python"
        string cors "CORS対応: flask-cors"
        string converter "変換ライブラリ: markitdown"
    }
    
    MarkItDown {
        string pdf "PDF変換機能"
        string word "Word変換機能"
        string excel "Excel変換機能"
        string powerpoint "PowerPoint変換機能"
        string image "画像処理機能"
        string html "HTML解析機能"
    }
    
    FileConverters {
        string text "テキスト形式: CSV/JSON/XML"
        string document "文書形式: PDF/DOCX/XLSX"
        string media "メディア: 画像/音声"
        string web "Web: HTML"
    }
```
## 今後の展望
- 複数のファイルアップロード機能の追加
- MDファイルのダウンロード機能の追加
- コピー機能の追加