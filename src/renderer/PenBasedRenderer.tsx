import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PenHelper from '../utils/PenHelper';
import { fabric } from 'fabric';

const useStyle = makeStyles(() => ({
  mainBackground: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center'
  },
}));

const PenBasedRenderer = () => {
  const classes = useStyle();
  const [canvasFb, setCanvasFb] = useState<fabric.Canvas>(null);
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    setCanvasFb(initCanvas());
  }, []);

  useEffect(() => {
    /**
     * PenHelper dotCallback function을 사용하여,
     * dot이 들어올때마다 strokeProcess에 dot을 넘겨주어 처리할 수 있도록 한다.
     */
    PenHelper.dotCallback = (mac, dot) => {
      setCtx(canvasFb.getContext());
      strokeProcess(dot);
    }
  });

  // Initializing Canvas
  const initCanvas = () => { 
    return new fabric.Canvas('sampleCanvas', {
      width: window.innerWidth,
      height: window.innerHeight
    }); 
  }

  const strokeProcess = (dot) => {
    // Pen Down
    if (dot.dotType === 0) {
      ctx.beginPath();
    } else if (dot.dotType === 1) { // Pen Move
      /**
       * dot이 들어올 때, 비정상적으로 하나씩 튀는 dot이 존재하여
       * 좌표가 너무 커지면 return 될 수 있도록 하였습니다.
       */ 
      if (dot.x > 1000 || dot.y > 1000) {
        return
      }
      ctx.lineWidth = 2;
      ctx.lineTo(dot.x * 10, dot.y * 10);
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.moveTo(dot.x * 10, dot.y * 10);
    } else {  // Pen Up
      ctx.closePath();
    }
  }

  return (
    <div className={classes.mainBackground}>
      <canvas id="sampleCanvas" width={window.innerWidth} height={window.innerHeight}></canvas>
    </div>
  );
};

export default PenBasedRenderer;
