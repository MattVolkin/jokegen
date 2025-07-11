#!/usr/bin/env python3
"""
Test Your Database Code
Run this after you've implemented your database functions
"""

import sqlite3
import os

def test_database_exists():
    """Test if the database file was created"""
    if os.path.exists('jokegen.db'):
        print("✓ Database file exists")
        return True
    else:
        print("✗ Database file not found")
        return False

def test_table_exists():
    """Test if the jokes table was created"""
    try:
        conn = sqlite3.connect('jokegen.db')
        cursor = conn.cursor()
        
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='jokes'")
        if cursor.fetchone():
            print("✓ Jokes table exists")
            conn.close()
            return True
        else:
            print("✗ Jokes table not found")
            conn.close()
            return False
    except Exception as e:
        print(f"✗ Error checking table: {e}")
        return False

def test_jokes_count():
    """Test if jokes were inserted"""
    try:
        conn = sqlite3.connect('jokegen.db')
        cursor = conn.cursor()
        
        cursor.execute("SELECT COUNT(*) FROM jokes")
        count = cursor.fetchone()[0]
        
        if count > 0:
            print(f"✓ Found {count} jokes in database")
            conn.close()
            return True
        else:
            print("✗ No jokes found in database")
            conn.close()
            return False
    except Exception as e:
        print(f"✗ Error counting jokes: {e}")
        return False

def test_random_joke():
    """Test if you can get a random joke"""
    try:
        conn = sqlite3.connect('jokegen.db')
        cursor = conn.cursor()
        
        cursor.execute("SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1")
        joke = cursor.fetchone()
        
        if joke:
            print(f"✓ Random joke test: #{joke[1]} - {joke[2][:50]}...")
            conn.close()
            return True
        else:
            print("✗ Could not get random joke")
            conn.close()
            return False
    except Exception as e:
        print(f"✗ Error getting random joke: {e}")
        return False

def test_search():
    """Test if search works"""
    try:
        conn = sqlite3.connect('jokegen.db')
        cursor = conn.cursor()
        
        cursor.execute("SELECT COUNT(*) FROM jokes WHERE joke_text LIKE ?", ('%skeleton%',))
        count = cursor.fetchone()[0]
        
        print(f"✓ Search test: Found {count} skeleton jokes")
        conn.close()
        return True
    except Exception as e:
        print(f"✗ Error searching: {e}")
        return False

def main():
    """Run all tests"""
    print("Testing Your Database Implementation")
    print("=" * 40)
    
    tests = [
        test_database_exists,
        test_table_exists,
        test_jokes_count,
        test_random_joke,
        test_search
    ]
    
    passed = 0
    total = len(tests)
    
    for test in tests:
        if test():
            passed += 1
        print()
    
    print("=" * 40)
    print(f"Tests passed: {passed}/{total}")
    
    if passed == total:
        print("🎉 Congratulations! Your database is working correctly!")
    else:
        print("Keep working on it! Check the failed tests above.")

if __name__ == '__main__':
    main() 