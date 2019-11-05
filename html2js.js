var input = "";
 
var stream = new ActiveXObject("ADODB.Stream");
stream.Mode = 3;
stream.Type = 2;
stream.Charset = 'UTF-8';
stream.Open();
stream.LoadFromFile(WScript.Arguments(0));
input = stream.ReadText( - 1);
stream.Close(); 
var html_source = input.replace(/^\s+/, '');
var formated_code = '';
if (html_source && html_source.substr(0, 1) === '<') {
	formated_code = html2js(html_source);
} else if (html_source && html_source.substr(0, 16) === 'document.writeln') {
	formated_code = js2html(html_source);
}
formated_code.length ? WScript.StdOut.Write(formated_code) : WScript.Echo('Are you sure your input is html/js source file?');
function js2html(source) {
	return source.replace(/document.writeln\("/g, "").replace(/"\);/g, "").replace(/\\\"/g, "\"").replace(/\\\'/g, "\'").replace(/\\\//g, "\/").replace(/\\\\/g, "\\")
}
function html2js(source) {
	return "document.writeln(\"" + source.replace(/\\/g, "\\\\").replace(/\//g, "\\/").replace(/\'/g, "\\\'").replace(/\"/g, "\\\"").split('\r\n').join("\");\ndocument.writeln(\"") + "\");"
}