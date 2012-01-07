/*
* jQuery Plugin para redimensionar imagens
*
* @author Carlos Vinicius
* @version 1.0
* @date 2011-01-06
*
* @usage: $("img").resize({"maxWidth":250});
*
* This work is licensed under the Creative Commons Attribution 3.0 Unported License. To view a copy of this license,
* visit http://creativecommons.org/licenses/by/3.0/ or send a letter to Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.
*
* Esta obra foi licenciada com a Licença Creative Commons Attribution 3.0 Unported. Para ver uma cópia desta licença,
* visite http://creativecommons.org/licenses/by/3.0/ ou envie um pedido por carta para Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.
*
* Based on: http://stackoverflow.com/questions/1143517/jquery-resizing-image
*/
jQuery.fn.imgResize=function(opts)
{
    var defaults={
        maxWidth:100, // Largura máxima
        maxHeight:100, // Altura máxima
        animationSpeed:500, // Velocidade da animação ao redimensionar a imagem
        // Função que recebe como parametro a largura, altura e o elemento jQuery para que o redimensionamento possa ser feito de qualquer forma
        resize:function(width,height,image){image.stop(true,true).animate({"width":width,"height":height},options.animationSpeed);}
    };
    var options=jQuery.extend(defaults, opts);
    var $this=jQuery(this);
    var ratio=0;
    var width=$this.width();
    var height=$this.height();

    if(width>options.maxWidth){
        ratio=options.maxWidth/width;
        height=height*ratio;
        width=options.maxWidth;
        options.resize(width,height,$this);
    }
    if(height>options.maxHeight){
        ratio=options.maxHeight/height;
        width=width*ratio;
        height=options.maxHeight;
        options.resize(width,height,$this);
    }
};