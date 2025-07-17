import os

base_path = os.path.join(os.path.dirname(__file__), 'base.txt')
clean_path = os.path.join(os.path.dirname(__file__), 'clean_base.txt')

with open(base_path, 'r', encoding='utf-8') as infile, open(clean_path, 'w', encoding='utf-8') as outfile:
    for line in infile:
        joke = line.strip().replace('\t', '').replace('\n', ' ')
        # Remove leading/trailing quotes
        if joke.startswith('"') and joke.endswith('"'):
            joke = joke[1:-1]
        # Try to split on '?', '.', or '!'
        for sep in ['?', '.', '!']:
            if sep in joke:
                parts = joke.split(sep, 1)
                setup = parts[0].strip() + sep
                punchline = parts[1].strip()
                outfile.write(setup + '\n')
                outfile.write(punchline + '\n\n')
                break
        else:
            # If no separator found, write the whole joke
            outfile.write(joke + '\n\n')