/*
* Função para subtituir os caracteres especiais de uma string com JavaScript
*
* @author Carlos Vinicius
* @version 1.2
* @date 2011-01-06
*
* This work is licensed under the Creative Commons Attribution 3.0 Unported License. To view a copy of this license,
* visit http://creativecommons.org/licenses/by/3.0/ or send a letter to Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.
*
* Esta obra foi licenciada com a Licença Creative Commons Attribution 3.0 Unported. Para ver uma cópia desta licença,
* visite http://creativecommons.org/licenses/by/3.0/ ou envie um pedido por carta para Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.
* 
*/
if(typeof(String.prototype.replaceSpecialChars)!=="function") String.prototype.replaceSpecialChars=function(){var _replace={"ç":"c","æ":"ae","œ":"oe","á":"a","é":"e","í":"i","ó":"o","ú":"u","à":"a","è":"e","ì":"i","ò":"o","ù":"u","ä":"a","ë":"e","ï":"i","ö":"o","ü":"u","ÿ":"y","â":"a","ê":"e","î":"i","ô":"o","û":"u","å":"a","ã":"a","ø":"o","õ":"o","u":"u","Á":"A","É":"E","Í":"I","Ó":"O","Ú":"U","Ê":"E","Ô":"O","Ü":"U","Ã":"A","Õ":"O","À":"A","Ç":"C"};return this.replace(/[à-ú]/g,function(a){if(typeof(_replace[a])!="undefined") return _replace[a]; return a;});};

// Exemplo de uso
"ógãos".replaceSpecialChars(); // saída: orgaos