/*
* Funзгo para subtituir os caracteres especiais de uma string com JavaScript
*
* @author Carlos Vinicius
* @version 1.0
* @date 2011-01-05
*/
if(typeof(String.prototype.replaceChar)!=="function") String.prototype.replaceChar=function(){var _replace={"з":"c","ж":"ae","њ":"oe","б":"a","й":"e","н":"i","у":"o","ъ":"u","а":"a","и":"e","м":"i","т":"o","щ":"u","д":"a","л":"e","п":"i","ц":"o","ь":"u","я":"y","в":"a","к":"e","о":"i","ф":"o","ы":"u","е":"a","г":"a","ш":"o","u":"u","Б":"A","Й":"E","Н":"I","У":"O","Ъ":"U","К":"E","Ф":"O","Ь":"U","Г":"A","Х":"O","А":"A","З":"C"};return this.replace(/[а-ъ]/g,function(a){console.log(a); if(typeof(_replace[a])!="undefined") return _replace[a]; return a;});};

// Exemplo de uso
"уgгos".replaceChar(); // saнda: orgaos