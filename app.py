from flask import Flask, render_template, request
from shamir import solve, resolve
app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/split', methods=['POST'])
def split():
    user_input = request.form['question']
    answer = check(user_input)
    return render_template('index.html', answer=answer)

@app.route('/union', methods=['POST'])
def union():
    user_input = request.form['question']
    answer = checkBack(user_input)
    return answer

def check(user_input: str) -> str: #Make code from text
    try:
        return solve(toInt(user_input))
    except:
        return "Oooops!"

def checkBack(user_input: str) -> int: #MAke text from code
    #TODO decide how to use
    try:
        return resolve(user_input)
    except:
        return 0

def toInt(input: str) -> int:
    utf_values_combined = ''.join([str(ord(char)) for char in input])
    utf_integer = int(utf_values_combined)
    return utf_integer

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
