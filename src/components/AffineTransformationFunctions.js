/*function drawGridLine(ctx, startX, startY, endX, endY, color) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }*/
  
function drawTickMark(ctx, x, y, length) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";
    ctx.moveTo(x, y - length / 2);
    ctx.lineTo(x, y + length / 2);
    ctx.stroke();
  }
  
  function drawText(ctx, text, x, y, align) {
    ctx.font = "8px Arial";
    ctx.textAlign = align;
    ctx.fillText(text, x, y);
  }
  
  function drawXAxisTicks(
    ctx,
    grid_size,
    mashtab,
    x_axis_starting_point,
    num_lines_y,
    y_axis_distance_grid_lines
  ) {
    for (let i = 1; i < num_lines_y - y_axis_distance_grid_lines * mashtab; i++) {
      drawTickMark(ctx, (grid_size / mashtab) * i + 0.5, -3, 6);
      drawText(
        ctx,
        x_axis_starting_point.number * i + x_axis_starting_point.suffix,
        (grid_size / mashtab) * i - 2,
        15,
        "start"
      );
      
    }
    ctx.font = "14px Arial";
    ctx.textAlign = "start";
    ctx.fillText("X", (grid_size / mashtab) * (num_lines_y - y_axis_distance_grid_lines * mashtab) - 15, -5);
  }
  
  function drawNegativeXAxisTicks(ctx, grid_size, mashtab, x_axis_starting_point, y_axis_distance_grid_lines) {
    for (let i = 1; i < y_axis_distance_grid_lines * mashtab; i++) {
      drawTickMark(ctx, -(grid_size / mashtab) * i + 0.5, -3, 6);
      drawText(
        ctx,
        -x_axis_starting_point.number * i + x_axis_starting_point.suffix,
        -(grid_size / mashtab) * i + 3,
        15,
        "end"
      );
    }
  }
  
  function drawYAxisTicks(
    ctx,
    grid_size,
    mashtab,
    y_axis_starting_point,
    num_lines_x,
    x_axis_distance_grid_lines
  ) {
    for (let i = 1; i < num_lines_x - x_axis_distance_grid_lines * mashtab; i++) {
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#000000";
      ctx.moveTo(-3, (grid_size / mashtab) * i + 0.5);
      ctx.lineTo(3, (grid_size / mashtab) * i + 0.5);
      ctx.stroke();
      drawText(
        ctx,
        -y_axis_starting_point.number * i + y_axis_starting_point.suffix,
        8,
        (grid_size / mashtab) * i + 3,
        "start"
      );
    }
    ctx.font = "14px Arial";
    ctx.textAlign = "start";
    ctx.fillText("Y", -15, -(grid_size / mashtab) * (x_axis_distance_grid_lines * mashtab)+15);
  }

  function drawNegativeYAxisTicks(ctx, grid_size, mashtab, y_axis_starting_point, x_axis_distance_grid_lines) {
    for (let i = 1; i < x_axis_distance_grid_lines * mashtab; i++) {
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#000000";
      ctx.moveTo(-3, (-grid_size / mashtab) * i + 0.5);
      ctx.lineTo(3, (-grid_size / mashtab) * i + 0.5);
      ctx.stroke();
      drawText(
        ctx,
        y_axis_starting_point.number * i + y_axis_starting_point.suffix,
        8,
        -(grid_size / mashtab) * i + 3,
        "start"
      );
    }
   
  }

  function getCoordinatsOfPoint(x1, y1, x2, y2) {
    let coordinates = [[], [], [], []];
    if (x1 < x2 && y1 < y2) {
      coordinates[0][0] = x1;
      coordinates[0][1] = y1;
      coordinates[1][0] = x1;
      coordinates[1][1] = y2;
      coordinates[2][0] = x2;
      coordinates[2][1] = y2;
      coordinates[3][0] = x2;
      coordinates[3][1] = y1;
    } else {
      coordinates[0][0] = x1;
      coordinates[0][1] = y2;
      coordinates[1][0] = x1;
      coordinates[1][1] = y1;
      coordinates[2][0] = x2;
      coordinates[2][1] = y1;
      coordinates[3][0] = x2;
      coordinates[3][1] = y2;
    }
    return coordinates;
  }
  
  function applyTranslationOnArray(rectangleArray, translationX, translationY) {
    for (let i = 0; i < rectangleArray.length; i++) {
        rectangleArray[i][0] += translationX;
        rectangleArray[i][1] += translationY;
    }
    return rectangleArray; }

    function applyScale(rectangleArray, scaleX) {
        let scaleMatrix = [
            [scaleX, 0],
            [0, scaleX],
        ];
        let translationX = rectangleArray[0][0];
        let translationY = rectangleArray[0][1];
        applyTranslationOnArray(rectangleArray, -translationX, -translationY);
        rectangleArray = multiplyMatrix(rectangleArray, scaleMatrix);
        applyTranslationOnArray(rectangleArray, translationX, translationY);
        return rectangleArray;
        }

    function multiplyMatrix(matrix1, matrix2) {
        let resultMatrix = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ];
        for (let i = 0; i < matrix1.length; i++) {
            for (let j = 0; j < matrix2[0].length; j++) {
            for (let k = 0; k < matrix1[i].length; k++) {
                resultMatrix[i][j] += matrix1[i][k] * matrix2[k][j];
            }
            }
        }
        return resultMatrix;
        }

        function applyAngle(rectangleArray, angle, type=0) {
            let angleRadians = (angle * Math.PI) / 180;
            var angleMatrix = [
              [Math.cos(angleRadians), Math.sin(angleRadians)],
              [-Math.sin(angleRadians), Math.cos(angleRadians)],
            ];
            let centerX;
            let centerY;
            switch (type) {
                case 2:
                centerX = rectangleArray[0][0];
                centerY = rectangleArray[0][1];
 
                break;
                case 3:
                centerX = rectangleArray[1][0];
                centerY = rectangleArray[1][1];

                break;
                case 4:
                centerX = rectangleArray[2][0];
                centerY = rectangleArray[2][1];
           
                break;
                case 5:
                centerX = rectangleArray[3][0];
                centerY = rectangleArray[3][1];
                
                break;
                case 1:
                    rectangleArray = multiplyMatrix(rectangleArray, angleMatrix);
                    return rectangleArray;
            }
            rectangleArray = applyTranslationOnArray(rectangleArray, -centerX, -centerY);
            rectangleArray = multiplyMatrix(rectangleArray, angleMatrix);
            rectangleArray = applyTranslationOnArray(rectangleArray, centerX, centerY);
            
            return rectangleArray;
          }



module.exports = {
    drawXAxisTicks, 
    drawNegativeXAxisTicks, 
    drawYAxisTicks,
    drawNegativeYAxisTicks, 
    getCoordinatsOfPoint,
    applyTranslationOnArray, 
    applyScale,
    applyAngle }