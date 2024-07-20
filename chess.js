document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('chess-board');
    const newGameButton = document.getElementById('new-game');
    const board = Chessboard(boardElement, {
        draggable: true,
        dropOffBoard: 'trash',
        sparePieces: false,
        onDrop: handleMove
    });

    function handleMove(source, target) {
        const move = source + target;
        fetch('/move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ move: move })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'ok') {
                board.position(data.fen);
            } else {
                alert('Illegal move');
                board.position(board.fen());
            }
        });
    }

    newGameButton.addEventListener('click', () => {
        fetch('/new_game', { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                board.position(data.fen);
            });
    });

    fetch('/new_game', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            board.position(data.fen);
        });
});
