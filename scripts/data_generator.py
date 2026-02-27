import sqlite3
import os
from faker import Faker
import random
import uuid
import hashlib

fake = Faker('en_IN')
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, 'database', 'mcd_shadow_vault.db')
SCHEMA_PATH = os.path.join(BASE_DIR, 'database', 'schema.sql')

def seed_database(total_records=10000000):
    # 1. Fresh Start: Remove old DB
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)
        print("Cleaning old vault...")
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # 2. Extreme Speed Settings
    cursor.execute("PRAGMA journal_mode = OFF;")
    cursor.execute("PRAGMA synchronous = OFF;")
    cursor.execute("PRAGMA cache_size = 2000000;") # Uses ~2GB RAM for caching
    
    # 3. Build the structure
    print(f"Applying Departmental Schema from {SCHEMA_PATH}...")
    with open(SCHEMA_PATH, 'r') as f:
        cursor.executescript(f.read())

    # 4. Insert Hashed Admin Credentials (The 'Crown Jewels')
    # Using SHA-256 for realism
    admins = [
        ('mcd_admin_delhi', hashlib.sha256(b"Admin@MCD2026!").hexdigest(), 'IT_CELL', 10),
        ('commissioner_audit', hashlib.sha256(b"DelhiGov123").hexdigest(), 'AUDIT', 9),
        ('revenue_officer_hq', hashlib.sha256(b"Revenue#99").hexdigest(), 'REVENUE', 8)
    ]
    cursor.executemany("INSERT INTO sys_accounts (username, password_hash, dept, access_level) VALUES (?,?,?,?)", admins)

    # 5. Injection Loop
    zones = ["Rohini", "Lajpat Nagar", "Pitampura", "Dwarka", "Karol Bagh", "Civil Lines", "Okhla", "Mayur Vihar"]
    batch_size = 50000
    current = 0
    
    print(f"Starting 1 Crore (10M) Record Injection. Please wait...")

    while current < total_records:
        batch_data = []
        for _ in range(batch_size):
            # Using 12-char hex + timestamp-based randomness to prevent collisions
            p_id = f"MCD-2026-{uuid.uuid4().hex[:12].upper()}"
            batch_data.append((
                p_id, 
                fake.name(), 
                fake.phone_number(), 
                f"{fake.building_number()}, {fake.street_name()}, Delhi - 1100{random.randint(10, 99)}", 
                random.choice(zones), 
                random.choice(['PAID', 'PENDING', 'DEFAULTED', 'EXEMPT'])
            ))
        
        # INSERT OR IGNORE ensures the script NEVER crashes on duplicates
        cursor.executemany("INSERT OR IGNORE INTO property_records (property_id, owner_name, phone_number, address, zone, tax_status) VALUES (?,?,?,?,?,?)", batch_data)
        conn.commit()
        
        current += batch_size
        if current % 500000 == 0:
            print(f"Vault Progress: {current/1000000:.1f} Million records secured...")

    conn.close()
    print("\n--- VAJRA-MCD BIG DATA LAYER COMPLETE ---")
    print(f"Final Database Size: {os.path.getsize(DB_PATH) / (1024*1024):.2f} MB")

if __name__ == "__main__":
    seed_database()