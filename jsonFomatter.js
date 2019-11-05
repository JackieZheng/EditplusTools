//程序开始.
var indent_size = 1; //缩进空格数, 为1时使用制表符缩进
var indent_char = ' '; //缩进字符
if (indent_size == 1) {
	indent_char = '\t';
}
var input = "";
var stream = new ActiveXObject("ADODB.Stream");
stream.Mode = 3; // 常用值 1:读，2:写，3:读写
stream.Type = 2; // 1:二进制，2:文本(默认)
stream.Charset = 'UTF-8'; // 指定编码UTF-8
stream.Open();
stream.LoadFromFile(WScript.Arguments(0));
input = stream.ReadText( - 1); // 读取全部内容
stream.Close();
var json_source = input.replace(/^\s+/, '');
var formated_code = formatJson(json_source, indent_size, indent_char);
formated_code.length ? WScript.StdOut.Write(formated_code) : WScript.Echo('Are you sure your input is Json source file?'); //格式化json
function formatJson(jsonStr, indent_size, indent_char) {
	var res = "";
	indent_string = '';
	while (indent_size--) {
		indent_string += indent_char;
	}
	for (var i = 0,
	j = 0,
	k = 0,
	ii, ele; i < jsonStr.length; i++) {
		ele = jsonStr.charAt(i);
		if (j % 2 == 0 && ele == "}") {
			k--;
			for (ii = 0; ii < k; ii++) ele = indent_string + ele;
			ele = "\n" + ele;
		} else if (j % 2 == 0 && ele == "{") {
			ele += "\n";
			k++;
			for (ii = 0; ii < k; ii++) ele += indent_string;
		} else if (j % 2 == 0 && ele == ",") {
			ele += "\n";
			for (ii = 0; ii < k; ii++) ele += indent_string;
		} else if (ele == "\"") j++;
		res += ele;
	}
	return res;
}