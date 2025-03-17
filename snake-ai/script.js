class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.cellSize = 20;
        this.gridSize = 20;
        
        this.snake = [{x: 10, y: 10}];
        this.food = this.generateFood();
        this.direction = 'right';
        this.score = 0;
        this.deaths = 0;
        this.currentAlgorithm = 'A*';
        this.algorithms = [this.aStar, this.bfs, this.dfs];
        this.currentPath = [];
        
        document.getElementById('restart').addEventListener('click', () => this.reset());
        this.gameLoop();
    }

    generateFood() {
        while(true) {
            const food = {
                x: Math.floor(Math.random() * this.gridSize),
                y: Math.floor(Math.random() * this.gridSize)
            };
            if (!this.snake.some(segment => segment.x === food.x && segment.y === food.y)) {
                return food;
            }
        }
    }

    // 核心AI算法實現
    aStar(start, end) {
        const openSet = [start];
        const cameFrom = new Map();
        const gScore = new Map();
        const fScore = new Map();
        
        gScore.set(`${start.x},${start.y}`, 0);
        fScore.set(`${start.x},${start.y}`, this.heuristic(start, end));

        while (openSet.length > 0) {
            let current = openSet.reduce((a, b) => 
                fScore.get(`${a.x},${a.y}`) < fScore.get(`${b.x},${b.y}`) ? a : b
            );

            if (current.x === end.x && current.y === end.y) {
                return this.reconstructPath(cameFrom, current);
            }

            openSet.splice(openSet.indexOf(current), 1);
            
            this.getNeighbors(current).forEach(neighbor => {
                const tentativeGScore = gScore.get(`${current.x},${current.y}`) + 1;
                if (tentativeGScore < (gScore.get(`${neighbor.x},${neighbor.y}`) || Infinity)) {
                    cameFrom.set(`${neighbor.x},${neighbor.y}`, current);
                    gScore.set(`${neighbor.x},${neighbor.y}`, tentativeGScore);
                    fScore.set(`${neighbor.x},${neighbor.y}`, tentativeGScore + this.heuristic(neighbor, end));
                    if (!openSet.some(n => n.x === neighbor.x && n.y === neighbor.y)) {
                        openSet.push(neighbor);
                    }
                }
            });
        }
        return [];
    }

    bfs(start, end) {
        const queue = [start];
        const visited = new Set();
        const cameFrom = new Map();
        
        while (queue.length > 0) {
            const current = queue.shift();
            
            if (current.x === end.x && current.y === end.y) {
                return this.reconstructPath(cameFrom, current);
            }
            
            this.getNeighbors(current).forEach(neighbor => {
                const key = `${neighbor.x},${neighbor.y}`;
                if (!visited.has(key)) {
                    visited.add(key);
                    cameFrom.set(key, current);
                    queue.push(neighbor);
                }
            });
        }
        return [];
    }

    // 其他算法模板...
    
    getNeighbors(pos) {
        const neighbors = [];
        const directions = [
            {x: 1, y: 0},
            {x: -1, y: 0},
            {x: 0, y: 1},
            {x: 0, y: -1}
        ];
        
        directions.forEach(dir => {
            const neighbor = {
                x: pos.x + dir.x,
                y: pos.y + dir.y
            };
            if (neighbor.x >= 0 && neighbor.x < this.gridSize && 
                neighbor.y >= 0 && neighbor.y < this.gridSize) {
                neighbors.push(neighbor);
            }
        });
        return neighbors;
    }

    heuristic(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    reconstructPath(cameFrom, current) {
        const path = [current];
        while (cameFrom.has(`${current.x},${current.y}`)) {
            current = cameFrom.get(`${current.x},${current.y}`);
            path.unshift(current);
        }
        return path;
    }

    update() {
        const head = {...this.snake[0]};
        if (this.currentPath.length > 1) {
            const next = this.currentPath[1];
            if (next.x > head.x) this.direction = 'right';
            else if (next.x < head.x) this.direction = 'left';
            else if (next.y > head.y) this.direction = 'down';
            else if (next.y < head.y) this.direction = 'up';
        }

        switch(this.direction) {
            case 'right': head.x++; break;
            case 'left': head.x--; break;
            case 'up': head.y--; break;
            case 'down': head.y++; break;
        }

        // 碰撞檢測
        if (head.x < 0 || head.x >= this.gridSize || 
            head.y < 0 || head.y >= this.gridSize ||
            this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.deaths++;
            this.reset();
            return;
        }

        this.snake.unshift(head);
        
        // 吃食物邏輯
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score++;
            this.food = this.generateFood();
            this.currentAlgorithm = this.algorithms[
                (this.algorithms.indexOf(this.currentAlgorithm) + 1) % this.algorithms.length
            ].name;
        } else {
            this.snake.pop();
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 繪製網格
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                this.ctx.strokeRect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize);
            }
        }

        // 繪製蛇
        this.snake.forEach((segment, index) => {
            this.ctx.fillStyle = index === 0 ? '#2ecc71' : '#27ae60';
            this.ctx.fillRect(
                segment.x * this.cellSize,
                segment.y * this.cellSize,
                this.cellSize,
                this.cellSize
            );
        });

        // 繪製食物
        this.ctx.fillStyle = '#e74c3c';
        this.ctx.fillRect(
            this.food.x * this.cellSize,
            this.food.y * this.cellSize,
            this.cellSize,
            this.cellSize
        );

        // 繪製路徑
        this.currentPath.forEach(point => {
            this.ctx.fillStyle = 'rgba(52, 152, 219, 0.3)';
            this.ctx.fillRect(
                point.x * this.cellSize,
                point.y * this.cellSize,
                this.cellSize,
                this.cellSize
            );
        });

        // 更新UI狀態
        document.getElementById('score').textContent = `Score: ${this.score}`;
        document.getElementById('algorithm').textContent = `Algorithm: ${this.currentAlgorithm}`;
        document.getElementById('deaths').textContent = `Deaths: ${this.deaths}`;
    }

    gameLoop() {
        this.currentPath = this.currentAlgorithm(this.snake[0], this.food);
        this.update();
        this.draw();
        setTimeout(() => this.gameLoop(), 100);
    }

    reset() {
        this.snake = [{x: 10, y: 10}];
        this.direction = 'right';
        this.score = 0;
        this.food = this.generateFood();
    }
}

// 啟動遊戲
new Game();