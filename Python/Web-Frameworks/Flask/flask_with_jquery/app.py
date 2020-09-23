from flask import Flask, render_template, jsonify, request, redirect

app = Flask(__name__)

@app.route('/')
@app.route('/home')
def index():
	return render_template('index.html')

@app.route('/add_numbers')
def add_numbers():
	fnum = request.args.get('fnum', 0, type=int)
	snum = request.args.get('snum', 0, type=int)
	total = fnum + snum
	return jsonify({'result': total})

if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0')