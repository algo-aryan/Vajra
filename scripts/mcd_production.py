import sqlite3
import random

def create_massive_db():
    db_path = 'database/mcd_production.db'
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Performance Tuning for 1 Crore rows
    cursor.execute('PRAGMA synchronous = OFF')
    cursor.execute('PRAGMA journal_mode = MEMORY')

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS property_records (
            id INTEGER PRIMARY KEY,
            property_id TEXT,
            owner_name TEXT,
            phone_number TEXT,
            email_address TEXT,
            address TEXT,
            zone TEXT,
            tax_status TEXT,
            dept_code TEXT,
            gps_coords TEXT,
            last_login_ip TEXT,
            internal_remark TEXT,
            is_verified INTEGER,
            ward_no TEXT,
            water_connection_id TEXT
        )
    ''')

    # Realistic Name Pools
    first_names = ['Rajesh', 'Suman', 'Amit', 'Priya', 'Vikram', 'Anjali', 'Sanjay', 'Meena', 'Arjun', 'Sneha', 'Vijay', 'Kavita', 'Rohan', 'Pooja', 'Sunil', 'Asha']
    last_names = ['Sharma', 'Gupta', 'Verma', 'Bansal', 'Mehta', 'Singh', 'Jain', 'Aggarwal', 'Malhotra', 'Chaudhary', 'Yadav', 'Khan', 'Mishra', 'Kapoor']
    
    streets = ['MG Road', 'Vikas Marg', 'Ring Road', 'Najafgarh Road', 'Mall Road', 'Okhla Phase III', 'Palam Vihar']
    zones = ['Civil Lines', 'Karol Bagh', 'Rohini', 'Najafgarh', 'Shahdara', 'Narela', 'West Zone', 'Central Zone', 'South Zone', 'City SP']

    total_rows = 10000000
    batch_size = 100000

    print(f"Generating {total_rows} entries with realistic names...")

    for batch_start in range(0, total_rows, batch_size):
        data = []
        for i in range(batch_start + 1, batch_start + batch_size + 1):
            pid = f"MCD-PROD-{i:07d}"
            # Create a realistic name
            full_name = f"{random.choice(first_names)} {random.choice(last_names)}"
            
            data.append((
                pid,
                full_name,
                f"+91-{random.randint(7000000000, 9999999999)}",
                f"{full_name.lower().replace(' ', '.')}@mcd.gov.in",
                f"Flat {random.randint(1,500)}, {random.choice(streets)}, Delhi",
                random.choice(zones),
                random.choice(['PAID', 'PENDING', 'EXEMPT', 'ARREARS']),
                f"DEPT-{random.randint(100, 600)}",
                f"{28.6 + random.random():.4f}, {77.2 + random.random():.4f}",
                f"10.22.{random.randint(1,255)}.{random.randint(1,255)}",
                f"Remark: {random.choice(['Verified', 'Pending Site Visit', 'Clear', 'Audit Flag'])}",
                random.randint(0, 1),
                f"Ward-{random.randint(1, 272)}",
                f"WTR-{random.randint(100000, 999999)}"
            ))
        cursor.executemany('INSERT INTO property_records (property_id, owner_name, phone_number, email_address, address, zone, tax_status, dept_code, gps_coords, last_login_ip, internal_remark, is_verified, ward_no, water_connection_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', data)
        conn.commit()
        print(f"Progress: {batch_start + batch_size} / {total_rows}")

    conn.close()
    print("MCD Production Database populated with realistic names.")

create_massive_db()