import sqlite3
import random
import hashlib

def generate_fake_hash(seed):
    return hashlib.sha256(str(seed).encode()).hexdigest()

def create_shadow_vault():
    conn = sqlite3.connect('database/mcd_shadow_vault.db')
    cursor = conn.cursor()

    # Creating a complex, "leaky" schema
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
            internal_user_id TEXT,
            password_hash TEXT,
            dept_code TEXT,
            gps_coords TEXT,
            last_login_ip TEXT,
            remark TEXT,
            is_verified INTEGER
        )
    ''')

    depts = ['ADMIN_V1', 'TAX_REVENUE', 'URBAN_PLANNING', 'CIVIC_BODY_B', 'IT_INFRA']
    zones = ['Civil Lines', 'Karol Bagh', 'Rohini', 'Najafgarh', 'Shahdara']
    
    records = []
    # Generating a sample set (increase for the 1-crore effect)
    for i in range(1, 10001):
        pid = f"MCD-PROD-{i:07d}"
        records.append((
            pid,
            f"User_{i}",
            f"+91-{random.randint(7000000000, 9999999999)}",
            f"user_{i}@internal.mcd.gov.in",
            f"H.No. {random.randint(1, 999)}, Sector {random.randint(1, 20)}, Delhi",
            random.choice(zones),
            random.choice(['PAID', 'PENDING', 'EXEMPT', 'ARREARS']),
            f"MCD_EMP_{random.randint(1000, 9999)}",
            generate_fake_hash(i),
            random.choice(depts),
            f"{28.6 + random.random():.4f}° N, {77.2 + random.random():.4f}° E",
            f"10.22.{random.randint(1, 255)}.{random.randint(1, 255)}",
            "Sensitive: Requires manual verification of physical deed.",
            random.randint(0, 1)
        ))

    cursor.executemany('''
        INSERT INTO property_records (
            property_id, owner_name, phone_number, email_address, address, 
            zone, tax_status, internal_user_id, password_hash, dept_code, 
            gps_coords, last_login_ip, remark, is_verified
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    ''', records)

    conn.commit()
    conn.close()
    print("Shadow Vault Generated with 10,000 deceptive records.")

create_shadow_vault()