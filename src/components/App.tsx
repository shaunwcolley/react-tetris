import * as React from 'react';

import Board from './Board';

// Props for Tetris component
type TetrisProps = {
  boardWidth: any,
  boardHeight: any,
}

// Props for Tetris state
type TetrisState = {
  activeTileX: number,
  activeTileY: number,
  activeTile: number,
  tileRotate: number,
  score: number,
  level: number,
  tileCount: number,
  gameOver: boolean,
  isPaused: boolean,
  field: any[],
  timerId: any,
  tiles: number[][][][]
}

class App extends React.Component<TetrisProps, TetrisState> {
  constructor(props: any){
    super(props)
    let field = []
    for (let y = 0; y < props.boardHeight; y++) {
      let row = []
      for (let x = 0; x < props.boardWidth; x++) {
        row.push(0)
      }
      field.push(row)
    }

    let xStart = Math.floor(parseInt(props.boardWidth) / 2)

    this.state = {
      activeTileX: xStart,
      activeTileY: 1,
      activeTile: 1,
      tileRotate: 0,
      score: 0,
      level: 1,
      tileCount: 0,
      gameOver: false,
      isPaused: false,
      field: field,
      timerId: null,
      tiles: [
        [
          // default square
          [[0,0],[0,0],[0,0],[0,0]],
          [[0,0],[0,0],[0,0],[0,0]],
          [[0,0],[0,0],[0,0],[0,0]],
          [[0,0],[0,0],[0,0],[0,0]]
        ],
        [
          // cube tile
          [[0,0],[1,0],[0,1],[1,1]],
          [[0,0],[1,0],[0,1],[1,1]],
          [[0,0],[1,0],[0,1],[1,1]],
          [[0,0],[1,0],[0,1],[1,1]]
        ],
        [
          // long tile
          [[0,-1],[0,0],[0,1],[0,2]],
          [[-1,0],[0,0],[1,0],[2,0]],
          [[0,-1],[0,0],[0,1],[0,2]],
          [[-1,0],[0,0],[1,0],[2,0]]
        ],
        [
          // t tile
          [[0,0],[-1,0],[1,0],[0,-1]],
          [[0,0],[1,0],[0,1],[0,-1]],
          [[0,0],[-1,0],[1,0],[0,-1]],
          [[0,0],[-1,0],[0,1],[0,0-1]]
        ],
        [
          // inverse L
          [[0,0],[-1,0],[1,0],[-1,-1]],
          [[0,0],[0,1],[0,-1],[1,-1]],
          [[0,0],[1,0],[-1,0],[1,1]],
          [[0,0],[0,1],[0,-1],[-1,1]]
        ],
        [
          // L tile
          [[0,0],[1,0],[-1,0],[1,-1]],
          [[0,0],[0,1],[0,-1],[1,1]],
          [[0,0],[1,0],[-1,0],[-1,1]],
          [[0,0],[0,1],[0,-1],[-1-1]]
        ],
        [
          // Z
          [[0,0],[1,0],[0,-1],[-1,-1]],
          [[0,0],[1,0],[0,1],[1,-1]],
          [[0,0],[1,0],[0,-1],[-1,-1]],
          [[0,0],[1,0],[0,1],[1,-1]]
        ],
        [
          // inverse Z
          [[0,0],[-1,0],[0,-1],[1,-1]],
          [[0,0],[0,-1],[1,0],[1,1]],
          [[0,0],[-1,0],[0,-1],[1,-1]],
          [[0,0],[0,-1],[1,0],[1,1]]
        ]
      ]
    }
  }

  componentDidMount() {
    let timerId

    timerId = window.setInterval(
      ()=> this.handleBoardUpdate('down'),
      1000 - (this.state.level * 10 > 600 ? 600 : this.state.level * 10)
    )

    this.setState({
      timerId: timerId
    })
  }

  componentWillUnmount() {
    window.clearInterval(this.state.timerId)
  }

