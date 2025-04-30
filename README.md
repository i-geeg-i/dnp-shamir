# 🔐 Shamir Secret Sharing Web App

A lightweight Flask-based web interface that demonstrates [Shamir's Secret Sharing](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing) — an elegant cryptographic algorithm allowing a secret to be split into `n` parts, such that any `k` parts can reconstruct it, but fewer than `k` give no information at all.

## 💡 Project Description

This web app allows you to:
- ✨ **Split** any text into encoded cryptographic shares.
- 🛠️ **Reconstruct** the original message from a combination of those shares.

It uses polynomial interpolation over finite fields as described in Adi Shamir’s classic 1979 paper, implemented in Python.

---

## 🧪 How It Works

### 🔸 Endpoint Overview

| Method | Route      | Description                            |
|--------|------------|----------------------------------------|
| GET    | `/`        | Renders the main HTML page             |
| POST   | `/split`   | Accepts user input and splits the secret into shares |
| POST   | `/union`   | Accepts shares and reconstructs the original secret |

### 🔸 Conversion Flow

1. The user enters a message.
2. It's converted into a large integer using UTF-8 codes.
3. The integer is passed to the `solve()` function from `shamir.py`.
4. Shares are returned and displayed.
5. To recover, the user submits a few of those shares to `/union`, which uses `resolve()`.

---

## 🧠 Example Request

### 🔸 Splitting a Secret

    Nothing for now

### 🔸 Reconstructing the Secret

    Nothing for now
---

## 🧩 File Structure
.
├── app.py         # Flask backend with routes
├── shamir.py      # Shamir's Secret Sharing implementation
├── templates/
│   └── index.html # Frontend interface
├── static/
│   └── style.css # Styles for frontend


## 👥 Team Members
🧑‍💻 Ivan Murzin (Frontend Dev)

🧑‍💻 Alena Averina (Presentations / Reports)

🧑‍💻 Anna Serova (Crypto / Algorithms)

🧑‍💻 Egor Glebov (Backend)


## 🚀 Run the Project
Make sure you have Python 3.8+ installed.

pip install flask
python app.py
Visit http://localhost:5000 in your browser.

### OR

Visit the website: http://38.244.138.103:5000/ in your browser!

## 🔐 Credits
Based on the brilliant work of Adi Shamir, 1979. Inspired by the elegance of math, code, and secrets 🖤
