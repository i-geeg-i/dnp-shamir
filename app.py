"""
Flask Web App for Shamir's Secret Sharing Scheme 💻🔐

Endpoints:
----------
1. GET  /             → Serves the HTML interface (index.html)
2. POST /split        → Accepts a plain-text secret via form input,
                        converts it to an integer, then splits it into shares
                        using the Shamir algorithm (solve function).
3. POST /union        → Accepts encoded share input via form,
                        reconstructs the original secret (resolve function).

Integration with shamir.py:
----------------------------
- `solve(secret_int: int) -> str`:
    Should split the integer secret into multiple shares (as string).
    You need to define this function in `shamir.py`.

- `resolve(shares: str) -> int`:
    Should accept a string-encoded representation of shares (e.g. "1:123,2:456,3:789"),
    and use Shamir’s reconstruction algorithm to recover the original secret.

String <-> Int Conversion:
---------------------------
- Input text is converted to a large integer using UTF-8 character codes.

TODO:
-----
- Add support in `resolve()` to parse share formats from frontend input.
- Improve error handling for user input and edge cases.

To run locally:
-------
$ python app.py
Visit http://localhost:5000 in your browser.

"""

from flask import Flask, render_template, request
from shamir import solve, resolve
app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/split', methods=['POST'])
def split():
    user_input = request.form['code']
    try:
        parts = int(request.form['parts'])
        keys = int(request.form['keys'])
    except ValueError:
        return "Invalid input: parts and keys must be numbers."

    answer = check(user_input, keys, parts)
    return answer

@app.route('/union', methods=['POST'])
def union():
    user_input = request.form['code']
    answer = checkBack(user_input)
    return answer

def check(user_input: str, keys: int, parts: int) -> str: #Make code from text
    try:
        return solve(toInt(user_input), parts, keys)
    except:
        return "Oooops!"

def checkBack(user_input: str) -> str: #Make text from code
    try:
        return fromInt(resolve(user_input))
    except:
        return 'Ooooops!'

def toInt(input: str) -> int:
    utf_values_combined = ''.join([str(ord(char)) for char in input])
    utf_integer = int(utf_values_combined)
    return utf_integer

def fromInt(utf_integer: int) -> str:
    utf_str = str(utf_integer)
    decoded = ''
    i = 0
    while i < len(utf_str):
        # Try to match 3-digit UTF codes first (covers common characters)
        if i + 2 < len(utf_str) and 32 <= int(utf_str[i:i+3]) <= 126:
            decoded += chr(int(utf_str[i:i+3]))
            i += 3
        # Fallback for 2-digit codes (rarely needed unless you've encoded them)
        elif i + 1 < len(utf_str):
            decoded += chr(int(utf_str[i:i+2]))
            i += 2
        else:
            raise ValueError("Invalid UTF integer sequence")
    return decoded

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
