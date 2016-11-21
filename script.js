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
	
	// シェーダ
	  function create_shader(id){
    // シェーダを格納する変数
    var shader;

    // HTMLからscriptタグへの参照を取得
    var scriptElement = document.getElementById(id);

    // scriptタグが存在しない場合は抜ける
    if(!scriptElement){return;}

    // scriptタグのtype属性をチェック
    switch(scriptElement.type){
    case 'x-shader/x-vertex':    // 頂点シェーダ
      shader = gl.createShader(gl.VERTEX_SHADER);
      break;
    case 'x-shader/x-fragment': // ピクセルシェーダ
      shader = gl.createShader(gl.FRAGMENT_SHADER);
      break;
    default :// それ以外
      return;
    }

    // 生成されたシェーダにソースを割り当てる
    gl.shaderSource(shader, scriptElement.text);

    // シェーダをコンパイルする
    gl.compileShader(shader);

    // シェーダが正しくコンパイルされたかチェック
    if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
      return shader;    // 成功していたらシェーダを返して終了
    }else{
      // 失敗していたらエラーログをアラートする
      alert(gl.getShaderInfoLog(shader));
    }
  }

  // プログラムオブジェクトを生成しシェーダをリンクする関数
  function create_program(vs, fs){
    // プログラムオブジェクトの生成
    var program = gl.createProgram();

    // プログラムオブジェクトにシェーダを割り当てる
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);

    // シェーダをリンク
    gl.linkProgram(program);

    // シェーダのリンクが正しく行なわれたかチェック
    if(gl.getProgramParameter(program, gl.LINK_STATUS)){
      // 成功していたらプログラムオブジェクトを有効にする
      gl.useProgram(program);
      return program;      // プログラムオブジェクトを返して終了
    }else{
      // 失敗していたらエラーログをアラートする
      alert(gl.getProgramInfoLog(program));
    }
}
	
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
