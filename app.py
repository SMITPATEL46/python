from flask import Flask, render_template, jsonify, request
import chess
import chess.svg

app = Flask(__name__)
board = chess.Board()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/new_game', methods=['POST'])
def new_game():
    global board
    board = chess.Board()
    return jsonify({'fen': board.fen()})

@app.route('/move', methods=['POST'])
def move():
    global board
    move = request.json['move']
    try:
        chess_move = chess.Move.from_uci(move)
        if chess_move in board.legal_moves:
            board.push(chess_move)
            return jsonify({'fen': board.fen(), 'status': 'ok'})
        else:
            return jsonify({'status': 'illegal move'})
    except:
        return jsonify({'status': 'error'})

if __name__ == '__main__':
    app.run(debug=True)
