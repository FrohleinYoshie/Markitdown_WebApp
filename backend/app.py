# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from markitdown import MarkItDown
import os

app = Flask(__name__)
CORS(app)

@app.route('/convert', methods=['POST'])
def convert_file():
    if 'file' not in request.files:
        return jsonify({'error': 'ファイルがありません'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'ファイルが選択されていません'}), 400

    temp_path = f"temp_{file.filename}"
    file.save(temp_path)

    try:
        md = MarkItDown()
        result = md.convert(temp_path)
        
        return jsonify({
            'text': result.text_content,
            'fileType': os.path.splitext(file.filename)[1][1:]
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

if __name__ == '__main__':
    app.run(debug=True)
