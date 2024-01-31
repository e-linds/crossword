// import { useEffect, useRef } from 'react'


// function Grid() {

//     const canvasRef = useRef(null)

//     useEffect(() => {
        
        
//         drawGrid()
//     },[])

//     const gridStyle = {
//         border: "solid",
//         borderColor: "black",
//         borderWidth: "2px"

//     }

//     function drawGrid() {

//         const canvas = canvasRef.current
//         const ctx = canvas.getContext("2d")
//         ctx.lineWidth = ".1"

//         ctx.lineCap = "square"
//         ctx.strokeStyle = "black"

//         // ctx.scale(0.5, 0.5)

//         draw_row_lines()
//         draw_column_lines()
        

//         function draw_row_lines() {
//             let x = 0
//             let y = 700
//             let z = 0
            

//             ctx.beginPath()
//             for (const each of Array(19)) {  
//                 ctx.moveTo(x, (z + 35))
//                 ctx.lineTo(y, (z + 35))
//                 z = z + 35
//             ctx.closePath()
//             ctx.stroke()
//         }
//         }

//         function draw_column_lines() {
//             let x = 0
//             let y = 700
//             let z = 0


//             ctx.beginPath()
//             for (const each of Array(19)) {
//                 ctx.moveTo((z + 35), x)
//                 ctx.lineTo((z + 35), y)
//                 z = z + 35
//             }
//             ctx.closePath()
//             ctx.stroke()
//         }

        

       
//     }


//     return(
//         <canvas id="gridcanvas" width="700" height="700" style={gridStyle} ref={canvasRef}></canvas>
//     )

// }

// export default Grid