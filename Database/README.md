# JokeGen Database Learning Project

Welcome to your database learning project! This folder contains everything you need to learn how to work with databases using Python and SQLite.

## 📁 Files in This Folder

- **`database_skeleton.py`** - Main file with TODO sections for you to fill in
- **`sql_reference.md`** - SQL commands and Python examples
- **`test_your_code.py`** - Test file to verify your work
- **`README.md`** - This file with instructions

## 🚀 Getting Started

### Step 1: Open the Skeleton File
Start with `database_skeleton.py`. This file has TODO comments where you need to write your code.

### Step 2: Learn the Basics
Check `sql_reference.md` for SQL commands and Python examples.

### Step 3: Implement Functions
Fill in the TODO sections in this order:

1. **`connect_to_database()`** - Connect to SQLite
2. **`create_jokes_table()`** - Create the table
3. **`read_jokes_from_file()`** - Read from `../base.txt`
4. **`get_audio_files()`** - Scan `../Joke audio/` directory
5. **`insert_joke()`** - Insert a single joke
6. **`populate_database()`** - Insert all jokes
7. **`get_random_joke()`** - Get random joke
8. **`search_jokes()`** - Search by text
9. **`get_joke_by_number()`** - Get specific joke

### Step 4: Test Your Work
Run the test file to see if everything works:
```bash
cd Database
python test_your_code.py
```

## 📚 Learning Path

### Beginner Level
- Connect to database
- Create a simple table
- Insert one joke manually

### Intermediate Level
- Read jokes from file
- Scan audio directory
- Insert all jokes automatically

### Advanced Level
- Query jokes (random, search, by number)
- Handle errors properly
- Optimize performance

## 🛠️ How to Run

1. **Navigate to Database folder:**
   ```bash
   cd Database
   ```

2. **Run your skeleton file:**
   ```bash
   python database_skeleton.py
   ```

3. **Test your implementation:**
   ```bash
   python test_your_code.py
   ```

## 📖 File Paths

Since you're working in the `Database/` folder, you need to go up one level to access your data files:

- **Joke text file:** `../base.txt`
- **Audio directory:** `../Joke audio/`
- **Database file:** `jokegen.db` (created in Database folder)

## 💡 Tips

1. **Start small**: Just create a table and insert one joke first
2. **Test often**: Run your code frequently to catch errors
3. **Use the reference**: Check `sql_reference.md` when stuck
4. **Ask questions**: If you get stuck, ask specific questions

## 🎯 Success Criteria

Your database is working when:
- ✅ Database file is created
- ✅ Jokes table exists
- ✅ All 744 jokes are inserted
- ✅ You can get random jokes
- ✅ You can search jokes
- ✅ All tests pass

## 🔧 Troubleshooting

### Common Issues:
- **"File not found"**: Check that you're using `../` to go up one directory
- **"Table doesn't exist"**: Make sure you call `create_jokes_table()` first
- **"No jokes found"**: Check that `populate_database()` is working
- **"SQL error"**: Check your SQL syntax in `sql_reference.md`

### Getting Help:
1. Check the error message carefully
2. Look at the examples in `sql_reference.md`
3. Test each function individually
4. Ask specific questions about what you're trying to do

Good luck with your database learning journey! 🎉 