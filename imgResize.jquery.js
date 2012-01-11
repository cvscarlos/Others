/*
* jQuery Plugin para redimensionar imagens
*
* @author Carlos Vinicius
* @version 2.1
* @date 2011-01-10
*
* @usage: $("img").resize({"maxWidth":250});
*         Para que funcione em navegadores com Webkit é necessário adicionar esta classe a imagem que será redimensionada
*         <img src="exemple.jpg" class="imgResizeSetSize" />
*
* This work is licensed under the Creative Commons Attribution 3.0 Unported License. To view a copy of this license,
* visit http://creativecommons.org/licenses/by/3.0/ or send a letter to Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.
*
* Esta obra foi licenciada com a Licença Creative Commons Attribution 3.0 Unported. Para ver uma cópia desta licença,
* visite http://creativecommons.org/licenses/by/3.0/ ou envie um pedido por carta para Creative Commons, 444 Castro Street, Suite 900, Mountain View, California, 94041, USA.
*
* Based on: http://stackoverflow.com/questions/1143517/jquery-resizing-image and http://ditio.net/2010/01/02/jquery-image-resize-plugin/
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
    var _this=$this[0];
    var ratio=0;
    var width=_this.naturalWidth;
    var height=_this.naturalHeigth;
    var resize=false;
    
    if(!width || !height)
    {
        var img=document.createElement("img");
        img.src=_this.src;
        width=img.width;
        height=img.height;
    }

    if(width==0 || height==0)
    {
        width=$this.attr("realwidth")||0
        height=$this.attr("realheight")||0
    }

    if((width==0 || height==0) || $this.hasClass("imgResizeSetSize"))
    {
        $this.load(function(){$this.imgResize(options);});
    }
    
    if(width>options.maxWidth){
        ratio=options.maxWidth/width;
        height=height*ratio;
        width=options.maxWidth;
        resize=true;
    }
    if(height>options.maxHeight){
        ratio=options.maxHeight/height;
        width=width*ratio;
        height=options.maxHeight;
        resize=true;
    }
    
    if(resize)
        options.resize(width,height,$this);
    
    return $this;
};

jQuery.fn.imgResize.setSize=function(){
    jQuery(".imgResizeSetSize").each(function(){
        var $this=$(this);
        var div=jQuery('<div class="imgResize-hideBox"></div>').css({"width":"1px","height":"1px","position":"absolute","right":0,"bottom":0,"z-index":-999,"overflow":"hidden"});
        jQuery("body").append(div);
        var img2=jQuery('<img />').attr("src",$this[0].src).appendTo(div).load(function(){
            $this.attr({"realwidth":img2.width(),"realheight":img2.height()});
        });
    });
};

jQuery(function(){
    jQuery.fn.imgResize.setSize();
});