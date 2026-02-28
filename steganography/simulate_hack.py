import sqlite3

# Database Path
DB_PATH = 'mcd_records.db'

def hack_first_record():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # 1. Sabse pehla record dhoondo (Oldest Timestamp)
    # 'ASC' order ka matlab hai chronological order mein pehla
    cursor.execute("SELECT officer_id FROM reports ORDER BY timestamp ASC LIMIT 1")
    row = cursor.fetchone()
    
    if not row:
        print("\n--- ❌ ERROR: Registry is empty! ---")
        print("Bhai, pehle Dashboard par 'Generate DNA' karke kuch data toh bharo.")
        conn.close()
        return

    target_id = row[0]
    fake_status = "BRIBED / RECORD DELETED"
    
    print(f"\n--- 😈 TARGETING THE ORIGINAL RECORD: {target_id} ---")
    
    try:
        # 2. Database Metadata hijacking
        cursor.execute("UPDATE reports SET status = ? WHERE officer_id = ?", (fake_status, target_id))
        
        if cursor.rowcount > 0:
            conn.commit()
            print(f"--- ✅ HACK SUCCESSFUL: {target_id} (The First Row) is now corrupted. ---")
            print("--- (Forensic DNA mismatch will trigger on next audit) ---")
        else:
            print(f"--- ❌ ERROR: Could not find or update the first record. ---")
            
    except sqlite3.Error as e:
        print(f"--- ❌ SQL Error: {e} ---")
        
    conn.close()

if __name__ == "__main__":
    hack_first_record()