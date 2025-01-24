import sqlite3

DB_PATH = "safety_compliance.db"

def initialize_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS compliance_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            location_id TEXT,
            image_reference TEXT,
            violation_type TEXT,
            risk_level TEXT,
            worker_count INTEGER
        )
    """)
    conn.commit()
    conn.close()


def insert_analysis_result(timestamp, location_id, image_reference, violation_type, risk_level, worker_count):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO compliance_history (timestamp, location_id, image_reference, violation_type, risk_level, worker_count)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (timestamp, location_id, image_reference, violation_type, risk_level, worker_count))
    conn.commit()
    conn.close()


def get_all_results():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM compliance_history")
    results = cursor.fetchall()
    conn.close()
    return results