  handleBoardUpdate(command: string) {
    if(this.state.gameOver || this.state.isPaused) {
      return
    }

    let xAdd = 0
    let yAdd = 0
    let rotateAdd = 0
    let tile = this.state.activeTile

    if (command === 'left') {
      xAdd = -1
    }
    if (command === 'right') {
      xAdd = 1
    }
    if (command === 'rotate') {
      rotateAdd = 1
    }
    if (command === 'down') {
      yAdd = 1
    }

    let field = this.state.field
    let x = this.state.activeTileX
    let y = this.state.activeTileY
    let rotate = this.state.tileRotate

    const tiles = this.state.tiles

    field[y + tiles[tile][rotate][0][1]][x + tiles[tile][rotate][0][0]] = 0
    field[y + tiles[tile][rotate][1][1]][x + tiles[tile][rotate][1][0]] = 0
    field[y + tiles[tile][rotate][2][1]][x + tiles[tile][rotate][2][0]] = 0
    field[y + tiles[tile][rotate][3][1]][x + tiles[tile][rotate][3][0]] = 0

    let xAddIsValid = true

    if(xAdd !== 0) {
      for (let i = 0; i <= 3; i ++) {
        if (x + xAdd + tiles[tile][rotate][i][0] >= 0 && x + xAdd + tiles[tile][rotate][i][0] < this.props.boardWidth) {
          if (field[y + tiles[tile][rotate][i][1]][x + xAdd + tiles[tile][rotate][i][0]] !== 0 ) {
            xAddIsValid = false
          }
        } else {
          xAddIsValid = false
        }
      }
    }
    if (xAddIsValid) {
      x += xAdd
    }

    let newRotate = rotate + rotateAdd > 3 ? 0 : rotate + rotateAdd
    let rotateIsValid = true

    if (rotateAdd !== 0) {
      for (let i = 0; i <=3; i++) {
        if (
          x + tiles[tile][newRotate][i][0] >= 0 &&
          x + tiles[tile][newRotate][i][0] < this.props.boardWidth &&
          y + tiles[tile][newRotate][i][1] >= 0 &&
          y + tiles[tile][newRotate][i][1] < this.props.boardHeight
        ) {
          if (field[y + tiles[tile][newRotate][i][1]][x + tiles[tile][newRotate][i][0]] !== 0) {
            rotateIsValid = false
          }
        } else {
          rotateIsValid = false
        }
      }
    }
    if (rotateIsValid_ {
      rotate = newRotate
    })

    let yAddIsValid = true

    if (yAdd !== 0) {
      for (let i = 0; i <= 3; i++) {
        if(
          y + yAdd + tiles[tile][rotate][i][1] >= 0 &&
          y + yAdd + tiles[tile][rotate][i][1] < this.props.boardHeight
        ) {
          if (field[y + yAdd + tiles[tile][rotate][i][1]][x + tiles[tile][rotate][i][0]] !== 0) {
            yAddIsValid = false
          }
        } else {
          yAddIsValid = false
        }
      }
    }

    if(yAddIsValid) {
      y += yAdd
    }

    field[y + tiles[tile][rotate][0][1]][x + tiles[tile][rotate][0][0]] = tile
    field[y + tiles[tile][rotate][1][1]][x + tiles[tile][rotate][1][0]] = tile
    field[y + tiles[tile][rotate][2][1]][x + tiles[tile][rotate][2][0]] = tile
    field[y + tiles[tile][rotate][3][1]][x + tiles[tile][rotate][3][0]] = tile

    if(!yAddIsValid) {
      for ( let row = this.props.boardHeight -1; row >= 0; row--) {
        let isRowComplete = true

        for(let col = 0; col < this.props.boardWidth; col++) {
          if(field[row][col] === 0) {
            isRowComplete = false
          }
        }
        if(isRowComplete) {
          for (let yRowSrc = row: row > 0; row--) {
            for (let col = 0; col < this.props.boardWidth; col++) {
              field[row][col] = field[row - 1][col]
            }
          }
          row = this.props.boardHeight
        }
      }
      this.setState(prev => ({
        core: prev.score + 1 * prev.level,
        tileCount: prev.tileCount + 1,
        level: 1 + Math.floor(prev.tileCount / 10)
      }))

      let timerId

      clearInterval(this.state.timerId)
    }

  }

  render(){
    return <div>'howdy'</div>
  }
}

export default App;
