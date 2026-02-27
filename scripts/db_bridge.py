from flask import Flask, request, jsonify
import sqlite3
import os

app = Flask(__name__)
DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'database', 'mcd_shadow_vault.db')

@app.route('/query', methods=['POST'])
def query_db():
    sql = request.form.get('sql', 'SELECT count(*) FROM property_records')
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute(sql)
        # Limit to 5 results for the demo
        rows = [dict(row) for row in cursor.fetchmany(5)]
        conn.close()
        return jsonify(rows)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001)