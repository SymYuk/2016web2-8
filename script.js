onload=function()
{
	var canvas=document.getElementById('canvas');
	canvas.width=500;
	canvas.height=300;
	
	var gl=canvas.getContext('webgl')||canvas.getContent('experimental-webgl');
	
	gl.clearColor(0.0,0.0,0.0,1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	
	//ポリゴンデータの構築
	var attLocation=new Array(2);
	attLocation[0]=gl.getAttribLocation(prg,'position');
	attLocation[1]=gl.getAttribLocation(prg,'color');
	
	var attStride=new Array(2);
	attstride[0]=3;
	attstride[1]=4;
	
	var position=
	    [0.0,1.0,0.0,
	     1.0,0.0,0.0,
	     -1.0,0.0,0.0
	    ];
	var color=
	    [1.0,0.0,0.0,1.0,
	     0.0,1.0,0.0,1.0,
	     0.0,0.0,1.0,1.0
	    ];
	
	var pos_vbo=create_vbo(position);
	var col_vbo=create_vbo(color);
	
	set_attribute([pos_vbo,col_vbo],attLocation,attStride);
	
	//VBO作成
	function create_vbo(data)
	{
		var vbo=gl.createCuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
		gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER,null);
		return vbo;
	}
	
	//VBOのバインド登録
	function set_attribute(vbo,attL,attS)
	{
		for(var i in vbo)
		{
			gl.bindBuffer(gl.ARRAY_BUFFER,vbo[i]);
			gl.enableVertexAttribArray(attL[i]);
			gl.vertexAttribPointer(attL[i],attS[i],gl.FLOAT,false,0,0);
		}
	}
};
