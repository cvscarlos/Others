/*
* Função para subtituir os caracteres especiais de uma string com JavaScript
*
* @author Carlos Vinicius
* @version 1.1
* @date 2011-01-05
*/
if(typeof(String.prototype.replaceSpecialChars)!=="function") String.prototype.replaceSpecialChars=function(){var _replace={"ç":"c","æ":"ae","œ":"oe","á":"a","é":"e","í":"i","ó":"o","ú":"u","à":"a","è":"e","ì":"i","ò":"o","ù":"u","ä":"a","ë":"e","ï":"i","ö":"o","ü":"u","ÿ":"y","â":"a","ê":"e","î":"i","ô":"o","û":"u","å":"a","ã":"a","ø":"o","u":"u","Á":"A","É":"E","Í":"I","Ó":"O","Ú":"U","Ê":"E","Ô":"O","Ü":"U","Ã":"A","Õ":"O","À":"A","Ç":"C"};return this.replace(/[à-ú]/g,function(a){if(typeof(_replace[a])!="undefined") return _replace[a]; return a;});};

// Exemplo de uso
"ógãos".replaceSpecialChars(); // saída: orgaos