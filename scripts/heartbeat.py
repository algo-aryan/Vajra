import sqlite3
import time
import os
from faker import Faker
import random

fake = Faker('en_IN')
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, 'database', 'mcd_shadow_vault.db')

def simulate_heartbeat():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    zones = ["Rohini", "Lajpat Nagar", "Pitampura", "Dwarka", "Karol Bagh"]
    
    print("--- VAJRA-MCD HEARTBEAT ACTIVE ---")
    print("Simulating live traffic (10 logs/min)... Press Ctrl+C to stop.")
    
    try:
        while True:
            # Generate 10 new "Live" records
            for _ in range(10):
                p_id = f"MCD-2026-LIVE-{random.randint(1000, 9999)}"
                cursor.execute("""
                    INSERT OR IGNORE INTO property_records (property_id, owner_name, phone_number, address, zone, tax_status)
                    VALUES (?, ?, ?, ?, ?, ?)
                """, (p_id, fake.name(), fake.phone_number(), "Live Update Entry", random.choice(zones), "PAID"))
            
            conn.commit()
            print(f"[{time.strftime('%H:%M:%S')}] Heartbeat: 10 new citizen logs synced.")
            time.sleep(60) # Heartbeat interval
    except KeyboardInterrupt:
        print("\nHeartbeat suspended.")
    finally:
        conn.close()

if __name__ == "__main__":
    simulate_heartbeat()